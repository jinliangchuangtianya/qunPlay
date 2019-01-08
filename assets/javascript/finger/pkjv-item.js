let a = require('../utils/b');
let b = new a();

cc.Class({
    extends: cc.Component,

    properties: {
        title:cc.Label,
        selfSprite:cc.Sprite,
        otherSprite:cc.Sprite,
        other_jiandao:cc.SpriteFrame,
        other_jiandaoX:cc.SpriteFrame,
        other_shitou:cc.SpriteFrame,
        other_shitouX:cc.SpriteFrame,
        other_bu:cc.SpriteFrame,
        other_buX:cc.SpriteFrame,
        self_jiandao:cc.SpriteFrame,
        self_jiandaoX:cc.SpriteFrame,
        self_shitou:cc.SpriteFrame,
        self_shitouX:cc.SpriteFrame,
        self_bu:cc.SpriteFrame,
        self_buX:cc.SpriteFrame
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init (opt) {
        this.title.string = b.decode(opt.contract);
        this.selfSprite.spriteFrame = this['self_'+opt.self];
        this.otherSprite.spriteFrame = this['other_'+opt.opponent];

    },
    
    // update (dt) {},
});
