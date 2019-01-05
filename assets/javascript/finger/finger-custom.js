let common = require('../common/common');
let a = require('../utils/b');
let b = new a();
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
       btn:cc.Node,
       exitBox:cc.EditBox,
       prevBtn:cc.Node
    },

    onLoad () {
        wx.hideShareMenu();
        this.exitBox.fontColor = new cc.Color(51,51,51)
        this.title = '';
        this.type = 1;
        this.btn.on('touchstart', this.customItem, this);
        this.prevBtn.on('touchstart', function(){
            cc.director.loadScene('finger-battscene')
        }, this);
    },

    inputHandel(text, editbox, customEventData){
        this.title = text;
    },
    radioHandel(ev,type){
        this.type = type;
    },
    customItem(){
        if(this.title.trim() == ''){
            wx.showToast({
                title:"请输入惩罚内容",
                mask:true,
                icon:'none'
            })
            return;
        }
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        let path = "/api/addpunishment", sessionId = wx.getStorageSync('sessionId');
        let data = {
            title:b.encode(this.title),
            type:this.type
        } 
        post(path, data, sessionId)
        .then(res => {
            wx.hideLoading();
            wx.setStorageSync('currentCfitem', JSON.stringify({"title":this.title,"type":this.type}));
            cc.director.loadScene('finger-battscene');
        })
    }
    // update (dt) {},
});
