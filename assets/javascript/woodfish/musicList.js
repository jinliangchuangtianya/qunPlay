let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;
cc.Class({
    extends: cc.Component,

    properties: {
        musicPre:cc.Prefab,
        musicView:cc.Node,
        woodfish:cc.Node,
        back:cc.Node,
        rankingView:{
            type:cc.Component,
            default:null
        }
    },
    onLoad () {
       this.changeMusicIng = false;
       this.back.on("touchstart", this.hideMusic, this);
    },
    showMusic(){
        if( this.rankingView.isRank ) return;
        if(!common.opt.showMusic){
            wx.showLoading({
                title: '加载中',
                mask: true
              })
            this.getMusicList()
        }
        let finished = cc.callFunc(this.nodeActive, this, false)
        let show = cc.sequence(cc.moveTo(0.3, 0, 0) , finished)
        this.node.runAction(show);
    },
    hideMusic(){
        let finished = cc.callFunc(this.nodeActive, this, true)
        let hide = cc.sequence(cc.moveTo(0.1, 640, 0) , finished)
        this.node.runAction(hide);
    },
    getMusicList(){
            let path = "/api/getMusicList",gid = wx.getStorageSync('gid'), sessionId = wx.getStorageSync('sessionId'), _this = this;
            gid = (!gid ? "88888" : gid);
            let data = {
                gid:gid
            }
            post( path, data, sessionId ).then(result => {
                wx.hideLoading();
                if (result.data.code == 200) {
                    common.opt.showMusic = true;
                    let list = result.data.data;
                    let currentMusic = wx.getStorageSync("currentMusic");
                    let id = 1;
                    let active = false;

                    if(!!currentMusic){
                        id = JSON.parse(currentMusic).id;
                    }
                    for(let i=0; i<list.length; i++){
                        let item = cc.instantiate(this.musicPre);
                        item.parent = this.musicView;

                        if(id == list[i].id){
                            _this.currentItem = item
                            active = true;
                        }
                        else{
                            active = false;
                        }
                        item.getComponent("music-item").init(list[i], i+1, active)
                    }
                }
        })
    },
    nodeActive(target, active){
        this.woodfish.active = active;
        if(active &&  this.changeMusicIng ){
            this.woodfish.getComponent("woodfish-scene").changeMusic();
        }
    },
    start () {

    },

    // update (dt) {},
});
