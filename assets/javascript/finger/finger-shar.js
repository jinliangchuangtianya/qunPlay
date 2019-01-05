

cc.Class({
    extends: cc.Component,

    properties: {
        aliginBtn:cc.Node,
        backIndexBtn:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.aliginBtn.on('touchstart', this.gotScene.bind(this, 'finger-battscene'));
        this.backIndexBtn.on('touchstart', this.gotScene.bind(this, 'index'));
    },

    gotScene(scene, ev) {
        cc.director.loadScene(scene)
    },

    // update (dt) {},
});
