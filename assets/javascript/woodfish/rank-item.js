

cc.Class({
    extends: cc.Component,

    properties: {
        zdname:cc.Label,
        count:cc.Label,
        rankImg:cc.Sprite,
        rankLabel:cc.Label,
        rankImgframe:{
            default:[],
            type:cc.SpriteFrame
        }
    },

    onLoad () {
        this.rankList = cc.find("Canvas/rankList");
    },

    init (opt, index) {
        this.gid = opt.gid;
        this.node.on("touchstart", this.changeTeam, this)
        if((index+1) == 1 || (index+1) == 2 || (index+1) == 3){
            this.rankImg.node.active = true;
            this.rankImg.spriteFrame = this.rankImgframe[index]
        }
        else{
            this.rankLabel.node = true;
            this.rankLabel.string = index+1
        }
        this.zdname.string = (opt.group_name == ""?"未命名":opt.group_name);
        this.count.string = opt.group_hit_count;
    },
    changeTeam(){
        this.rankList.getComponent("rankList").hideView(this.gid);
    }

    // update (dt) {},
});
