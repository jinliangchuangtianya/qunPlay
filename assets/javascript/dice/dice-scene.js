
let io = require("../utils/websocket");
let {pb} =  require("../utils/proto");
let common = require('../common/common');

cc.Class({
    extends: cc.Component,

    properties: {
        dice:cc.Prefab,
        isize:cc.Node,
        music:cc.AudioClip,
        group:cc.Node,
        addBtn:cc.Node,
        subBtn:cc.Node,
        diceLabel:cc.Label,
        yaoBtn:cc.Node,
        border:cc.Node,
        okBnt:cc.Node,
        openSprite:cc.SpriteFrame,
        playGroupBg:cc.Node,
        playGroup:cc.Node,
        playItem:cc.Prefab,
        overSprite:cc.SpriteFrame,
        yhlSprite:cc.SpriteFrame,
        wait:cc.Node,
        exitBtn:cc.Node,
        goIndexBtn:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startStage = 1;   //开始按钮的状态
        if(window.wx){
            wx.showShareMenu({
                withShareTicket: true
              })
            wx.onShareAppMessage((res)=>{
                let query = "share=true&sceneto=dice";
                return{
                    title:"一起玩骰子",
                    imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share.jpg",
                    query:query
                }
            })
        }
        if(common.isDiceFight){
            this.playersCount = Object.keys(common.diceRommInfo.userinfo).length;
           
            this.diceCountArr = [];  //点数
        
            this.players = [];   //初始化当前游戏玩家的数组集合 type => prefab
            this.timer = null;
            this.border.active = this.goIndexBtn.active = false;
            this.okBnt.active = true;
            this.isReady = false;  //选好了
            this.alignPlay = false; //重新开始
            this.Ping();

            this.okBnt.on('touchstart', this.Dice, this);
            this.exitBtn.on('touchstart', this.OutRooms, this)

            this.diceCount = common.diceRommInfo.ext.dice;
            this.changeCount = common.diceRommInfo.ext.dice;
            io.connect();
            this.onmessageFire = onfire.on("onmessage",this.onMessage.bind(this));
            onfire.on("onopen",this.onopen.bind(this));
            onfire.on("onclose",this.onclose.bind(this));
        }
        else{
            this.border.active = this.goIndexBtn.active = true;
            this.okBnt.active = false;
            this.diceCount = 6;
            this.changeCount = 6;

            this.goIndexBtn.on('touchstart', function(){
                cc.director.loadScene('index');
            },this)
        }
     
        this.diceArr = [];
        let _this = this;
        this.isPlay = false;
 
        this.init();

        this.addBtn.on("touchstart", this.changeCountHandel.bind(this, 'add'));
        this.subBtn.on("touchstart", this.changeCountHandel.bind(this, 'sub'));
        this.yaoBtn.on("touchstart", this.playIng, this);

        this.addBtn.opacity = 76;

        if(!!window.wx){
            wx.onAccelerometerChange(function (res) {
                if(_this.startStage !=1) return;
                if ((Math.abs(res.x) + Math.abs(res.y) > 2 || Math.abs(res.z) > 6) && !this.isRunIng) {
                    _this.playIng()
                }
            })
        }

        this.group.getChildByName("yao").on("touchstart", this.playIng, this);
       
    },
    changeCountHandel(type){
        //console.warn(e, type, 123)
        if(type == 'add'){
            this.changeCount += 1;
            if(this.changeCount >= 6){
                this.changeCount = 6;
            }
        }
        else if(type == 'sub'){
            this.changeCount -= 1;
            if(this.changeCount <= 1){
                this.changeCount = 1;
            }
        }
        if(this.changeCount == 6){
            this.addBtn.opacity = 76;
        }
        else if(this.changeCount == 1){
            this.subBtn.opacity = 76;
        }
        else{
            this.addBtn.opacity = this.subBtn.opacity = 255;
        }
        this.diceLabel.string = this.changeCount;
    },
    playIng(){
        if(this.isPlay) return;
        this.isPlay = true;
        if(this.changeCount == this.diceCount){
            this.startMove();
        }
        else{
            this.diceCount = this.changeCount;
            this.init();
        }
        setTimeout(()=>{
            this.isPlay = false
        },600)
    },
    init () {
        this.diceCountArr = [];
        cc.audioEngine.playEffect(this.music, false);
        this.diceArr = [];
        this.node.removeAllChildren();
        for(let i=0; i<this.diceCount; i++){
            let dice = cc.instantiate(this.dice);
            dice.target = this.getTagrget(this.diceArr);
            dice.frame = this.getRandom(0, 5);
            this.diceArr.push(dice);
            this.diceCountArr.push(dice.frame);
            dice.parent = this.node;
            dice.getComponent("dice-pre").init(dice.target,  dice.frame);
        }
    },
    startMove(){
        this.diceCountArr = [];
        cc.audioEngine.playEffect(this.music, false);
        let arr = [];
        for(let i=0; i<this.diceArr.length; i++){
            this.diceArr[i].target = this.getTagrget(arr);
            this.diceArr[i].frame = this.getRandom(0, 5);
            arr.push(this.diceArr[i]);
            this.diceCountArr.push(this.diceArr[i].frame);
            this.diceArr[i].getComponent("dice-pre").init(this.diceArr[i].target,  this.diceArr[i].frame);
        }
    },
    getTagrget(arr){
        let left = this.getRandom(this.isize.width, cc.winSize.width - this.isize.width);
        let top = this.getRandom(this.group.y + this.isize.height, cc.winSize.height - this.isize.height);
        let rotate = this.getRandom(0, 180);
        rotate = (Math.random() > 0.5 ? '+' : '-') + rotate;
    
        if (arr.length >= 1){
          for (let i = 0; i < arr.length; i++){
            if(this.isOverlap(arr[i].target, {left, top})){
              return this.getTagrget(arr);
            }
           }
        }
        return { left, top, rotate};
        
      },
      getRandom(lowerValue, upperValue){
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
      },
      isOverlap(rc1, rc2) {    //判断元素是否重叠
        let obj2top = rc2.top;
        let obj2left = rc2.left;
  
        let obj1top = rc1.top;
        let obj1left = rc1.left;
  
  
        let radius =  this.isize.width;

        if ((obj1left + radius) < obj2left || (obj1top + radius) < obj2top || obj1top > (obj2top + radius) || obj1left > (obj2left + radius)) {
            return false;
          }
          else {
            console.log('碰上了')
            return true;
          }
      },
      onMessage:function(data){
            console.log(data, 'dice-scene 接收回调');
            if(common.isDiceFight){
                switch (data.name) {
                    case 'rspLink':
                        this.rspLink(data)
                        break;
                    case 'rspLogin':
                        this.rspLogin(data)
                        break;
                    case 'rspOutRooms':
                        this.rspOutRooms(data);
                        break;
                    case 'rspJoinRoom':
                        this.rspJoinRoom(data);
                        break;
                    case 'rspDice':
                        this.rspDice(data)
                        break;
                    case 'rspPing':
                        this.rspPing(data)
                        break;   //
                    case 'rspGameOver':
                        this.rspGameOver(data)
                        break;   //rspGamePlay
                    case 'rspGamePlay':
                        this.rspGamePlay(data)
                        break;   //
                    case 'rspGetRoom':
                        this.rspGetRoom(data)
                        break;   //rspGetRoom
                    case 'rspDiceOver':
                        this.rspDiceOver(data)
                        break;  
                    default:
                        break;
                }
            }
            
        },
    onopen (data) {
        this.login();
    },
    onclose(err){
        console.warn(err, "dice-scene 链接关闭")
        if(io.readyState == 1){
            io.readyState = 0;
            console.warn('dice-scene断线重连');
            io.connect();
        }
    },
    onerror(){
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
    //心跳
    Ping(){
        // this.timer = setInterval(()=>{
        //     let message = pb.Ping.create()
        //     var bytes =  pb.Ping.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
        //     io.send(bytes, "Ping")
        // },2000)
    },
    rspPing(data){//待登陆，如果有心跳，跳到登陆界面
        data =  pb.Ping.decode(data.buf);
        if(!data.pong){
            clearInterval(this.timer);
            if(io.readyState == 1){
                io.readyState = 0;
                io.close();
                io.connect();
            }
            
        }
    },
    //登录
    login(){
        wx.showLoading({
            title: '正在重新连接...',
            mask:true
        })

        let openId = wx.getStorageSync('openId');
        let data = {
            nickname:JSON.parse(wx.getStorageSync('userInfo')).nickName,
            headhash:JSON.parse(wx.getStorageSync('userInfo')).avatarUrl
        }
        data.openid = openId;
       
        let reqLogin = pb.ReqLogin.create(data)
        let message = pb.Login.create({reqLogin});
        var bytes =  pb.Login.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
        io.send(bytes, "Login")
    
    },
    
    //登录回调
    rspLogin(data){
        let _this = this;
        wx.hideLoading();
        data =  pb.Login.decode(data.buf);
        console.warn(data, 'dice-scene登录回调')
        if(data.rspLogin.code == 200){
            console.warn("dice-scene登录" + data.rspLogin.msg);
            this.Ping();
            this.GetRooms();
        }
        else{
            console.warn("dice-scene登录失败");
            wx.showModal({
                title:"提示",
                content: '链接失败',
                cancelText:'退出',
                confirmText:'继续连接',
                success(res){
                    if (res.confirm) {
                        if(io.readyState == 1){
                            _this.login();
                        }
                        else{
                            io.connect();
                        }
                    } else if (res.cancel) {
                        io.readyState = 0;
                        io.close();
                        common.opt = {};
                        common.diceRommInfo = null;
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
    },
    //断线之后获取房间信息
    GetRooms(){
        if( !!common.diceRommInfo && !!common.diceRommInfo.roomId){
            let reqGetRoom = pb.ReqGetRoom.create({
                roomid:common.diceRommInfo.roomId
            })
            let message = pb.GetRooms.create({
                reqGetRoom
            })
            var bytes =  pb.GetRooms.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            io.send(bytes, "GetRooms")
        }
    },
    //重连之后的回调
    rspGetRoom(data){
        data = pb.GetRooms.decode(data.buf);
        if(data.rspGetRoom.code == 200){
            console.warn('重新连接成功')
        }
        else{
            let _this = this;
            wx.showModal({
                title:"提示",
                content: '链接失败',
                cancelText:'退出',
                confirmText:'继续连接',
                success(res){
                    if (res.confirm) {
                        if(io.readyState == 1){
                            _this.login();
                        }
                        else{
                            io.connect();
                        }
                    } else if (res.cancel) {
                        io.readyState = 0;
                        io.close();
                        common.opt = {};
                        common.diceRommInfo = null;
                        cc.director.loadScene('index');
                    }
                   
                }
            })
        }
    },
    //发送我的骰子信息
    Dice(){
        if( this.startStage == 3){
            this.wait.zIndex = this.exitBtn.zIndex = 89;
            this.wait.active = this.exitBtn.active = true;
            this.gamePlay();
            this.okBnt.active = false;
            this.alignPlay = true;
        }
        else{
            let obj = {};
            let key = wx.getStorageSync('openId');
            let DiceUser = null;
            if( this.startStage == 2 ){
                console.warn('开牌');
                DiceUser = pb.DiceUser.create({
                    number:this.diceCountArr.sort(),
                    "open":true
                });
                
                this.okBnt.active = false;
                // for(let i=0; i<this.players.length; i++){
                //     this.players[i].getChildByName('dices').opacity = 255;
                // }
            }
            else if(this.startStage == 1){
    
                this.isReady = true;
                
                this.playGroupBg.active = this.playGroup.active =  true;
                this.playGroupBg.zIndex = this.playGroup.zIndex =  this.okBnt.zIndex = 10;
                DiceUser = pb.DiceUser.create({
                    number:this.diceCountArr.sort()
                });

                this.yaoBtn.active = false;
                this.okBnt.getChildByName('yhl').getComponent(cc.Sprite).spriteFrame = this.openSprite;
                this.okBnt.active = false;
            }
            obj.usernum = {
                [key]:DiceUser
            }
            let message = pb.Dice.create(obj);
            var bytes =  pb.Dice.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
            console.warn(message, 'mes');
            io.send(bytes, "Dice");
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
            io.readyState = 0;
            io.close();
            common.opt = {};
            common.diceRommInfo = null;
            cc.director.loadScene("index")
        }
        else{
            console.warn("dice-scene退出房间失败,code=" + data.rspOutRoom.code);
        }
    },
    //有成员退出
    rspJoinRoom(data){
        let _this = this;
        data =  pb.JoinRoom.decode(data.buf);
        if(data.rspJoinRoom.code == 200){
           
            console.warn("create-room新成员加入" + data.rspJoinRoom.msg);
            common.diceRommInfo =  data.rspJoinRoom.roominfo;
            this.playersCount = Object.keys(common.diceRommInfo.userinfo).length;
            if( this.playersCount <= 1){
                console.warn("create-room, 都退出了");
               
                wx.showModal({
                    title:"提示",
                    content: '好友成员都退出了,房间解散',
                    showCancel:false,
                    success(res){
                        _this.OutRooms();
                    }
                })
            }
        }
        else{
            console.warn("加入房间失败,code=" + data.rspJoinRoom.code);
        }
    },
    //游戏结束
    rspGameOver(data){
        data =  pb.GameOver.decode(data.buf);
       
        this.startStage = 3;
        this.okBnt.getChildByName('yhl').getComponent(cc.Sprite).spriteFrame = this.overSprite;
        this.okBnt.active = this.exitBtn.active =  true;
        this.exitBtn.zIndex = 89;
        this.isReady = false;
        for(let i=0; i<this.players.length; i++){
            this.players[i].getChildByName('dices').opacity = 255;
        }
        
    },
    //本轮结束
    rspDiceOver(data){
        data =  pb.DiceOver.decode(data.buf);
        let openid = data.openid;
        let openPlayer = this.players.find(item=>{
            return item.openid == openid;
        })
        openPlayer.getComponent('play-item').openPlay.active = true;
    },
    //开始游戏
    gamePlay(){
        let message = pb.GamePlay.create()
        var bytes =  pb.GamePlay.encode(message).finish(); //获取二进制数据，一定要注意使用finish函数
        console.warn('GamePlayGamePlayGamePlayGamePlayGamePlay')
        io.send(bytes, "GamePlay")
    },
    //准备完成的回调
    rspGamePlay(data){
        data =  pb.GamePlay.decode(data.buf);
        console.warn(data, 'dada')
        console.warn("当前用户准备" + data.rspGamePlay.msg);
    },
     //监听
     rspDice(data){
        if(this.alignPlay == true ){
            this.playIng();
            this.alignPlay = false; 
            this.wait.active = this.exitBtn.active = false;
            this.players = [];
            this.playGroup.removeAllChildren();
            this.playGroup.active = this.playGroupBg.active = false;
            this.startStage = 1;
            this.okBnt.active= true;
            this.okBnt.getChildByName('yhl').getComponent(cc.Sprite).spriteFrame = this.yhlSprite;
            this.yaoBtn.active = true;
        }
        if(!this.isReady) return;
        data =  pb.Dice.decode(data.buf);
        console.warn(data, 'data')
        let players = data.usersort;
        console.warn(players,players.length, 'players')
        for(let i=0; i<players.length; i++){
            let openid = players[i];
            let currentPlayer = this.players.find(item=>{
                return item.openid == openid;
            })
            if(!currentPlayer){
                console.warn("添加玩家")
                let item = cc.instantiate(this.playItem);
                item.parent = this.playGroup;
                item.openid = openid;
                this.players.push(item);
                item.getComponent('play-item').init(common.diceRommInfo.userinfo[openid], data.usernum[openid]);
            }
        }
        if(this.players.length ==  this.playersCount && !this.okBnt.active){
            this.okBnt.active = true;
            this.startStage = 2;
        }
    },
      onDestroy:function(){
          if(common.isDiceFight){
            common.isDiceFight = false;
            wx.hideLoading();
            onfire.un("onmessage");
            onfire.un("onopen");
            onfire.un("onclose");
            if(io.readyState == 1){
                //停止进程非正常退出,此处应该先退出游戏
                this.OutRooms();
            }
            else{
                common.opt = {};
            }
          }
    },

    // update (dt) {},
});
