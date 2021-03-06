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
        back:cc.Node,
        zdBtn:cc.Node,
        jzdBtn:cc.Node,
        zzBtn:cc.Node,
        maskNode:cc.Node,
        b2:cc.Node,
        qxBtn:cc.Node,
        exitBox:cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isShar = false;
        wx.onShow(()=>{
            if(this.isShar){
                this.isShar = false;
                cc.director.loadScene("woodfish");
            }
        })

        this.zdName = "";
        wx.showLoading({
            title: '加载中',
            mask: true
        })

        wx.showShareMenu({
            withShareTicket: true
          })
        wx.onShareAppMessage((res)=>{
            let type = res.from;
            let gid = wx.getStorageSync('gid'),query = "share=true&sceneto=woodfish";
            if(!!gid){
                query += "&gid="+gid+"&isnumber=false";
            }
            return{
                title:"快来帮我敲两下！",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
                query:query
            }
        })

        this.back.on("touchstart", function(){
            common.opt.notLoad = true;
            cc.director.loadScene("woodfish")
        })
        this.changBtn.on("touchstart", function(){
            cc.director.loadScene("group-list")
        })

        this.zdBtn.on('touchstart', this.createSucc,this);
        this.qxBtn.on('touchstart', this.removeMask,this)

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
    getZdName(text, editbox, customEventData){
        this.zdName = text;
    },
    createSucc(){
       
        if(this.zdName.trim() == ''){
            wx.showToast({
                title:"名称不能为空",
                mask:true,
                icon:'none'
            })
            return;
        }
        this.createZd();
    },
    //创建战队
    createZd(){

        let _this = this;

        let path = '/api/create-group',sessionId = wx.getStorageSync('sessionId');

        post(path, {name:this.zdName}, sessionId).then(arg => {
            if (arg.data.code == 200) {
                this.removeMask();
                let gid = arg.data.data.id;
                wx.setStorageSync("gid", gid);
                this.isShar = true;
                wx.shareAppMessage({
                    title:"快来帮我敲两下！",
                    imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
                    query:"share=true&sceneto=woodfish&gid="+gid+"&isnumber=true",
                    success(res){
                        
                    }
                })
            }
        })
        
    },
    
    //请人助战
    zhuzhanFn(){
        let _this = this;
        let gid = wx.getStorageSync("gid");
        let query = "share=true&sceneto=woodfish&isnumber=fasle";
        if(!!gid){
            query += "&gid=" + gid;
        }
        wx.shareAppMessage({
            title:"快来帮我敲两下！",
            imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/muyu_share.png",
            query:query
        })
    },
    jzdHandle () {
        this.zzBtn.active = this.b2.active = false;
        this.maskNode.active = true;
        let spawn = cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1, 1));
        this.maskNode.runAction(spawn);
    },
    removeMask(){
        this.zzBtn.active = this.b2.active = true;
        this.maskNode.setScale(0);
        this.maskNode.opacity = 0;
        this.maskNode.active = false;
        this.zdName = "";
        this.exitBox.string = "";
    },
    // update (dt) {},
});
