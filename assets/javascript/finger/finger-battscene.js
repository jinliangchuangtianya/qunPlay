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
        checkedMusic:cc.AudioClip,
        cfitem:cc.Prefab,
        view:cc.Node,
        model:cc.Node,
        scene:cc.Node,
        sclectCfBtn:cc.Node,
        moreBtn:cc.Node,
        tips:cc.Label,
        zdyBtn:cc.Node
    },
    onLoad () {
        wx.hideShareMenu();
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        this.pkid = '';
        this.cfItmesArr = [];
        this.cfItmeSelectIndex = this.sclectCurrentIndex =  0;
        this.getPunishList();

        this.select = null;
        this.isShar = false;
        wx.onShow(()=>{
            if(this.isShar){
                this.isShar = false;
                wx.showLoading({
                    title:'加载中',
                    mask:true
                })
                this.startpk();
                //cc.director.loadScene("finger-shar");
            }
        })

        this.sclectCfBtn.on('touchstart', this.changeCfSceleItem, this);

        this.goPrevBtn.on('touchstart', function(){
            cc.director.loadScene('finger-scene1');
        },this);
        
        this.jiandao.on('touchstart', this.selectZS.bind(this, {type:1,name:'jiandao'}));
        this.shitou.on('touchstart', this.selectZS.bind(this, {type:2,name:'shitou'}));
        this.bu.on('touchstart', this.selectZS.bind(this, {type:3,name:'bu'}));

        this.pkBtn.on('touchstart', this.sharPk, this);

        this.moreBtn.on('touchstart', this.showList, this);

        this.zdyBtn.on('touchstart', function(){
            cc.director.loadScene('finger-custom')
        },this)
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
    //获取惩罚列表内容
    getPunishList(){
        let path = "/api/getpunishmentlist",sessionId = wx.getStorageSync('sessionId')
        post(path, {}, sessionId).
        then(res=>{
            wx.hideLoading();
            if(res.data.code == 200){
                let list = res.data.data.map(item=>{
                    item.title = b.decode(item.title)
                    return item;
                });
                for(let i=0; i<list.length; i++){
                    //暂时关闭木鱼
                    console.warn(list[i], 'list')
                    if(list[i].type == 4){
                        continue;
                    }


                    let item = cc.instantiate(this.cfitem);
                    this.cfItmesArr.push(item);
                    item.parent = this.view;
                    item.getComponent('cf-item').init(list[i], i);
                }
                console.warn(list);
                let currentCfitem = wx.getStorageSync('currentCfitem');
                if(!currentCfitem){

                    // wx.setStorageSync('currentCfitem', JSON.stringify(list[0]));
                    // this.tips.string = list[0].title;
                    
                    //暂时关闭木鱼
                    wx.setStorageSync('currentCfitem', JSON.stringify(list[1]));
                    this.tips.string = list[1].title;
                }
                else{
                    this.tips.string = JSON.parse(currentCfitem).title;
                }

            }
            else{
                wx.showModal({
                    content: res.data.code,
                    showCancel:false,
                })
            }
        })

    },
    //选择惩罚
    changeSclect(index){
        if(index == this.cfItmeSelectIndex) return;
        this.cfItmesArr[this.cfItmeSelectIndex].isSclect = false;
        this.cfItmesArr[this.cfItmeSelectIndex].getComponent('cf-item').removeSlect();
        this.cfItmeSelectIndex = index;
    },
    //确定选中惩罚
    changeCfSceleItem(){
        this.sclectCurrentIndex = this.cfItmeSelectIndex;

        let spawn = cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 0, 0));
        let finished = cc.callFunc(function(){
            this.scene.active = true;
            this.model.active = false;
        }, this);
        let seq = cc.sequence(spawn, finished);
        this.model.runAction(seq);
        this.tips.string = this.cfItmesArr[this.sclectCurrentIndex].opt.title;
        wx.setStorageSync('currentCfitem', JSON.stringify(this.cfItmesArr[this.sclectCurrentIndex].opt));
    },
    //显示惩罚列表
    showList(){
        this.model.active = true;
        let spawn = cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1, 1));
        let finished = cc.callFunc(function(){
            this.scene.active = false;
        }, this);
        let seq = cc.sequence(spawn, finished);
        this.model.runAction(seq);
    },
    //发送PKID
    startpk(){
        let path = "/api/startpk",currentCfitem = JSON.parse(wx.getStorageSync('currentCfitem')),sessionId = wx.getStorageSync('sessionId');

        let data = {
            choose:this.select.type,
            contract:b.encode(currentCfitem.title),
            punishment_type:currentCfitem.type,
            pkid:this.pkid
        }

        post(path, data, sessionId).
        then(result=>{
            wx.hideLoading();
          if (result.data.code == 200){
             cc.director.loadScene("finger-shar");
          }
        })
    },
    //找人PK
    sharPk(){
        if(!!this.select){
            let _this = this;
            let userInfo = wx.getStorageSync('userInfo');
            let currentCfitem = JSON.parse(wx.getStorageSync('currentCfitem'));
            this.pkid = wx.getStorageSync('sessionId') + new Date().getTime();
            this.isShar = true;
            wx.shareAppMessage({
                title:"打个赌，惩罚是：" + currentCfitem.title,
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share_finger_zq.png",
                query:"share=true&sceneto=finger-pk&pkid="+this.pkid+"&nickname="+JSON.parse(userInfo).nickName+"&avatarUrl="+JSON.parse(userInfo).avatarUrl+"&choose="+this.select.type+"&contract="+currentCfitem.title+'&batype='+currentCfitem.type,
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
