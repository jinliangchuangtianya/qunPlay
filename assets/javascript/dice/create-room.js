let io = require("../utils/websocket");
let {pb} =  require("../utils/proto");
let common = require('../common/common');

cc.Class({
    extends: cc.Component,

    properties: {
        roomPre:cc.Prefab,
        layout:cc.Node,
        startBnt:cc.Node,
        yqBnt:cc.Node,
        tcBtn:cc.Node,
        startBntText:cc.Sprite,
        waitIngText:cc.SpriteFrame,
        startFame:cc.SpriteFrame
    },


    onLoad () {

        this.ischangeHandle = false;  //是否是停止进程

        this.isStart = false; //是否已经准备
        wx.hideShareMenu();

        this.currentOpens = []; this.players = [];

        this.tcBtn.on('touchstart',this.OutRooms,this)
        
        this.yqBnt.on('touchstart',this.onshar,this);
        this.startBnt.on('touchstart', this.onStartPlay, this);

        onfire.on("onmessage",this.onMessage.bind(this));
        onfire.on("onclose",this.onclose.bind(this));

        this.drowPlayers();

    },
    onMessage:function(data){
        console.log(data, 'create-room  接收回调');
        
        switch (data.name) {
            case 'rspJoinRoom':
                this.rspJoinRoom(data)
                break;
            case 'rspOutRooms':
                this.rspOutRooms(data)
                break;  //rspGamePlay
           case 'rspGamePlay':
                this.rspGamePlay(data)
                break;  //rspDice
            case 'rspDice':
                this.rspDice(data)
                break;  //rspDice
            default:
                break;
        }
    },
    onclose(err){
        console.warn(err, "create-room 链接关闭")
        if(io.readyState == 1){
            this.ischangeHandle = true;
            io.readyState = 0;
            common.opt.query.roomid = common.diceRommInfo.roomId;
            wx.showModal({
                title:"提示",
                content:"链接断开请重新加入",
                showCancel:false,
                success(){
                    cc.director.loadScene("dice-con")
                }
            })
        }
    },
    //有成员加入
     rspJoinRoom(data){
        data =  pb.JoinRoom.decode(data.buf);
        if(data.rspJoinRoom.code == 200){
            console.warn("create-room新成员加入" + data.rspJoinRoom.msg);
            common.diceRommInfo =  data.rspJoinRoom.roominfo;
            this.drowPlayers();
        }
        else{
            console.warn("加入房间失败,code=" + data.rspJoinRoom.code);
        }
    },
    //退出房间
    OutRooms(){
        this.ischangeHandle = true;
        // if(this.isStart){
        //     cc.director.loadScene("index");
        //     io._sock.readyState = 0;
        //     common.opt = {};
        // }
        // else{
            if(io.readyState == 1){
                let reqOutRoom = pb.ReqOutRoom.create({
                    userid:""
                });
                let message = pb.OutRooms.create({
                    reqOutRoom
                })
                var bytes =  pb.OutRooms.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
                io.send(bytes, "OutRooms")
            }
            else if(io.readyState == 0){
                cc.director.loadScene("index")
            }
        //}
    },
    // //退出房间回调
    rspOutRooms(data){
        data =  pb.OutRooms.decode(data.buf);
        if(data.rspOutRoom.code == 200){
            console.warn("create-room退出房间" + data.rspOutRoom.msg);
            io.readyState = 0;
            io.close();
            common.opt = {};
            common.diceRommInfo = null;
            cc.director.loadScene("index")
        }
        else{
            console.warn("退出房间失败,code=" + data.rspOutRoom.code);
        }
    },
    //显示房间成员
    drowPlayers(){
        let roomInfo = common.diceRommInfo;
        console.warn(roomInfo, 'roomInfo')
        let openId = wx.getStorageSync('openId');
        if(roomInfo.master == openId){
            console.warn('你是房主');
            this.yqBnt.active = true;
        }
        else{
            console.warn('你不是房主');
            this.startBnt.y =  this.yqBnt.y;
            this.yqBnt.active = false;
        }
        let correntPlays = this.currentOpens.length;  //当前的人数
        let nowPlays = [];
        for(let attr in roomInfo.userinfo){
            let openId = roomInfo.userinfo[attr].openid;
            nowPlays.push(openId);
        }
        //有人准备了
        if(!!correntPlays && correntPlays == nowPlays.length){
            for(let attr in roomInfo.userStatus){
                if(roomInfo.userStatus[attr] == 1){
                    let index = this.currentOpens.findIndex((val)=>{
                        return val == attr
                    })
                    this.players[index].getComponent('room-item').zb.active = true;
                    this.players[index].getComponent('room-item').wzb.active = false;
                }
            }
            return;
        }
        if(correntPlays < nowPlays.length){
            console.warn(roomInfo, 'nowPlaysnowPlaysnowPlays');
            //有人加入
            for(let attr in roomInfo.userinfo){
                let nickname = roomInfo.userinfo[attr].nickname;
                let avatarurl =  roomInfo.userinfo[attr].headhash;
                let openId = roomInfo.userinfo[attr].openid;
                if(this.currentOpens.indexOf(openId) == -1){
                    let item = cc.instantiate(this.roomPre);
                    item.parent = this.layout;
                    item.openId = openId;
                    this.currentOpens.push(openId);
                    this.players.push(item);
                    item.getComponent("room-item").init({nickname, avatarurl})
                    if(roomInfo.master == openId){
                        item.getComponent("room-item").fz.active = true;
                    }
                }
            }
            for(let attr in roomInfo.userStatus){
                if(roomInfo.userStatus[attr] == 1){
                    let index = this.currentOpens.findIndex((val)=>{
                        return val == attr
                    })
                    this.players[index].getComponent('room-item').zb.active = true;
                    this.players[index].getComponent('room-item').wzb.active = false;
                }
            }
            if( this.players.length > 1){
                this.startBnt.active = true;
            }
            
        }
        else{
            //有人退出
            for(let i=0; i<this.currentOpens.length; i++){
                if(nowPlays.indexOf(this.currentOpens[i]) == -1){
                    this.currentOpens.splice(i,1);
                    this.players[i].destroy();
                    this.players.splice(i,1);
                    i--;
                }
                else{
                    if(this.currentOpens[i] == roomInfo.master){
                        this.players[i].getComponent("room-item").fz.active = true;
                    }
                }   
            }
            for(let attr in roomInfo.userStatus){
                let index = this.currentOpens.findIndex((val)=>{
                    return val == attr
                })
                if(roomInfo.userStatus[attr] == 0){
                    this.players[index].getComponent('room-item').zb.active = false;
                    this.players[index].getComponent('room-item').wzb.active = true;
                    if(attr == openId){
                        this.startBntText.spriteFrame = this.startFame;
                        this.isStart = false
                    }
                }
                else{
                    this.players[index].getComponent('room-item').zb.active = true;
                    this.players[index].getComponent('room-item').wzb.active = false;
                }
            }
            if( this.players.length <= 1){
                this.startBnt.active = false;
            }
        }

    },
    //点击准备
    onStartPlay(){
        if(this.isStart) return;
        let message = pb.GamePlay.create()
        var bytes =  pb.GamePlay.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
        io.send(bytes, "GamePlay")

    },
    //准备完成的回调
    rspGamePlay(data){
        data =  pb.GamePlay.decode(data.buf);
       
        console.warn("当前用户准备" + data.rspGamePlay.msg);
        this.isStart = true;
        
        this.startBntText.spriteFrame = this.waitIngText;
        
    },
    //开始游戏
    rspDice(data){
        // data =  pb.Dice.decode(data.buf);
        // console.warn(data, "rspDice");
        common.isDiceFight = this.ischangeHandle = true;
        onfire.un("onmessage");
        cc.director.loadScene("dice");
    },
    //分享
    onshar(){
        let query = "share=true&sceneto=dice-con&roomid=" + common.diceRommInfo.roomId;
        let _this = this;
        wx.shareAppMessage({
            title:"一起玩骰子",
            imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share.jpg",
            query:query,
            success(res){
               
            }
        })
    },
    onDestroy:function(){
        if(!!this.btnAuthorize){
            this.btnAuthorize.style.hidden = true;
        }
        if(io.readyState == 1 &&  !this.ischangeHandle){
            this.OutRooms();
        }
        
        onfire.un("onmessage");
        onfire.un("onclose");
    },
    // update (dt) {},
});
