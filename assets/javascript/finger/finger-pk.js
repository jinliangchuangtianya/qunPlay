let common = require('../common/common');
let a = require('../utils/b');
let b = new a();
let XMLHttpRequest = require('../utils/jxRequest');
let post = XMLHttpRequest.post;
let wxApi = require('../utils/wxApi')

cc.Class({
    extends: cc.Component,

    properties: {
        loginBtn:cc.Node,
        cqBtn:cc.Node,
        jiandao:cc.Node,
        shitou:cc.Node,
        bu:cc.Node,
        jiandaoA:cc.SpriteFrame,
        shitouA:cc.SpriteFrame,
        buA:cc.SpriteFrame,
        jiandaoN:cc.SpriteFrame,
        shitouN:cc.SpriteFrame,
        buN:cc.SpriteFrame,
        jiandaoS:cc.SpriteFrame,
        shitouS:cc.SpriteFrame,
        buS:cc.SpriteFrame,
        czMusic:cc.AudioClip,
        otherNickname:cc.Label,
        otherAvatarUrl:cc.Sprite,
        selfNickname:cc.Label,
        selfAvatarUrl:cc.Sprite,
        otherBg:cc.Node,
        selfBg:cc.Node,
        tips:cc.Label,
        jvBtn:cc.Node,
        jvmodel:cc.Node,
        mask:cc.Node,
        otherCope:cc.Node,
        selfCope:cc.Node,
        zsGroup:cc.Node,
        sharBnt:cc.Node,
        winMusic:cc.AudioClip,
        lostMusic:cc.AudioClip,
        pMusic:cc.AudioClip,
        mask2:cc.Node,
        mask2Close:cc.Node,
        punishmentl:cc.Node,
        battGroup:cc.Node,
        battZjd:cc.SpriteFrame,
        battZst:cc.SpriteFrame,
        battZbu:cc.SpriteFrame,
        battYjd:cc.SpriteFrame,
        battYst:cc.SpriteFrame,
        battYbu:cc.SpriteFrame,
        pingBtn:cc.Node,
        winBtn:cc.Node,
        lostBtn:cc.Node,
        updataBtn1:cc.Node,
        updataBtns:cc.Node,
        ylGroup:cc.Node,
        overiocn:cc.Node,
        ylimg:cc.Sprite,
        yao:cc.Node,
        ylBox:cc.Node,
        yllabel:cc.Label,
        tipGroup:cc.Node,
        tipover:cc.Node,
        aliginBtn:cc.Node,
        inputBtn:cc.Node,
        ylTitle:cc.Label,
        jvBntFarme:{
            default:[],
            type:cc.SpriteFrame
        },
        jvItem:cc.Prefab,
        selfscore:cc.Label,
        otherScore:cc.Label,
        contentView:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        wx.showLoading({
            title:'加载中',
            mask:false
        })
        this.isShar = this.isTx = false;
        wx.onShow(()=>{
            if(this.isShar){
                this.isShar = false;
                cc.director.loadScene("finger-shar");
            }
        })

        this.isClick = true;
        this.result = '';
        this.upimgdata = '';  //上传图片地址
        this.isOver = false;  //是否完成惩罚
        this.ylUrl = null;    //预览图片地址
        this.timer = null;
        this.timer2 = null;
        this.isYl = false;
        this.animState = false;
        
        // if(cc.director.getWinSize().height >= 1600 ){
        //     this.jvBtn.x = -300;
        // }

        let _this = this;
        this.other = common.opt.query;
        this.tips.string = this.other.contract;

        this.select = null;
        this.textmess = '';

        this.jiandao.on('touchstart', this.selectZS.bind(this, {type:1,name:'jiandao'}));
        this.shitou.on('touchstart', this.selectZS.bind(this, {type:2,name:'shitou'}));
        this.bu.on('touchstart', this.selectZS.bind(this, {type:3,name:'bu'}));

        this.mask2Close.on('touchstart', this.gamaOver, this)

        this.sharBnt.on('touchstart', this.sendSharPk, this)

        this.updataBtn1.on('touchstart', this.upimg, this)
        this.updataBtns.getChildByName('alignBtn').on('touchstart', this.upimg, this);
        this.updataBtns.getChildByName('sendBtn').on('touchstart', this.sendimg, this);

        this.aliginBtn
        this.aliginBtn.on('touchstart', function(){
            cc.director.loadScene('finger-battscene')
        },this)

        this.inputBtn.on('touchstart', this.upmessage, this)

        this.ylTime = 0;
        this.ylGroup.on('touchstart', this.startYl, this);
        this.ylGroup.on('touchend', this.enYl, this);
 
        this.cqBtn.on('touchstart', this.sharPk, this);
        this.pingBtn.on('touchstart', function(){
            cc.director.loadScene('finger-battscene')
        },this)

        this.winBtn.on('touchstart', function(){
            this.isTx = true;
            cc.director.loadScene('finger-battscene');
        },this)

        this.lostBtn.on('touchstart', this.gamaOver,this)

        this.jvBtn.on('touchstart',()=>{
            if(!this.mask.active){
                this.battGroup.pauseSystemEvents(true);
                this.zsGroup.pauseSystemEvents(true);

                this.getjvList();

                //this.showMask('showTopModel');
            }
            else{
                this.hideMask('hideTopModel');
            }
            
        })

        this.getPkmeet();
    },
    startYl(){
        if(this.animState) return;
        clearTimeout(this.timer);
        
        this.timer = setTimeout(()=>{
            this.isYl = true;
            let num = 5;

            this.tipGroup.active = false;
            if(this.other.batype == 1){
                this.yllabel.node.runAction(cc.fadeIn(0.4))
            }
            else if(this.other.batype == 2){
                this.ylimg.node.runAction(cc.fadeIn(0.4))
            }
            this.desYl();
            clearInterval(this.timer2);
            this.timer2 = setInterval(()=>{
                num -- ;
                if(num == 0){
                    clearInterval(this.timer2);
                    this.animState = true;
                    let ylBoxanim = this.ylBox.getComponent(cc.Animation);
                    ylBoxanim.play('down');
                    ylBoxanim.on('stop',function(){
                        this.ylGroup.active = false;
                        this.tipover.active = this.aliginBtn.active = true;
                        this.battGroup.getChildByName('b11').getChildByName('noover').active = false;
                        this.battGroup.getChildByName('b11').getChildByName('isover').active = true;
                    },this)
                }
            },1000)
        },1000)
    },
    enYl(){
        if(this.animState) return;
        if(!this.isYl){
            //动画
            let yaoanim = this.yao.getComponent(cc.Animation);
            yaoanim.play('yao');
            wx.showToast({
                title:'长按查看',
                icon:'none'
            })
        }
        else{
            clearInterval(this.timer2);
            this.animState = true;
            let ylBoxanim = this.ylBox.getComponent(cc.Animation);
            ylBoxanim.play('down');
            ylBoxanim.on('stop',function(){
                this.tipover.active = this.aliginBtn.active = true;
                this.ylGroup.active = false;
                this.battGroup.getChildByName('b11').getChildByName('noover').active = false;
                this.battGroup.getChildByName('b11').getChildByName('isover').active = true;
            },this)
            this.desYl();
        }
    },
    //销毁预览
    desYl(){
        let path = '/api/destroycontent', sessionId = wx.getStorageSync('sessionId');
        let data = {
            pkid:this.other.pkid
        }

        post(path, data, sessionId)
        .then(res=>{
            
        })
    },
    onTextChanged: function(text, editbox, customEventData) {
        this.textmess = text;
    },
    //上传留言
    upmessage(){
        if(this.textmess.trim() == ''){
            return
        }
        wx.showLoading({
            title:'上传中',
            mask:false
        })
        let path = '/api/acceptpunishment', sessionId = wx.getStorageSync('sessionId');
        let data = {
            punishment_content:this.textmess,
            pkid:this.other.pkid
        }

        post(path, data, sessionId)
        .then(res=>{
            wx.hideLoading();
            console.warn(res, 'res');
            this.isOver = true;
            this.mask2.active = this.overiocn.active = true;
            let battscene = this.battGroup.getChildByName('b11');
            battscene.getChildByName('input').active = false;
            this.yllabel.string = this.textmess;
        })
    },
    //显示发起人信息
    showStherInfo(){
        let _this = this;
        cc.loader.load({
            url:  _this.other.avatarUrl,
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            _this.otherAvatarUrl.spriteFrame = new cc.SpriteFrame(texture);
        });
        this.otherNickname.string = this.other.nickname;
        this.zsGroup.active = true;
       
       
    },
    //获取自己的信息
    getUserInfo(opt){
        let _this = this;
        let userInfo = wx.getStorageSync('userInfo');
        if(!!userInfo){
            if(opt.createBtn){
                this.cqBtn.active = true;
                this.loginBtn.active = false;
            }
            cc.loader.load({
                url:  JSON.parse(userInfo).avatarUrl,
                type: 'png'
            }, (err, texture) => {
                if (err) console.error(err);
                _this.selfAvatarUrl.spriteFrame = new cc.SpriteFrame(texture);
            });
            this.selfNickname.string = JSON.parse(userInfo).nickName;
        }
        else{
            if(opt.createBtn){
                this.cqBtn.active = false;
                this.loginBtn.active = true;
                this.createAuthorizeBtn();
            }
        }
    },
    //获取PK详情
    getPkmeet(){
        let path = '/api/meet', sessionId = wx.getStorageSync('sessionId');
        let data = {
            pkid : this.other.pkid
        }
        post(path, data, sessionId)
        .then(res=>{
            wx.hideLoading();
            console.warn(res, 'bbbbbbbbbb')
           if(res.data.code == 200){
                let isIn = res.data.data.data.is_in;
                let status = res.data.data.data.status;

                console.warn(isIn, status, '123')
                if(isIn == 'start'){
                    if(status == 1){
                        this.sharBnt.active = true;
                        this.zsGroup.active = this.jvmodel.active = false;
                        this.getUserInfo({'createBtn':false});
                    }
                    else if(status == 2){  //已应战但未完成惩罚
                        this.showUsersInfo('start', status, res.data.data.data);
                    }
                    else if(status == 3){ //已完成
                        this.showUsersInfo('start',status, res.data.data.data);
                    }
                }
                else if(isIn == 'end'){  //应战者

                    if(status == 2){ //未接受惩罚的情况
                        this.showUsersInfo('end',status, res.data.data.data);
                    }
                    else if(status == 3){  //已完成
                        this.showUsersInfo('end',status, res.data.data.data);
                    }
                }
                else if(isIn == 'no'){
                    if(status == 1){   //无人应战
                        this.showStherInfo();
                        this.getUserInfo({'createBtn':true});
                    }
                    else{  //观战身份
                        this.showUsersInfo('no',status, res.data.data.data);
                    }
                }
           }
        })
    },
    //显示用户信息
    showUsersInfo(type,status, data){
        let _this = this, rightavatar, rightname,leftavatar, leftname, rightchoose,leftchoose, lcFarme, rcFarme, isWin = data[type+'_result'];
        if(type == 'end' || type == 'no'){
            rightavatar = 'end_avatar';
            rightname = 'end_name';
            rightchoose = 'end_choose'
            leftchoose = 'start_choose'
            leftavatar = 'start_avatar';
            leftname = 'start_name';
            
        }
        else if(type == 'start'){
            leftavatar = 'end_avatar';
            leftname = 'end_name';
            leftchoose = 'end_choose'
            rightchoose = 'start_choose'
            rightavatar = 'start_avatar';
            rightname = 'start_name';
        }
        
        cc.loader.load({
            url:  data[rightavatar],
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            _this.selfAvatarUrl.spriteFrame = new cc.SpriteFrame(texture);
        });
        this.selfNickname.string = data[rightname];

        cc.loader.load({
            url:  data[leftavatar],
            type: 'png'
        }, (err, texture) => {
            if (err) console.error(err);
            _this.otherAvatarUrl.spriteFrame = new cc.SpriteFrame(texture);
        });
        this.otherNickname.string = data[leftname];

        if(type == 'no'){
            this.battGroup.active = false;
        }
        else{
            this.battGroup.active = true;
            this.battGroup.getChildByName('b11').getChildByName('title').getComponent(cc.Label).string = b.decode(data.contract);

            if(status == 2){
                this.battGroup.getChildByName('b11').getChildByName('noover').active = true;
                if(isWin == 'lose'){
                    this.result = 'lost';
                    
                    switch (data['punishment_type']) {
                        case 1:
                            this.battGroup.getChildByName('b11').getChildByName('input').active = true;
                            break;
                        case 2:
                            this.battGroup.getChildByName('b11').getChildByName('update').active = true;
                            break;
                        case 3:
                            this.battGroup.getChildByName('b11').getChildByName('muyu').active = true;
                            break;
                        case 4:
                            this.aliginBtn.active = true;
                            break;
                    }
                }
                else if(isWin == 'win'){
                    this.result = 'win';
                    this.battGroup.getChildByName('b11').getChildByName('win').active = true;
                    this.aliginBtn.active = true;
                    this.battGroup.getChildByName('b11').getChildByName('win').getChildByName('fg-zailai-yiju').active = false;
                }
            }
            else if(status == 3){
                this.battGroup.getChildByName('b11').getChildByName('isover').active = true;
                this.punishmentl.active = false;
                if(data.is_destroy == 0){
                    this.ylTitle.string = b.decode(data.contract);
                    if(data.punishment_type == 1){
                        this.yllabel.string = data['contract_content'];
                        this.ylGroup.active = true;
                    }
                    else if(data.punishment_type == 2){
                        console.warn(data['contract_content'], 'contract_content')
                        cc.loader.load({
                            url:  data['contract_content'],
                            type: 'png'
                        }, (err, texture) => {
                            if (err) console.error(err);
                                _this.ylimg.spriteFrame = new cc.SpriteFrame(texture);
                                let width = "", height = "";
                                let str = data.contract_img_w / data.contract_img_h;//图片的宽高比
                                if (str >= 1) {//横版图片
                                width = _this.ylimg.node.width;//图片的显示高度为400
                                height = data.contract_img_h * (width / data.contract_img_w); //图片的宽度 = 宽高比 * 图片的显示高度
            
                                } 
                                else {//竖版图片
                                height = _this.ylimg.node.height;//图片的显示高度为400
                                width = data.contract_img_w * (height / data.contract_img_h); //图片的宽度 = 宽高比 * 图片的显示高度
                                }
                                _this.ylimg.node.height = height;
                                _this.ylimg.node.width = width;   
                                
                                _this.ylGroup.active = true;
                            
                        });
                    }
                    else{
                        this.battGroup.getChildByName('b11').getChildByName('win').active = true;
                        this.aliginBtn.active = true;
                        this.battGroup.getChildByName('b11').getChildByName('win').getChildByName('fg-zailai-yiju').active = false;
                        this.battGroup.getChildByName('b11').getChildByName('win').getChildByName('fg-wei-confirm').active = false;
                        
                        this.battGroup.getChildByName('b11').getChildByName('fg-punish-destroy').active = true;
                    }

                }
                else if(data.is_destroy == 1){
                    this.battGroup.getChildByName('b11').getChildByName('win').active = true;
                    this.aliginBtn.active = true;
                    this.battGroup.getChildByName('b11').getChildByName('win').getChildByName('fg-zailai-yiju').active = false;
                    this.battGroup.getChildByName('b11').getChildByName('win').getChildByName('fg-wei-confirm').active = false;
                    
                    this.battGroup.getChildByName('b11').getChildByName('fg-punish-destroy').active = true;
                }
            }
        }
        
        

        switch (data[rightchoose]) {
            case 1:
                rcFarme = this.battYjd;
                break;
        
            case 2:
                rcFarme = this.battYst;
                break;
            case 3:
                 rcFarme = this.battYbu;
                break;
        }
        switch (data[leftchoose]) {
            case 1:
                lcFarme = this.battZjd;
                break;
        
            case 2:
                lcFarme = this.battZst;
                break;
            case 3:
                lcFarme = this.battZbu;
                break;
        }
        if(type == 'no'){
            this.punishmentl.active = true;
        }
        else{
            this.punishmentl.active = false;
        }
       
        this.battGroup.getChildByName('otherzs').getComponent(cc.Sprite).spriteFrame = lcFarme;
        this.battGroup.getChildByName('selfzs').getComponent(cc.Sprite).spriteFrame = rcFarme;
    },
    //获取记录
    getjvList(){
        wx.showLoading({
            title:'加载中',
            mask:true
        })
        let path = '/api/getbattledetail', sessionId = wx.getStorageSync('sessionId');
        let data = {
            pkid : this.other.pkid
        }
        post(path, data, sessionId)
        .then(res=>{
            wx.hideLoading();
           if(res.data.code == 200){
                let data = res.data.data;
                this.jvBtn.getComponent(cc.Sprite).spriteFrame = this.jvBntFarme[1];
                this.selfscore.string = res.data.selfWinCount;
                this.otherScore.string = res.data.oppoWinCount;
                this.showMask('showTopModel');
                
                for(let i=0; i<data.length; i++){
                    let item = cc.instantiate(this.jvItem);
                    item.getComponent('pkjv-item').init(data[i]);
                    item.parent = this.contentView;
                }

                
           }
        })
    },
    //选择招式
    selectZS (arg, target) {
        if(!this.isClick) return;

        let userInfo = wx.getStorageSync('userInfo');
        if(!userInfo){
            wx.showModal({
                title: '提示',
                content: '登陆后才能参与游戏',
                showCancel:false,
                success(){

                }
            })
            return;
        }
        if(!!this.select){
            if(arg.name == this.select.name) return;
        }
        cc.audioEngine.playEffect(this.czMusic);
        switch (arg.type) {
            case 1:
                this.jiandao.getComponent(cc.Sprite).spriteFrame = this.jiandaoA;
                this.cqBtn.getComponent(cc.Sprite).spriteFrame = this.jiandaoS
                break;
            case 2:
                this.shitou.getComponent(cc.Sprite).spriteFrame = this.shitouA;
                this.cqBtn.getComponent(cc.Sprite).spriteFrame = this.shitouS
                break;
            case 3:
                this.bu.getComponent(cc.Sprite).spriteFrame = this.buA;
                this.cqBtn.getComponent(cc.Sprite).spriteFrame = this.buS
                break;
        }
        cc.audioEngine.playEffect(this.checkedMusic);
        if(!!this.select){
            this[this.select.name].getComponent(cc.Sprite).spriteFrame = this[this.select.name + 'N'];
        }
        this.select = arg;
    },
    //预览手机图片
    upimg(){
        let _this = this;
        wx.chooseImage({
            count: 1,
            success(res) {
              // tempFilePath可以作为img标签的src属性显示图片
              let imgsrc = res.tempFilePaths[0];
              wx.previewImage({
                current: '', // 当前显示图片的http链接
                urls: [imgsrc] // 需要预览的图片http链接列表
              })
              _this.upimgdata = imgsrc;
              _this.updataBtn1.active = false; 
              _this.updataBtns.active = true; 
            }
          })
      },
    //上传图片
    sendimg(){
        console.warn(this.upimgdata, '_this.upimgdata')
        wx.showLoading({
            title:'上传中',
            mask:true
        })
        let _this = this;
        wx.uploadFile({
            url: 'https://xiaoyouxi-api.jixiang.cn/api/uppunishmentphoto', // 仅为示例，非真实的接口地址
            filePath: _this.upimgdata,
            name: 'photo',
            success(res) {
                
                let data = JSON.parse(res.data);
                if(data.error == 0){
                     wx.hideLoading();  
                   
                    _this.ylUrl = data.data;
                    if(_this.ylUrl.width >= 2048 || _this.ylUrl.height >= 2048 ){
                        wx.showModal({
                            title: '提示',
                            content: '图片尺寸过大,请重新上传',
                            showCancel:false
                        })
                        return;
                    }
                    _this.isOver = true;
                    _this.mask2.active = _this.overiocn.active = true;

                    let battscene = _this.battGroup.getChildByName('b11');
                    battscene.getChildByName('update').active = false;
                    let path = '/api/acceptpunishment', sessionId = wx.getStorageSync('sessionId');
                    let arg = {
                        punishment_content: _this.ylUrl.url,
                        pkid:_this.other.pkid
                    }

                    post(path, arg, sessionId)
                    .then(result=>{
                        console.warn('上传完毕')
                    })

                    cc.loader.load({
                        url:  _this.ylUrl.url,
                        type: 'png'
                    }, (err, texture) => {
                        if (err) console.error(err);
                            _this.ylimg.spriteFrame = new cc.SpriteFrame(texture);
                            let width = "", height = "";
                            var str = _this.ylUrl.width / _this.ylUrl.height;//图片的宽高比
                            if (str >= 1) {//横版图片
                                width = _this.ylimg.node.width;//图片的显示高度为400
                                height = _this.ylUrl.height * (width / _this.ylUrl.width); //图片的宽度 = 宽高比 * 图片的显示高度
        
                            } 
                            else {//竖版图片
                                height = _this.ylimg.node.height;//图片的显示高度为400
                                width = _this.ylUrl.width * (height / _this.ylUrl.height); //图片的宽度 = 宽高比 * 图片的显示高度
                            }
                            _this.ylimg.node.height = height;
                            _this.ylimg.node.width = width;    
                    });

                }
                else{
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel:false
                    })
                }

              console.warn(res, 'res');
            }
        })
    },
    //回应PK
    sharPk(){
        if(!this.isClick) return;
        if(!this.select){
            wx.showModal({
                title: '提示',
                content: '请先选择招式',
                showCancel:false
            })
            return;
        }
        wx.showLoading({
            title:'加载中',
            mask:false
        })
        let path = '/api/pk',sessionId = wx.getStorageSync('sessionId');
        let data = {
            choose:this.select.type,
            pkid : this.other.pkid
        }
        post(path, data, sessionId)
        .then(res=>{
            wx.hideLoading();
            console.warn(res);
           if(res.data.code == 200){
                this.mask2.active = true;
                this.zsGroup.active = this.cqBtn.active = this.punishmentl.active = false;
                

               if(this.select.type == this.other.choose){
                   cc.audioEngine.playEffect(this.pMusic);
                   this.mask2.getChildByName('ping').active = true; 
                   this.result = 'ping';
               }

               else if((this.select.type == 1 && this.other.choose == 2) || (this.select.type == 2 && this.other.choose == 3) || (this.select.type == 3 && this.other.choose == 1)){
                    cc.audioEngine.playEffect(this.lostMusic);
                    this.mask2.getChildByName('lost').active = true;  
                    this.result = 'lost';
               }
               else if((this.select.type == 1 && this.other.choose == 3) || (this.select.type == 2 && this.other.choose == 1) || (this.select.type == 3 && this.other.choose == 2)){
                    cc.audioEngine.playEffect(this.winMusic);
                    this.mask2.getChildByName('win').active = true;  
                    this.result = 'win';
               }
                

               if(this.other.choose == 1){
                 this.battGroup.getChildByName('otherzs').getComponent(cc.Sprite).spriteFrame = this.battZjd;
               }
               else if(this.other.choose == 2){
                this.battGroup.getChildByName('otherzs').getComponent(cc.Sprite).spriteFrame = this.battZst;
               }
               else if(this.other.choose == 3){
                this.battGroup.getChildByName('otherzs').getComponent(cc.Sprite).spriteFrame = this.battZbu;
               }

               if(this.select.type == 1){
                this.battGroup.getChildByName('selfzs').getComponent(cc.Sprite).spriteFrame = this.battYjd;
              }
              else if(this.select.type == 2){
               this.battGroup.getChildByName('selfzs').getComponent(cc.Sprite).spriteFrame = this.battYst;
              }
              else if(this.select.type == 3){
               this.battGroup.getChildByName('selfzs').getComponent(cc.Sprite).spriteFrame = this.battYbu;
              }

               

           }
           else{
            wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel:false
            })
           }
        })
       
    },
    //结果
    gamaOver(){
        let _this = this;
        this.mask2.getChildByName('ping').active = false; 
        this.mask2.getChildByName('lost').active = false; 
        this.mask2.getChildByName('win').active = false; 
        this.overiocn.active = false; 
        this.mask2.active = false;

        this.battGroup.active = true;
        let battscene = this.battGroup.getChildByName('b11');

        battscene.getChildByName('title').getComponent(cc.Label).string = this.other.contract;
        console.warn(this.result, this.isOver, 'this.isOver')
        if(this.result == 'win'){
            battscene.getChildByName('win').active = true;
            battscene.getChildByName('win').getChildByName('fg-tixing-ta-small-sel').active = false;
            battscene.getChildByName('win').getChildByName('fg-tixing-ta-small').active = false;
               
            battscene.getChildByName('btn-again-yiju').active = true;

            
            
        }
        else if(this.result == 'lost'){
            if(this.isOver){  //预览惩罚
                this.ylGroup.active = true;
                this.ylTitle.string = this.other.contract;
            }
            else{
                if(this.other.batype == 1){
                    battscene.getChildByName('input').active = true;
                    battscene.getChildByName('noover').active = true;
                }
                else if(this.other.batype == 2){
                    battscene.getChildByName('update').active = true;
                    battscene.getChildByName('noover').active = true;
                }
                else if(this.other.batype == 3){
                    battscene.getChildByName('btn-again-yiju').active = true;
                    battscene.getChildByName('btn-again-yiju').on('touchstart',function(){
                        cc.director.loadScene('finger-battscene');
                    },this)
                    battscene.getChildByName('isover').active = true;
                }
                else if(this.other.batype == 4){
                    battscene.getChildByName('tip').getComponent(cc.Label).string = '小惩罚';
                    battscene.getChildByName('muyu').active = true;
                    battscene.getChildByName('muyu').getChildByName('btn-send-pic').on('touchstart',function(){
                        cc.director.loadScene('finger-muyu');
                    },this)
                    battscene.getChildByName('noover').active = true;
                }
               
            }
        }
        else if(this.result == 'ping'){
            battscene.getChildByName('btn-again-yiju').active = true;
            battscene.getChildByName('btn-again-yiju').on('touchstart',function(){
                cc.director.loadScene('finger-battscene');
            },this)
        }

       
    },
    //显示遮罩
    showMask(type){

        this.isClick = false;
        this.mask.active = true;
        let action = cc.scaleTo(0.2, 1);
        let finished = cc.callFunc(this[type], this)
        let seq = cc.sequence(action, finished);
        this.mask.runAction(seq);
    },
    //关闭遮罩
    hideMask(type){
        this.mask.setScale(0);
        this.mask.active = false;
        this[type]();
    },
    //显示对战记录
    showTopModel(){
        let action = cc.moveTo(0.3, 0, this.jvmodel.y - this.jvmodel.height - 100);
        let finished = cc.callFunc(function(){
            let otherCope = cc.instantiate(this.otherBg);
            otherCope.parent = this.otherCope;
            otherCope.setPosition(0, 0);
            let selfCope = cc.instantiate(this.selfBg);
            selfCope.parent = this.selfCope;
            selfCope.setPosition(0, 0);
        }, this);
        let seq = cc.sequence(action, finished);
        this.jvmodel.runAction(seq);
    },
    //关闭对战记录
    hideTopModel(){
        
        let action = cc.moveTo(0.2, 0, this.jvmodel.y + this.jvmodel.height + 100);
        let finished = cc.callFunc(function(){
            this.isClick = true;
            this.battGroup.resumeSystemEvents(true);
            this.zsGroup.resumeSystemEvents(true);
            this.jvBtn.getComponent(cc.Sprite).spriteFrame = this.jvBntFarme[0]
        }, this);
        let seq = cc.sequence(action, finished);
        this.jvmodel.runAction(seq);

    },
    //找人PK
    sendSharPk(){
        this.isShar = true;
        wx.shareAppMessage({
            title:"打个赌，惩罚是：" + this.other.contract,
            imageUrl:"https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/share_finger_zq.png",
            query:"share=true&sceneto=finger-pk&pkid="+this.other.pkid+"&nickname="+this.other.nickName+"&avatarUrl="+this.other.avatarUrl+"&choose="+this.other.type+"&contract="+this.other.contract,
            success(res){
                
            }
        })

        
    },
    createAuthorizeBtn() {
        let btnNode = this.loginBtn;

        let btnSize = cc.size(btnNode.width,btnNode.height);
        let frameSize = cc.view.getFrameSize();
        let winSize = cc.director.getWinSize();
        // console.log("winSize: ",winSize);
        // console.log("frameSize: ",frameSize);
        //适配不同机型来创建微信授权按钮
        let left = (winSize.width*0.5+btnNode.x-btnSize.width*0.5)/winSize.width*frameSize.width;
        let bottom = (this.loginBtn.getComponent(cc.Widget).bottom)/winSize.height*frameSize.height;
        let width = btnSize.width/winSize.width*frameSize.width;
        let height = btnSize.height/winSize.height*frameSize.height;
        // console.log("button pos: ",cc.v2(left,top));
        // console.log("button size: ",cc.size(width,height));


        let self = this;
        self.btnAuthorize = wx.createUserInfoButton({
            type: 'image',
            image:'https://jx-game.oss-cn-beijing.aliyuncs.com/qunPlay/img/login7.png',
            style: {
                left: left,
                bottom:bottom,
                width: width,
                height: height,
            }
        })
        self.btnAuthorize.onTap((uinfo) => {

            if(!self.isClick) return;

            if (uinfo.userInfo) {
                let avatarUrl = uinfo.userInfo.avatarUrl, nickName = uinfo.userInfo.nickName
                self.selfNickname.string = nickName;

                cc.loader.load({
                    url:  avatarUrl,
                    type: 'png'
                }, (err, texture) => {
                    if (err) console.error(err);
                    self.selfAvatarUrl.spriteFrame = new cc.SpriteFrame(texture);
                });

                wx.setStorageSync("userInfo", JSON.stringify({avatarUrl,nickName}));
                self.btnAuthorize.destroy();
                self.cqBtn.active = true;
                self.postSetuserinfo(nickName, avatarUrl);
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
        });
    },
    onDestroy:function(){
        if(!!this.btnAuthorize){
            this.btnAuthorize.style.hidden = true;
        }
    },

    // update (dt) {},
});
