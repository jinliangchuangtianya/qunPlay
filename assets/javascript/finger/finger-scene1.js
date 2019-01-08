let common = require('../common/common');
let a = require('../utils/b');
let b = new a();
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
       useravatarUrl:cc.Sprite,
       userNickname:cc.Label,
       usercx:cc.Label,
       userInfo:cc.Node,
       scrollView:cc.Node,
       loginBnt:cc.Node,
       tip:cc.Node,
       battItem:cc.Prefab,
       scorllConent:cc.Node,
       battStartBtn:cc.Node,
       goIndexBtn:cc.Node,
       jlItem:cc.Prefab,
       selfScore:cc.Label,
       otherScore:cc.Label,
       selfAvatar:cc.Sprite,
       otherAtavar:cc.Sprite,
       selfName:cc.Label,
       otherName:cc.Label,
       conentView:cc.Node,
       banner:cc.Node,
       infoNode:cc.Node,
       model:cc.Node,
       goBtn2:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(window.wx){
            wx.showShareMenu({
                withShareTicket: true
              })
            wx.onShareAppMessage((res)=>{
                return{
                    title:"石头剪刀布，一把定胜负",
                    imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share_finger_zq.png",
                    query:"share=true&sceneto=finger-scene1"
                }
            })
            let userInfo = wx.getStorageSync("userInfo");
            if(!!userInfo){
                this.userInfo.active = this.scrollView.active = true;
                this.getUserInfo()
            }
            else{
                this.userInfo.active = this.scrollView.active = false;
                this.tip.active = true;
                this.createAuthorizeBtn();
            }
            
        }
        this.goIndexBtn.on('touchstart', function(){
            cc.director.loadScene('index');
        },this)
        this.battStartBtn.on('touchstart', this.goBattScene, this);
        this.goBtn2.on('touchstart', this.hideModel, this);
    },
    //获取用户相关信息
    getUserInfo(){
        if(window.wx){
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            let path = "/api/battlelist", sessionId = wx.getStorageSync('sessionId');
            post( path, {}, sessionId)
                .then(res=>{
                    wx.hideLoading();
                    if(res.data.code == 200){
                        console.warn(res, 'aaaaaaaaaaaaaa')
                        let selfInfo = res.data.selfInfo;
                        let list = res.data.data;
                                        
                        for (let i = 0; i < list.length; i++) {
                            let str = b.decode(list[i].contract);
                            list[i].contract = str;
                            let item = cc.instantiate(this.battItem);
                            item.parent = this.scorllConent;
                            item.getComponent('batt-item').init(list[i]);
                        }
                        this.usercx.string = selfInfo.integrity + "%";
                        this.userNickname.string = selfInfo.nickname;
                        cc.loader.load({
                            url:  selfInfo.avatar,
                            type: 'png'
                        }, (err, texture) => {
                            if (err) console.error(err);
                            this.useravatarUrl.spriteFrame = new cc.SpriteFrame(texture);
                        });
                    }
                    else if (res.data.code == 601){
                        wx.showModal({
                        title: '',
                        content: '请登录',
                        showCancel:false,
                        success(res) {
                            
                        }
                    })
                }
                       
            })
        }
        
    },
    //跳转发起对战场景
    goBattScene(){
        let userInfo = wx.getStorageSync('userInfo');
        if(!!userInfo){
            cc.director.loadScene('finger-battscene')
        }
        else{
            wx.showModal({
                title:"提示",
                content:"登录后才能参与，请点击登录按钮",
                showCancel:false,
                confirmText:"知道了"
            })
        }
    },
    createAuthorizeBtn() {
        let btnNode = this.loginBnt;
        let btnSize = cc.size(btnNode.width+10,btnNode.height+20);
        let frameSize = cc.view.getFrameSize();
        let winSize = cc.director.getWinSize();
        // console.log("winSize: ",winSize);
        // console.log("frameSize: ",frameSize);
        //适配不同机型来创建微信授权按钮
        let left = (winSize.width*0.5+btnNode.x-btnSize.width*0.5)/winSize.width*frameSize.width;
        let top = (winSize.height*0.5-btnNode.y-btnSize.height*0.5)/winSize.height*frameSize.height;
        let width = btnSize.width/winSize.width*frameSize.width;
        let height = btnSize.height/winSize.height*frameSize.height;
        // console.log("button pos: ",cc.v2(left,top));
        // console.log("button size: ",cc.size(width,height));

        let self = this;
        self.btnAuthorize = wx.createUserInfoButton({
            type: 'image',
            image:'https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/login3.png',
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
            }
        })
        self.btnAuthorize.onTap((uinfo) => {
            if (uinfo.userInfo) {
                let avatarUrl = uinfo.userInfo.avatarUrl, nickName = uinfo.userInfo.nickName
                wx.setStorageSync("userInfo", JSON.stringify({avatarUrl,nickName}));
                self.btnAuthorize.destroy();
                this.postSetuserinfo(nickName, avatarUrl);
            }
        });
    },
    /**"/api/setuserinfo" */
    postSetuserinfo(nickname, avatar){
        let data={
            nickname,
            avatar
        },sessionId = wx.getStorageSync("sessionId"),path = "/api/setuserinfo";
        post(path,data,sessionId).then(res=>{
            this.btnAuthorize.destroy();
            this.userInfo.active = this.scrollView.active = true;
            this.tip.active = false;
            this.getUserInfo();
        });
    },
    //显示记录列表
    showModel(pkid){
        wx.showLoading({
            title:'加载中',
            mask:false
        })
        let data={
            pkid,
        },sessionId = wx.getStorageSync("sessionId"),path = "/api/getbattledetail";
        post(path,data,sessionId).then(res=>{
           

            this.selfScore.string = res.data.selfWinCount;
            this.otherScore.string = res.data.oppoWinCount;

            cc.loader.load({
                url:  res.data.opponentInfo.avatar,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.otherAtavar.spriteFrame = new cc.SpriteFrame(texture);
            });
            cc.loader.load({
                url:  res.data.selfInfo.avatar,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.selfAvatar.spriteFrame = new cc.SpriteFrame(texture);
            });
            this.selfName.string = res.data.selfInfo.nickname;
            this.otherName.string = res.data.opponentInfo.nickname;

           
            for(let i=0; i<res.data.data.length; i++){
                let item = cc.instantiate(this.jlItem);
                item.parent = this.conentView;
                item.getComponent('jl-item').init(res.data.data[i]);
            }
           
            this.runModel(); 
               
        });
    },
    runModel(){
        wx.hideLoading();

        this.scrollView.pauseSystemEvents(true);
        this.infoNode.pauseSystemEvents(true);
        this.banner.pauseSystemEvents(true);
        this.goIndexBtn.pauseSystemEvents(true);
        let action = cc.moveTo(0.2, 0, 0);
        
        this.model.runAction(action);
    },
    hideModel(){
        this.scrollView.resumeSystemEvents(true);
        this.infoNode.resumeSystemEvents(true);
        this.banner.resumeSystemEvents(true);
        this.goIndexBtn.resumeSystemEvents(true);

        let finished = cc.callFunc(function(){
            this.conentView.removeAllChildren();
        }, this);
        var seq = cc.sequence(cc.moveTo(0.1, 750, 0), finished);
        this.model.runAction(seq);
       
    },
    onDisable(){
        if(!!this.btnAuthorize){
            this.btnAuthorize.style.hidden = true;
        }
    },

});
