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
        rankList:cc.Node
    },

    onLoad () {
       
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
            if(!!gid){
                query += "&gid="+gid;
            }
            return{
                title:"快来帮我敲两下！",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
                query:query
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
        }
        if(!!opt.shareTicket){
            this.getShareTicket(opt.shareTicket)
        }
        else{
            this.isallowjoin(  this.path_gid, null )
        }
    },
    //获取shareTicket
    getShareTicket(shareTicket){
        wx.getShareInfo({
            shareTicket:shareTicket,
            success:result=>{
                let data = {
                    encryptedData:result.encryptedData,
                    iv : result.iv
                }
                this.getGroup(data);
            }
        })
    },
    //获取战队
    getGroup(data){
        let path = "/api/getgroup", sessionId = wx.getStorageSync('sessionId');
        post(path, data, sessionId).then(result => {
            if (result.data.code == 200) {
                let share_gid = result.data.data.id;          
                this.isallowjoin( this.path_gid, share_gid );
            }
            else{
                this.isallowjoin( this.path_gid, null );
            }
          })
    },
    isallowjoin(gid, share_gid){
        let path = "/api/isallowjoin", sessionId = wx.getStorageSync("sessionId");
        let data = {
            gid,
            share_gid
        }
        post(path, data, sessionId).then(res=>{
            if (res.data.code == 200) {
                this.init(res.data.data.gid);
            }
            else if (res.data.code == 403){
                let gid = wx.getStorageSync("gid");
                if(!!gid){
                    this.init(gid);
                }
                else{
                    this.getMygroups();
                }
            }
        })
    },
    getMygroups(){
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
    },
    /**
     * 初始化
     * @param {*} gid 战队ID
     */
    init(gid){
        common.opt = {};
        if(!!gid){
            this.createBtn.active = false;
            this.mes.active = this.item.active = true;
            wx.setStorageSync("gid", gid);
            this.getMyPlay(gid);
        }
        else{
            this.createBtn.active = true;
            this.createBtn.on("touchstart", this.createZd, this);
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
                this.isInit = true;  
                if(this.isMusicPlay){
                    wx.hideLoading();
                }
                wx.showModal({
                    showCancel: false,
                    content: "战队已不存在",
                    success(){
                        this.createBtn.active = true;
                        this.createBtn.on("touchstart", this.createZd, this);
                        this.mes.active = this.item.active = false;
                    }
                  })
              }
        })
    },
    gamePlay(){
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
        let currentMusic = JSON.parse(wx.getStorageSync("currentMusic"))
        if(currentMusic.id == 1){
            this.myaudio.stop()
        }
        this.myaudio.play();
        
        if( this.isRuning ){
            this.muyuRun.stopAction(this.mySequ);
            this.muyuRun.y = 0;
            this.muyuRun.opacity = 255;
            this.muyuRun.setScale(0.6);
        }
        this.muyuRun.runAction(this.mySequ);
        this.isRuning = true;
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.isStartTime = false;
            this.myaudio.stop();
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
    //创建战队
    createZd(){
        let _this = this;
        wx.shareAppMessage({
            title:"快来帮我敲两下！",
            imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
            query:"share=true&sceneto=woodfish",
            success(res){
                if (res.shareTickets && res.shareTickets[0]) {
                    let shareTicket = res.shareTickets[0];
                    wx.getShareInfo({
                        shareTicket:shareTicket,
                        success:result=>{
                            let data = {
                                encryptedData:result.encryptedData,
                                iv : result.iv,
                                c:"create"
                            }
                            let path = "/api/getgroup", sessionId = wx.getStorageSync('sessionId');
                            post(path, data, sessionId).then(arg => {
                                if (arg.data.code == 200) {
                                //创建成功后重置页面
                                _this.init(arg.data.data.id)
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    //切换音乐
    changeMusic(){
        wx.showLoading({
            title:"加载中",
            mask:true
        })
        let link = JSON.parse(wx.getStorageSync("currentMusic")).link;
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
    }

    // update (dt) {},
});
