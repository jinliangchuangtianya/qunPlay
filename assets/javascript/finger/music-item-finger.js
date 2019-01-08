let common = require('../common/common');

cc.Class({
    extends: cc.Component,

    properties: {
       sort:cc.Label,
       musicName:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init (opt, index) {
        this.sort.string =  index + ""
        this.musicName.string = opt.name;
        this.link = opt.link;
        this.id = opt.id;
        this.node.on('touchstart', this.changeMusic, this);
        if(opt.id == 1){
            this.sort.node.color = this.musicName.node.color = new cc.Color(153, 170, 216);
        }
    },
    changeMusic(bool){
        let scelectItem = cc.find("Canvas/musicList2").getComponent('musicList2').scelectItem;
        if(this.node == scelectItem){
            return;
        }

        scelectItem.getComponent('music-item-finger').removeActive();
        cc.find("Canvas/musicList2").getComponent('musicList2').scelectItem = this.node;
        cc.find("Canvas").getComponent('finger-muyu').changeMusic(this.link, this.id)
        this.sort.node.color = this.musicName.node.color = new cc.Color(153, 170, 216);
        cc.find("Canvas/musicList2").getComponent('musicList2').hideMusic();
    },
    removeActive(){
        this.sort.node.color = this.musicName.node.color = new cc.Color(255, 255, 255);
    }
    // update (dt) {},
});
