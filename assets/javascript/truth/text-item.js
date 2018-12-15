

cc.Class({
    extends: cc.Component,

    properties: {
        richText:cc.RichText
    },

    // onLoad () {},

    init (contnet) {
        this.richText.getComponent(cc.RichText).string = "<b><color=#666666 >"+contnet+"</color></b>";
    }

    // update (dt) {},
});
