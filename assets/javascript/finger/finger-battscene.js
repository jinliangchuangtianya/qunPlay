let common = require('../common/common');
let a = require('../utils/b');
let b = new a();
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        goPrevBtn:cc.Node,
        jiandao:cc.Node,
        shitou:cc.Node,
        bu:cc.Node,
        jiandaoA:cc.SpriteFrame,
        jiandaoN:cc.SpriteFrame,
        shitouA:cc.SpriteFrame,
        shitouN:cc.SpriteFrame,
        buA:cc.SpriteFrame,
        buN:cc.SpriteFrame,
        pkBtn:cc.Node,
        checkedMusic:cc.AudioClip
    },
    onLoad () {

        wx.showLoading({
            title: '加载中',
            mask: true
        })

        this.getMesList();

        this.select = null;
        this.isShar = false;
        wx.onShow(()=>{
            if(this.isShar){
                this.isShar = false;
                cc.director.loadScene("finger-shar");
            }
        })

        this.goPrevBtn.on('touchstart', function(){
            cc.director.loadScene('finger-scene1');
        },this);
        
        this.jiandao.on('touchstart', this.selectZS.bind(this, {type:1,name:'jiandao'}));
        this.shitou.on('touchstart', this.selectZS.bind(this, {type:2,name:'shitou'}));
        this.bu.on('touchstart', this.selectZS.bind(this, {type:3,name:'bu'}));

        this.pkBtn.on('touchstart', this.sharPk, this)
    },
    //选择招式
    selectZS (arg, target) {
        if(!!this.select){
            if(arg.name == this.select.name) return;
        }
        switch (arg.type) {
            case 1:
                this.jiandao.getComponent(cc.Sprite).spriteFrame = this.jiandaoA;
                break;
            case 2:
                this.shitou.getComponent(cc.Sprite).spriteFrame = this.shitouA;
                break;
            case 3:
                this.bu.getComponent(cc.Sprite).spriteFrame = this.buA;
                break;
        }
        cc.audioEngine.playEffect(this.checkedMusic);
        if(!!this.select){
            this[this.select.name].getComponent(cc.Sprite).spriteFrame = this[this.select.name + 'N'];
        }
        this.select = arg;
    },
    //获取惩罚列表信息
    getMesList(){
        let path = "/api/battlelist", sessionId = wx.getStorageSync('sessionId');
            post( path, {}, sessionId)
                .then(res=>{
                    wx.hideLoading();
                    if(res.data.code == 200){
                        let selfInfo = res.data.selfInfo;
                        let list = res.data.data;
                                        
                        for (let i = 0; i < list.length; i++) {
                            let str = b.decode(list[i].contract);
                            list[i].contract = str;
                            let item = cc.instantiate(this.battItem);
                            item.parent = this.scorllConent;
                            item.getComponent('batt-item').init(list[i]);
                        }
                        this.usercx.string = selfInfo.integrity + "%";
                        this.userNickname.string = selfInfo.nickname;
                        cc.loader.load({
                            url:  selfInfo.avatar,
                            type: 'png'
                        }, (err, texture) => {
                            if (err) console.error(err);
                            this.useravatarUrl.spriteFrame = new cc.SpriteFrame(texture);
                        });
                    }
                    else if (res.data.code == 601){
                        wx.showModal({
                        title: '',
                        content: '请登录',
                        showCancel:false,
                        success(res) {
                            
                        }
                    })
                }
                       
            })
    },
    //找人PK
    sharPk(){
        if(!!this.select){
            let _this = this;
            let pkid = wx.getStorageSync('sessionId') + new Date().getTime();
            this.isShar = true;
            wx.shareAppMessage({
                title:"石头剪刀布，一把定胜负",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share_finger_zq.png",
                query:"share=true&sceneto=finger-pk&pkid="+pkid,
                success(res){
                   
                }
            })
        }
        else{
            wx.showModal({
                title: '提示',
                content: '选择招式后才可以发起PK',
                showCancel:false
            })
        }
    }
    // update (dt) {},
});
