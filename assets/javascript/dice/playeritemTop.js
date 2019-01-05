

cc.Class({
    extends: cc.Component,

    properties: {
        mask:cc.Node,
        typeString:cc.Label
    },

   
    // onLoad () {},

    init(opt) {
        let _this = this;
        cc.loader.load({
            url:  opt.headhash,
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            this.node.getComponent(cc.Sprite).spriteFrame =  new cc.SpriteFrame(texture);
        });
        this.changeMask('tzIng')
    },
    changeMask(type){
        if(type == 'tzOver'){
            this.mask.color = new cc.Color(20,150,15);
            this.typeString.string = '投掷完毕'
        }
        else if(type == 'tzIng'){
            this.mask.color = new cc.Color(189,125,28);
            this.typeString.string = '投掷中'
        }
        else if(type == 'waitIng'){
            this.mask.color = new cc.Color(189,125,28);
            this.typeString.string = '未准备'
        }
        else if(type == 'zbIng'){
            this.mask.color = new cc.Color(20,150,15);
            this.typeString.string = '已准备'
        } //
    }

    // update (dt) {},
});
