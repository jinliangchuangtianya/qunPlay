let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        wordsView:cc.Node,
        riskView:cc.Node,
        textItem:cc.Prefab,
        runBtn:cc.Node,
        music:cc.AudioClip,
        runBtnframe:{
            default:[],
            type:cc.SpriteFrame
        },
        exitBtn:cc.Node
        
    },

   

    onLoad () {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.showShareMenu({
            withShareTicket: true
            })
        wx.onShareAppMessage((res)=>{
            let query = "share=true&sceneto=truth";
            return{
                title:"你选真心话还是大冒险",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/zxh-share-pic.png",
                query:query
            }
        })

        this.exitBtn.on('touchstart', function(){
            cc.director.loadScene('index');
        },this)

        this.words = [];
        this.risk = [];
        this.wordsPreArr = [];
        this.riskPreArr = [];
        this.isPlaying = false;
        this.runBtn.on("touchstart", this.randomArr, this);
        let path = '/api/getbigrisklist',sessionId = wx.getStorageSync('sessionId');
        post(path, {}, sessionId ).then(result => {
            if (result.data.code == 200) {
              let data = result.data.data;
              this.words = data.zxh;
              this.risk = data.dmx;
              this.init();
            }
            else {
                wx.showModal({
                    title: '提示',
                    content: '网络异常',
                    showCancel:fasle,
                    success(res) {
                        cc.director.loadScene("index");
                    }
                })
            }
          })
    },
    init(){
        //随机排序方法
        Array.prototype.shuffle = function () {
            let m = this.length, i;
            while (m) {
                i = (Math.random() * m--) >>> 0;
                [this[m], this[i]] = [this[i], this[m]]
            }
            return this;
        }
        for(let i=0; i<this.words.length; i++){
 
            let item = cc.instantiate(this.textItem);
            this.wordsPreArr.push(item);
            item.parent = this.wordsView;
            
            item.getComponent("text-item").init(this.words[i].content);
            item.y = i * (-item.height);
        }
  
        this.wordsView.height = this.wordsPreArr[0].height * this.words.length;
        for(let i=0; i<this.risk.length; i++){
            let item = cc.instantiate(this.textItem);
            this.riskPreArr.push(item);
            item.parent = this.riskView;
           
            item.getComponent("text-item").init(this.risk[i].content);
            item.y = i * (-item.height);
        }
        this.riskView.height = this.riskPreArr[0].height * this.risk.length;
        wx.hideLoading();  
    },
    randomArr() {
        if( this.isPlaying ) return;
        this.isPlaying = true;
        this.runBtn.getComponent(cc.Sprite).spriteFrame = this.runBtnframe[1];
        this.wordsPreArr = this.wordsPreArr.shuffle();
        this.riskPreArr =  this.riskPreArr.shuffle();
        this.wordsView.y =  this.riskView.y = 0;

        for(let i=0; i<this.wordsPreArr.length; i++){
           this.wordsPreArr[i].y = i*(-this.wordsPreArr[0].height);
        }
        
        for(let i=0; i<this.riskPreArr.length; i++){
            this.riskPreArr[i].y = i*(-this.riskPreArr[0].height);;
        }
        this.playIng()
    },
    playIng(){
        cc.audioEngine.playEffect(this.music, false);

        let wh = this.wordsView.height;
        let rh = this.riskView.height;
        let iH = this.wordsPreArr[0].height;

        let callFun = cc.callFunc(()=>{
            this.isPlaying = false;
            this.runBtn.getComponent(cc.Sprite).spriteFrame = this.runBtnframe[0];
        },this)
        let waction = cc.moveTo(4, 0, wh - iH).easing(cc.easeOut(2.0));
        let raction = cc.sequence(cc.moveTo(4.5, 0, rh - iH).easing(cc.easeOut(2.0)), callFun);

        this.wordsView.runAction(waction);
        this.riskView.runAction(raction);

    },
    onDestroy:function(){
        cc.audioEngine.stopAll();
    }
});
