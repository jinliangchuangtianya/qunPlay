

cc.Class({
    extends: cc.Component,

    properties: {
        mesGroup:cc.Node,
        rankingView:{
            type:cc.Component,
            default:null
        }
    },

    onLoad () {
        this.isRunaction = false;
        this.node.on("touchstart", this.moueUp,this)
    },
    moueUp(){
        if(this.isRunaction || this.rankingView.isRank) return;
         this.isRunaction = true;
        let up = cc.sequence(cc.moveBy(0.3, 0, this.mesGroup.height).easing(cc.easeIn(3.0)), cc.callFunc(()=>{
            this.isRunaction = false;
            if(this.mesGroup.getComponent("mesage").more == 0){
                this.mesGroup.getComponent("mesage").getmesage();
            }
        }));
        // 执行动作
        this.mesGroup.runAction(up)
    },
    moueDown(){
         if(this.isRunaction) return;
         this.isRunaction = true;
        let down = cc.sequence(cc.moveBy(0.1, 0, -this.mesGroup.height).easing(cc.easeOut(3.0)), cc.callFunc(()=>{
            this.isRunaction = false;
        }));
        // 执行动作
        this.mesGroup.runAction(down)
    },
    start () {

    },

    // update (dt) {},
});
