let common = require('../common/common');

cc.Class({
    extends: cc.Component,

    properties: {
       nickname:cc.Label,
       avatarurl:cc.Sprite,
       fz:cc.Node,
       zb:cc.Node,
       wzb:cc.Node
    },

    // onLoad () {},

    init (opt) {
        this.nickname.string = this.substr(opt.nickname);
        cc.loader.load({
            url:  opt.avatarurl,
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            this.avatarurl.spriteFrame = new cc.SpriteFrame(texture);
        });
    },
    substr(str){
        if(str.length >=7){
            return (str.substring(0,7) + '...')
        }
        else{
            return str;
        }
    }
    // update (dt) {},
});
