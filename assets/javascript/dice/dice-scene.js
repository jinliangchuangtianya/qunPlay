

cc.Class({
    extends: cc.Component,

    properties: {
        dice:cc.Prefab,
        isize:cc.Node,
        music:cc.AudioClip,
        group:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.diceCount = 6;
        this.changeCount = 6;
        this.diceArr = [];
        let _this = this;
        this.isPlay = false;
 
        this.init();

        if(!!window.wx){
            wx.onAccelerometerChange(function (res) {
                if ((Math.abs(res.x) + Math.abs(res.y) > 2 || Math.abs(res.z) > 6) && !this.isRunIng) {
                    _this.playIng()
                }
            })
        }

        this.group.getChildByName("yao").on("touchstart", this.playIng, this);
       
    },
    playIng(){
        if(this.isPlay) return;
        this.isPlay = true;
        if(this.changeCount == this.diceCount){
            this.startMove();
        }
        else{
            this.diceCount = this.changeCount;
            this.init();
        }
        setTimeout(()=>{
            this.isPlay = false
        },1000)
    },
    init () {
       
        cc.audioEngine.playEffect(this.music, false);
        this.diceArr = [];
        this.node.removeAllChildren();
        for(let i=0; i<this.diceCount; i++){
            let dice = cc.instantiate(this.dice);
            dice.target = this.getTagrget(this.diceArr);
            dice.frame = this.getRandom(0, 5);
            this.diceArr.push(dice);
            dice.parent = this.node;
            dice.getComponent("dice-pre").init(dice.target,  dice.frame);
        }
    },
    startMove(){
        cc.audioEngine.playEffect(this.music, false);
        let arr = [];
        for(let i=0; i<this.diceArr.length; i++){
            this.diceArr[i].target = this.getTagrget(arr);
            this.diceArr[i].frame = this.getRandom(0, 5);
            arr.push(this.diceArr[i]);
            this.diceArr[i].getComponent("dice-pre").init(this.diceArr[i].target,  this.diceArr[i].frame);
        }
    },
    getTagrget(arr){
        let left = this.getRandom(this.isize.width, cc.winSize.width - this.isize.width);
        let top = this.getRandom(this.group.y + this.isize.height, cc.winSize.height - this.isize.height);
        let rotate = this.getRandom(0, 180);
        rotate = (Math.random() > 0.5 ? '+' : '-') + rotate;
    
        if (arr.length >= 1){
          for (let i = 0; i < arr.length; i++){
            if(this.isOverlap(arr[i].target, {left, top})){
              return this.getTagrget(arr);
            }
           }
        }
        return { left, top, rotate};
        
      },
      getRandom(lowerValue, upperValue){
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
      },
      isOverlap(rc1, rc2) {    //判断元素是否重叠
        let obj2top = rc2.top;
        let obj2left = rc2.left;
  
        let obj1top = rc1.top;
        let obj1left = rc1.left;
  
  
        let radius =  this.isize.width;

        if ((obj1left + radius) < obj2left || (obj1top + radius) < obj2top || obj1top > (obj2top + radius) || obj1left > (obj2left + radius)) {
            return false;
          }
          else {
            console.log('碰上了')
            return true;
          }
      }

    // update (dt) {},
});
