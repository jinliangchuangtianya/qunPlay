
let config = require("./utils/config");
let wxRequest = require('./utils/wxRequest');
let common = require('./common/common');
let XMLHttpRequest = require('./utils/jxRequest');
let postRequest = wxRequest.postRequest;

cc.Class({
    extends: cc.Component,

    properties: {
        
       
    },
    onLoad () {
        let opt = wx.getLaunchOptionsSync();
        if(!!opt){    //第一次进入
            this.loginIn(opt)
        }
        wx.onShow(opt=>{  //第一次之后进入
            if(opt.query.share == "true"){
                this.loginIn(opt);
            }
        })
    },
    loginIn(opt){
        console.warn("opt", opt)
        let _this = this;
        wx.login({
            success: res => {
                postRequest(config.http + '/api/session',{
                    'code': res.code
                })
                .then(result=>{
                    if(result.data.code == 200){
                        wx.setStorageSync('sessionId', result.data.data.session);
                        if(!!opt.query.sceneto){
                            common.opt = opt;
                                cc.director.loadScene(opt.query.sceneto);
                            }
                            else{
                                cc.director.loadScene("index");
                        }
                    }
                    else{
                    wx.showModal({
                        title: '获取sessionId失败',
                        showCancel: false,
                        content: 'code=>'+result.data.code,
                    })
                    }
                })
                .catch(err=>{
                    wx.showModal({
                        title: '获取sessionId失败',
                        showCancel: false,
                        content: 'err=>'+err,
                    })
                })
            }
        })

    }
});
