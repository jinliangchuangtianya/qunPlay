
cc.Class({
    extends: cc.Component,

    properties: {
        title:cc.Label,
        bg:{
            default:[],
            type:cc.SpriteFrame
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },

    init (opt, index) {
        this.node.on('touchstart', this.select, this);
        this.title.string = opt.title;
        this.node.currentindex = index;
        this.node.isSclect = false;
        this.node.opt = opt;
    },
    select(){
        if(this.node.isSclect) return;
        let battscene  = cc.find("Canvas").getComponent('finger-battscene');
        this.node.getComponent(cc.Sprite).spriteFrame = this.bg[1];
        this.node.isSclect = true; 
        battscene.changeSclect(this.node.currentindex);
    },
    removeSlect(){
        this.node.getComponent(cc.Sprite).spriteFrame = this.bg[0];
    }

    // update (dt) {},
});
