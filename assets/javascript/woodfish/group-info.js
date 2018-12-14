let common = require('../common/common');
let config = require("../utils/config");
let wxApi = require('../utils/wxApi');
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        exbox:cc.Node,
        text:cc.Node,
        userInfo:cc.Prefab,
        count:cc.Label,
        total:cc.Label,
        rank:cc.Label,
        conent:cc.Node,
        changBtn:cc.Node,
        back:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        wx.showLoading({
            title: '加载中',
            mask: true
        })
        this.back.on("touchstart", function(){
            common.opt.notLoad = true;
            cc.director.loadScene("woodfish")
        })
        this.changBtn.on("touchstart", function(){
            cc.director.loadScene("group-list")
        })

        console.warn(common.opt.groupInfo, "info修改权限")

        if( common.opt.groupInfo.role == 'guest'){
            this.exbox.active = false;
            this.text.active = true;
            this.text.getChildByName("label").getComponent(cc.Label).string = (common.opt.groupInfo.group_name == "" ? "未命名" : common.opt.groupInfo.group_name)
         }
         else if(common.opt.groupInfo.role == 'member'){
            this.exbox.active = true;
            this.text.active = false;
            this.exbox.getComponent(cc.EditBox).string = (common.opt.groupInfo.group_name == "" ? "未命名" : common.opt.groupInfo.group_name)
         }

        this.getUsrtList();
    },
    getUsrtList(){
        let path = '/api/playgroup', sessionId = wx.getStorageSync('sessionId');
        let data = {
            gid:wx.getStorageSync("gid")
        }
        post(path, data, sessionId).then(res => {
            wx.hideLoading();
            this.count.string = res.data.data.mixdata.group_today_player_num;
            this.total.string = res.data.data.mixdata.group_hit_count;
            this.rank.string  = (!res.data.data.mixdata.group_rank ? "未上榜" : res.data.data.mixdata.group_rank)
            let group_member_list = res.data.data.group_member_list;
            if (group_member_list.length){
                for(let i=0; i< group_member_list.length; i++){
                    let item = cc.instantiate(this.userInfo);
                    item.parent = this.conent;
                    item.getComponent('userInfo').init(group_member_list[i]);
                }
            }

        })
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
                                console.warn(arg, 77777777777777777777777)
                                if (arg.data.code == 200) {
                                //创建成功后重置页面
                                wx.setStorageSync("gid", arg.data.data.id);
                                cc.director.loadScene("woodfish");
                                }
                            })
                        }
                    })
                }
            }
        })
    },
    //请人助战
    zhuzhanFn(){
        let _this = this;
        let gid = wx.getStorageSync("gid");
        let query = "share=true&sceneto=woodfish";
        if(!!gid){
            query += "&gid=" + gid;
        }
        wx.shareAppMessage({
            title:"快来帮我敲两下！",
            imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
            query:query
        })
    },
    start () {

    },

    // update (dt) {},
});
