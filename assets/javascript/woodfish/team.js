
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart", function(){
            cc.director.loadScene("group-info")
        })
    },

    start () {

    },

    // update (dt) {},
});
