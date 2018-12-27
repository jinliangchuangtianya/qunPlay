let common = require('../common/common');

cc.Class({
    extends: cc.Component,

    properties: {
       sort:cc.Label,
       musicName:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init (opt, index, active) {
        this.sort.string =  index + ""
        this.musicName.string = opt.name;
        this.id = opt.id;
        this.link = opt.link;
        
        this.node.on('touchstart', this.changeMusic, this);
        if(active){
            this.changeMusic();
        }
    },
    changeMusic(bool){

        this.sort.node.color = this.musicName.node.color = new cc.Color(153, 170, 216);
        let currentMusic = wx.getStorageSync("currentMusic");
        if(!!currentMusic){
            let prevId = JSON.parse(currentMusic).id;
            let musiclist = cc.find("Canvas/musicList");
            if(bool === true){
               this.changeScelect();
            }
            else if(prevId != this.id){
                wx.setStorageSync("currentMusic", JSON.stringify({"id":this.id, "link":this.link}))
                this.changeScelect();
            }
            else{
                musiclist.getComponent("musicList").changeMusicIng = false;
            }
        }
        if(this.node.id == 11){
            common.woodfishType = 'gu'; 
        }
        else{
            common.woodfishType = 'muyu'; 
        }
    },
    changeScelect(){
        let musiclist = cc.find("Canvas/musicList");
        musiclist.getComponent("musicList").currentItem.getComponent("music-item").removeActive();
        musiclist.getComponent("musicList").currentItem = this.node;
        musiclist.getComponent("musicList").changeMusicIng = true;
        musiclist.getComponent("musicList").hideMusic();
    },
    removeActive(){
        console.warn(99999)
        this.sort.node.color = this.musicName.node.color = new cc.Color(255, 255, 255);
    }
    // update (dt) {},
});
