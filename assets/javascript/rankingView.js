cc.Class({
    extends: cc.Component,
    name: "RankingView",
    properties: {
        rankingScrollView: cc.Sprite,//显示排行榜
        bg:cc.Node
    },
    start() {
        let windowSize= cc.view.getVisibleSize();
        this.iy = parseInt(windowSize.height)/2 + this.node.height/2;
        this.node.y = this.iy
        this.timer = this.getTimer = null;
        this.isRank = this.isOpen =  false;
        this._show = cc.sequence(cc.moveTo(0.5, 0, 68).easing(cc.easeIn(0.5)), cc.callFunc(function(){
            wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        }, this));
        this._hide = cc.sequence(cc.moveTo(0.3, 0, this.iy).easing(cc.easeOut(0.5)), cc.callFunc(function(){
            this.isOpen = false;
            wx.postMessage({
                messageType: 0,
            });
        }, this));

        this._prevshow = cc.sequence(cc.moveTo(0.5, 0, this.iy - 150).easing(cc.easeIn(0.5)), cc.callFunc(function(){
            clearTimeout( this.timer );
            this.timer = setTimeout(()=>{
                this.node.runAction(this._prevhide);
            },2000)
        }, this));
        this._prevhide = cc.sequence(cc.moveTo(0.3, 0, this.iy).easing(cc.easeOut(0.5)), cc.callFunc(function(){

        }, this));

        wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
        this.tex = new cc.Texture2D();

        this.getprevInfo();
    },
    //动画
    friendButtonFunc(ev,opt) {
        if(opt == "open" && !this.isRank){
            clearTimeout( this.timer );
            clearInterval(this.getTimer);
            this.getTimer = null;
            this.node.stopAllActions()
            this.node.y = this.iy;
            wx.postMessage({
                messageType: 0,
                MAIN_MENU_NUM: "x1",
            });
           
            this.bg.active = true;
            this.isRank = this.isOpen = true;
            this.node.runAction(this._show);
        }
        else if(opt == "close"){
            this.isRank = false;
            this.node.runAction(this._hide);
        }
    },
      //提交分数到子域
    submitScoreButtonFunc(score){
        wx.postMessage({
            messageType: 3,
            MAIN_MENU_NUM: "x1",
            score: score,
        });
    },
    // 刷新开放数据域的纹理
    _updateSubDomainCanvas () {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
    },
    getprevInfo(){
        this.bg.active = false;
        wx.postMessage({
            messageType: 4,
            MAIN_MENU_NUM: "x1",
        });
        this.node.runAction(this._prevshow);
    },
    starteInter(){
        this.getprevInfo();
        this.getTimer = setInterval(()=>{
            this.getprevInfo();
        },5000)
    },
    update () {
        //this._updateSubDomainCanvas();
    },
    onDestroy(){
        clearTimeout(  this.getTimer );
        clearTimeout( this.timer );
        this.node.stopAllActions();
        this.node.y = this.iy;
    }
});
