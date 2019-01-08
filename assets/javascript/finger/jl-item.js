let common = require('../common/common');
let a = require('../utils/b');
let b = new a();
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;
cc.Class({
    extends: cc.Component,

    properties: {
        self:cc.Sprite,
        other:cc.Sprite,
        title:cc.Label,
        count:cc.Node,
        self_jiandaoX:cc.SpriteFrame,
        self_shitouX:cc.SpriteFrame,
        self_buX:cc.SpriteFrame,
        self_jiandao:cc.SpriteFrame,
        self_shitou:cc.SpriteFrame,
        self_bu:cc.SpriteFrame,
        other_jiandaoX:cc.SpriteFrame,
        other_shitouX:cc.SpriteFrame,
        otherr_buX:cc.SpriteFrame,
        other_jiandao:cc.SpriteFrame,
        other_shitou:cc.SpriteFrame,
        other_bu:cc.SpriteFrame,
        bg:cc.Node,
        removeBtn:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg.on('touchstart', this.touchstart, this)
        this.bg.on('touchmove', this.touchmove, this)
        this.bg.on('touchend', this.showModel, this)
        this.removeBtn.on('touchstart', this.removeInfo, this);
    },

    init (opt) {

        this.startPoint = 0;
        this.endPoint = 0;
        this.currnetX = this.inowX = 0;

        this.opponent_id = opt.opponent_id;


        this.isRemove = false;

        this.isClick = true
        this.pkid = opt.pkid;
        this.punishment_type = opt.punishment_type;
        this.contract = b.decode(opt.contract);

        this.title.string = b.decode(opt.contract);
        this.self.spriteFrame = this['self_'+opt.self];
        this.other.spriteFrame = this['other_'+opt.opponent];

        if(opt.is_read == 0){
            this.count.active = true;
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
    showModel(){
        if(this.isClick){
            wx.showLoading({
                title:'加载中',
                mask:true
            })
            common.opt.query = {
                pkid:this.pkid,
                contract:this.contract,
                batype:this.punishment_type
            }
            cc.director.loadScene('finger-pk');
        }
    },
    removeInfo(){
        this.isClick = false;
        wx.showLoading({
            title:'删除中',
            mask:true
        })
        let path = "/api/deleterecord",sessionId = wx.getStorageSync('sessionId');

        let data = {
            pkid: this.pkid
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
