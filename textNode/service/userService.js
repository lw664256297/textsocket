var userDAO = require("../dao/UserDao");

//登录
exports.login = function(data, callback){
    var logindata = [data[0], data[1]];
    var addlogindata = [data[3], data[2]];

	userDAO.loginuser(logindata, function(rdata){
        //判断是否有账号
        if(rdata.length > 0){
            //判断是否已经登录了--参数id
            userDAO.islogindan(rdata[0].id + "", function(rstate){
                //0是没登录  1已经登录了
                if(rstate[0].state == "0"){
                    var _editlogindan = ["1", rdata[0].id + ""];
                    //设置登录状态
                    userDAO.editlogindan(_editlogindan, function(editstate){
                        addlogindata[2] = rdata[0].id + "";
                        //增加登录信息
                        userDAO.editlogintime(addlogindata, function(logincall){
                            //获取文本信息
                            userDAO.gettext(data, function(rrdata){
                                var _rrdata = {
                                    data:rrdata,
                                    id:rdata[0].id + "",
                                    state:"0"
                                }
                                callback(_rrdata);
                            })
                            
                        }); 
                    })
                }else{
                    var _rrdata = {
                        state:"1"
                    }
                    callback(_rrdata);

                }
            })          

        }else{
            var _rrdata = {
                    state:"2"
                }
            callback(_rrdata);
        }
	})
    return;
}
//管理员登录
exports.adminlogin = function(data, callback){
    userDAO.adminlogin(data, function(rdata){
        if(rdata.length > 0 ){
            callback(true);
        }else{
            callback(false)
        }
    })
    return;
}

//增加用户账号
exports.adduser = function(data, callback){
	userDAO.adduser(data, function(rdata){
		if(rdata.length > 0 ){
            callback(true);
        }else{
            callback(false)
        }
	})
    return;
}

//查询内容--查询条数数据
exports.queryinfodao = function(data, callback){
    userDAO.queryinfodao(data,function(rdata){
        callback(rdata);
    });
    return;
}

//退出登录
exports.outlogin = function(data, callback){
    userDAO.outlogin(data,function(rdata){
        callback(rdata);
    });
    return;
}

//查询内容--查询总条数
exports.queryinfototal = function(data, callback){
    userDAO.queryinfototal(data,function(rdata){
        callback(rdata);
    });
    return;
}

//修改密码
exports.edituserpwd = function(data, callback){
    userDAO.edituserpwd(data, function(rdata){
        callback(rdata);
    })
    return;
}

//修改管理员密码
exports.edituserpwdadmin = function(data, callback){
    userDAO.edituserpwdadmin(data, function(rdata){
        callback(rdata);
    })
    return;
}

//姓名查询
exports.queryinfoname = function(data, callback){
    userDAO.queryinfoname(data, function(rdata){
        callback(rdata);
    })
    return;
}

//删除
exports.deldatalist = function(data, callback){
    userDAO.deldatalist(data, function(rdata){
        callback(rdata);
    })
    return;
}

//获取文本信息
exports.gettext = function(data, callback){
    userDAO.gettext(data, function(rdata){
        callback(rdata)
    })
    return;
}

//退出登录
exports.editlogindan = function(data, callback){
    userDAO.editlogindan(data, function(rdata){
        callback(rdata)
    })
    return;
}

