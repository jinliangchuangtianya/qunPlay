let common = require('../common/common');
let config = require("../utils/config");
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;
cc.Class({
    extends: cc.Component,

    properties: {
        back:cc.Node,
        musicPre:cc.Prefab,
        musicView:cc.Node,
        musicBtn:cc.Node,
        muyu:cc.Node
    },
    onLoad () {
       this.scelectItem = null;
       this.muslist = false;
       this.back.on("touchstart", this.hideMusic, this);
    },
    showMusic(){
        if(!this.muslist){
            wx.showLoading({
                title: '加载中',
                mask: true
              })
            this.getMusicList()
        }
        let finished = cc.callFunc(this.nodeActive, this, false)
        let show = cc.sequence(cc.moveTo(0.3, 0, this.node.y) , finished);
        this.node.runAction(show);
    },
    hideMusic(){
        let finished = cc.callFunc(this.nodeActive, this, true)
        let hide = cc.sequence(cc.moveTo(0.1, 750, this.node.y) , finished)
        this.node.runAction(hide);
    },
    
    getMusicList(){
            let path = "/api/getMusicList", sessionId = wx.getStorageSync('sessionId'), _this = this;
            let data = {
                gid:'88888'
            }
            post( path, data, sessionId ).then(result => {
                wx.hideLoading();
                console.warn(result, 123456)
                if (result.data.code == 200) {
                    this.muslist = true;
                    let list = result.data.data;
                    
                    for(let i=0; i<list.length; i++){
                        let item = cc.instantiate(this.musicPre);
                        item.parent = this.musicView;
                        if(list[i].id == 1){
                            this.scelectItem = item;
                        }
                        item.getComponent("music-item-finger").init(list[i], i+1)
                    }
                }
        })
    },
    nodeActive(target, active){
        if(active){
            this.musicBtn.resumeSystemEvents(true);
            this.muyu.resumeSystemEvents(true)
        }
        else{
            this.musicBtn.pauseSystemEvents(true);
            this.muyu.pauseSystemEvents(true)
        }
    },
    start () {

    },

    // update (dt) {},
});
