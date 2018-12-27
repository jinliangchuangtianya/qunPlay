
window.onfire=require("./onfire");  
let {netConfig} = require('./NetConfig');

let NetControl={
    _sock:{},
    readyState : 0,  
    //当前的webSocket的对象
    connect: function () {
        if(this._sock.readyState!==1){
            if(window.wx){
                this._sock = wx.connectSocket({url:netConfig.uri}); 
                this._sock.onOpen(this._onOpen.bind(this));
                this._sock.onClose(this._onClose.bind(this));
                this._sock.onMessage(this._onMessage.bind(this));
                this._sock.onError(this._onError.bind(this));
            }
            else{
                  //重新连接
                this._sock = new WebSocket(netConfig.uri); 
                this._sock.onopen = this._onOpen.bind(this);
                this._sock.onclose = this._onClose.bind(this);
                this._sock.onmessage = this._onMessage.bind(this);
            }
          
        }
        return this;
    },

    _onOpen:function(){
        this.readyState = 1;
        onfire.fire("onopen");
    },
    _onError:function(){
        this.readyState = 0;
        onfire.fire("onerror");
    },
    _onClose:function(){
        onfire.fire("onclose");
    },
    _onMessage:function(obj){
        if(window.wx){
            let buf = new Uint8Array(obj.data);
            onfire.fire("onmessage",{name:"rsp" + netConfig.pbIndex[buf[1]], buf:buf});
        }
        else{
            var reader = new FileReader();
            reader.readAsArrayBuffer(obj.data);
            reader.onload = function () {
                let buf = new Uint8Array(reader.result);
                onfire.fire("onmessage",{name:"rsp" + netConfig.pbIndex[buf[1]], buf:buf});
            }
        }
       
    },
    close(){
        this._sock.close()
    },
    send:function(bytes, name){
        var data = new Uint8Array(2 + bytes.length);
        data[0] = 0;
        data[1] = netConfig.pbIndex[name];
        data.set(bytes, 2);
        console.warn(data, "send")
        if(window.wx){
            this._sock.send({
                data:data.buffer,
                success(data){
                    console.warn('发送成功了', data)
                },
                fail(err){
                    console.warn('发送失败了', err)
                }
            });
        }
        else{
            this._sock.send(data);
        }
       
    },
}

export default  NetControl;
