

cc.Class({
    extends: cc.Component,

    properties: {
       url:cc.Sprite,
       title:cc.Label,
       rank:cc.Label,
       current:cc.Node,
       btn:cc.Node
    },

    init (opt) {
        this.gid = opt.gid;
        if(opt.group_icon != "" ){
            cc.loader.load({
                url:  opt.group_icon,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.url.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        this.title.string = (opt.group_name == "" ? "未命名" : opt.group_name);
        this.rank.string = (opt.group_rank ? "排名 " + opt.group_rank : "排名 未上榜")
        let gid = wx.getStorageSync('gid');
        if(gid == opt.gid){
            this.current.active = true;
        }
        else{
            this.btn.active = true
        }
    },
    change(){
        wx.setStorageSync("gid", this.gid)
        cc.director.loadScene("woodfish")
    },
    start () {

    },

    // update (dt) {},
});
