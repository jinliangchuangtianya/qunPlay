
let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        scrollview:cc.Node,
        mesContent:cc.Node,
        mesPrefab:cc.Prefab,
        sendBtn:cc.Node,
        exbox:cc.Node,
        woodfish:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scrollview.on("scroll-to-bottom", this.scrollcallback, this);
        this.mes = "";  //留言内容
        this.more = 0;

        this.sendBtn.on("touchstart", this.sndMessage, this)
    },
    getmesage(hideLoading){
        if(!hideLoading){
            wx.showLoading({
                title:"加载中",
                mask: true
            })
        }
        
        let path = "/api/showcomment", gid = wx.getStorageSync("gid"), more = this.more, sessionId = wx.getStorageSync('sessionId');
        let data = {
            gid:gid,
            more:more
        }
        post(path, data, sessionId).then(result => {
        if (result.data.code == 200) {
                wx.hideLoading();
                let mesList = result.data.data.group_comment_list;
                for(let i=0; i<mesList.length; i++){
                    let item = cc.instantiate(this.mesPrefab);
                    item.parent = this.mesContent;
                    item.getComponent("mes-item").init(mesList[i]);
                }
                console.warn(mesList, "mesList");
            
                this.more += mesList.length;
                if(!!hideLoading){
                   let gid = wx.getStorageSync("gid");
                   this.woodfish.getComponent("woodfish-scene").getMyPlay(gid);
                }
            }
            else if(result.data.code == 403){
                wx.hideLoading();
                wx.showToast({
                    title:"没有更多的内容了",
                    icon:"none",
                    duration:2000,
                    mask:true
                })
            }
        })
    },
    scrollcallback: function () {
        this.getmesage();
    },
    beginmes(){
        this.mes = "";
    },
    endmes(text, editbox, customEventData){
        this.mes = text.string;
    },
    //发送留言
    sndMessage(){
        if (this.mes == "") {
            wx.showModal({
              title: '提示',
              content: '留言不能为空',
              showCancel: false,
            })
            return;
          }
          wx.showLoading({
            title: '留言发送中',
            mask:true
          })
          let path = "/api/addcomment", sessionId = wx.getStorageSync('sessionId'), gid = wx.getStorageSync("gid");
          let data = {
            gid:gid,
            comment:this.mes
          }
          post( path, data, sessionId).then(result => {
            if (result.data.code == 200) {
                this.exbox.getComponent(cc.EditBox).string = this.mes = "";
                this.more = 0;
                this.mesContent.removeAllChildren();
                this.getmesage(true);
            }
            else{
              wx.hideLoading();
              wx.showModal({
                content: '留言失败',
                showCancel:false
              })
            }
          })
    }
    // update (dt) {},
});
