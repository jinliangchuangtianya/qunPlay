let io = require("../utils/websocket");
let {pb} =  require("../utils/proto");
let common = require('../common/common');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        createBtn:cc.Node,
        loginBnt:cc.Node,
        btns:cc.Node,
        joinBtn:cc.Node,
        dices:cc.Node,
        diceLabel:cc.Label,
        addBtn:cc.Node,
        subBtn:cc.Node,
        exitBtn:cc.Node
    },
    onLoad () {
        wx.showShareMenu({
            withShareTicket: true
          })
        wx.onShareAppMessage(()=>{
            return{
                title:"一起玩骰子",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share.jpg",
                query:"share=true&sceneto=dice-con"
            }
        }) 
        this.timer = null;
        //初始化筛子数量为6
        this.diceCount = 6;
        this.addBtn.opacity = 76;
        this.islogin = false;  //是否登录成功
        io.connect();

        if(!!common.opt.query && !!common.opt.query.roomid){
            this.isJoin = true;
            this.btns.active = false;
            //this.joinBtn.active = true;
        }
        else{
            this.btns.active = this.dices.active = true;
            this.joinBtn.active = false;
            this.isJoin = false;
        }

        this.onmessageFire = onfire.on("onmessage",this.onMessage.bind(this));
        onfire.on("onopen",this.onopen.bind(this));
        onfire.on("onerror",this.onerror.bind(this));
        onfire.on("onclose",this.onclose.bind(this));

        let userInfo = wx.getStorageSync('userInfo');
        if(!!userInfo){
            if( this.isJoin ){
                //this.joinBtn.active = true;
                if(io.readyState == 1){
                    this.GetRooms(common.opt.query.roomid);
                }
                else{
                    this.isGetRooms = true;
                }
                
            }
            else{
                this.createBtn.active = true;
            }
            
        }
        else{
            if( this.isJoin ){
                //this.joinBtn.active = false;
                if(io.readyState == 1){
                    this.GetRooms(common.opt.query.roomid);
                }
                else{
                    this.isGetRooms = true;
                }
            }
            else{
                this.createBtn.active = false;
                this.dices.active = true;
                this.createAuthorizeBtn();
            }
            
            
        }
    },
    onMessage:function(data){
        console.log(data, 'dice-con 接收回调');
        
        switch (data.name) {
            case 'rspLink':
                this.rspLink(data)
                break;
            case 'rspLogin':
                this.rspLogin(data)
                break;
            case 'rspCreateRoom':
                this.rspCreateRoom(data)  //"rspJoinRoom"
                break;
             case 'rspJoinRoom':
                this.rspJoinRoom(data)
                break;
            case 'rspGetRooms':
                this.rspGetRooms(data)
                break;   //rspGetRoom
            case 'rspOutRooms':
                this.rspOutRooms(data);
                break;
        }
    },
    onopen (data) {
        console.warn(data, "dice-con 链接打开成功");
        this.ping();
        if(!!this.isGetRooms){
            this.GetRooms(common.opt.query.roomid);
        }
    },
     //心跳
     ping(){
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
            let message = pb.Ping.create();
            var bytes =  pb.Ping.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            io.send(bytes, "Ping")
        },1000)
    },
    onerror(){
        clearInterval(this.timer);
        let _this = this;
        wx.showModal({
            title:"提示",
            content: '链接断开',
            cancelText:'退出',
            confirmText:'继续连接',
            success(res){
                if (res.confirm) {
                    io.connect();
                } else if (res.cancel) {
                    common.opt = {};
                    cc.director.loadScene('index');
                }
               
            }
        })
    },
    onclose(err){
        clearInterval(this.timer);
        console.warn(err, "dice-con 链接关闭");
        if(io.readyState == 1){
            io.readyState = 0;
            wx.showModal({
                title:"提示",
                content: '已与服务器断开连接，您可以手动重连',
                cancelText:'退出',
                confirmText:'重新链接',
                success(res){
                    if (res.confirm) {
                        io.connect();
                    } else if (res.cancel) {
                        common.opt = {};
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
    },
    //取房间信息
    GetRooms(roomid){
            let reqGetRoom = pb.ReqGetRoom.create({
                roomid,
            })
            let message = pb.GetRooms.create({
                reqGetRoom
            })
            var bytes =  pb.GetRooms.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            io.send(bytes, "GetRooms")
    },
    //取房间信息的回调
    rspGetRooms(data){
        data = pb.GetRooms.decode(data.buf);
        console.warn(data, '222222222222222')
        if(data.rspGetRoom.code == 200){
            if(!!data.rspGetRoom.roominfo[0].roomStatus && data.rspGetRoom.roominfo[0].roomStatus == 1){
                this.exitBtn.active = false;
                wx.showModal({
                    title:"提示",
                    content: '游戏已经开始',
                    showCancel:false,
                    success(){
                        common.opt = {};
                        io.readyState = 0;
                        io.close();
                        cc.director.loadScene('index');
                    }
                })
            }
            else{
                let iLen = Object.keys(data.rspGetRoom.roominfo[0].userinfo).length;
                if(iLen > data.rspGetRoom.roominfo[0].number){
                    this.exitBtn.active = this.joinBtn.active = false;
                    if(!!this.btnAuthorize){
                        this.btnAuthorize.style.hidden = true;
                    }
                    wx.showModal({
                        title:"提示",
                        content: '人数已满',
                        showCancel:false,
                        success(){
                            common.opt = {};
                            io.readyState = 0;
                            io.close();
                            cc.director.loadScene('index');
                        }
                    })
                }
                else{
                    let userInfo = wx.getStorageSync('userInfo');
                    if(!!userInfo){
                        this.joinBtn.active = true;
                    }
                    else{
                        this.createAuthorizeBtn();
                    }
                }
            }
        }
        else{
            this.exitBtn.active = this.joinBtn.active = false;
            if(!!this.btnAuthorize){
                this.btnAuthorize.style.hidden = true;
            }
            wx.showModal({
                title:"提示",
                content: '房间不存在',
                showCancel:false,
                success(){
                    common.opt = {};
                    io.readyState = 0;
                    io.close();
                    cc.director.loadScene('index');
                }
            })
        }
        
    },
    gotoScene(e,scename){
        if(scename == 'create-room' || scename == 'join-room'){
            this.login();
            return;
        }
         io.readyState = 0;
         io.close();
         common.opt = {};
         common.isDiceFight = false;
         cc.director.loadScene(scename)
    }, 
    //心跳
    rspLink(){//待登陆，如果有心跳，跳到登陆界面
        console.log("ping")
    },
    //登录
    login(){
        if(this.islogin) return;
        if(io.readyState == 1){
            let title = '创建中...';
            if( this.isJoin ){
                title = '加入中...'
            }
            
            wx.showLoading({
                title: title,
                mask:false
            })
            
            this.islogin = true;
            let openId = wx.getStorageSync('openId');
            let data = {
                nickname:JSON.parse(wx.getStorageSync('userInfo')).nickName,
                headhash:JSON.parse(wx.getStorageSync('userInfo')).avatarUrl
            }

            if(!!openId){
                data.openid = openId;
            }
            else{
                data.code = wx.getStorageSync('code');
            }

            let reqLogin = pb.ReqLogin.create(data)
            let message = pb.Login.create({reqLogin});
            var bytes =  pb.Login.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            io.send(bytes, "Login")
        }
        else{
            wx.showModal({
                title:"提示",
                content: '已与服务器断开连接，您可以手动重连',
                cancelText:'退出',
                confirmText:'重新链接',
                success(res){
                    if (res.confirm) {
                        io.connect();
                    } else if (res.cancel) {
                        common.opt = {};
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
        
    
    },
    
    //登录回调
    rspLogin(data){
        data =  pb.Login.decode(data.buf);
        console.warn(data, 'dice-con登录回调')
        if(data.rspLogin.code == 200){
            console.warn("dice-con登录" + data.rspLogin.msg);
            wx.setStorageSync('openId', data.rspLogin.user.openid);
            this.OutRooms();
        }
        else{
            this.islogin = false;
            wx.showModal({
                title:"提示",
                content: '登录失败',
                cancelText:'退出',
                confirmText:'重新登录',
                success(res){
                    if (res.confirm) {
                        this.login();
                    } else if (res.cancel) {
                        common.opt = {};
                        io.readyState = 0;
                        io.close();
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
    },
    //退出房间
    OutRooms(){
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
            cc.director.loadScene("index");
        }
    },
    // //退出房间回调
    rspOutRooms(data){
        data =  pb.OutRooms.decode(data.buf);
        if(data.rspOutRoom.code == 200){
            console.warn("dice-scene退出房间" + data.rspOutRoom.msg);
            if(this.isJoin){
                this.joinRoom();
            }
            else{
                this.reqCreateRoom();
            }
           
        }
        else{
            console.warn("dice-scene退出房间失败,code=" + data.rspOutRoom.code);
        }
    },
    //创建房间
    reqCreateRoom(){
        if(io.readyState == 1){
            let obj = {
                diceCount:4
            }
            let reqCreateRoom = pb.ReqCreateRoom.create({
                action:2,
                hidden:0,
                number:9,
                ext: {dice:this.diceCount + ""},
                roomType:'dice'
            });
            let message = pb.CreateRoom.create({
                reqCreateRoom
            })
            var bytes =  pb.CreateRoom.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            io.send(bytes, "CreateRoom")
        }
        else{
            wx.showModal({
                title:"提示",
                content: '已与服务器断开连接，您可以手动重连',
                cancelText:'退出',
                confirmText:'重新链接',
                success(res){
                    if (res.confirm) {
                        io.connect();
                    } else if (res.cancel) {
                        common.opt = {};
                        io.readyState = 0;
                        io.close();
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
        

    },
    // 创建房间的回调
    rspCreateRoom(data){
        data =  pb.CreateRoom.decode(data.buf);
        wx.hideLoading();
        if(data.rspCreateRoom.code == 200){
            console.warn("dice-con创建房间" + data.rspCreateRoom.msg);
            common.diceRommInfo =  data.rspCreateRoom.roominfo;
            cc.director.loadScene('create-room');
        }
        else{
            let _this = this;
            console.warn("dice-con创建房间失败");

            wx.showModal({
                title:"提示",
                content: data.rspCreateRoom.msg,
                showCancel:false,
                success(){
                    common.opt = {};
                    io.readyState = 0;
                    io.close();
                    cc.director.loadScene('index');
                }
            })

        }
    },
    //加入房间
    joinRoom(){
        if(io.readyState == 1){
            console.warn(common.opt.query.roomid, 'roomid')
            let reqJoinRoom = pb.ReqJoinRoom.create({
                roomid:common.opt.query.roomid,
                roomtype:'dice',
                action:2,
                number:9
            });
            let message = pb.JoinRoom.create({
                reqJoinRoom
            })
            var bytes =  pb.JoinRoom.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            io.send(bytes, "JoinRoom")
        }
        else{
            wx.showModal({
                title:"提示",
                content: ' 已与服务器断开连接，您可以手动重连',
                cancelText:'退出',
                confirmText:'重新链接',
                success(res){
                    if (res.confirm) {
                        io.connect();
                    } else if (res.cancel) {
                        common.opt = {};
                        io.readyState = 0;
                        io.close();
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
        
    },
    //加入房间的回调
    rspJoinRoom(data){
        wx.hideLoading();
        if(!!this.isOnes) return;
        this.isOnes = true;
        data =  pb.JoinRoom.decode(data.buf);
        if(data.rspJoinRoom.code == 200){
            console.warn("dice-con加入房间" + data.rspJoinRoom.msg);
            common.diceRommInfo =  data.rspJoinRoom.roominfo;
            common.opt = {};
            cc.director.loadScene('create-room');
        }
        else{
            wx.showModal({
                title:"提示",
                content: data.rspJoinRoom.msg,
                showCancel:false,
                success(){
                    common.opt = {};
                    io.readyState = 0;
                    io.close();
                    cc.director.loadScene('index');
                }
            })
        }
    },
    //设置筛子数量
    setDiceCount(ev, type){
        if(type == 'add'){
            this.diceCount ++;
        }
        else if(type == 'sub'){
            this.diceCount --;
        }
        if( this.diceCount >= 6){
            this.diceCount = 6;
            this.addBtn.opacity = 76;
        }
        else if( this.diceCount <= 1){
            this.diceCount = 1;
            this.subBtn.opacity = 76;
        }
        else{
            this.addBtn.opacity = this.subBtn.opacity = 255;
        }
        this.diceLabel.string = this.diceCount;
    },
    createAuthorizeBtn() {
        let btnNode, top,imgUrl;
        
        btnNode = this.loginBnt;
       
       
        let btnSize = cc.size(btnNode.width,btnNode.height);
        let frameSize = cc.view.getFrameSize();
        let winSize = cc.director.getWinSize();
        // console.log("winSize: ",winSize);
        // console.log("frameSize: ",frameSize);
        //适配不同机型来创建微信授权按钮
        let left = (winSize.width*0.5+btnNode.x-btnSize.width*0.5)/winSize.width*frameSize.width;
        if(this.isJoin){
            imgUrl = 'https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/loginBrn3.png';
        }
        else{
            imgUrl = 'https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/loginBrn5.png';
        }
        top = ( (winSize.height - 227) -btnNode.y -btnSize.height*0.5)/winSize.height*frameSize.height;
        let width = btnSize.width/winSize.width*frameSize.width;
        let height = btnSize.height/winSize.height*frameSize.height;
        // console.log("button pos: ",cc.v2(left,top));
        // console.log("button size: ",cc.size(width,height));

        let self = this;
        self.btnAuthorize = wx.createUserInfoButton({
            type: 'image',
            image:imgUrl,
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
            }
        })
        self.btnAuthorize.onTap((uinfo) => {
            if (uinfo.userInfo) {
                let avatarUrl = uinfo.userInfo.avatarUrl, nickName = uinfo.userInfo.nickName
                wx.setStorageSync("userInfo", JSON.stringify({avatarUrl,nickName}));
                self.btnAuthorize.destroy();
                this.login();
                this.createBtn.active = true;
                this.postSetuserinfo(nickName, avatarUrl);
            }
        });
    },
    /**"/api/setuserinfo" */
    postSetuserinfo(nickname, avatar){
        let data={
            nickname,
            avatar
        },sessionId = wx.getStorageSync("sessionId"),path = "/api/setuserinfo";
        post(path,data,sessionId).then(res=>{
            this.getUserInfo();
        });
    },
    onDestroy:function(){
        clearInterval(this.timer);
        if(!!this.btnAuthorize){
            this.btnAuthorize.style.hidden = true;
        }
        wx.hideLoading();
        onfire.un("onmessage");
        onfire.un("onopen");
        onfire.un("onclose");
        onfire.un("onerror");
    },
});