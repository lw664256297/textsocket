/*
 Navicat Premium Data Transfer

 Source Server         : apiserver
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : rm-wz9mvfqy86149wt4wko.mysql.rds.aliyuncs.com:3306
 Source Schema         : textweb

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 21/08/2020 11:09:41
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for text_main
-- ----------------------------
DROP TABLE IF EXISTS `text_main`;
CREATE TABLE `text_main` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `text_main` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `user` text,
  `pwd` text,
  `login_time` text,
  `offline_time` text,
  `pc_ip` text,
  `state` int(11) DEFAULT NULL,
  `tcpid` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for useradmin
-- ----------------------------
DROP TABLE IF EXISTS `useradmin`;
CREATE TABLE `useradmin` (
  `id` int(255) unsigned NOT NULL AUTO_INCREMENT,
  `user` text,
  `pwd` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of useradmin
-- ----------------------------
BEGIN;
INSERT INTO `useradmin` VALUES (2, 'admin', 'admin123');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
