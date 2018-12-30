let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        muyu:{
            type:cc.Node,
            default:null
        },
        muyuRun:{
            type:cc.Node,
            default:null
        },
        score:{
            type:cc.Label,
            default:null
        },
        rankingView:{  //排行组件
            type:cc.Component,
            default:null
        },
        createBtn:{   //创建战队按钮
            default:null,
            type:cc.Node
        },
        mes:{
            default:null,
            type:cc.Node
        },
        item:{
            default:null,
            type:cc.Node
        },
        zhuzhan:{
            type:cc.Node,
            default:null
        },
        mestitle:cc.Label,
        rankList:cc.Node,
        changeGu:cc.Node,
        changeMy:cc.Node,
        changeMucisBtn:cc.Node,
        gu:cc.Node,
        gumian:cc.Node,
        guAudio:cc.AudioClip,
        mymClip:cc.AudioClip,
        exitBox:cc.EditBox,
        zdBtn:cc.Node,
        qxBtn:cc.Node,
        maskNode:cc.Node,
        leftGroup:cc.Node
    },

    onLoad () {
        this.zdName = '';
        this.isShar = false;
        wx.onShow(()=>{
            if(this.isShar){
                this.isShar = false;
                let gid = wx.getStorageSync('gid');
                this.init(gid);
            }
        })

        if(common.woodfishType == 'muyu'){
            this.changeGu.active =  true;
            this.gu.setScale(0);
            this.gu.active = false;
            this.muyu.active = this.muyuRun.active = true;
            this.muyu.setScale(0.6);
            this.muyuRun.setScale(0.6);
        }
        else if(common.woodfishType == 'gu'){
            this.changeMy.active = true;
            this.muyu.setScale(0);
            this.muyuRun.setScale(0);
            this.muyu.active = this.muyuRun.active = false;
            
            this.gu.active = true;
            this.gu.setScale(1.5);
        }

        this.gumian.on("touchstart", this.gamePlay, this);
        this.changeGu.on('touchstart', this.changeType.bind(this, 'muyu'));
        this.changeMy.on('touchstart', this.changeType.bind(this, 'gu'))

        this.isMusicPlay = this.isInit = this.isStartTime =  this.isRuning = false;
        this.start_time = this.startScore = 0;
        let targetY = cc.winSize.height/2 - 150;

        let myMvoeCallFun = cc.callFunc(this.myMvoeFinished , this);
        this.mySequ = cc.sequence(
            cc.spawn(
                cc.moveTo(0.2, 0, targetY),
                cc.scaleTo(0.2, 0, 0),
                cc.fadeTo(0.2,0)
            ),
            myMvoeCallFun
        );

        let guMvoeCallFun = cc.callFunc(this.guMvoeFinished , this);
        this.guSequ = cc.sequence(
            cc.scaleTo(0.1, 1.02, 1.02).easing(cc.easeBounceInOut(4.0)),
            cc.scaleTo(0.15, 1, 1).easing(cc.easeBounceInOut(4.0)),
            guMvoeCallFun
        );

        wx.showLoading({
            title: '加载中',
            mask: true
        })

        this.myaudio = wx.createInnerAudioContext();
        let currentMusic = wx.getStorageSync("currentMusic");
        if(!currentMusic){
            wx.setStorageSync("currentMusic", JSON.stringify({"id":"1","link":"http://cloudimg2.jixiang.cn/b89963688bd7d55f48e1a25a455acefb.mp3"}));
            this.myaudio.src = "http://cloudimg2.jixiang.cn/b89963688bd7d55f48e1a25a455acefb.mp3"
        }
        else{
            if(common.woodfishType == 'muyu' && JSON.parse(currentMusic).id == 11){
                wx.setStorageSync("currentMusic", JSON.stringify({"id":"1","link":"http://cloudimg2.jixiang.cn/b89963688bd7d55f48e1a25a455acefb.mp3"}));
                this.myaudio.src = "http://cloudimg2.jixiang.cn/b89963688bd7d55f48e1a25a455acefb.mp3"
            }
            this.myaudio.src = JSON.parse(currentMusic).link;
        }
        let _this = this;
        this.myaudio.onCanplay(function () {
            _this.isMusicPlay = true;
            if(_this.isInit){
                wx.hideLoading();
            }
        })

        this.setTimer = this.sendOverTimer =  this.timer =  null;//停止音乐和发送分数的开关
        let selfScore = wx.getStorageSync("selfScore")   //个人的总敲击分数
       
        if(!!selfScore){
            this.selfScore = parseInt(selfScore);
        }
        else{
            this.selfScore = 0;
        }
        this.rankingView.submitScoreButtonFunc(this.selfScore);
        wx.showShareMenu({
            withShareTicket: true
          })
        wx.onShareAppMessage((res)=>{
            let type = res.from;
            let gid = wx.getStorageSync('gid'),query = "share=true&sceneto=woodfish";
            // if(!!gid){
            //     query += "&gid="+gid+"isnumber=false";
            // }
            return{
                title:"快来帮我敲两下！",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
                query:query,
                success: function (res) {
                    
                }
            }
        })

        this.muyu.on("touchstart", this.gamePlay, this);


        let opt = common.opt;
        if(!!opt.notLoad){
            let gid = wx.getStorageSync("gid");
            this.init(gid);
            return;
        };
        this.path_gid = null;
        if(!!opt.query){
           this.path_gid = (!!opt.query.gid ? opt.query.gid : null);
           if( !!this.path_gid ){
                let mode = '';
                if(opt.query.isnumber == 'true'){
                    mode = 'join';
                }
                else if(opt.query.isnumber == 'false'){
                    mode = 'assist';
                }
                this.joinGroup(this.path_gid, mode);
           }
           else{
           
             this.getMygroups();

           }
        }
        else{
            this.getMygroups();
        }
        
    },
    joinGroup(gid,mode){
        let path = "/api/join-group", sessionId = wx.getStorageSync("sessionId");
        let data = {
            gid,
            mode
        }
        console.warn()
        post(path, data, sessionId).then(res=>{
            if (res.data.code == 200) {
                this.init(gid);
            }
        })
    },
    getMygroups(){
        let gid = wx.getStorageSync('gid');
        if(!!gid){
            this.init(gid);
        }
        else{
            let path = '/api/mygroups',sessionId = wx.getStorageSync("sessionId");
            post(path, {}, sessionId).then(res => {
                let my_groups_list = res.data.data.my_groups_list;
                if (my_groups_list.length) {
                    //跳转到选择战队列表
                    console.warn("跳转到战队列表")
                    common.opt = my_groups_list;
                    common.opt.isJump = true;
                    cc.director.loadScene("group-list");
                }
                else {
                    //白玩
                    this.init();
                }
            })
        }
    },
    /**
     * 初始化
     * @param {*} gid 战队ID
     */
    init(gid){

        this.zdBtn.on("touchstart", this.createSucc, this);
        this.qxBtn.on("touchstart", this.removeMask, this);
        common.opt = {};
        if(!!gid){
            this.createBtn.active = false;
            this.mes.active = this.item.active = true;
            wx.setStorageSync("gid", gid);
            this.getMyPlay(gid);
        }
        else{
            this.createBtn.active = true;
            this.createBtn.on("touchstart", this.jzdHandle, this);
            this.mes.active = this.item.active = false;
            this.isInit = true;
            if(this.isMusicPlay){
                wx.hideLoading();
            }
        }

    },
    //获取我的信息
    getMyPlay(gid){
        let path = '/api/myplay', sessionId = wx.getStorageSync("sessionId");
        let data = {
            gid:gid
        }
        post(path, data, sessionId).then(res => {
            if (res.data.code == 200) {  //有战队
                 this.isInit = true;
                 if(this.isMusicPlay){
                    wx.hideLoading();
                }
                 common.opt.groupInfo = res.data.data.mixdata;
                 this.mes.getChildByName("label").getComponent(cc.Label).string =   common.opt.groupInfo.group_comment_total;   //信息条数
                 this.mestitle.string = common.opt.groupInfo.group_comment_total + "条信息";
                 this.item.getChildByName("label").getComponent(cc.Label).string =  (common.opt.groupInfo.group_name == "" ? "未命名" : common.opt.groupInfo.group_name) + "("+ common.opt.groupInfo.group_member_guest_total +")";   //战队名称
                 this.score.string = common.opt.groupInfo.group_my_hit_count;
                 //是否是群成员
                 if( common.opt.groupInfo.role == 'guest'){
                    this.zhuzhan.active = true;
                 }
                 else if(common.opt.groupInfo.role == 'member'){
                    this.zhuzhan.active = false;
                 }
                 else{
                    this.zhuzhan.active = false;
                 }
              }
              else {
                let _this = this;
                this.isInit = true;  
                if(this.isMusicPlay){
                    wx.hideLoading();
                }
                wx.showModal({
                    showCancel: false,
                    content: "战队已不存在",
                    success(){
                        _this.createBtn.active = true;
                        _this.createBtn.on("touchstart", _this.jzdHandle, _this);
                        _this.mes.active = _this.item.active = false;
                    }
                  })
              }
        })
    },
    //切换道具
    changeType(type, ev){
        let myMvoeCallFun = cc.callFunc(this.changeAction, this, type);
        let muyuhide = cc.sequence(
            cc.scaleTo(0.1, 0, 0),
            myMvoeCallFun
        );
        if(type == 'muyu'){
            this.changeGu.active = false;
            this.changeMy.active = true;
            this.muyu.active = this.muyuRun.active = true;
            
             //保存鼓的数据
             wx.setStorageSync("currentMusic", JSON.stringify({"id":"11","link":"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/audio/gu.mp3"}));
             this.myaudio.src = "https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/audio/gu.mp3"

            this.muyu.runAction(muyuhide);
            this.muyuRun.setScale(0)
        }
        else if(type == 'gu'){
            this.changeGu.active = true;
            this.changeMy.active = false;
            this.gu.active = true;

             //保木鱼的数据
             wx.setStorageSync("currentMusic", JSON.stringify({"id":"1","link":"http://cloudimg2.jixiang.cn/b89963688bd7d55f48e1a25a455acefb.mp3"}));
             this.myaudio.src = "http://cloudimg2.jixiang.cn/b89963688bd7d55f48e1a25a455acefb.mp3"

            this.gu.runAction(muyuhide);      
        }
       
    },
    //切换动画
    changeAction(ev,type){
        console.log(type, 'tye');
        if(type == 'muyu'){
            this.muyu.active = this.muyuRun.active = false;
            this.gu.active = true;
            common.woodfishType = 'gu';
            this.gu.runAction(cc.scaleTo(0.2, 1.5, 1.5));
        }
        else if(type == 'gu'){
            this.gu.active = false;
            this.muyu.active = this.muyuRun.active = true;
            this.muyuRun.opacity = 0;
            common.woodfishType = 'muyu';

            let myMvoeCallFun = cc.callFunc(function(){
                this.muyuRun.setScale(0.6);
                this.muyuRun.opacity = 255;
            },this);
            let muyushow = cc.sequence(
                cc.scaleTo(0.2, 0.6, 0.6),
                myMvoeCallFun
            );
            this.muyu.runAction(muyushow); 
           
        }
    },
    gamePlay(ev){
        if( this.rankingView.isRank) return;
        this.score.string = (parseInt(this.score.string) + 1) + "";
        this.selfScore += 1;
        if (!this.isStartTime) {
            this.isStartTime = true;
            this.start_time = Date.parse(new Date()) / 1000;
          }
        this.startScore++;
        if(!this.setTimer){
            this.setTimer = setInterval(()=>{
                wx.setStorageSync("selfScore", this.selfScore);
                this.rankingView.submitScoreButtonFunc(this.selfScore);
                if((this.rankingView.getTimer == null) && !this.rankingView.isOpen){
                    this.rankingView.starteInter();
                }
            },5000)
        }
        let currentMusic = JSON.parse(wx.getStorageSync("currentMusic"));
 
       
           
        if(currentMusic.id == 11){
            this.myaudio.stop();
            cc.audioEngine.stop(this.guAudio);
            cc.audioEngine.playEffect(this.guAudio, false);
        }
        else if(currentMusic.id == 1){
            this.myaudio.stop();
            cc.audioEngine.stop(this.mymClip);
            cc.audioEngine.playEffect(this.mymClip, false);
        }
        else{
            this.myaudio.play();
        }
        

        if(this.muyu.active){
            if( this.isRuning ){
                this.muyuRun.stopAction(this.mySequ);
                this.muyuRun.y = 0;
                this.muyuRun.opacity = 255;
                this.muyuRun.setScale(0.6);
            }
            this.muyuRun.runAction(this.mySequ);
        }
        else if(this.gu.active){
            if( this.isRuning ){
                this.gumian.stopAction(this.guSequ);
                this.gumian.setScale(1);
            }
            this.gumian.runAction(this.guSequ);
        }
        
        this.isRuning = true;

        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.isStartTime = false;

            this.myaudio.stop();
            this.myaudio.seek(0)

            let gid = wx.getStorageSync("gid");
            if (!!gid) {
                let path = "/api/update", sessionId = wx.getStorageSync('sessionId');
                let data = {
                    gid : gid,
                    music_id:currentMusic.id,
                    start_time:this.start_time,
                    end_time:Date.parse(new Date()) / 1000,
                    count:this.startScore
                }
                post(path, data, sessionId).then(result => {
                  if (result.data.code == 200) {
                        
                  }
                })
                this.startScore = 0;
              }
        },500)
        clearTimeout( this.sendOverTimer );
        this.sendOverTimer = setTimeout(()=>{
            clearInterval(this.setTimer);
            clearInterval(this.rankingView.getTimer);
            this.setTimer = this.rankingView.getTimer = null;
        },15000)
    },
    gotoScene(ev, opt){
        if( this.rankingView.isRank ) return;
        if(opt == "index"){
            cc.director.loadScene(opt);
        }
        else if(opt == "qunrank"){
            this.rankList.getComponent("rankList").showView();
        }
        
    },
    getZdName(text, editbox, customEventData){
        this.zdName = text;
    },
    createSucc(){
       
        if(this.zdName.trim() == ''){
            wx.showToast({
                title:"名称不能为空",
                mask:true,
                icon:'none'
            })
            return;
        }
        this.createZd();
    },
    //创建战队
    createZd(){

        let _this = this;

        let path = '/api/create-group',sessionId = wx.getStorageSync('sessionId');

        post(path, {name:this.zdName}, sessionId).then(arg => {
            if (arg.data.code == 200) {
                this.removeMask();
                let gid = arg.data.data.id;
                wx.setStorageSync("gid", gid);
                this.isShar = true;
                wx.shareAppMessage({
                    title:"快来帮我敲两下！",
                    imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
                    query:"share=true&sceneto=woodfish&gid="+gid+"&isnumber=true",
                    success(res){
                        
                    }
                })
            }
        })
        
    }, 
    jzdHandle () {
        if(common.woodfishType == 'muyu'){
            this.gu.active = false;
        }
        else{
            this.muyu.active = this.muyuRun.active = false;
        }
        this.leftGroup.active = this.changeMucisBtn.active =  false;
        this.maskNode.active = true;
        let spawn = cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1, 1));
        this.maskNode.runAction(spawn);
        this.exitBox.fontColor = new cc.Color(51,51,51)
        console.warn( this.exitBox)
    },
    removeMask(){
        if(common.woodfishType == 'muyu'){
            this.gu.active = true;
        }
        else{
            this.muyu.active = this.muyuRun.active = true;
        }
        this.leftGroup.active = this.changeMucisBtn.active =  true;
        this.maskNode.setScale(0);
        this.maskNode.opacity = 0;
        this.maskNode.active = false;
        this.zdName = "";
        this.exitBox.string = "";
    },
    //切换音乐
    changeMusic(){
        let link = JSON.parse(wx.getStorageSync("currentMusic")).link;
        let id = JSON.parse(wx.getStorageSync("currentMusic")).id;
        if(this.myaudio.src == link || id == 1 || id == 11){
            return;
        }
        wx.showLoading({
            title:"加载中",
            mask:true
        })
        
        this.myaudio.src = link;
        this.myaudio.onCanplay(function () {
            wx.hideLoading();
        })
    },
    //木鱼运动结束
    myMvoeFinished(){
        this.isRuning = false;
        this.muyuRun.y = 0;
        this.muyuRun.setScale(0.6);
        this.muyuRun.opacity = 255;
    },
    //鼓运动结束
    guMvoeFinished(){
        this.isRuning = false;
        this.gumian.setScale(1);
    },
    onDestroy:function(){
        clearTimeout(this.setTimer);
        clearTimeout( this.sendOverTimer );
        clearTimeout(this.timer);
        cc.audioEngine.stopAll();
        this.myaudio.stop();
    }

    // update (dt) {},
});
