

cc.Class({
    extends: cc.Component,

    properties: {
       url:cc.Sprite,
       nickName:cc.Label,
       count:cc.Label,
       zz:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    init (opt) {
        if(opt.avatar != "" ){
            cc.loader.load({
                url:  opt.avatar,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.url.spriteFrame = new cc.SpriteFrame(texture);
            });
            this.nickName.string = opt.nickname;
        }
        else{
            this.nickName.string = "未登录"
        }
        this.count.string = opt.member_hit_count
        if(opt.role == 'guest'){
            this.zz.active = true;
        }
       
    },

    // update (dt) {},
});
