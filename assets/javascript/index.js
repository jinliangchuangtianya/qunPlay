
let config = require("./utils/config");
let wxRequest = require('./utils/wxRequest');
let XMLHttpRequest = require('./utils/jxRequest');
let post = XMLHttpRequest.post;

cc.Class({
    extends: cc.Component,

    properties: {
        btnNode:{
            type:cc.Node,
            default:null
        },
        user:{
            type:cc.Node,
            default:null
        },
        nickname:{
            type:cc.Node,
            default:null
        },
        nickname:{
            type:cc.Label,
            default:null
        },
        avatarUrl:{
            type:cc.Sprite,
            default:null
        },
        woodfish:{
            type:cc.Node,
            default:null
        },
        dice:{
            type:cc.Node,
            default:null
        },
        finger:{
            type:cc.Node,
            default:null
        },
        Truth:{
            type:cc.Node,
            default:null
        },
        more:{
            type:cc.Node,
            default:null
        }
    },
    onLoad () {
       
        this.more.on("touchstart", ()=>{
            wx.navigateToMiniProgram({
                appId:"wx091037d85230fd27",
                success(res) {
                  console.warn("打开成功")
                },
                fail(err){
                  console.warn("打开失败")
                }
              })
        })
        this.Truth.on("touchstart", ()=>{
            cc.director.loadScene("truth");
        })
        this.woodfish.on("touchstart", ()=>{
            if(!!this.btnAuthorize){
                this.btnAuthorize.style.hidden = true;
            }
            cc.director.loadScene("woodfish");
        })
        this.dice.on("touchstart", ()=>{
            cc.director.loadScene("dice-con");
        })
        this.finger.on("touchstart", ()=>{
            // wx.showModal({
            //     title:"提示",
            //     content: '正在开发中...敬请期待！',
            //     showCancel:false,
            //     success(res){
                   
                   
            //     }
            // })
            cc.director.loadScene("finger-scene1");
        })
        wx.showShareMenu({
            withShareTicket: true
          })
        wx.onShareAppMessage(()=>{
            return{
                title:"快来一起搞事情！",
                imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/firstpg.png",
                query:"share=true"
            }
        })
        this.getUserInfo()
    },
    onDisable(){
        if(!!this.btnAuthorize){
            this.btnAuthorize.style.hidden = true;
        }
    },
    getUserInfo(){
        // 获取用户信息
        let _this = this;
        let userInfo = wx.getStorageSync("userInfo");

        if(!!userInfo){
            let avatarUrl = JSON.parse(userInfo).avatarUrl, nickName = JSON.parse(userInfo).nickName;
            this.nickname.string = nickName;
            cc.loader.load({
                url:  avatarUrl,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                this.avatarUrl.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
        else{
            wx.getSetting({
                success: res => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                            success: res => {
                                // 可以将 res 发送给后台解码出 unionId
                                let avatarUrl = res.userInfo.avatarUrl, nickName = res.userInfo.nickName
                                _this.nickname.string = nickName;
                                cc.loader.load({
                                    url:  avatarUrl,
                                    type: 'png'
                                }, (err, texture) => {
                                    if (err) console.error(err);
                                    _this.avatarUrl.spriteFrame = new cc.SpriteFrame(texture);
                                });
                                wx.setStorageSync("userInfo", JSON.stringify({avatarUrl,nickName}));
                                _this.postSetuserinfo(nickName, avatarUrl);
                            }
                       })
                    }
                    else{
                        _this.createAuthorizeBtn();
                    }
                    
                }
            })
        }
        
    },
    /**
     * 创建授权按钮 获取用户姓名头像
     * @param {*} btnNode 
     */
    createAuthorizeBtn() {
        let btnNode = this.btnNode;
        let btnSize = cc.size(btnNode.width+15,btnNode.height+20);
        let frameSize = cc.view.getFrameSize();
        let winSize = cc.director.getWinSize();
        // console.log("winSize: ",winSize);
        // console.log("frameSize: ",frameSize);
        //适配不同机型来创建微信授权按钮
        let left = (winSize.width*0.5+(btnNode.x+ this.user.x + this.node.x)-btnSize.width*0.5)/winSize.width*frameSize.width;
        let top = (winSize.height*0.5-(btnNode.y + this.user.y + this.node.y)-btnSize.height*0.5)/winSize.height*frameSize.height;

        let width = btnSize.width/winSize.width*frameSize.width;
        let height = btnSize.height/winSize.height*frameSize.height;
        // console.log("button pos: ",cc.v2(left,top));
        // console.log("button size: ",cc.size(width,height));
    
        let self = this;
        self.btnAuthorize = wx.createUserInfoButton({
            type: 'text',
            text: '未登录',
            style: {
                left: left,
                top: top,
                width: width,
                height: height,
                lineHeight: 25,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 15,
                borderRadius: 4
            }
        })
        self.btnAuthorize.onTap((uinfo) => {
            if (uinfo.userInfo) {
                let avatarUrl = uinfo.userInfo.avatarUrl, nickName = uinfo.userInfo.nickName
                wx.setStorageSync("userInfo", JSON.stringify({avatarUrl,nickName}));
                self.btnAuthorize.destroy();
                
                this.postSetuserinfo(nickName, avatarUrl);
                
                this.nickname.string = nickName;
                cc.loader.load({
                    url:  avatarUrl,
                    type: 'png'
                }, (err, texture) => {
                    if (err) console.error(err);
                    this.avatarUrl.spriteFrame = new cc.SpriteFrame(texture);
                });


            }
        });
    },
    /**"/api/setuserinfo" */
    postSetuserinfo(nickname, avatar){
        let data={
            nickname,
            avatar
        },sessionId = wx.getStorageSync("sessionId"),path = "/api/setuserinfo";
        post(path,data,sessionId);
    }
});
