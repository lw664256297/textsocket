var express = require('express');
var router = express.Router();

//加载socket模块
var tcpServer = require("../service/tcpServer");

//调用socket模块--设置端口--初始化
tcpServer.ISocket(8000);

module.exports = router;