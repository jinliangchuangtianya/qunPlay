var Promise = require('../plugins/es6-promise.js')
let wxRequest = require('./wxRequest');
let config = require('./config');
let md5 = require('./md5').md5;

let postRequest = wxRequest.postRequest;


function post(path, data, sessionId){
  return new Promise((resolve, reject) => {
    let appid = config.appid, appsecret = config.appsecret,
    timestamp = Date.parse(new Date()) / 1000, client_id = config.client_id, parameter = path + "-" + appid + '-' + appsecret + "-" + sessionId + "-" + timestamp;
  let sign = md5(parameter)

  let url = config.http + path + '?client_id=' + client_id + '&timestamp=' + timestamp + '&sessionid=' + sessionId + '&sign=' + sign;
      postRequest(url, data).
        then(res => {
          resolve(res);
        })
        .catch(res => {
          reject(res)
        })
    })
}

module.exports = {
  post: post
}