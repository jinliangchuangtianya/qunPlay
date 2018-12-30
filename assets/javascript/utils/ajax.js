let config = require('./config');
let md5 = require('./md5').md5;





function params(data) {
    var arg = [];
    for (var i in data) {
      arg.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arg.join('&');
  }

  //封装ajax
  function ajax(obj) {

    let appid = config.appid, appsecret = config.appsecret,
    timestamp = Date.parse(new Date()) / 1000, client_id = config.client_id, parameter = obj.path + "-" + appid + '-' + appsecret + "-" + obj.sessionId + "-" + timestamp;
    let sign = md5(parameter);

    //创建xhr对象;
    let xhr = new XMLHttpRequest();
    //后面随机数防止浏览器缓存
    obj.url = config.http + obj.path + '?client_id=' + client_id + '&timestamp=' + timestamp + '&sessionid=' + obj.sessionId + '&sign=' + sign;
    //序列化对象
    obj.data = params(obj.data);
    //当是get请求时
    if (obj.method = 'get') {
      //当前面没设置随机数时
      obj.url += obj.url.indexOf('?') == -1 ? '?' +obj.data : '&' + obj.data;
    }
    //异步调用
    if (obj.async == true) {
      //监听响应状态
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          callback();
        }
      };
    }
    //启动HTTP请求
    xhr.open(obj.method, obj.url, obj.aysnc);
    //当是post请求时
    if(obj.method === 'post') {
      //模仿表单提交
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //发送HTTP请求-post
      xhr.send(obj.data);
    } else {
      //发送HTTP请求-get
      xhr.send(null);
    }
    //同步调用
    if (obj.async == false) {
      callback();
    }
    //回调函数传参
    function callback() {
        console.log(xhr)
      if (xhr.status == 200) {
        obj.success(xhr.responseText);
      } else {
        alert("失败，失败状态码：" + xhr.status);
      }
    }
  }

  module.exports = {
    ajax: ajax
  }