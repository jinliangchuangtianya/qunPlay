let netConfig = {
    uri : "wss://muyu.jixiang.cn",
    pbIndex : { //端序，由服务器提供
        0:"Ping","Ping":0,
        1:"Login","Login":1,
        2:"CreateRoom","CreateRoom":2,
        3:"JoinRoom","JoinRoom":3,
        4:"GetRooms","GetRooms":4,
        5:"OutRooms","OutRooms":5,
        6:"GamePlay","GamePlay":6,
        7:"GameOver","GameOver":7,
        8:"Reconnection","Reconnection":8,
        9:"Boom","Boom":9,
        10:"Dice","Dice":10,
        11:"DiceOver","DiceOver":11,
    },
    timeout : 1000
}

module.exports = {
    netConfig
}
