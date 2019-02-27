// 引用mysql 模块
var mysql  = require('mysql');
/**
 *    获得链接对象
 * @returns {*}   链接对象
 */
function getConAPI(){
    var con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'147258369!aA',
        database:'textweb'
    });

    return con;
}
//crud操作
function query(sql,param,func){
    var con = getConAPI();
    if(!func){
        func = param;
        param = [];
    }
    con.query(sql,param,function(e,r){
        if(e){
            console.log("服务器出错："+e);
        }else{
            func(r);
        }
        //关闭连接
        con.end();
    });
}

exports.getCon = getConAPI;
exports.query = query;
