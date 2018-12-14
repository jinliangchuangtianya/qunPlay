
var Promise = require('../plugins/es6-promise.js')

function wxPromisify(fn) {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        //成功
        resolve(res)
      }
      obj.fail = function (res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
/**
 * 微信用户登录,获取code
 */
function wxLogin() {
  return wxPromisify(wx.login)
}
/**
 * 获取微信用户信息
 * 注意:须在登录之后调用
 */
function wxGetUserInfo() {
  return wxPromisify(wx.getUserInfo)
}
/**
 * 获取系统信息
 */
function wxGetSystemInfo() {
  return wxPromisify(wx.getSystemInfo)
}

function wxChooseImage(count) {
  var wxChooseImage = wxPromisify(wx.chooseImage)
  return wxChooseImage({
    count: count
  })
}
function wxGetImageInfo(src){
  var wxGetImageInfo = wxPromisify(wx.getImageInfo)
  return wxGetImageInfo({
    src: src
  })
}
function wxSetStorage({key,data} = obj){
  var wxSetStorage = wxPromisify(wx.setStorage)
  return wxSetStorage({
    key: key,
    data:data
  })
}
function wxGetStorage(key) {
  var wxGetStorage = wxPromisify(wx.getStorage);
  return wxGetStorage({
    key: key
  })
}
function wxGetShareInfo(shareTicket){
  var wxGetShareInfo = wxPromisify(wx.getShareInfo)
  return wxGetShareInfo({
    shareTicket: shareTicket
  })
}

module.exports = {
  wxPromisify: wxPromisify,
  wxLogin: wxLogin,
  wxGetUserInfo: wxGetUserInfo,
  wxGetSystemInfo: wxGetSystemInfo,
  wxChooseImage : wxChooseImage,
  wxGetImageInfo:wxGetImageInfo,
  wxSetStorage: wxSetStorage,
  wxGetStorage: wxGetStorage,
  wxGetShareInfo: wxGetShareInfo
}
