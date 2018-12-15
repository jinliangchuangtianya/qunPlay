
let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;
cc.Class({
    extends: cc.Component,

    properties: {
        listItem:cc.Prefab,
        back:cc.Node
    },


    onLoad () {

        wx.hideShareMenu();

        wx.showLoading({
            title: '加载中',
            mask: true
        })
        if(!!common.opt.isJump){
            this.back.active = false;
        }
        this.back.on("touchstart",function(){
            cc.director.loadScene("group-info")
        })
        let path = '/api/mygroups', sessionId = wx.getStorageSync('sessionId');
        post(path,{},sessionId).then(res => {
        wx.hideLoading();
        console.warn(res, "list")
        let my_groups_list = res.data.data.my_groups_list;
            for(let i=0; i<my_groups_list.length; i++){
                let item = cc.instantiate(this.listItem);
                item.parent = this.node;
                item.getComponent("list-item").init(my_groups_list[i]);
            }
        })
    },

    start () {

    },

    // update (dt) {},
});
