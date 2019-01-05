

cc.Class({
    extends: cc.Component,

    properties: {
        diceFrame:{
            default:[],
            type:cc.SpriteFrame,
            
        },
        avatarUrl:cc.Sprite,
        openPlay:cc.Node,
        isStartIng:cc.Node
    },

    // onLoad () {},

    init (opt,dices) {
        let deceArr =  dices.number;
        cc.loader.load({
            url:  opt.headhash,
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            this.avatarUrl.spriteFrame = new cc.SpriteFrame(texture);
        });
        let dicesNode = this.node.getChildByName('dices');
        if(this.node.openid != wx.getStorageSync('openId')){
            dicesNode.opacity = 0;
        }
        let diceNode = dicesNode.children;
        for(let i=0; i<deceArr.length; i++){
            diceNode[i].getComponent(cc.Sprite).spriteFrame = this.diceFrame[deceArr[i]];
        }
    },

    // update (dt) {},
});
