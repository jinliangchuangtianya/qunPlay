

cc.Class({
    extends: cc.Component,

    properties: {
        avatarUrl:cc.Sprite,
        title:cc.Label,
        content:cc.Label,
        time:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init(opt) {
       
        if(!!opt.avatar){
            cc.loader.load({
                url:  opt.avatar,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.avatarUrl.spriteFrame = new cc.SpriteFrame(texture);
            });
        }

        this.title.string = opt.nickname;
       
        this.content.string = "最新惩罚" + opt.contract;
        this.time.string = opt.start_time
    },

    // update (dt) {},
});
