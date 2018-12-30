let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        woodfish:cc.Node,
        topGroupImg:cc.Sprite,
        topGroupName:cc.Label,
        topGroupUserImg:cc.Sprite,
        topGroupUserName:cc.Label,
        itemPrefab:cc.Prefab,
        itemView:cc.Node,
        colsListBtn:cc.Node
    },

    onLoad () {
        this.node.width = cc.winSize.width;
        this.node.height = cc.winSize.height;
        this.node.y = cc.winSize.height;

        this.colsListBtn.on('touchstart', function(){
            this.hideView();
        },this);
    },
    showView () {
        wx.showLoading({
            title: '加载中',
            mask:true
          })
        this.itemView.removeAllChildren();  
        this.getList();
        
        let callFun = cc.callFunc(this.finished , this, false);
        let sequ = cc.sequence(cc.moveTo(0.3, 0, 0), callFun)
        this.node.runAction(sequ);
    },
    hideView (gid) {
        let action = cc.moveTo(0.1, 0,  this.node.height);
        let callFun = cc.callFunc(this.finished , this, true);
        let sequ = cc.sequence(action, callFun);
        
        if(!!gid){
            wx.showLoading({
                title:"加载中",
                mask:true
            })
            this.woodfish.active = true;
            this.woodfish.getComponent("woodfish-scene").init(gid);
            this.node.runAction(action);
        }
        else{
            this.node.runAction(sequ);
        }
       
    },
    getList(){
        let path = "/api/show",sessionId = wx.getStorageSync('sessionId');
        post(path, {}, sessionId).then(res => {
            wx.hideLoading();
            console.warn(res, 'resresres')
            if (res.data.code == 200) {  //有战队
            
             let data = res.data.data;
             let topGroup = data.topGroup;
             let topGroupUser = data.topGroupUser;
             let itemList = data.top100_groups_list
             this.loadAttr(topGroup.avatar, "topGroup") 
             this.loadAttr(topGroupUser.avatar, "topGroupUser")   
             
             this.topGroupName.string = (topGroup.name == ""?"未命名":topGroup.name);
             this.topGroupUserName.string = (topGroupUser.name == ""?"未命名":topGroupUser.name);
             for(let i=0; i<itemList.length; i++){
                let item = cc.instantiate(this.itemPrefab);
                item.parent = this.itemView;
                item.getComponent("rank-item").init(itemList[i], i+1);
             }
            }
            else{
                wx.hideLoading();
            }
          })
    },
    finished(target, active){
        if(active){
            this.woodfish.active = true;
        }
        else{
            this.woodfish.active = false;
        }
    },
    loadAttr(url, type){
        if(!!url){
            cc.loader.load({
                url:  url,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                if(type == "topGroup"){
                    this.topGroupImg.spriteFrame = new cc.SpriteFrame(texture);
                }
                else if(type == "topGroupUser"){
                    this.topGroupUserImg.spriteFrame = new cc.SpriteFrame(texture);
                }
                
            });
         }
    }

    // update (dt) {},
});
