var userDAO = require("../dao/UserDao");

//初始化socket服务
exports.ISocket = function (port) {
    console.log("启用TCP端口:"+port);
    var _io = require("socket.io").listen(port);
    _io.on('connection', function(socket){
        //存储链接数据
        _io.emit("tcpok", "true");
        console.log("TCP 连接成功-----id为" + socket.id);

        //监听用户登录-获取用户id
        socket.on("getuserid", function(data){
            //拿到socket临时分配的id，存储数据库
            var _data = [socket.id, data];
            userDAO.adduseridtcp(_data, function(rdata){

            })
        });

        //监听群消息
        socket.on("message", function(data){
            _io.emit("sedMsg", data);
        });

        //监听用户退出
        socket.on("outlogins", function(data){
            var _data = ["0", data];
            userDAO.editlogindan(_data, function(rdata){
                //_io.close();
            });
        });

        socket.on('connect_failed', function(data){
            console.log("断开链接connect_failed");
        })

        socket.on("disconnect", function(data){
            var nowDate = new Date();
            var _data = ["0", format(nowDate), socket.id];
            userDAO.editlogindantcp(_data, function(rdata){
                console.log('disconnect: 改变'); 
            });
        })
    });    
};

function format(Date){
    var Y = Date.getFullYear();
    var M = Date.getMonth() + 1;
        M = M < 10 ? '0' + M : M;// 不够两位补充0
    var D = Date.getDate();
        D = D < 10 ? '0' + D : D;
    var H = Date.getHours();
        H = H < 10 ? '0' + H : H;
    var Mi = Date.getMinutes();
        Mi = Mi < 10 ? '0' + Mi : Mi;
    var S = Date.getSeconds();
        S = S < 10 ? '0' + S : S;
        return Y + '-' + M + '-' + D + ' ' + H + ':' + Mi + ':' + S;
}
//return format(nowDate);



