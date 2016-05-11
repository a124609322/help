/*
Navicat MySQL Data Transfer
Source Server         : localhost_3306
Source Server Version : 50547
Source Host           : localhost:3306
Source Database       : help

Target Server Type    : MYSQL
Target Server Version : 50547
File Encoding         : 65001

Date: 2016-05-11 16:59:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `table_help_banner`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_banner`;
CREATE TABLE `table_help_banner` (
  `id` varchar(32) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `pic` varchar(255) NOT NULL,
  `createDate` datetime NOT NULL,
  `creator` varchar(32) NOT NULL,
  `type` int(1) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `noticeid` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `noticeid` (`noticeid`),
  KEY `table_help_banner_ibfk_1` (`creator`),
  CONSTRAINT `table_help_banner_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`),
  CONSTRAINT `table_help_banner_ibfk_2` FOREIGN KEY (`noticeid`) REFERENCES `table_help_notice` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_banner
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_button`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_button`;
CREATE TABLE `table_help_button` (
  `id` varchar(32) NOT NULL,
  `btnname` varchar(10) NOT NULL,
  `btnicon` varchar(20) DEFAULT NULL,
  `handle` varchar(255) DEFAULT NULL,
  `btnclass` varchar(255) DEFAULT NULL,
  `menuid` varchar(32) NOT NULL,
  `sort` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_button
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_cancel`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_cancel`;
CREATE TABLE `table_help_cancel` (
  `id` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_cancel
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_evaluation`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_evaluation`;
CREATE TABLE `table_help_evaluation` (
  `id` varchar(32) NOT NULL,
  `starscore` decimal(10,1) NOT NULL,
  `impress` varchar(255) DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `valuer` varchar(32) NOT NULL,
  `type` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `valuer` (`valuer`),
  CONSTRAINT `table_help_evaluation_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_evaluation_ibfk_2` FOREIGN KEY (`valuer`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_evaluation
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_feedback`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_feedback`;
CREATE TABLE `table_help_feedback` (
  `id` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `table_help_feedback_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_feedback
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_helpinfo`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_helpinfo`;
CREATE TABLE `table_help_helpinfo` (
  `id` varchar(32) NOT NULL,
  `title` varchar(20) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `typeid` varchar(32) NOT NULL,
  `gps` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `state` int(2) NOT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `shelplistid` varchar(32) DEFAULT NULL,
  `endtime` datetime DEFAULT NULL,
  `code` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `typeid` (`typeid`),
  KEY `shelplistid` (`shelplistid`),
  CONSTRAINT `table_help_helpinfo_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_helpinfo_ibfk_2` FOREIGN KEY (`typeid`) REFERENCES `table_help_type` (`id`),
  CONSTRAINT `table_help_helpinfo_ibfk_3` FOREIGN KEY (`shelplistid`) REFERENCES `table_help_helpinfo_shelplist` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_helpinfo
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_helpinfo_cancel`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_helpinfo_cancel`;
CREATE TABLE `table_help_helpinfo_cancel` (
  `id` varchar(32) NOT NULL,
  `helpinfoid` varchar(32) NOT NULL,
  `helpuserid` varchar(32) NOT NULL,
  `shelpuserid` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `remark` text,
  `impression` varchar(255) DEFAULT NULL,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `helpinfoid` (`helpinfoid`),
  KEY `helpuserid` (`helpuserid`),
  KEY `shelpuserid` (`shelpuserid`),
  CONSTRAINT `table_help_helpinfo_cancel_ibfk_1` FOREIGN KEY (`helpinfoid`) REFERENCES `table_help_helpinfo` (`id`),
  CONSTRAINT `table_help_helpinfo_cancel_ibfk_2` FOREIGN KEY (`helpuserid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_helpinfo_cancel_ibfk_3` FOREIGN KEY (`shelpuserid`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_helpinfo_cancel
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_helpinfo_pay`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_helpinfo_pay`;
CREATE TABLE `table_help_helpinfo_pay` (
  `id` varchar(255) NOT NULL,
  `createdate` datetime DEFAULT NULL,
  `paymoney` decimal(10,2) DEFAULT NULL,
  `payuserid` varchar(255) DEFAULT NULL,
  `shelpuserid` varchar(255) DEFAULT NULL,
  `helpinfoid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payuserid` (`payuserid`),
  KEY `shelpuserid` (`shelpuserid`),
  KEY `helpinfoid` (`helpinfoid`),
  CONSTRAINT `table_help_helpinfo_pay_ibfk_1` FOREIGN KEY (`payuserid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_helpinfo_pay_ibfk_2` FOREIGN KEY (`shelpuserid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_helpinfo_pay_ibfk_3` FOREIGN KEY (`helpinfoid`) REFERENCES `table_help_helpinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_helpinfo_pay
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_helpinfo_pic`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_helpinfo_pic`;
CREATE TABLE `table_help_helpinfo_pic` (
  `id` varchar(32) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdate` datetime NOT NULL,
  `helpinfoid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `hlepinfoid` (`helpinfoid`),
  CONSTRAINT `table_help_helpinfo_pic_ibfk_1` FOREIGN KEY (`helpinfoid`) REFERENCES `table_help_helpinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_helpinfo_pic
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_helpinfo_shelplist`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_helpinfo_shelplist`;
CREATE TABLE `table_help_helpinfo_shelplist` (
  `id` varchar(32) NOT NULL,
  `helpinfoid` varchar(32) NOT NULL,
  `shelpid` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `datetime` datetime DEFAULT NULL,
  `money` decimal(10,2) DEFAULT NULL,
  `state` int(1) NOT NULL,
  `deleted` int(1) NOT NULL,
  `estimatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `helpinfoid` (`helpinfoid`),
  KEY `shelpid` (`shelpid`),
  CONSTRAINT `table_help_helpinfo_shelplist_ibfk_1` FOREIGN KEY (`helpinfoid`) REFERENCES `table_help_helpinfo` (`id`),
  CONSTRAINT `table_help_helpinfo_shelplist_ibfk_2` FOREIGN KEY (`shelpid`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_helpinfo_shelplist
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_manager`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_manager`;
CREATE TABLE `table_help_manager` (
  `id` varchar(32) NOT NULL,
  `managername` varchar(255) DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `code` varchar(20) NOT NULL,
  `idcardno` varchar(255) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL,
  `creator` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_manager_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_manager
-- ----------------------------
INSERT INTO `table_help_manager` VALUES ('0', '泰兴管理员', '2016-03-28 17:22:50', '1', null, null, '10001', null, null, null);

-- ----------------------------
-- Table structure for `table_help_manager_acount`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_manager_acount`;
CREATE TABLE `table_help_manager_acount` (
  `id` varchar(32) NOT NULL,
  `acountname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` int(1) NOT NULL,
  `managerid` varchar(32) NOT NULL,
  `deleted` int(11) NOT NULL,
  `createdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `managerid` (`managerid`),
  CONSTRAINT `table_help_manager_acount_ibfk_1` FOREIGN KEY (`managerid`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_manager_acount
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_manager_login_log`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_manager_login_log`;
CREATE TABLE `table_help_manager_login_log` (
  `id` varchar(32) NOT NULL,
  `managerid` varchar(32) NOT NULL,
  `token` varchar(32) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `state` int(1) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `mac` varchar(255) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `host` varchar(255) DEFAULT NULL,
  `deviceid` varchar(255) DEFAULT NULL,
  `devicetype` int(11) DEFAULT NULL,
  `sessionid` varchar(255) DEFAULT NULL,
  `validation` int(11) DEFAULT NULL,
  `extend` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `managerid` (`managerid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_manager_login_log
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_manager_modifylog`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_manager_modifylog`;
CREATE TABLE `table_help_manager_modifylog` (
  `id` varchar(32) NOT NULL,
  `modifydate` datetime NOT NULL,
  `type` varchar(20) NOT NULL,
  `deleted` int(1) NOT NULL,
  `remark` text,
  `modifyid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_manager_modifylog
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_manager_role`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_manager_role`;
CREATE TABLE `table_help_manager_role` (
  `id` varchar(32) NOT NULL DEFAULT '',
  `managerid` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `creator` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `managerid` (`managerid`),
  KEY `roleid` (`roleid`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_manager_role_ibfk_1` FOREIGN KEY (`managerid`) REFERENCES `table_help_manager` (`id`),
  CONSTRAINT `table_help_manager_role_ibfk_2` FOREIGN KEY (`roleid`) REFERENCES `table_help_manager_role` (`id`),
  CONSTRAINT `table_help_manager_role_ibfk_3` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_manager_role
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_menu`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_menu`;
CREATE TABLE `table_help_menu` (
  `id` varchar(32) NOT NULL,
  `menuname` varchar(20) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `parentId` varchar(32) DEFAULT NULL,
  `sort` int(2) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parentId` (`parentId`) USING BTREE,
  CONSTRAINT `table_help_menu_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `table_help_menu` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_menu
-- ----------------------------
INSERT INTO `table_help_menu` VALUES ('0', '用户管理', null, null, '1', '0xf0c0');
INSERT INTO `table_help_menu` VALUES ('1', '网站设置', null, null, '2', '0xf085');
INSERT INTO `table_help_menu` VALUES ('10', '物流信息管理', 'logisticsModule', '2', '2', '0xf0d1');
INSERT INTO `table_help_menu` VALUES ('2', '运单管理', null, null, '0', '0xf0c5');
INSERT INTO `table_help_menu` VALUES ('3', '管理员管理', 'managerModule', '0', '0', '0xf007');
INSERT INTO `table_help_menu` VALUES ('4', '角色管理', 'roleModule', '0', '1', '0xf0f0');
INSERT INTO `table_help_menu` VALUES ('5', '网站公告', 'noticeModule', '1', '3', '0xf022');
INSERT INTO `table_help_menu` VALUES ('6', '友情链接', 'linkModule', '1', '1', '0xf08c');
INSERT INTO `table_help_menu` VALUES ('7', '运单信息管理', 'waybillModule', '2', '0', '0xf0f6');
INSERT INTO `table_help_menu` VALUES ('8', 'Banner管理', 'bannerModule', '1', '0', '0xf03e');
INSERT INTO `table_help_menu` VALUES ('9', '运单回收站', 'recyclebinModule', '2', '3', '0xf014');

-- ----------------------------
-- Table structure for `table_help_notice`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_notice`;
CREATE TABLE `table_help_notice` (
  `id` varchar(32) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `content` text,
  `creator` varchar(32) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_notice_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_notice
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_question`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_question`;
CREATE TABLE `table_help_question` (
  `id` varchar(32) NOT NULL,
  `title` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `typeid` varchar(32) NOT NULL,
  `creator` varchar(255) NOT NULL,
  `createdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeid` (`typeid`),
  CONSTRAINT `table_help_question_ibfk_1` FOREIGN KEY (`typeid`) REFERENCES `table_help_question_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_question
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_question_evaluate`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_question_evaluate`;
CREATE TABLE `table_help_question_evaluate` (
  `id` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `questionid` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `value` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `questionid` (`questionid`),
  CONSTRAINT `table_help_question_evaluate_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_question_evaluate_ibfk_2` FOREIGN KEY (`questionid`) REFERENCES `table_help_question` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_question_evaluate
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_question_type`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_question_type`;
CREATE TABLE `table_help_question_type` (
  `id` varchar(32) NOT NULL,
  `typename` varchar(20) NOT NULL,
  `creator` varchar(32) NOT NULL,
  `createtime` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_question_type_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_question_type
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_role`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_role`;
CREATE TABLE `table_help_role` (
  `id` varchar(32) NOT NULL,
  `rolename` varchar(20) NOT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `descp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_role
-- ----------------------------
INSERT INTO `table_help_role` VALUES ('0', '超级管理员', '2016-03-29 09:53:14', '1', null);
INSERT INTO `table_help_role` VALUES ('1', '小小管理员', '2016-03-29 10:12:17', '1', null);

-- ----------------------------
-- Table structure for `table_help_role_button`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_role_button`;
CREATE TABLE `table_help_role_button` (
  `id` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  `buttonid` varchar(32) NOT NULL,
  `createtime` datetime NOT NULL,
  `creator` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleid` (`roleid`),
  KEY `bottonid` (`buttonid`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_role_button_ibfk_1` FOREIGN KEY (`roleid`) REFERENCES `table_help_role` (`id`),
  CONSTRAINT `table_help_role_button_ibfk_2` FOREIGN KEY (`buttonid`) REFERENCES `table_help_button` (`id`),
  CONSTRAINT `table_help_role_button_ibfk_3` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_role_button
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_role_menu`;
CREATE TABLE `table_help_role_menu` (
  `id` varchar(32) NOT NULL,
  `roleid` varchar(32) NOT NULL,
  `menuid` varchar(32) NOT NULL,
  `createtime` datetime NOT NULL,
  `creator` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleid` (`roleid`),
  KEY `menuid` (`menuid`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_role_menu_ibfk_1` FOREIGN KEY (`roleid`) REFERENCES `table_help_role` (`id`),
  CONSTRAINT `table_help_role_menu_ibfk_2` FOREIGN KEY (`menuid`) REFERENCES `table_help_menu` (`id`),
  CONSTRAINT `table_help_role_menu_ibfk_3` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_role_menu
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_shelp_rewards`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_shelp_rewards`;
CREATE TABLE `table_help_shelp_rewards` (
  `id` varchar(32) NOT NULL,
  `type` int(1) NOT NULL,
  `createdate` datetime NOT NULL,
  `creator` varchar(32) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime NOT NULL,
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_shelp_rewards_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_shelp_rewards
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_type`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_type`;
CREATE TABLE `table_help_type` (
  `id` varchar(32) NOT NULL,
  `typename` varchar(20) NOT NULL,
  `parenid` varchar(32) DEFAULT NULL,
  `createtime` datetime NOT NULL,
  `creator` varchar(32) NOT NULL,
  `deleted` int(1) NOT NULL,
  `isleaf` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `parenid` (`parenid`),
  KEY `creator` (`creator`),
  CONSTRAINT `table_help_type_ibfk_1` FOREIGN KEY (`parenid`) REFERENCES `table_help_type` (`id`),
  CONSTRAINT `table_help_type_ibfk_2` FOREIGN KEY (`creator`) REFERENCES `table_help_manager` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_type
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user`;
CREATE TABLE `table_help_user` (
  `id` varchar(32) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `headerpic` varchar(255) NOT NULL,
  `sex` int(1) DEFAULT NULL,
  `age` varchar(255) DEFAULT NULL,
  `cellphonenumber` varchar(20) NOT NULL,
  `signature` varchar(255) DEFAULT NULL,
  `level` varchar(20) NOT NULL,
  `score` bigint(20) DEFAULT NULL,
  `experience` bigint(20) DEFAULT NULL,
  `realname` varchar(20) DEFAULT NULL,
  `idcardno` varchar(20) DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `forbidden` int(1) DEFAULT NULL,
  `starscore` decimal(10,1) DEFAULT NULL,
  `shelpimpress` varchar(255) DEFAULT NULL,
  `helpimpress` varchar(255) DEFAULT NULL,
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '余额',
  `rake` decimal(10,2) DEFAULT NULL COMMENT '抽成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_account`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_account`;
CREATE TABLE `table_help_user_account` (
  `id` varchar(32) NOT NULL,
  `accountname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `type` int(1) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `deleted` int(1) NOT NULL,
  `createdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `table_help_user_account_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_account
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_cashflow`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_cashflow`;
CREATE TABLE `table_help_user_cashflow` (
  `id` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `paymoney` decimal(10,2) NOT NULL,
  `payuserid` varchar(32) NOT NULL,
  `shelpuserid` varchar(2) NOT NULL,
  `helpinfoid` varchar(2) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payuserid` (`payuserid`),
  KEY `shelpuserid` (`shelpuserid`),
  KEY `helpinfoid` (`helpinfoid`),
  CONSTRAINT `table_help_user_cashflow_ibfk_1` FOREIGN KEY (`payuserid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_user_cashflow_ibfk_2` FOREIGN KEY (`shelpuserid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_user_cashflow_ibfk_3` FOREIGN KEY (`helpinfoid`) REFERENCES `table_help_helpinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_cashflow
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_complaint`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_complaint`;
CREATE TABLE `table_help_user_complaint` (
  `id` varchar(32) NOT NULL,
  `complainant` varchar(32) NOT NULL,
  `bcomplainant` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  `state` int(1) NOT NULL,
  `deleted` int(1) NOT NULL,
  `type` int(2) NOT NULL,
  `content` text,
  `pic1` varchar(255) DEFAULT NULL,
  `pic2` varchar(255) DEFAULT NULL,
  `pic3` varchar(255) DEFAULT NULL,
  `pic4` varchar(255) DEFAULT NULL,
  `pic5` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `complainant` (`complainant`),
  KEY `bcomplainant` (`bcomplainant`),
  CONSTRAINT `table_help_user_complaint_ibfk_1` FOREIGN KEY (`complainant`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_user_complaint_ibfk_2` FOREIGN KEY (`bcomplainant`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_complaint
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_helptype`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_helptype`;
CREATE TABLE `table_help_user_helptype` (
  `id` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `typeid` varchar(32) NOT NULL,
  `createdate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `typeid` (`typeid`),
  CONSTRAINT `table_help_user_helptype_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_user_helptype_ibfk_2` FOREIGN KEY (`typeid`) REFERENCES `table_help_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_helptype
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_login_log`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_login_log`;
CREATE TABLE `table_help_user_login_log` (
  `id` varchar(32) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `token` varchar(2) NOT NULL,
  `code` varchar(32) DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `state` int(1) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `mac` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `deviceid` varchar(255) DEFAULT NULL,
  `devicetype` int(11) DEFAULT NULL,
  `sessionid` varchar(255) DEFAULT NULL,
  `validation` int(11) DEFAULT NULL,
  `extend` varchar(255) DEFAULT NULL,
  `deleted` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `table_help_user_login_log_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_login_log
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_message`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_message`;
CREATE TABLE `table_help_user_message` (
  `id` varchar(32) NOT NULL,
  `sender` varchar(32) NOT NULL,
  `receiver` varchar(32) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `state` int(1) NOT NULL,
  `type` int(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `table_help_user_message_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_user_message_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_message
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_modifylog`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_modifylog`;
CREATE TABLE `table_help_user_modifylog` (
  `id` varchar(32) NOT NULL,
  `modifydate` datetime NOT NULL,
  `type` varchar(20) NOT NULL,
  `deleted` int(1) NOT NULL,
  `remark` text,
  `modifyid` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_modifylog
-- ----------------------------

-- ----------------------------
-- Table structure for `table_help_user_type`
-- ----------------------------
DROP TABLE IF EXISTS `table_help_user_type`;
CREATE TABLE `table_help_user_type` (
  `id` varchar(255) NOT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `typeid` varchar(255) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `typeid` (`typeid`),
  CONSTRAINT `table_help_user_type_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`),
  CONSTRAINT `table_help_user_type_ibfk_2` FOREIGN KEY (`typeid`) REFERENCES `table_help_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_help_user_type
-- ----------------------------

-- ----------------------------
-- Table structure for `table_user_coupon`
-- ----------------------------
DROP TABLE IF EXISTS `table_user_coupon`;
CREATE TABLE `table_user_coupon` (
  `id` varchar(32) NOT NULL,
  `type` int(2) NOT NULL,
  `userid` varchar(32) NOT NULL,
  `validtime` datetime NOT NULL,
  `createdate` datetime NOT NULL,
  `deleted` int(1) NOT NULL,
  `state` int(1) NOT NULL,
  `value` decimal(10,2) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `title` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `table_user_coupon_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `table_help_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of table_user_coupon
-- ----------------------------
