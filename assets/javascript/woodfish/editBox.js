let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
    end(text, editbox, customEventData){
        let _this = this;
        let path = "/api/renamegroup", sessionId = wx.getStorageSync('sessionId'), gid = wx.getStorageSync('gid');
        let data = {
            gid,
            name:text.string
        }
        post(path, data, sessionId).then(result => {
          if (result.data.code == 200) {
             console.warn(200)
          }
          else if(result.data.code == 403){
            wx.showModal({
                title: '提示',
                content: '你无权修改名称',
                showCancel:false,
                success(){
                    _this.node.getComponent(cc.EditBox).string = (common.opt.groupInfo.group_name == "" ? "未命名" : common.opt.groupInfo.group_name);
                }
            })
          }
        }).catch(err=>{
            console.warn(err, "err= /api/renamegroup")
        })
    }
    // update (dt) {},
});
