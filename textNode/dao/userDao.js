var db = require("./database");

//登录
exports.loginuser = function(data,callback){
    db.query("select * from user where user=? and pwd=?", data, function(rdata){
        callback(rdata);
    });
};

//读取数据库文本信息
exports.gettext = function(data, callback){
    db.query("SELECT * FROM text_main;", function(rdata){
        if(rdata.length > 0){
            var _data = rdata;
            _data[0].text_main = getbase64file(rdata[0].text_main);
            callback(_data);
        }else{
            callback(rdata);
        } 
    });
}

//增加登录的数据
exports.editlogintime = function(data, callback){
    db.query("UPDATE user SET login_time=?, pc_ip=? WHERE id=?", data, function(rdata){
        callback(rdata);
    });
}

//退出登录
exports.outlogin = function(data, callback){
    db.query("UPDATE user SET offline_time=? WHERE id=?", data, function(rdata){
        callback(rdata);
    });
}

//管理员登录
exports.adminlogin = function(data,callback){
    db.query("select * from useradmin where user=? and pwd=?", data, function(rdata){
        callback(rdata);
    });
};

//增加用户
exports.adduser = function(data,callback){
	var _user = data[0];
	//首先用户查询用户是否有相同的账号
	//没有者添加
    db.query("select * from user where user=?", _user, function(rdata){
    	console.log(rdata);
    	if(rdata.length > 0){
    		callback(rdata);
    	}else{       
    		db.query("INSERT into user(user, pwd) VALUES(?, ?)", data, function(adddata){
    			callback(adddata);
    		})
    	}
    });
};

//查询
exports.queryinfoname = function(data, callback){
    var _data = data[0];
    var _sql = "SELECT * FROM user  WHERE user like " + "\"" + _data + "\"" + "order by user LIMIT 0,10";
    db.query(_sql, function(rdata){
        callback(rdata);
    });
}

//查询内容--查询前10条数据
exports.queryinfodao = function(data, callback){
    db.query("SELECT * FROM user LIMIT ?,?;",data, function(rdata){
        callback(rdata);
    });
}

//查询内容--总数
exports.queryinfototal = function(data, callback){
    //返回总数-改变字段
    db.query("select count(*) as total from user;", function(rdata){
        callback(rdata[0].total);
    });
}

//修改密码
exports.edituserpwd = function(data, callback){
    db.query("UPDATE user SET pwd=?  WHERE id=?", data, function(rdata){
        callback(rdata);
    });
}

//修改管理员密码
exports.edituserpwdadmin = function(data, callback){
    db.query("UPDATE useradmin SET pwd=?", data, function(rdata){
        callback(rdata);
    });
}

//删除数据
exports.deldatalist = function(data, callback){
    db.query("delete from user where id=?;", data, function(rdata){
        callback(rdata);
    });
}

//读取的文本写入数据可
exports.writeTxtData = function(data, callback){
    //数据转base64
    var _sql = "INSERT INTO text_main (id, text_main) VALUES (" + "\"" + data[0] + "\"" +"," + "\"" + setbase64file(data[1]) + "\"" + ") ON DUPLICATE KEY UPDATE text_main =" + "\"" + setbase64file(data[1])+ "\";";
    //数据入库
    db.query(_sql, function(rdata){
        db.query("SELECT * FROM text_main;", function(rdata){
            if(rdata.length > 0){
                var _data = rdata;
                _data[0].text_main = getbase64file(rdata[0].text_main);
                callback(_data);
            }else{
                callback(rdata);
            }            
        });
    });
}

//单点登录入库
exports.editlogindan = function(data, callback){
    db.query("UPDATE user SET state=?  WHERE id=?;", data, function(rdata){
        callback(rdata);
    });
}

//断网-主动断开tcp链接
exports.editlogindantcp = function(data, callback){
    db.query("UPDATE user SET state=?, offline_time=?  WHERE tcpid=?;", data, function(rdata){
        callback(rdata);
    });
}

//验证单点登录
exports.islogindan = function(data, callback){
    db.query("SELECT state FROM user WHERE id=?;", data, function(rdata){
        callback(rdata);
    });
}

//增加登录tcp-userid
exports.adduseridtcp = function(data, callback){
    db.query("UPDATE user SET tcpid=?  WHERE id=?;", data, function(rdata){
        callback(rdata);
    });
}

//文本转base64
function setbase64file(String){
    var _data  = new Buffer(String).toString('base64');
    return _data;
}

//解码
function getbase64file(base64Str){
    var _data  = new Buffer(base64Str, 'base64').toString();
    return _data;
}








