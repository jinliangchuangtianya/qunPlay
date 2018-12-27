/**
 * 全局的公共变量
 * opt -> query
 * isIn -> onShow函数每次进入后台在返回都会执行, false 为第一次进来已经执行过，之后不会往下执行
 */
module.exports = {
    opt : {},   //木鱼携带的参数
    woodfishType:'muyu',  //默认是鱼木
    isIn:true,
    diceRommInfo:null, //骰子房间信息
    isDiceFight:false  //模式
};