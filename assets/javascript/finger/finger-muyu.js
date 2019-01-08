let common = require('../common/common');
let config = require("../utils/config");
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        muyu:cc.Node,
        muyuRun:cc.Node,
        score:cc.Label,
        mymClip:cc.AudioClip,
        targetNode:cc.Node,
        mask:cc.Node,
        musicBtn:cc.Node,
        closeBtn:cc.Node,
        alginBtn:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.alginBtn.on('touchstart',function(){
            cc.director.loadScene('finger-battscene');
        },this)
        this.closeBtn.on('touchstart',function(){
            this.musicBtn.resumeSystemEvents(true);
            this.muyu.resumeSystemEvents(true);
            this.mask.active = false;
        },this)
        this.muyu.on("touchstart", this.gamePlay, this);
        this.myaudio = wx.createInnerAudioContext();
        let targetY = this.targetNode.y - this.targetNode.height/2;
        let myMvoeCallFun = cc.callFunc(this.myMvoeFinished , this);

        this.mySequ = cc.sequence(
            cc.spawn(
                cc.moveTo(0.2, 0, targetY),
                cc.scaleTo(0.2, 0.5, 0.5),
                cc.fadeTo(0.2,0)
            ),
            myMvoeCallFun
        );
        this.mySequ.setTag(1)
    },
    
    gamePlay () {
        if(this.score.string == 0){
            this.showMask();
            return;
        }
        this.score.string = this.score.string -1;
        let scelectitem = cc.find("Canvas/musicList2").getComponent('musicList2').scelectItem;
        if(!scelectitem || scelectitem.getComponent('music-item-finger').id == 1){
            this.myaudio.stop();
            cc.audioEngine.stop(this.mymClip);
            cc.audioEngine.playEffect(this.mymClip, false);
        }
        else{
           this.myaudio.play();
        }

        this.muyuRun.stopActionByTag(1);
        this.muyuRun.y = -849;
        this.muyuRun.opacity = 255;
        this.muyuRun.setScale(1);

        this.muyuRun.runAction(this.mySequ);

        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.myaudio.stop();
            this.myaudio.seek(0)
        },500)
       
    },
    //木鱼运动结束
    myMvoeFinished(){
        this.muyuRun.y = -849;
        this.muyuRun.setScale(1);
        this.muyuRun.opacity = 255;
    },
    //显示遮罩
    showMask(){
        this.isGameOver();
        this.mask.active = true;
        this.musicBtn.pauseSystemEvents(true);
        this.muyu.pauseSystemEvents(true);
    },
    //完成任务
    isGameOver(){
        let path = '/api/acceptpunishment', sessionId = wx.getStorageSync('sessionId');
        let data = {
            punishment_content:"",
            pkid:common.opt.query.pkid
        }

        post(path, data, sessionId)
        .then(res=>{
            console.warn(res, 'isGameOver');
        })
    },
    changeMusic(link, id){
        if(id == 1) return;
        wx.showLoading({
            title:"加载中",
            mask:true
        })
        
        this.myaudio.src = link;
        this.myaudio.onCanplay(function () {
            wx.hideLoading();
        })
    }
    // update (dt) {},
});
