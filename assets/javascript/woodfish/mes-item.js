
cc.Class({
    extends: cc.Component,

    properties: {
      attrurl:cc.Sprite,
      nickname:cc.Label,
      content:cc.Label,
      time:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init(opt){
        if(!!opt.avatar){
            cc.loader.load({
                url:  opt.avatar,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.attrurl.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        let nickname = this.substr(opt.nickname);
        this.nickname.string = (!!nickname ? nickname : "未登录");
        this.content.string = this.substr(opt.comment);
        this.time.string = opt.time;
    },
    substr(str){
        if(str.length > 20){
            return  str.substring(0, 20) + "..."
         }
        return str;
    }

    // update (dt) {},
});
