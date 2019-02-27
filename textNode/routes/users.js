var express = require('express');
var router = express.Router();

var userService = require("../service/userService");
//文件服务
var fileService = require("../service/fileService");

//管理员登录
router.post('/adminlogin', function(req, res, next) {
  var _data = [req.body.username, req.body.pwd];
    userService.adminlogin(_data, function(rdata){
      if(rdata === true){
        //0表示成功
        //1表示失败
        res.send({status:0});
      }else{
        res.send({status:1});
      }  
    })
});

/* GET users listing. */
//登录
router.post('/login', function(req, res, next) {
  var _data = [
            req.body.username, 
            req.body.pwd,
            req.body.pc_ip,
            req.body.login_time
          ];
    userService.login(_data, function(rrdata){
      //0 没登录 1已经登录了 2没有找到该账号
      if(rrdata.state == "0"){
          res.send({state:0,rdatas:rrdata.data,id:rrdata.id});
      }else if(rrdata.state == "1"){
          res.send({state:1});
      }else{
        res.send({state:2});
      } 
    })
});

//退出登录
router.post('/outlogin', function(req, res, next) {
  var _data = [
            req.body.offline_time,
            req.body.id
          ];
    userService.outlogin(_data, function(rrdata){
       res.send(true);
    })
});

//修改管理员密码
router.post('/edituserpwdadmin', function(req, res, next) {
    var _data = [req.body.pwd];
    userService.edituserpwdadmin(_data, function(rdata){
        res.send({status:0});
    })
});

//增加用户
router.post('/adduser', function(req, res, next) {
  var _data = [req.body.user, req.body.pwd];
    userService.adduser(_data, function(rdata){
      if(rdata === true){
        //0表示成功
        //1表示失败
        res.send({status:0});
      }else{
        res.send({status:1});
      }  
    })
});

//查询所有的账号
router.post('/query_user_info', function(req, res, next) {
    var _data = [req.body.start];
    if(_data[0] == ""){
      var pagedata = [0, 10];
      //查询总数
      userService.queryinfototal(pagedata, function(rdata){
        //查询数据
        userService.queryinfodao(pagedata, function(rrdata){
          res.send({total:rdata, data:rrdata});
        })
      })
    }else{
      let _nubme = [];
      _nubme[0] = parseInt(_data[0]);
      _nubme[1] = 10;
      //查询数据
      userService.queryinfodao(_nubme, function(rrdata){
        res.send({data:rrdata});
      })
    }
});
//修改密码
router.post('/edituserpwd', function(req, res, next) {
    var _data = [req.body.pwd, req.body.id];
    userService.edituserpwd(_data, function(rdata){
        res.send({status:0});
    })
});
//删除
router.post('/deldatalist', function(req, res, next) {
    var _data = [req.body.id];
    userService.deldatalist(_data, function(rdata){
        res.send({status:0});
    })
});

//姓名查询
router.post('/query_name', function(req, res, next) {
    var _data = ["%" + req.body.user + "%"];
    //查询总数
    userService.queryinfoname(_data, function(rdata){
        res.send({data:rdata});
    })
});

//获取文件
router.post('/upfile', function(req, res, next) {
    fileService.upfile(req, function(rdata){
        res.send(rdata);
    })
});

//获取文本信息
router.post('/gettext', function(req, res, next) {
  var _data = [req.body.id];
    userService.gettext(_data, function(rdata){
        res.send(rdata);
    })
});

//关闭登录接口
router.post('/editlogindan', function(req, res, next) {
  var _data = ["0", req.body.id];
    userService.editlogindan(_data, function(rdata){
        res.send(rdata);
    })
});

module.exports = router;
