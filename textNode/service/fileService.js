var fs =  require('fs');
var path = require('path');
var formidable = require('formidable');

var userDAO = require("../dao/UserDao");

exports.upfile = function(data, callback){
	var form = new formidable.IncomingForm();
		//设置文件上传存放地址
        form.uploadDir = __dirname + "/uploads";  
	form.parse(data, function(err, fields, files){
			//报错的时候直接抛出错误
	        if(err){
	            throw err;
	        }
            //拿到扩展名
            var extname = path.extname(files.uploadFile.name);
            //文本的路径
            var oldpath = files.uploadFile.path;
            fs.readFile(oldpath, function(err, data) {
			    // 读取文件失败/错误
			    if (err) {
			        throw err;
			    }
			    // 读取文件成功
			     //console.log(data.toString());

			     var _data = [1, data.toString()];
			     //入库 
			     userDAO.writeTxtData(_data, function(rdata){
			     	//入库成功删除文件
			     	fs.unlink(oldpath,function(error){
					    if(error){
					       return false;
					    }
					    console.log('删除文件成功');
					})
			     	callback(rdata);
			     })
			});
	})
}