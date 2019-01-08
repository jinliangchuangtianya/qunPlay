
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        avatarUrl:cc.Sprite,
        title:cc.Label,
        content:cc.Label,
        time:cc.Label,
        cxlabel:cc.Label,
        count:cc.Node,
        removeBtn:cc.Node,
        bg:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg.on('touchstart', this.touchstart, this)
        this.bg.on('touchmove', this.touchmove, this)
        this.bg.on('touchend', this.showModel, this)
        this.removeBtn.on('touchstart', this.removeInfo, this);
       
    },

    init(opt) {
        this.startPoint = 0;
        this.endPoint = 0;
        this.currnetX = this.inowX = 0;

        this.opponent_id = opt.opponent_id;


        this.isClick = true;
        this.isRemove = false;
        this.pkid = opt.pkid;
        if(!!opt.avatar){
            cc.loader.load({
                url:  opt.avatar,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.avatarUrl.spriteFrame = new cc.SpriteFrame(texture);
            });
        }

        if(opt.nickname.length>5){
            opt.nickname = opt.nickname.substring(0, 5) + '...';
        }
        this.title.string = opt.nickname;
        this.cxlabel.string = opt.integrity + '%';

        if(opt.new_counts > 0){
            this.count.active = true;
            this.count.getChildByName('count').getComponent(cc.Label).string = opt.new_counts;
        }
       
        this.content.string = "最新惩罚" + opt.contract;
        this.time.string = opt.start_time;

        
    },
    showModel(e){
        if(this.isClick){
            let fingerScene = cc.find("Canvas").getComponent('finger-scene1');
            fingerScene.showModel(this.pkid);
        }
        else{
            let targer = 0,time=0;
            if(this.node.x < -75){
                targer = -130;
            }
            else{
                targer = 0;
            }
            
            if(this.node.x!=0 || this.node.x!=-130){
                if(Math.abs(this.node.x) == 75 ){
                    time = 0.5;
                }
                else if(Math.abs(this.node.x) > 75){
                    time = (75 - (Math.abs(this.node.x) - 75))/150
                }
                else{
                    time = Math.abs(this.node.x)/150
                }
                let action = cc.moveTo(time, targer);
                this.node.runAction(action);
            }
            
        }
       
    },
    touchstart(e){
        this.isClick = true;
        this.currnetX = this.node.x;
        this.startPoint = e.getLocationX();
        console.warn(e.getLocationX(), 'start')
    },
    touchmove(e){
        this.isClick = false;
        let movex = e.getLocationX() -  this.startPoint;
        let inowX = this.currnetX + movex;
        console.warn('move')
        if(inowX < -130){
            inowX = -130;
        }
        else if(inowX > 0){
            inowX = 0;
        }
        this.node.x = inowX;
    },
    removeInfo(){
        this.isClick = false;
        wx.showLoading({
            title:'删除中',
            mask:true
        })
        let path = "/api/deletebattle",sessionId = wx.getStorageSync('sessionId');

        let data = {
            opponent_id: this.opponent_id
        }

        post(path, data, sessionId).
        then(result=>{
            wx.hideLoading();
          if (result.data.code == 200){
             this.node.destroy();
          }
        })
    }
   
    // update (dt) {},
});
