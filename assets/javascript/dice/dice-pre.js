

cc.Class({
    extends: cc.Component,

    properties: {
        diceImg:{
            default:[],
            type:cc.SpriteFrame
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
  
    },

    init (target, frame) {
        this.node.opacity = 0;
        this.node.x = cc.winSize.width + this.node.width;
        this.node.y = cc.winSize.height/2;
        this.node.setRotation(0);
        this.node.getComponent(cc.Sprite).spriteFrame = this.diceImg[frame];
        this.moveDice(target, frame)
 
       
    },
    moveDice(target, frame){
        this.node.opacity = 255;
        let spawn = cc.spawn(cc.rotateTo(0.5,target.rotate, target.rotate), cc.moveTo(0.5, target.left, target.top));
        this.node.runAction(spawn)
    }

    // update (dt) {},
});
