/*
Navicat MySQL Data Transfer

Source Server         : 42.96.210.177
Source Server Version : 50151
Source Host           : 42.96.210.177:3306
Source Database       : joffice

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2015-11-13 17:01:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for appointment
-- ----------------------------
DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
  `appointId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `subject` varchar(128) NOT NULL COMMENT '主题',
  `startTime` datetime NOT NULL COMMENT '开始时间',
  `endTime` datetime NOT NULL COMMENT '结束时间',
  `content` varchar(5000) NOT NULL COMMENT '约会内容',
  `notes` varchar(1000) DEFAULT NULL COMMENT '备注',
  `location` varchar(150) NOT NULL COMMENT '地点',
  `inviteEmails` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`appointId`),
  KEY `FK_AP_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='约会管理';

-- ----------------------------
-- Records of appointment
-- ----------------------------
INSERT INTO `appointment` VALUES ('1', '1', '妹子A约会', '2015-11-03 00:00:00', '2055-11-03 00:00:00', '客户联系', '', '北京', '');
INSERT INTO `appointment` VALUES ('2', '1', '上海客户联系', '2015-11-03 00:00:00', '2019-03-03 00:00:00', '客户联系', '', '上海', '');
INSERT INTO `appointment` VALUES ('3', '1', '杭州客户联系', '2015-11-03 00:00:00', '2055-11-03 00:00:00', '杭州客户联系', '', '杭州', '');

-- ----------------------------
-- Table structure for app_function
-- ----------------------------
DROP TABLE IF EXISTS `app_function`;
CREATE TABLE `app_function` (
  `functionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `funKey` varchar(64) NOT NULL COMMENT '权限Key',
  `funName` varchar(128) NOT NULL COMMENT '权限名称',
  PRIMARY KEY (`functionId`),
  UNIQUE KEY `AK_UQ_RSKEY` (`funKey`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of app_function
-- ----------------------------
INSERT INTO `app_function` VALUES ('1', '_AppUserQuery', '查看员工');
INSERT INTO `app_function` VALUES ('2', '_AppUserAdd', '添加员工');
INSERT INTO `app_function` VALUES ('3', '_AppUserEdit', '编辑员工');
INSERT INTO `app_function` VALUES ('4', '_AppUserDel', '删除员工');
INSERT INTO `app_function` VALUES ('5', '_AppRoleList', '查看角色');
INSERT INTO `app_function` VALUES ('6', '_AppRoleAdd', '添加角色');
INSERT INTO `app_function` VALUES ('7', '_AppRoleEdit', '编辑角色');
INSERT INTO `app_function` VALUES ('8', '_AppRoleDel', '删除角色');
INSERT INTO `app_function` VALUES ('9', '_AppRoleGrant', '授权角色');
INSERT INTO `app_function` VALUES ('10', '_DepartmentQuery', '查看部门');
INSERT INTO `app_function` VALUES ('11', '_DepartmentAdd', '新建部门');
INSERT INTO `app_function` VALUES ('12', '_DepartmentEdit', '修改部门');
INSERT INTO `app_function` VALUES ('13', '_DepartmentDel', '删除部门');
INSERT INTO `app_function` VALUES ('14', '_FileAttachQuery', '查看附件');
INSERT INTO `app_function` VALUES ('15', '_FileAttachEdit', '编辑附件');
INSERT INTO `app_function` VALUES ('16', '_FileAttachDel', '删除附件');
INSERT INTO `app_function` VALUES ('17', '_CompanyEdit', '公司信息修改');
INSERT INTO `app_function` VALUES ('18', '_FlowQuery', '查看流程');
INSERT INTO `app_function` VALUES ('19', '_ProTypeManage', '流程类型');
INSERT INTO `app_function` VALUES ('20', '_FlowAdd', '发布流程');
INSERT INTO `app_function` VALUES ('21', '_FlowEdit', '编辑流程');
INSERT INTO `app_function` VALUES ('22', '_FlowDel', '删除流程');
INSERT INTO `app_function` VALUES ('23', '_FlowCheck', '查看');
INSERT INTO `app_function` VALUES ('24', '_FlowSetting', '人员设置');
INSERT INTO `app_function` VALUES ('25', '_DocFolderSharedManage', '公共文件夹管理');
INSERT INTO `app_function` VALUES ('26', '_DocPrivilegeQuery', '查看权限');
INSERT INTO `app_function` VALUES ('27', '_DocPrivilegeAdd', '添加权限');
INSERT INTO `app_function` VALUES ('28', '_DocPrivilegeEdit', '编辑权限');
INSERT INTO `app_function` VALUES ('29', '_DocPrivilegeDel', '删除权限');
INSERT INTO `app_function` VALUES ('30', '_PlanTypeQuery', '查看类型');
INSERT INTO `app_function` VALUES ('31', '_PlanTypeAdd', '添加类型');
INSERT INTO `app_function` VALUES ('32', '_PlanTypeEdit', '编辑类型');
INSERT INTO `app_function` VALUES ('33', '_PlanTypeDel', '删除类型');
INSERT INTO `app_function` VALUES ('34', '_NewDepPlan', '新建部门任务计划');
INSERT INTO `app_function` VALUES ('35', '_NewsQuery', '查看新闻');
INSERT INTO `app_function` VALUES ('36', '_NewsAdd', '添加新闻');
INSERT INTO `app_function` VALUES ('37', '_NewsEdit', '编辑新闻');
INSERT INTO `app_function` VALUES ('38', '_NewsDel', '删除新闻');
INSERT INTO `app_function` VALUES ('39', '_NewsCommentQuery', '查看评论');
INSERT INTO `app_function` VALUES ('40', '_NewsCommentDel', '删除评论');
INSERT INTO `app_function` VALUES ('41', '_NewsTypeQuery', '查看新闻类型');
INSERT INTO `app_function` VALUES ('42', '_NewsTypeAdd', '添加新闻类型');
INSERT INTO `app_function` VALUES ('43', '_NewsTypeEdit', '修改新闻类型');
INSERT INTO `app_function` VALUES ('44', '_NewsTypeDel', '删除新闻类型');
INSERT INTO `app_function` VALUES ('45', '_NoticeQuery', '查看公告');
INSERT INTO `app_function` VALUES ('46', '_NoticeAdd', '添加公告');
INSERT INTO `app_function` VALUES ('47', '_NoticeEdit', '编辑公告');
INSERT INTO `app_function` VALUES ('48', '_NoticeDel', '删除公告');
INSERT INTO `app_function` VALUES ('49', '_HolidayRecordQuery', '查看假期设置');
INSERT INTO `app_function` VALUES ('50', '_HolidayRecordAdd', '添加假期设置');
INSERT INTO `app_function` VALUES ('51', '_HolidayRecordEdit', '修改假期设置');
INSERT INTO `app_function` VALUES ('52', '_HolidayRecordDel', '删除假期设置');
INSERT INTO `app_function` VALUES ('53', '_DutySectonQuery', '查看班次定义');
INSERT INTO `app_function` VALUES ('54', '_DutySectonAdd', '添加班次定义');
INSERT INTO `app_function` VALUES ('55', '_DutySectonEdit', '修改班次定义');
INSERT INTO `app_function` VALUES ('56', '_DutySectonDel', '删除班次定义');
INSERT INTO `app_function` VALUES ('57', '_DutySystemQuery', '查看班制定义');
INSERT INTO `app_function` VALUES ('58', '_DutySystemAdd', '添加班制定义');
INSERT INTO `app_function` VALUES ('59', '_DutySystemEdit', '修改班制定义');
INSERT INTO `app_function` VALUES ('60', '_DutySystemDel', '删除班制定义');
INSERT INTO `app_function` VALUES ('61', '_DutyQuery', '查看排班');
INSERT INTO `app_function` VALUES ('62', '_DutyAdd', '添加排班');
INSERT INTO `app_function` VALUES ('63', '_DutyEdit', '修改排班');
INSERT INTO `app_function` VALUES ('64', '_DutyDel', '删除排班');
INSERT INTO `app_function` VALUES ('65', '_DutyRegisterQuery', '查看考勤信息');
INSERT INTO `app_function` VALUES ('66', '_DutyRegisterAdd', '补签');
INSERT INTO `app_function` VALUES ('67', '_DutyRegisterDel', '删除考勤信息');
INSERT INTO `app_function` VALUES ('68', '_CustomerQuery', '查看客户信息');
INSERT INTO `app_function` VALUES ('69', '_CustomerAdd', '添加客户信息');
INSERT INTO `app_function` VALUES ('70', '_CustomerEdit', '编辑客户信息');
INSERT INTO `app_function` VALUES ('71', '_CustomerDel', '删除客户信息');
INSERT INTO `app_function` VALUES ('72', '_CusLinkmanQuery', '查看联系人信息');
INSERT INTO `app_function` VALUES ('73', '_CusLinkmanAdd', '添加联系人');
INSERT INTO `app_function` VALUES ('74', '_CusLinkmanEdit', '编辑联系人');
INSERT INTO `app_function` VALUES ('75', '_CusLinkmanDel', '删除联系人');
INSERT INTO `app_function` VALUES ('76', '_CusConnectionQuery', '查看交往信息');
INSERT INTO `app_function` VALUES ('77', '_CusConnectionAdd', '添加交往信息');
INSERT INTO `app_function` VALUES ('78', '_CusConnectionEdit', '编辑交往信息');
INSERT INTO `app_function` VALUES ('79', '_CusConnectionDel', '删除交往信息');
INSERT INTO `app_function` VALUES ('80', '_ProjectQuery', '查看项目');
INSERT INTO `app_function` VALUES ('81', '_ProjectAdd', '添加项目');
INSERT INTO `app_function` VALUES ('82', '_ProjectEdit', '编辑项目');
INSERT INTO `app_function` VALUES ('83', '_ProjectDel', '删除项目');
INSERT INTO `app_function` VALUES ('84', '_ContractQuery', '查看合同');
INSERT INTO `app_function` VALUES ('85', '_ContractAdd', '添加合同');
INSERT INTO `app_function` VALUES ('86', '_ContractEdit', '编辑合同');
INSERT INTO `app_function` VALUES ('87', '_ContractDel', '删除合同');
INSERT INTO `app_function` VALUES ('88', '_ProductQuery', '查看产品');
INSERT INTO `app_function` VALUES ('89', '_ProductAdd', '添加产品');
INSERT INTO `app_function` VALUES ('90', '_ProductEdit', '编辑产品');
INSERT INTO `app_function` VALUES ('91', '_ProductDel', '删除产品');
INSERT INTO `app_function` VALUES ('92', '_ProviderQuery', '查看供应商');
INSERT INTO `app_function` VALUES ('93', '_ProviderAdd', '添加供应商');
INSERT INTO `app_function` VALUES ('94', '_ProviderEdit', '编辑供应商');
INSERT INTO `app_function` VALUES ('95', '_ProviderDel', '删除供应商');
INSERT INTO `app_function` VALUES ('96', '_OfficeGoodsQuery', '查看办公用品');
INSERT INTO `app_function` VALUES ('97', '_OfficeGoodsTypeManage', '用品类型管理');
INSERT INTO `app_function` VALUES ('98', '_OfficeGoodsAdd', '添加用品');
INSERT INTO `app_function` VALUES ('99', '_OfficeGoodsEdit', '编辑用品');
INSERT INTO `app_function` VALUES ('100', '_OfficeGoodsDel', '删除用品');
INSERT INTO `app_function` VALUES ('101', '_InStockQuery', '查看入库记录');
INSERT INTO `app_function` VALUES ('102', '_InStockAdd', '添加入库记录');
INSERT INTO `app_function` VALUES ('103', '_InStockEdit', '编辑入库记录');
INSERT INTO `app_function` VALUES ('104', '_InStockDel', '删除入库记录');
INSERT INTO `app_function` VALUES ('105', '_GoodsApplyQuery', '查看申请记录');
INSERT INTO `app_function` VALUES ('106', '_GoodsApplyAdd', '添加申请记录');
INSERT INTO `app_function` VALUES ('107', '_GoodsApplyEdit', '编辑申请记录');
INSERT INTO `app_function` VALUES ('108', '_GoodsApplyDel', '删除申请记录');
INSERT INTO `app_function` VALUES ('109', '_CarQuery', '查看车辆');
INSERT INTO `app_function` VALUES ('110', '_CarAdd', '添加车辆');
INSERT INTO `app_function` VALUES ('111', '_CarEdit', '编辑车辆');
INSERT INTO `app_function` VALUES ('112', '_CarDel', '删除车辆');
INSERT INTO `app_function` VALUES ('113', '_CarRepairQuery', '查看维修记录');
INSERT INTO `app_function` VALUES ('114', '_CarRepairAdd', '添加维修记录');
INSERT INTO `app_function` VALUES ('115', '_CarRepairEdit', '编辑维修记录');
INSERT INTO `app_function` VALUES ('116', '_CarRepairDel', '删除维修记录');
INSERT INTO `app_function` VALUES ('117', '_CarApplyQuery', '查看车辆申请记录');
INSERT INTO `app_function` VALUES ('118', '_CarApplyAdd', '添加申请记录');
INSERT INTO `app_function` VALUES ('119', '_CarApplyEdit', '编辑申请记录');
INSERT INTO `app_function` VALUES ('120', '_CarApplyDel', '删除申请记录');
INSERT INTO `app_function` VALUES ('121', '_DepreTypeQuery', '查看折算类型');
INSERT INTO `app_function` VALUES ('122', '_DepreTypeAdd', '添加类型');
INSERT INTO `app_function` VALUES ('123', '_DepreTypeEdit', '编辑类型');
INSERT INTO `app_function` VALUES ('124', '_DepreTypeDel', '删除类型');
INSERT INTO `app_function` VALUES ('125', '_FixedAssetsQuery', '查看固定资产');
INSERT INTO `app_function` VALUES ('126', '_AssetsTypeManage', '资产类型管理');
INSERT INTO `app_function` VALUES ('127', '_FixedAssetsAdd', '添加资产');
INSERT INTO `app_function` VALUES ('128', '_FixedAssetsEdit', '编辑资产');
INSERT INTO `app_function` VALUES ('129', '_FixedAssetsDel', '删除资产');
INSERT INTO `app_function` VALUES ('130', '_Depreciate', '进行折算');
INSERT INTO `app_function` VALUES ('131', '_DepreRecordQuery', '查看折算记录');
INSERT INTO `app_function` VALUES ('132', '_BookTypeQuery', '查看类型');
INSERT INTO `app_function` VALUES ('133', '_BookTypeAdd', '添加图书类别');
INSERT INTO `app_function` VALUES ('134', '_BookTypeEdit', '编辑图书类别');
INSERT INTO `app_function` VALUES ('135', '_BookTypeDel', '删除图书类别');
INSERT INTO `app_function` VALUES ('136', '_BookQuery', '查看图书');
INSERT INTO `app_function` VALUES ('137', '_BookAdd', '添加图书');
INSERT INTO `app_function` VALUES ('138', '_BookEdit', '编辑图书');
INSERT INTO `app_function` VALUES ('139', '_BookDel', '删除图书');
INSERT INTO `app_function` VALUES ('140', '_BookBorrowQuery', '查看记录');
INSERT INTO `app_function` VALUES ('141', '_BookBorrowAdd', '添加借阅记录');
INSERT INTO `app_function` VALUES ('142', '_BookBorrowEdit', '编辑借阅记录');
INSERT INTO `app_function` VALUES ('143', '_BookReturn', '归还');
INSERT INTO `app_function` VALUES ('144', '_BookBorrowDel', '删除借阅记录');
INSERT INTO `app_function` VALUES ('145', '_BookReturnQuery', '查看记录');
INSERT INTO `app_function` VALUES ('146', '_BookReturnAdd', '添加归还记录');
INSERT INTO `app_function` VALUES ('147', '_BookReturnEdit', '编辑归还记录');
INSERT INTO `app_function` VALUES ('148', '_BookReturnDel', '删除归还记录');
INSERT INTO `app_function` VALUES ('149', '_ReportTemplateQuery', '查看报表');
INSERT INTO `app_function` VALUES ('150', '_ReportTemplateAdd', '添加报表');
INSERT INTO `app_function` VALUES ('151', '_ReportTemplateEdit', '编辑报表');
INSERT INTO `app_function` VALUES ('152', '_ReportParamSetting', '参数设置');
INSERT INTO `app_function` VALUES ('153', '_ReportTemplateDel', '删除报表');
INSERT INTO `app_function` VALUES ('154', '_DictionaryQuery', '查看字典');
INSERT INTO `app_function` VALUES ('155', '_DictionaryAdd', '添加');
INSERT INTO `app_function` VALUES ('156', '_DictionaryEdit', '编辑');
INSERT INTO `app_function` VALUES ('157', '_DictionaryDel', '删除');
INSERT INTO `app_function` VALUES ('158', '_JobQuery', '查看');
INSERT INTO `app_function` VALUES ('159', '_JobAdd', '添加');
INSERT INTO `app_function` VALUES ('160', '_JobEdit', '编辑');
INSERT INTO `app_function` VALUES ('161', '_JobDel', '删除');
INSERT INTO `app_function` VALUES ('162', '_JobRec', '恢复职位');
INSERT INTO `app_function` VALUES ('163', '_EmpProfileReg', '登记');
INSERT INTO `app_function` VALUES ('164', '_EmpProfileQuery', '查看');
INSERT INTO `app_function` VALUES ('165', '_EmpProfileAdd', '登记');
INSERT INTO `app_function` VALUES ('166', '_EmpProfileEdit', '编辑');
INSERT INTO `app_function` VALUES ('167', '_EmpProfileDel', '删除');
INSERT INTO `app_function` VALUES ('168', '_EmpProfileCheck', '审核');
INSERT INTO `app_function` VALUES ('169', '_EmpProfileRec', '恢复档案');
INSERT INTO `app_function` VALUES ('170', '_SalaryItemQuery', '查看');
INSERT INTO `app_function` VALUES ('171', '_SalaryItemAdd', '添加');
INSERT INTO `app_function` VALUES ('172', '_SalaryItemEdit', '编辑');
INSERT INTO `app_function` VALUES ('173', '_SalaryItemDel', '删除');
INSERT INTO `app_function` VALUES ('174', '_StandSalaryReg', '制定');
INSERT INTO `app_function` VALUES ('175', '_StandSalaryQuery', '查看');
INSERT INTO `app_function` VALUES ('176', '_StandSalaryAdd', '制定');
INSERT INTO `app_function` VALUES ('177', '_StandSalaryEdit', '编辑');
INSERT INTO `app_function` VALUES ('178', '_StandSalaryDel', '删除');
INSERT INTO `app_function` VALUES ('179', '_StandSalaryCheck', '审核');
INSERT INTO `app_function` VALUES ('180', '_SalaryPayoffReg', '登记');
INSERT INTO `app_function` VALUES ('181', '_SalaryPayoffQuery', '查看');
INSERT INTO `app_function` VALUES ('182', '_SalaryPayoffAdd', '登记');
INSERT INTO `app_function` VALUES ('183', '_SalaryPayoffEdit', '编辑');
INSERT INTO `app_function` VALUES ('184', '_SalaryPayoffDel', '删除');
INSERT INTO `app_function` VALUES ('185', '_SalaryPayoffCheck', '审核');
INSERT INTO `app_function` VALUES ('186', '_JobChangeReg', '登记');
INSERT INTO `app_function` VALUES ('187', '_JobChangeQuery', '查看');
INSERT INTO `app_function` VALUES ('188', '_JobChangeAdd', '登记');
INSERT INTO `app_function` VALUES ('189', '_JobChangeEdit', '编辑');
INSERT INTO `app_function` VALUES ('190', '_JobChangeDel', '删除');
INSERT INTO `app_function` VALUES ('191', '_JobChangeCheck', '审核');
INSERT INTO `app_function` VALUES ('192', '_HireIssueQuery', '查看');
INSERT INTO `app_function` VALUES ('193', '_HireIssueAdd', '添加');
INSERT INTO `app_function` VALUES ('194', '_HireIssueEdit', '编辑');
INSERT INTO `app_function` VALUES ('195', '_HireIssueDel', '删除');
INSERT INTO `app_function` VALUES ('196', '_HireIssueCheck', '审核');
INSERT INTO `app_function` VALUES ('197', '_ResumeQuery', '查看');
INSERT INTO `app_function` VALUES ('198', '_ResumeAdd', '添加');
INSERT INTO `app_function` VALUES ('199', '_ResumeEdit', '编辑');
INSERT INTO `app_function` VALUES ('200', '_ResumeDel', '删除');

-- ----------------------------
-- Table structure for app_role
-- ----------------------------
DROP TABLE IF EXISTS `app_role`;
CREATE TABLE `app_role` (
  `roleId` bigint(20) NOT NULL AUTO_INCREMENT,
  `roleName` varchar(128) NOT NULL COMMENT '角色名称',
  `roleDesc` varchar(128) DEFAULT NULL COMMENT '角色描述',
  `status` smallint(6) NOT NULL COMMENT '状态',
  `rights` varchar(2000) DEFAULT NULL,
  `isDefaultIn` smallint(6) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of app_role
-- ----------------------------
INSERT INTO `app_role` VALUES ('-1', '超级管理员', '超级管理员,具有所有权限', '1', '__ALL', '0');
INSERT INTO `app_role` VALUES ('1', '[人事经理]', '管理人事的经理', '1', 'SystemSetting,AppUserView,_AppUserQuery,_AppUserAdd,_AppUserEdit,_AppUserDel,DepartmentView,_DepartmentQuery,_DepartmentAdd,_DepartmentEdit,_DepartmentDel,PublicDocument,NewPublicDocumentForm,Task,NewWorkPlanForm,_NewDepPlan,Personal,PersonalDuty,SignInOffView,ErrandsRegisterView,ErrandsRegisterOutView,DutyManager,Duty,HolidayRecordView,_HolidayRecordQuery,_HolidayRecordAdd,_HolidayRecordEdit,_HolidayRecordDel,DutySectionView,_DutySectonQuery,_DutySectonAdd,_DutySectonEdit,_DutySectonDel,DutySystemView,_DutySystemQuery,_DutySystemAdd,_DutySystemEdit,_DutySystemDel,DutyView,_DutyQuery,_DutyAdd,_DutyEdit,_DutyDel,DutyRegisterView,_DutyRegisterQuery,_DutyRegisterAdd,_DutyRegisterDel', '1');
INSERT INTO `app_role` VALUES ('2', '[行政经理]', '管理行政', '1', 'SystemSetting,PublicDocument,NewPublicDocumentForm,Task,NewWorkPlanForm,_NewDepPlan,Personal,PersonalDuty,SignInOffView,ErrandsRegisterView,ErrandsRegisterOutView,Administrator,GoodManeger,OfficeGoodsManageView,_OfficeGoodsQuery,_OfficeGoodsTypeManage,_OfficeGoodsAdd,_OfficeGoodsEdit,_OfficeGoodsDel,InStockView,_InStockQuery,_InStockAdd,_InStockEdit,_InStockDel,GoodsApplyView,_GoodsApplyQuery,_GoodsApplyAdd,_GoodsApplyEdit,_GoodsApplyDel,CarManeger,CarView,_CarQuery,_CarAdd,_CarEdit,_CarDel,CartRepairView,_CarRepairQuery,_CarRepairAdd,_CarRepairEdit,_CarRepairDel,CarApplyView,_CarApplyQuery,_CarApplyAdd,_CarApplyEdit,_CarApplyDel,FixedAssetsManage,DepreTypeView,_DepreTypeQuery,_DepreTypeAdd,_DepreTypeEdit,_DepreTypeDel,FixedAssetsManageView,_FixedAssetsQuery,_AssetsTypeManage,_FixedAssetsAdd,_FixedAssetsEdit,_FixedAssetsDel,_Depreciate,DepreRecordView,_DepreRecordQuery,BookManager,BookTypeView,_BookTypeQuery,_BookTypeAdd,_BookTypeEdit,_BookTypeDel,BookManageView,_BookQuery,_BookAdd,_BookEdit,_BookDel,BookBorrowView,_BookBorrowQuery,_BookBorrowAdd,_BookBorrowEdit,_BookReturn,_BookBorrowDel,BookReturnView,_BookReturnQuery,_BookReturnAdd,_BookReturnEdit,_BookReturnDel', '1');
INSERT INTO `app_role` VALUES ('3', '[文档管理员]', '管理文档', '1', 'SystemSetting,PublicDocument,NewPublicDocumentForm,DocFolderSharedView,_DocFolderSharedManage,_DocPrivilegeQuery,_DocPrivilegeAdd,_DocPrivilegeEdit,_DocPrivilegeDel,Personal,PersonalDuty,SignInOffView,ErrandsRegisterView,ErrandsRegisterOutView', '1');
INSERT INTO `app_role` VALUES ('4', '[信息管理员]', '管理新闻公告等信息', '1', 'SystemSetting,Task,PlanTypeView,_PlanTypeQuery,_PlanTypeAdd,_PlanTypeEdit,_PlanTypeDel,NewWorkPlanForm,_NewDepPlan,Info,NewsView,_NewsQuery,_NewsAdd,_NewsEdit,_NewsDel,NewsCommentView,_NewsCommentQuery,_NewsCommentDel,NewsTypeView,_NewsTypeQuery,_NewsTypeAdd,_NewsTypeEdit,_NewsTypeDel,NoticeView,_NoticeQuery,_NoticeAdd,_NoticeEdit,_NoticeDel,Personal,PersonalDuty,SignInOffView,ErrandsRegisterView,ErrandsRegisterOutView', '1');
INSERT INTO `app_role` VALUES ('5', '[客户经理]', '管理客户信息', '1', 'SystemSetting,PublicDocument,NewPublicDocumentForm,Task,NewWorkPlanForm,_NewDepPlan,Personal,PersonalDuty,SignInOffView,ErrandsRegisterView,ErrandsRegisterOutView,customer,CustomerView,_CustomerQuery,_CustomerAdd,_CustomerEdit,_CustomerDel,CusLinkmanView,_CusLinkmanQuery,_CusLinkmanAdd,_CusLinkmanEdit,_CusLinkmanDel,CusConnectionView,_CusConnectionQuery,_CusConnectionAdd,_CusConnectionEdit,_CusConnectionDel,ProjectView,_ProjectQuery,_ProjectAdd,_ProjectEdit,_ProjectDel,ContractView,_ContractQuery,_ContractAdd,_ContractEdit,_ContractDel,ProductView,_ProductQuery,_ProductAdd,_ProductEdit,_ProductDel,ProviderView,_ProviderQuery,_ProviderAdd,_ProviderEdit,_ProviderDel', '1');
INSERT INTO `app_role` VALUES ('8', 'java', 'java', '1', '', '0');

-- ----------------------------
-- Table structure for app_user
-- ----------------------------
DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `userId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `username` varchar(128) NOT NULL COMMENT '用户名',
  `title` smallint(6) NOT NULL COMMENT '1=先生\r\n            0=女士\r\n            小姐',
  `password` varchar(128) NOT NULL COMMENT '密码',
  `email` varchar(128) NOT NULL COMMENT '邮件',
  `depId` bigint(20) DEFAULT NULL COMMENT '所属部门',
  `position` varchar(32) DEFAULT NULL COMMENT '职位',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话',
  `mobile` varchar(32) DEFAULT NULL COMMENT '手机',
  `fax` varchar(32) DEFAULT NULL COMMENT '传真',
  `address` varchar(64) DEFAULT NULL COMMENT '地址',
  `zip` varchar(32) DEFAULT NULL COMMENT '邮编',
  `photo` varchar(128) DEFAULT NULL COMMENT '相片',
  `accessionTime` datetime NOT NULL COMMENT '入职时间',
  `status` smallint(6) NOT NULL COMMENT '状态\r\n            1=激活\r\n            0=禁用\r\n            2=离职\r\n            ',
  `education` varchar(64) DEFAULT NULL,
  `fullname` varchar(50) NOT NULL,
  `delFlag` smallint(6) NOT NULL COMMENT '0=未删除\r\n            1=删除',
  PRIMARY KEY (`userId`),
  KEY `FK_AU_R_DPT` (`depId`) USING BTREE,
  CONSTRAINT `app_user_ibfk_1` FOREIGN KEY (`depId`) REFERENCES `department` (`depId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='app_user\r\n用户表';

-- ----------------------------
-- Records of app_user
-- ----------------------------
INSERT INTO `app_user` VALUES ('-1', 'system', '1', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=', '152@163.com', '1', null, null, null, null, null, null, null, '2009-12-18 00:00:00', '1', null, '系统', '1');
INSERT INTO `app_user` VALUES ('1', 'admin', '1', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=', '152@163.com', '1', null, null, null, null, null, null, null, '2009-12-18 00:00:00', '1', null, '超级管理员', '0');
INSERT INTO `app_user` VALUES ('2', '__shaxin', '1', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=', 'SHA_XIN@sohu.com', '3', '', '', '', '', '', '', '', '2012-02-28 00:00:00', '0', null, '??', '1');
INSERT INTO `app_user` VALUES ('3', 'xg', '1', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', '1@qq.com', '3', '', '', '', '', '', '', '', '2015-10-21 00:00:00', '1', null, '向刚', '0');
INSERT INTO `app_user` VALUES ('4', 'lc', '1', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', '1@qq.com', '3', '', '', '', '', '', '', '', '2015-10-21 00:00:00', '1', null, '刘冲', '0');
INSERT INTO `app_user` VALUES ('5', 'zc', '1', 'pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=', '1@163.com', '3', '', '', '', '', '', '', '', '2015-10-21 00:00:00', '1', null, '曾成', '0');

-- ----------------------------
-- Table structure for archives
-- ----------------------------
DROP TABLE IF EXISTS `archives`;
CREATE TABLE `archives` (
  `archivesId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) NOT NULL COMMENT '公文类型',
  `typeName` varchar(128) NOT NULL COMMENT '公文类型名称',
  `archivesNo` varchar(100) NOT NULL COMMENT '发文字号',
  `issueDep` varchar(128) NOT NULL COMMENT '发文机关或部门',
  `depId` bigint(20) NOT NULL COMMENT '发文部门ID',
  `subject` varchar(256) NOT NULL COMMENT '文件标题',
  `issueDate` datetime NOT NULL COMMENT '发布日期',
  `status` smallint(6) NOT NULL COMMENT '公文状态\r\n            0=拟稿、修改状态\r\n            1=发文状态\r\n            2=归档状态',
  `shortContent` varchar(1024) DEFAULT NULL COMMENT '内容简介',
  `fileCounts` int(11) NOT NULL DEFAULT '0' COMMENT '文件数',
  `handleOpinion` varchar(512) DEFAULT NULL COMMENT '拟办意见',
  `privacyLevel` varchar(50) DEFAULT '普通' COMMENT '秘密等级\r\n            普通\r\n            秘密\r\n            机密\r\n            绝密',
  `urgentLevel` varchar(50) DEFAULT '普通' COMMENT '紧急程度\r\n            普通\r\n            紧急\r\n            特急\r\n            特提',
  `issuer` varchar(50) DEFAULT NULL COMMENT '发文人',
  `issuerId` bigint(20) DEFAULT NULL COMMENT '发文人ID',
  `keywords` varchar(256) DEFAULT NULL COMMENT '主题词',
  `sources` varchar(50) DEFAULT NULL COMMENT '公文来源\r\n            仅在收文中指定，发公文不需要指定\r\n            上级公文\r\n            下级公文',
  `archType` smallint(6) NOT NULL DEFAULT '0' COMMENT '0=发文 1=收文',
  PRIMARY KEY (`archivesId`),
  KEY `FK_ARV_R_ARVT` (`typeId`) USING BTREE,
  KEY `FK_ARV_R_DPT` (`depId`) USING BTREE,
  CONSTRAINT `archives_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `archives_type` (`typeId`),
  CONSTRAINT `archives_ibfk_2` FOREIGN KEY (`depId`) REFERENCES `department` (`depId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收发公文';

-- ----------------------------
-- Records of archives
-- ----------------------------

-- ----------------------------
-- Table structure for archives_dep
-- ----------------------------
DROP TABLE IF EXISTS `archives_dep`;
CREATE TABLE `archives_dep` (
  `archDepId` bigint(20) NOT NULL COMMENT '主键',
  `signNo` varchar(128) DEFAULT NULL COMMENT '自编号',
  `depId` bigint(20) NOT NULL COMMENT '收文部门',
  `archivesId` bigint(20) NOT NULL COMMENT '所属公文',
  `subject` varchar(256) NOT NULL COMMENT '公文标题',
  `typeId` bigint(20) DEFAULT NULL COMMENT '所属收文分类',
  `status` smallint(6) NOT NULL COMMENT '签收状态\r\n            0=未签收\r\n            1=已签收',
  `signTime` datetime DEFAULT NULL COMMENT '签收日期',
  `signFullname` varchar(64) DEFAULT NULL COMMENT '签收人',
  `handleFeedback` varchar(1024) DEFAULT NULL COMMENT '办理结果反馈',
  `isMain` smallint(6) NOT NULL DEFAULT '1' COMMENT '主送、抄送\r\n            1=主送\r\n            0=抄送',
  PRIMARY KEY (`archDepId`),
  KEY `FK_AVD_R_ARV` (`archivesId`) USING BTREE,
  KEY `FK_AVD_R_DPT` (`depId`) USING BTREE,
  CONSTRAINT `archives_dep_ibfk_1` FOREIGN KEY (`archivesId`) REFERENCES `archives` (`archivesId`),
  CONSTRAINT `archives_dep_ibfk_2` FOREIGN KEY (`depId`) REFERENCES `department` (`depId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of archives_dep
-- ----------------------------

-- ----------------------------
-- Table structure for archives_doc
-- ----------------------------
DROP TABLE IF EXISTS `archives_doc`;
CREATE TABLE `archives_doc` (
  `docId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fileId` bigint(20) DEFAULT NULL,
  `creator` varchar(64) NOT NULL COMMENT '拟稿人',
  `creatorId` bigint(20) NOT NULL COMMENT '拟稿人ID',
  `menderId` bigint(20) DEFAULT NULL,
  `mender` varchar(64) DEFAULT NULL COMMENT '修改人',
  `docName` varchar(128) NOT NULL COMMENT '文档名称',
  `docStatus` smallint(6) NOT NULL COMMENT '文档状态\r\n            0=修改中\r\n            1=修改完成',
  `curVersion` int(11) NOT NULL COMMENT '当前版本\r\n            取当前最新的版本',
  `docPath` varchar(128) NOT NULL COMMENT '文档路径',
  `updatetime` datetime NOT NULL COMMENT '更新时间',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`docId`),
  KEY `FK_ARVC_R_FA` (`fileId`) USING BTREE,
  CONSTRAINT `archives_doc_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of archives_doc
-- ----------------------------

-- ----------------------------
-- Table structure for archives_file
-- ----------------------------
DROP TABLE IF EXISTS `archives_file`;
CREATE TABLE `archives_file` (
  `archivesId` bigint(20) NOT NULL,
  `docId` bigint(20) NOT NULL,
  PRIMARY KEY (`archivesId`,`docId`),
  KEY `FK_ARVF_R_ARVD` (`docId`) USING BTREE,
  CONSTRAINT `archives_file_ibfk_1` FOREIGN KEY (`archivesId`) REFERENCES `archives` (`archivesId`),
  CONSTRAINT `archives_file_ibfk_2` FOREIGN KEY (`docId`) REFERENCES `archives_doc` (`docId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公文附件';

-- ----------------------------
-- Records of archives_file
-- ----------------------------

-- ----------------------------
-- Table structure for archives_type
-- ----------------------------
DROP TABLE IF EXISTS `archives_type`;
CREATE TABLE `archives_type` (
  `typeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL COMMENT '类型名称',
  `typeDesc` varchar(256) DEFAULT NULL COMMENT '类型描述',
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公文类型';

-- ----------------------------
-- Records of archives_type
-- ----------------------------

-- ----------------------------
-- Table structure for arch_template
-- ----------------------------
DROP TABLE IF EXISTS `arch_template`;
CREATE TABLE `arch_template` (
  `templateId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) DEFAULT NULL COMMENT '所属类型',
  `tempName` varchar(128) NOT NULL COMMENT '模板名称',
  `tempPath` varchar(256) NOT NULL COMMENT '路径',
  `fileId` bigint(20) NOT NULL COMMENT '文件ID',
  PRIMARY KEY (`templateId`),
  KEY `FK_AHT_R_FA` (`fileId`) USING BTREE,
  KEY `FK_ART_R_ARVT` (`typeId`) USING BTREE,
  CONSTRAINT `arch_template_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `arch_template_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `archives_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公文模板';

-- ----------------------------
-- Records of arch_template
-- ----------------------------

-- ----------------------------
-- Table structure for assets_type
-- ----------------------------
DROP TABLE IF EXISTS `assets_type`;
CREATE TABLE `assets_type` (
  `assetsTypeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`assetsTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of assets_type
-- ----------------------------

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `bookId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) DEFAULT NULL,
  `bookName` varchar(128) NOT NULL,
  `author` varchar(128) NOT NULL,
  `isbn` varchar(64) NOT NULL,
  `publisher` varchar(128) DEFAULT NULL,
  `price` decimal(10,0) NOT NULL,
  `location` varchar(128) NOT NULL,
  `department` varchar(64) NOT NULL,
  `amount` int(11) NOT NULL,
  `leftAmount` int(11) NOT NULL,
  PRIMARY KEY (`bookId`),
  KEY `FK_BK_R_BT` (`typeId`) USING BTREE,
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `book_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书';

-- ----------------------------
-- Records of book
-- ----------------------------

-- ----------------------------
-- Table structure for book_bor_ret
-- ----------------------------
DROP TABLE IF EXISTS `book_bor_ret`;
CREATE TABLE `book_bor_ret` (
  `recordId` bigint(20) NOT NULL AUTO_INCREMENT,
  `bookSnId` bigint(20) DEFAULT NULL,
  `borrowTime` datetime NOT NULL,
  `returnTime` datetime NOT NULL,
  `lastReturnTime` datetime DEFAULT NULL,
  `borrowIsbn` varchar(128) NOT NULL,
  `bookName` varchar(128) NOT NULL,
  `registerName` varchar(32) NOT NULL,
  `fullname` varchar(32) NOT NULL,
  PRIMARY KEY (`recordId`),
  KEY `FK_BBR_R_BS` (`bookSnId`) USING BTREE,
  CONSTRAINT `book_bor_ret_ibfk_1` FOREIGN KEY (`bookSnId`) REFERENCES `book_sn` (`bookSnId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书借还表';

-- ----------------------------
-- Records of book_bor_ret
-- ----------------------------

-- ----------------------------
-- Table structure for book_sn
-- ----------------------------
DROP TABLE IF EXISTS `book_sn`;
CREATE TABLE `book_sn` (
  `bookSnId` bigint(20) NOT NULL AUTO_INCREMENT,
  `bookId` bigint(20) NOT NULL,
  `bookSN` varchar(128) NOT NULL,
  `status` smallint(6) NOT NULL COMMENT '借阅状态\r\n            0=未借出\r\n            1=借出\r\n            2=预订\r\n            3=注销',
  PRIMARY KEY (`bookSnId`),
  KEY `FK_BS_R_BK` (`bookId`) USING BTREE,
  CONSTRAINT `book_sn_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book_sn
-- ----------------------------

-- ----------------------------
-- Table structure for book_type
-- ----------------------------
DROP TABLE IF EXISTS `book_type`;
CREATE TABLE `book_type` (
  `typeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书类别';

-- ----------------------------
-- Records of book_type
-- ----------------------------

-- ----------------------------
-- Table structure for calendar_plan
-- ----------------------------
DROP TABLE IF EXISTS `calendar_plan`;
CREATE TABLE `calendar_plan` (
  `planId` bigint(20) NOT NULL AUTO_INCREMENT,
  `startTime` datetime DEFAULT NULL COMMENT '开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '结束时间',
  `urgent` smallint(6) NOT NULL COMMENT '紧急程度\r\n            0=一般\r\n            1=重要\r\n            2=紧急',
  `content` varchar(1200) NOT NULL COMMENT '内容',
  `status` smallint(6) NOT NULL COMMENT '状态\r\n            0=未完成\r\n            1=完成',
  `userId` bigint(20) NOT NULL COMMENT '员工ID',
  `fullname` varchar(32) DEFAULT NULL COMMENT '员工名',
  `assignerId` bigint(20) NOT NULL COMMENT '分配人',
  `assignerName` varchar(32) DEFAULT NULL COMMENT '分配人名',
  `feedback` varchar(500) DEFAULT NULL COMMENT '反馈意见',
  `showStyle` smallint(6) NOT NULL COMMENT '显示方式\r\n            1=仅在任务中显示\r\n            2=在日程与任务中显示',
  `taskType` smallint(6) NOT NULL COMMENT '任务类型\r\n            1=限期任务\r\n            2=非限期任务',
  PRIMARY KEY (`planId`),
  KEY `FK_CA_R_AU` (`userId`) USING BTREE,
  KEY `FK_CP_R_AUAS` (`assignerId`) USING BTREE,
  CONSTRAINT `calendar_plan_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `calendar_plan_ibfk_2` FOREIGN KEY (`assignerId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='日程安排';

-- ----------------------------
-- Records of calendar_plan
-- ----------------------------
INSERT INTO `calendar_plan` VALUES ('1', '2015-10-21 00:00:00', '2015-10-21 00:00:00', '0', '​fdsafdsa', '0', '4', '刘冲', '4', '刘冲', null, '1', '1');
INSERT INTO `calendar_plan` VALUES ('2', null, null, '0', '​区兵团医院联调', '0', '1', '超级管理员', '1', '超级管理员', null, '1', '2');
INSERT INTO `calendar_plan` VALUES ('3', null, null, '0', '​区机关门诊回访', '0', '1', '超级管理员', '1', '超级管理员', null, '1', '2');
INSERT INTO `calendar_plan` VALUES ('4', null, null, '0', '特变车辆管理系统售前需求跟进', '0', '1', '超级管理员', '1', '超级管理员', null, '1', '2');

-- ----------------------------
-- Table structure for cal_file
-- ----------------------------
DROP TABLE IF EXISTS `cal_file`;
CREATE TABLE `cal_file` (
  `fileId` bigint(20) NOT NULL,
  `planId` bigint(20) NOT NULL,
  PRIMARY KEY (`fileId`,`planId`),
  KEY `FK_CF_R_CP` (`planId`) USING BTREE,
  CONSTRAINT `cal_file_ibfk_1` FOREIGN KEY (`planId`) REFERENCES `calendar_plan` (`planId`),
  CONSTRAINT `cal_file_ibfk_2` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cal_file
-- ----------------------------

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `carId` bigint(20) NOT NULL AUTO_INCREMENT,
  `carNo` varchar(128) NOT NULL,
  `carType` varchar(64) NOT NULL COMMENT '轿车\r\n            货车\r\n            商务车\r\n            ',
  `engineNo` varchar(128) DEFAULT NULL,
  `buyInsureTime` datetime DEFAULT NULL COMMENT '购买保险时间',
  `auditTime` datetime DEFAULT NULL COMMENT '年审时间',
  `notes` varchar(500) DEFAULT NULL,
  `factoryModel` varchar(64) NOT NULL,
  `driver` varchar(32) NOT NULL,
  `buyDate` date NOT NULL COMMENT '购置日期',
  `status` smallint(6) NOT NULL COMMENT '当前状态\r\n            1=可用\r\n            2=维修中\r\n            0=报废',
  `cartImage` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车辆信息';

-- ----------------------------
-- Records of car
-- ----------------------------

-- ----------------------------
-- Table structure for cart_repair
-- ----------------------------
DROP TABLE IF EXISTS `cart_repair`;
CREATE TABLE `cart_repair` (
  `repairId` bigint(20) NOT NULL AUTO_INCREMENT,
  `carId` bigint(20) DEFAULT NULL,
  `repairDate` datetime NOT NULL COMMENT '维护日期',
  `reason` varchar(128) NOT NULL COMMENT '维护原因',
  `executant` varchar(128) NOT NULL COMMENT '经办人',
  `notes` varchar(128) DEFAULT NULL COMMENT '备注',
  `repairType` varchar(128) NOT NULL COMMENT '维修类型\r\n            保养\r\n            维修',
  `fee` decimal(18,2) DEFAULT NULL COMMENT '费用',
  PRIMARY KEY (`repairId`),
  KEY `FK_CRR_R_CR` (`carId`) USING BTREE,
  CONSTRAINT `cart_repair_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `car` (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart_repair
-- ----------------------------

-- ----------------------------
-- Table structure for car_apply
-- ----------------------------
DROP TABLE IF EXISTS `car_apply`;
CREATE TABLE `car_apply` (
  `applyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `carId` bigint(20) NOT NULL,
  `department` varchar(64) NOT NULL,
  `userFullname` varchar(32) NOT NULL,
  `applyDate` date NOT NULL,
  `reason` varchar(512) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `userId` bigint(20) NOT NULL,
  `proposer` varchar(32) NOT NULL,
  `mileage` decimal(18,2) DEFAULT NULL,
  `oilUse` decimal(18,2) DEFAULT NULL,
  `notes` varchar(128) DEFAULT NULL,
  `approvalStatus` smallint(6) NOT NULL,
  PRIMARY KEY (`applyId`),
  KEY `FK_CRA_R_CR` (`carId`) USING BTREE,
  CONSTRAINT `car_apply_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `car` (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车辆申请';

-- ----------------------------
-- Records of car_apply
-- ----------------------------

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `companyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `companyNo` varchar(128) DEFAULT NULL,
  `companyName` varchar(128) NOT NULL,
  `companyDesc` varchar(5000) DEFAULT NULL,
  `legalPerson` varchar(32) DEFAULT NULL,
  `setup` datetime DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `fax` varchar(32) DEFAULT NULL,
  `site` varchar(128) DEFAULT NULL,
  `logo` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司信息';

-- ----------------------------
-- Records of company
-- ----------------------------

-- ----------------------------
-- Table structure for contract
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `contractId` bigint(20) NOT NULL AUTO_INCREMENT,
  `contractNo` varchar(64) NOT NULL COMMENT '合同编号',
  `subject` varchar(128) NOT NULL COMMENT '合同标题',
  `contractAmount` decimal(10,0) NOT NULL COMMENT '合同金额',
  `mainItem` varchar(4000) DEFAULT NULL COMMENT '主要条款',
  `salesAfterItem` varchar(4000) DEFAULT NULL COMMENT '售后条款',
  `validDate` datetime NOT NULL COMMENT '生效日期',
  `expireDate` datetime NOT NULL COMMENT '有效期',
  `serviceDep` varchar(64) DEFAULT NULL COMMENT '维修部门',
  `serviceMan` varchar(64) DEFAULT NULL COMMENT '维修负责人',
  `signupUser` varchar(64) NOT NULL COMMENT '签约人',
  `signupTime` datetime NOT NULL COMMENT '签约时间',
  `creator` varchar(32) NOT NULL COMMENT '录入人',
  `createtime` datetime NOT NULL COMMENT '录入时间',
  `projectId` bigint(20) DEFAULT NULL COMMENT '所属项目',
  `consignAddress` varchar(128) DEFAULT NULL COMMENT '收货地址',
  `consignee` varchar(32) DEFAULT NULL COMMENT '收货人',
  PRIMARY KEY (`contractId`),
  KEY `FK_CT_R_PT` (`projectId`) USING BTREE,
  CONSTRAINT `contract_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of contract
-- ----------------------------

-- ----------------------------
-- Table structure for contract_config
-- ----------------------------
DROP TABLE IF EXISTS `contract_config`;
CREATE TABLE `contract_config` (
  `configId` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(128) NOT NULL COMMENT '设备名称',
  `contractId` bigint(20) DEFAULT NULL,
  `itemSpec` varchar(128) NOT NULL COMMENT '设置规格',
  `amount` decimal(18,2) NOT NULL COMMENT '数量',
  `notes` varchar(200) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`configId`),
  KEY `FK_CC_R_CT` (`contractId`) USING BTREE,
  CONSTRAINT `contract_config_ibfk_1` FOREIGN KEY (`contractId`) REFERENCES `contract` (`contractId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合同配置单';

-- ----------------------------
-- Records of contract_config
-- ----------------------------

-- ----------------------------
-- Table structure for contract_file
-- ----------------------------
DROP TABLE IF EXISTS `contract_file`;
CREATE TABLE `contract_file` (
  `fileId` bigint(20) NOT NULL,
  `contractId` bigint(20) NOT NULL,
  PRIMARY KEY (`fileId`,`contractId`),
  KEY `FK_CTF_R_CT` (`contractId`) USING BTREE,
  CONSTRAINT `contract_file_ibfk_1` FOREIGN KEY (`contractId`) REFERENCES `contract` (`contractId`),
  CONSTRAINT `contract_file_ibfk_2` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合同附件';

-- ----------------------------
-- Records of contract_file
-- ----------------------------

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `customerId` bigint(20) NOT NULL AUTO_INCREMENT,
  `customerNo` varchar(64) NOT NULL COMMENT '客户号\r\n            自动生成',
  `industryType` varchar(64) NOT NULL COMMENT '所属行业\r\n            有缺省的选择，也可以输入',
  `customerSource` varchar(64) DEFAULT NULL COMMENT '客户来源\r\n            可编辑，可添加\r\n            \r\n            电话访问\r\n            网络\r\n            客户或朋友介绍',
  `customerType` smallint(6) NOT NULL COMMENT '1=正式客户\r\n            2=重要客户\r\n            3＝潜在客户\r\n            4＝无效客户',
  `companyScale` int(11) DEFAULT NULL COMMENT '1=1-20人\r\n            2=20-50人\r\n            3=50-100人\r\n            4=100-200人\r\n            5=200-500人\r\n            6=500-1000 人\r\n            7=1000人以上\r\n            ',
  `customerName` varchar(128) NOT NULL COMMENT '客户名称\r\n            一般为公司名称',
  `customerManager` varchar(32) NOT NULL COMMENT '负责该客户的经理',
  `phone` varchar(32) NOT NULL COMMENT '电话',
  `fax` varchar(32) DEFAULT NULL,
  `site` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `state` varchar(32) DEFAULT NULL,
  `city` varchar(32) DEFAULT NULL,
  `zip` varchar(32) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `registerFun` decimal(10,0) DEFAULT NULL,
  `turnOver` decimal(10,0) DEFAULT NULL,
  `currencyUnit` varchar(32) DEFAULT NULL COMMENT '注册资金及年营业额的货币单位\r\n            可选可编辑\r\n            人民币（默认）\r\n            美元\r\n            ',
  `otherDesc` varchar(800) DEFAULT NULL,
  `principal` varchar(32) DEFAULT NULL,
  `openBank` varchar(64) DEFAULT NULL,
  `accountsNo` varchar(64) DEFAULT NULL,
  `taxNo` varchar(64) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `rights` smallint(6) NOT NULL COMMENT '1=客户经理及上级经理有权查看\r\n            2=公开\r\n            3=共享人员有权查看',
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户信息';

-- ----------------------------
-- Records of customer
-- ----------------------------

-- ----------------------------
-- Table structure for cus_connection
-- ----------------------------
DROP TABLE IF EXISTS `cus_connection`;
CREATE TABLE `cus_connection` (
  `connId` bigint(20) NOT NULL AUTO_INCREMENT,
  `customerId` bigint(20) NOT NULL,
  `contactor` varchar(32) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `content` varchar(512) NOT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `creator` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`connId`),
  KEY `FK_CC_R_CS` (`customerId`) USING BTREE,
  CONSTRAINT `cus_connection_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='business connection ';

-- ----------------------------
-- Records of cus_connection
-- ----------------------------

-- ----------------------------
-- Table structure for cus_linkman
-- ----------------------------
DROP TABLE IF EXISTS `cus_linkman`;
CREATE TABLE `cus_linkman` (
  `linkmanId` bigint(20) NOT NULL AUTO_INCREMENT,
  `customerId` bigint(20) NOT NULL COMMENT '所属客户',
  `fullname` varchar(32) NOT NULL COMMENT '姓名',
  `sex` smallint(6) NOT NULL COMMENT '性别',
  `position` varchar(32) DEFAULT NULL COMMENT '职位',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话',
  `mobile` varchar(32) NOT NULL COMMENT '手机',
  `fax` varchar(32) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL COMMENT 'Email',
  `msn` varchar(100) DEFAULT NULL COMMENT 'MSN',
  `qq` varchar(64) DEFAULT NULL COMMENT 'QQ',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `homeAddress` varchar(128) DEFAULT NULL COMMENT '家庭住址',
  `homeZip` varchar(32) DEFAULT NULL COMMENT '邮编',
  `homePhone` varchar(32) DEFAULT NULL COMMENT '家庭电话',
  `hobby` varchar(100) DEFAULT NULL COMMENT '爱好',
  `isPrimary` smallint(6) NOT NULL COMMENT '是否为主要联系人',
  `notes` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`linkmanId`),
  KEY `FK_CLM_R_CS` (`customerId`) USING BTREE,
  CONSTRAINT `cus_linkman_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户联系人';

-- ----------------------------
-- Records of cus_linkman
-- ----------------------------

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `depId` bigint(20) NOT NULL AUTO_INCREMENT,
  `depName` varchar(128) NOT NULL COMMENT '部门名称',
  `depDesc` varchar(256) DEFAULT NULL COMMENT '部门描述',
  `depLevel` int(11) NOT NULL COMMENT '层次',
  `parentId` bigint(20) DEFAULT NULL,
  `path` varchar(128) DEFAULT NULL COMMENT '路径',
  `phone` varchar(64) DEFAULT NULL,
  `fax` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`depId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '公司管理', '公司管理', '1', null, null, null, null);
INSERT INTO `department` VALUES ('3', 'JAVA组', 'JAVA组', '2', '0', '0.3.', null, null);

-- ----------------------------
-- Table structure for depre_record
-- ----------------------------
DROP TABLE IF EXISTS `depre_record`;
CREATE TABLE `depre_record` (
  `recordId` bigint(20) NOT NULL AUTO_INCREMENT,
  `assetsId` bigint(20) NOT NULL,
  `workCapacity` decimal(18,2) DEFAULT NULL,
  `workGrossUnit` varchar(128) DEFAULT NULL,
  `depreAmount` decimal(18,4) NOT NULL,
  `calTime` datetime NOT NULL,
  PRIMARY KEY (`recordId`),
  KEY `FK_DR_R_FA` (`assetsId`) USING BTREE,
  CONSTRAINT `depre_record_ibfk_1` FOREIGN KEY (`assetsId`) REFERENCES `fixed_assets` (`assetsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of depre_record
-- ----------------------------

-- ----------------------------
-- Table structure for depre_type
-- ----------------------------
DROP TABLE IF EXISTS `depre_type`;
CREATE TABLE `depre_type` (
  `depreTypeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(64) NOT NULL,
  `deprePeriod` int(11) NOT NULL COMMENT '单位为月',
  `typeDesc` varchar(500) DEFAULT NULL,
  `calMethod` smallint(6) NOT NULL COMMENT '1=平均年限法\r\n            2=工作量法\r\n            加速折旧法\r\n            3=双倍余额递减法\r\n            4=年数总和法',
  PRIMARY KEY (`depreTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='depreciation type';

-- ----------------------------
-- Records of depre_type
-- ----------------------------

-- ----------------------------
-- Table structure for diary
-- ----------------------------
DROP TABLE IF EXISTS `diary`;
CREATE TABLE `diary` (
  `diaryId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `dayTime` date NOT NULL,
  `content` text NOT NULL,
  `diaryType` smallint(6) NOT NULL COMMENT '1=工作日志\r\n            0=个人日志',
  PRIMARY KEY (`diaryId`),
  KEY `FK_DY_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `diary_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of diary
-- ----------------------------
INSERT INTO `diary` VALUES ('2', '4', '2015-10-21', '​11111', '1');

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `dicId` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(64) NOT NULL,
  `itemValue` varchar(128) NOT NULL,
  `descp` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`dicId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据字典';

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for document
-- ----------------------------
DROP TABLE IF EXISTS `document`;
CREATE TABLE `document` (
  `docId` bigint(20) NOT NULL AUTO_INCREMENT,
  `docName` varchar(100) NOT NULL,
  `content` text COMMENT '内容',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL,
  `folderId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `fullname` varchar(32) NOT NULL,
  `haveAttach` smallint(6) DEFAULT NULL,
  `sharedUserIds` varchar(1000) DEFAULT NULL COMMENT '共享员工ID',
  `sharedUserNames` varchar(1000) DEFAULT NULL,
  `sharedDepIds` varchar(1000) DEFAULT NULL COMMENT '共享部门ID',
  `sharedDepNames` varchar(1000) DEFAULT NULL,
  `sharedRoleIds` varchar(1000) DEFAULT NULL COMMENT '共享角色ID',
  `sharedRoleNames` varchar(1000) DEFAULT NULL,
  `isShared` smallint(6) NOT NULL COMMENT '是否共享',
  PRIMARY KEY (`docId`),
  KEY `FK_DT_R_AU` (`userId`) USING BTREE,
  KEY `FK_DT_R_DF` (`folderId`) USING BTREE,
  CONSTRAINT `document_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `document_ibfk_2` FOREIGN KEY (`folderId`) REFERENCES `doc_folder` (`folderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文档';

-- ----------------------------
-- Records of document
-- ----------------------------

-- ----------------------------
-- Table structure for doc_file
-- ----------------------------
DROP TABLE IF EXISTS `doc_file`;
CREATE TABLE `doc_file` (
  `fileId` bigint(20) NOT NULL,
  `docId` bigint(20) NOT NULL,
  PRIMARY KEY (`fileId`,`docId`),
  KEY `FK_DF_F_DT` (`docId`) USING BTREE,
  CONSTRAINT `doc_file_ibfk_1` FOREIGN KEY (`docId`) REFERENCES `document` (`docId`),
  CONSTRAINT `doc_file_ibfk_2` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doc_file
-- ----------------------------

-- ----------------------------
-- Table structure for doc_folder
-- ----------------------------
DROP TABLE IF EXISTS `doc_folder`;
CREATE TABLE `doc_folder` (
  `folderId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `folderName` varchar(128) NOT NULL COMMENT '目录名称',
  `parentId` bigint(20) DEFAULT NULL COMMENT '父目录',
  `path` varchar(128) DEFAULT NULL COMMENT '路径\r\n            为当前路径的＋上级路径\r\n            如当前ID为3，上级目录的路径为1.2，\r\n            则当前的路径为1.2.3.',
  `isShared` smallint(6) NOT NULL,
  PRIMARY KEY (`folderId`),
  KEY `FK_DF_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `doc_folder_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doc_folder
-- ----------------------------

-- ----------------------------
-- Table structure for doc_history
-- ----------------------------
DROP TABLE IF EXISTS `doc_history`;
CREATE TABLE `doc_history` (
  `historyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `docId` bigint(20) NOT NULL,
  `fileId` bigint(20) NOT NULL COMMENT '附件ID',
  `docName` varchar(128) NOT NULL COMMENT '文档名称',
  `path` varchar(128) NOT NULL COMMENT '路径',
  `version` int(11) NOT NULL COMMENT '版本',
  `updatetime` datetime NOT NULL COMMENT '更新时间',
  `mender` varchar(64) NOT NULL COMMENT '修改人',
  PRIMARY KEY (`historyId`),
  KEY `FK_DHY_R_ARVD` (`docId`) USING BTREE,
  KEY `FK_DH_R_FA` (`fileId`) USING BTREE,
  CONSTRAINT `doc_history_ibfk_1` FOREIGN KEY (`docId`) REFERENCES `archives_doc` (`docId`),
  CONSTRAINT `doc_history_ibfk_2` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of doc_history
-- ----------------------------

-- ----------------------------
-- Table structure for doc_privilege
-- ----------------------------
DROP TABLE IF EXISTS `doc_privilege`;
CREATE TABLE `doc_privilege` (
  `privilegeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `folderId` bigint(20) DEFAULT NULL,
  `docId` bigint(20) DEFAULT NULL,
  `rights` int(11) NOT NULL COMMENT '权限\r\n            文档或目录的读写修改权限\r\n            1=读\r\n            2=修改\r\n            4=删除\r\n            \r\n            权限值可以为上面的值之和\r\n            如：3则代表进行读，修改的操作\r\n            \r\n            \r\n            ',
  `udrId` int(11) DEFAULT NULL,
  `udrName` varchar(128) DEFAULT NULL,
  `flag` smallint(6) NOT NULL COMMENT '1=user\r\n            2=deparment\r\n            3=role',
  `fdFlag` smallint(6) NOT NULL COMMENT '缺省为文件夹权限\r\n            1=文档权限\r\n            0=文件夹权限',
  PRIMARY KEY (`privilegeId`),
  KEY `FK_DP_R_DF` (`folderId`) USING BTREE,
  KEY `FK_DP_R_DT` (`docId`) USING BTREE,
  CONSTRAINT `doc_privilege_ibfk_1` FOREIGN KEY (`folderId`) REFERENCES `doc_folder` (`folderId`),
  CONSTRAINT `doc_privilege_ibfk_2` FOREIGN KEY (`docId`) REFERENCES `document` (`docId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文档或目录的权限，只要是针对公共目录下的文档，个人的文档则不需要在这里进行权限的设置\r\n\r\n某个目录';

-- ----------------------------
-- Records of doc_privilege
-- ----------------------------

-- ----------------------------
-- Table structure for duty
-- ----------------------------
DROP TABLE IF EXISTS `duty`;
CREATE TABLE `duty` (
  `dutyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '员工ID',
  `fullname` varchar(32) NOT NULL COMMENT '员工姓名',
  `systemId` bigint(20) NOT NULL COMMENT '班制ID',
  `startTime` datetime NOT NULL COMMENT '开始时间',
  `endTime` datetime DEFAULT NULL COMMENT '结束时间',
  PRIMARY KEY (`dutyId`),
  KEY `FK_DUY_R_AU` (`userId`) USING BTREE,
  KEY `FK_DUY_R_DS` (`systemId`) USING BTREE,
  CONSTRAINT `duty_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `duty_ibfk_2` FOREIGN KEY (`systemId`) REFERENCES `duty_system` (`systemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='排班';

-- ----------------------------
-- Records of duty
-- ----------------------------

-- ----------------------------
-- Table structure for duty_register
-- ----------------------------
DROP TABLE IF EXISTS `duty_register`;
CREATE TABLE `duty_register` (
  `registerId` bigint(20) NOT NULL AUTO_INCREMENT,
  `registerDate` datetime NOT NULL COMMENT '登记时间',
  `userId` bigint(20) NOT NULL COMMENT '登记人',
  `fullname` varchar(32) NOT NULL,
  `regFlag` smallint(6) NOT NULL COMMENT '登记标识\r\n            1=正常登记（上班，下班）\r\n            2＝迟到\r\n            3=早退\r\n            4＝休息\r\n            5＝旷工\r\n            6=放假\r\n            \r\n            ',
  `regMins` int(11) NOT NULL COMMENT '迟到或早退分钟\r\n            正常上班时为0',
  `reason` varchar(128) DEFAULT NULL COMMENT '迟到原因',
  `dayOfWeek` int(11) NOT NULL COMMENT '周几\r\n            1=星期日\r\n            ..\r\n            7=日期六',
  `inOffFlag` smallint(6) NOT NULL COMMENT '上下班标识\r\n            1=签到\r\n            2=签退',
  `sectionId` bigint(20) NOT NULL,
  PRIMARY KEY (`registerId`),
  KEY `FK_DR_R_AU` (`userId`) USING BTREE,
  KEY `FK_DR_R_DS` (`sectionId`) USING BTREE,
  CONSTRAINT `duty_register_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `duty_register_ibfk_2` FOREIGN KEY (`sectionId`) REFERENCES `duty_section` (`sectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of duty_register
-- ----------------------------

-- ----------------------------
-- Table structure for duty_section
-- ----------------------------
DROP TABLE IF EXISTS `duty_section`;
CREATE TABLE `duty_section` (
  `sectionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `sectionName` varchar(64) NOT NULL,
  `startSignin` datetime NOT NULL COMMENT '开始签到',
  `dutyStartTime` datetime NOT NULL COMMENT '上班时间',
  `endSignin` datetime NOT NULL COMMENT '签到结束时间',
  `earlyOffTime` datetime NOT NULL COMMENT '早退计时',
  `dutyEndTime` datetime NOT NULL COMMENT '下班时间',
  `signOutTime` datetime NOT NULL COMMENT '签退结束',
  PRIMARY KEY (`sectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='班次\r\n也称为班段，一天可以分为两个或三个班段\r\n';

-- ----------------------------
-- Records of duty_section
-- ----------------------------

-- ----------------------------
-- Table structure for duty_system
-- ----------------------------
DROP TABLE IF EXISTS `duty_system`;
CREATE TABLE `duty_system` (
  `systemId` bigint(20) NOT NULL AUTO_INCREMENT,
  `systemName` varchar(128) NOT NULL COMMENT '班制名称',
  `systemSetting` varchar(128) NOT NULL COMMENT '班次\r\n            班次的数据结构为：\r\n            如一员工周一至周五上班，上午9：00- 12：00 ，下午 13：30 -18:00\r\n            \r\n            基数据结构为：\r\n            1|2,1|2,1|2,1|2,1|2,-,-\r\n            -代表正常休息日\r\n            1|2代表为一天上两个班次，1代表为班次表1的记录\r\n            ',
  `systemDesc` varchar(256) NOT NULL COMMENT '班次描述',
  `isDefault` smallint(6) NOT NULL COMMENT '是否缺省\r\n            1＝缺省\r\n            0＝非缺省',
  PRIMARY KEY (`systemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='轮班制\r\n为公司设置上班的时间规定\r\n如规定周一至周五上班，周六周日休息';

-- ----------------------------
-- Records of duty_system
-- ----------------------------

-- ----------------------------
-- Table structure for emp_profile
-- ----------------------------
DROP TABLE IF EXISTS `emp_profile`;
CREATE TABLE `emp_profile` (
  `profileId` bigint(20) NOT NULL AUTO_INCREMENT,
  `profileNo` varchar(100) NOT NULL COMMENT '档案编号',
  `fullname` varchar(64) NOT NULL COMMENT '员工姓名',
  `address` varchar(128) DEFAULT NULL COMMENT '家庭地址',
  `birthday` datetime DEFAULT NULL COMMENT '出生日期',
  `homeZip` varchar(32) DEFAULT NULL COMMENT '家庭邮编',
  `sex` varchar(32) DEFAULT NULL,
  `marriage` varchar(32) DEFAULT NULL COMMENT '婚姻状况\r\n            已婚\r\n            未婚',
  `designation` varchar(64) DEFAULT NULL,
  `jobId` bigint(20) DEFAULT NULL,
  `position` varchar(128) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL COMMENT '电话号码',
  `mobile` varchar(64) DEFAULT NULL COMMENT '手机号码',
  `openBank` varchar(100) DEFAULT NULL COMMENT '开户银行',
  `bankNo` varchar(100) DEFAULT NULL COMMENT '银行账号',
  `qq` varchar(64) DEFAULT NULL COMMENT 'QQ号码',
  `email` varchar(128) DEFAULT NULL COMMENT '电子邮箱',
  `hobby` varchar(300) DEFAULT NULL COMMENT '爱好',
  `religion` varchar(100) DEFAULT NULL COMMENT '宗教信仰',
  `party` varchar(100) DEFAULT NULL COMMENT '政治面貌',
  `nationality` varchar(100) DEFAULT NULL COMMENT '国籍',
  `race` varchar(100) DEFAULT NULL COMMENT '民族',
  `birthPlace` varchar(128) DEFAULT NULL COMMENT '出生地',
  `eduDegree` varchar(100) DEFAULT NULL COMMENT '学历',
  `eduMajor` varchar(100) DEFAULT NULL COMMENT '专业',
  `eduCollege` varchar(128) DEFAULT NULL COMMENT '毕业院校',
  `startWorkDate` datetime DEFAULT NULL COMMENT '参加工作时间',
  `eduCase` varchar(2048) DEFAULT NULL COMMENT '教育背景',
  `awardPunishCase` varchar(2048) DEFAULT NULL COMMENT '奖惩情况',
  `trainingCase` varchar(2048) DEFAULT NULL COMMENT '培训情况',
  `workCase` varchar(2048) DEFAULT NULL COMMENT '工作经历',
  `idCard` varchar(64) DEFAULT NULL COMMENT '身份证号',
  `photo` varchar(128) DEFAULT NULL COMMENT '照片',
  `standardMiNo` varchar(100) DEFAULT NULL COMMENT '薪酬标准编号',
  `standardMoney` decimal(18,2) DEFAULT NULL COMMENT '薪酬标准金额',
  `standardName` varchar(128) DEFAULT NULL COMMENT '薪酬标准单名称',
  `standardId` bigint(20) DEFAULT NULL COMMENT '薪酬标准单编号',
  `creator` varchar(64) DEFAULT NULL COMMENT '建档人',
  `createtime` datetime DEFAULT NULL COMMENT '建档时间',
  `checkName` varchar(128) DEFAULT NULL COMMENT '审核人',
  `checktime` datetime DEFAULT NULL COMMENT '审核时间',
  `approvalStatus` smallint(6) DEFAULT '0' COMMENT '核审状态\r\n            0=未审批\r\n            1=通过审核\r\n            2=未通过审核',
  `memo` varchar(1024) DEFAULT NULL COMMENT '备注',
  `depName` varchar(100) DEFAULT NULL COMMENT '所属部门或公司',
  `depId` bigint(20) DEFAULT NULL COMMENT '所属部门Id',
  `delFlag` smallint(6) NOT NULL DEFAULT '0' COMMENT '删除状态\r\n            0=未删除\r\n            1=删除',
  `opprovalOpinion` varchar(1024) DEFAULT NULL COMMENT '审核意见',
  `userId` bigint(20) DEFAULT NULL COMMENT '所属员工ID',
  PRIMARY KEY (`profileId`),
  KEY `FK_EP_R_JB` (`jobId`) USING BTREE,
  KEY `FK_SD_R_SY` (`standardId`) USING BTREE,
  CONSTRAINT `emp_profile_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `job` (`jobId`),
  CONSTRAINT `emp_profile_ibfk_2` FOREIGN KEY (`standardId`) REFERENCES `stand_salary` (`standardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='员工档案';

-- ----------------------------
-- Records of emp_profile
-- ----------------------------

-- ----------------------------
-- Table structure for errands_register
-- ----------------------------
DROP TABLE IF EXISTS `errands_register`;
CREATE TABLE `errands_register` (
  `dateId` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) NOT NULL COMMENT '外出/加班人员',
  `descp` varchar(500) NOT NULL COMMENT '描述',
  `startTime` datetime NOT NULL COMMENT '开始日期',
  `endTime` datetime NOT NULL COMMENT '结束日期',
  `approvalId` bigint(20) NOT NULL COMMENT '审批人ID',
  `status` smallint(6) NOT NULL COMMENT '审批状态\r\n            0=未审批\r\n            1=通过审批\r\n            2=不通过审批',
  `approvalOption` varchar(500) DEFAULT NULL COMMENT '审批意见',
  `approvalName` varchar(128) NOT NULL COMMENT '审批人',
  `flag` smallint(6) DEFAULT NULL COMMENT '标识\r\n            0=加班\r\n            1=请假\r\n            2=外出',
  PRIMARY KEY (`dateId`),
  KEY `FK_ERP_R_AU` (`approvalId`) USING BTREE,
  KEY `FK_ER_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `errands_register_ibfk_1` FOREIGN KEY (`approvalId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `errands_register_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='请假、加班、外出登记';

-- ----------------------------
-- Records of errands_register
-- ----------------------------

-- ----------------------------
-- Table structure for file_attach
-- ----------------------------
DROP TABLE IF EXISTS `file_attach`;
CREATE TABLE `file_attach` (
  `fileId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fileName` varchar(128) NOT NULL COMMENT '文件名',
  `filePath` varchar(128) NOT NULL COMMENT '文件路径',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `ext` varchar(32) DEFAULT NULL COMMENT '扩展名',
  `fileType` varchar(32) NOT NULL COMMENT '附件类型\r\n            如：邮件附件',
  `note` varchar(1024) DEFAULT NULL COMMENT '说明',
  `creator` varchar(32) NOT NULL COMMENT '上传者',
  PRIMARY KEY (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='附件';

-- ----------------------------
-- Records of file_attach
-- ----------------------------

-- ----------------------------
-- Table structure for fixed_assets
-- ----------------------------
DROP TABLE IF EXISTS `fixed_assets`;
CREATE TABLE `fixed_assets` (
  `assetsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `assetsNo` varchar(128) DEFAULT NULL,
  `assetsName` varchar(128) NOT NULL,
  `model` varchar(64) DEFAULT NULL,
  `assetsTypeId` bigint(20) NOT NULL,
  `manufacturer` varchar(64) DEFAULT NULL,
  `manuDate` datetime DEFAULT NULL,
  `buyDate` datetime NOT NULL,
  `beDep` varchar(64) NOT NULL,
  `custodian` varchar(32) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `remainValRate` decimal(18,6) NOT NULL,
  `depreTypeId` bigint(20) NOT NULL,
  `startDepre` datetime DEFAULT NULL,
  `intendTerm` decimal(18,2) DEFAULT NULL,
  `intendWorkGross` decimal(18,2) DEFAULT NULL COMMENT '当折旧的方法选择用工作量法进行计算时，才需要填写',
  `workGrossUnit` varchar(128) DEFAULT NULL,
  `assetValue` decimal(18,4) NOT NULL,
  `assetCurValue` decimal(18,4) NOT NULL,
  `depreRate` decimal(18,2) DEFAULT NULL,
  `defPerWorkGross` decimal(18,2) DEFAULT NULL,
  PRIMARY KEY (`assetsId`),
  KEY `FK_FA_R_AT` (`assetsTypeId`) USING BTREE,
  KEY `FK_FA_R_DT` (`depreTypeId`) USING BTREE,
  CONSTRAINT `fixed_assets_ibfk_1` FOREIGN KEY (`assetsTypeId`) REFERENCES `assets_type` (`assetsTypeId`),
  CONSTRAINT `fixed_assets_ibfk_2` FOREIGN KEY (`depreTypeId`) REFERENCES `depre_type` (`depreTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fixed_assets
-- ----------------------------

-- ----------------------------
-- Table structure for form_data
-- ----------------------------
DROP TABLE IF EXISTS `form_data`;
CREATE TABLE `form_data` (
  `dataId` bigint(20) NOT NULL AUTO_INCREMENT,
  `formId` bigint(20) NOT NULL COMMENT '所属表单',
  `fieldLabel` varchar(128) NOT NULL COMMENT '字段标签',
  `fieldName` varchar(64) NOT NULL COMMENT '字段名称',
  `intValue` int(11) DEFAULT NULL COMMENT '整数值',
  `longValue` bigint(20) DEFAULT NULL COMMENT '长整值',
  `decValue` decimal(18,4) DEFAULT NULL COMMENT '精度值',
  `dateValue` datetime DEFAULT NULL COMMENT '日期值',
  `strValue` varchar(5000) DEFAULT NULL COMMENT '字符值',
  `boolValue` smallint(6) DEFAULT NULL COMMENT '布尔值',
  `blobValue` blob COMMENT '对象值',
  `isShowed` smallint(6) NOT NULL COMMENT '是否显示\r\n            1=显示\r\n            0=不显示',
  `textValue` text,
  `fieldType` varchar(32) NOT NULL,
  PRIMARY KEY (`dataId`),
  KEY `FK_FD_R_PF` (`formId`) USING BTREE,
  CONSTRAINT `form_data_ibfk_1` FOREIGN KEY (`formId`) REFERENCES `process_form` (`formId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of form_data
-- ----------------------------
INSERT INTO `form_data` VALUES ('1', '1', '备注', 'note', null, null, null, null, '', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('2', '2', '审批意见', 'approvalOption', null, null, null, null, '', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('3', '3', '审批意见', 'approvalOption', null, null, null, null, '', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('4', '4', '备注', 'note', null, null, null, null, '', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('5', '5', '备注', 'note', null, null, null, null, '1111', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('6', '6', '备注', 'note', null, null, null, null, '', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('7', '7', '备注', 'note', null, null, null, null, '222q', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('8', '8', '备注', 'note', null, null, null, null, '', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('9', '9', '备注', 'note', null, null, null, null, '.', null, null, '1', null, 'varchar');
INSERT INTO `form_data` VALUES ('10', '10', '备注', 'note', null, null, null, null, '', null, null, '1', null, 'varchar');

-- ----------------------------
-- Table structure for form_file
-- ----------------------------
DROP TABLE IF EXISTS `form_file`;
CREATE TABLE `form_file` (
  `formId` bigint(20) NOT NULL,
  `fileId` bigint(20) NOT NULL,
  PRIMARY KEY (`formId`,`fileId`),
  KEY `FK_FF_R_FA` (`fileId`) USING BTREE,
  CONSTRAINT `form_file_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `form_file_ibfk_2` FOREIGN KEY (`formId`) REFERENCES `process_form` (`formId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程表单附件';

-- ----------------------------
-- Records of form_file
-- ----------------------------

-- ----------------------------
-- Table structure for fun_url
-- ----------------------------
DROP TABLE IF EXISTS `fun_url`;
CREATE TABLE `fun_url` (
  `urlId` bigint(20) NOT NULL AUTO_INCREMENT,
  `functionId` bigint(20) NOT NULL,
  `urlPath` varchar(128) NOT NULL,
  PRIMARY KEY (`urlId`),
  KEY `FK_FU_R_AFN` (`functionId`) USING BTREE,
  CONSTRAINT `fun_url_ibfk_1` FOREIGN KEY (`functionId`) REFERENCES `app_function` (`functionId`)
) ENGINE=InnoDB AUTO_INCREMENT=530 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fun_url
-- ----------------------------
INSERT INTO `fun_url` VALUES ('1', '1', '/system/listAppUser.do');
INSERT INTO `fun_url` VALUES ('2', '2', '/system/listAppUser.do');
INSERT INTO `fun_url` VALUES ('3', '2', '/system/chooseRolesAppUser.do');
INSERT INTO `fun_url` VALUES ('4', '2', '/system/selectedRolesAppUser.do');
INSERT INTO `fun_url` VALUES ('5', '2', '/system/listDepartment.do');
INSERT INTO `fun_url` VALUES ('6', '3', '/system/listAppUser.do');
INSERT INTO `fun_url` VALUES ('7', '3', '/system/chooseRolesAppUser.do');
INSERT INTO `fun_url` VALUES ('8', '3', '/system/selectedRolesAppUser.do');
INSERT INTO `fun_url` VALUES ('9', '3', '/system/listDepartment.do');
INSERT INTO `fun_url` VALUES ('10', '4', '/system/listAppUser.do');
INSERT INTO `fun_url` VALUES ('11', '4', '/system/multiDelAppUser.do');
INSERT INTO `fun_url` VALUES ('12', '5', '/system/listAppRole.do');
INSERT INTO `fun_url` VALUES ('13', '6', '/system/listAppRole.do');
INSERT INTO `fun_url` VALUES ('14', '6', '/system/saveAppRole.do');
INSERT INTO `fun_url` VALUES ('15', '7', '/system/listAppRole.do');
INSERT INTO `fun_url` VALUES ('16', '7', '/system/saveAppRole.do');
INSERT INTO `fun_url` VALUES ('17', '7', '/system/getAppRole.do');
INSERT INTO `fun_url` VALUES ('18', '8', '/system/listAppRole.do');
INSERT INTO `fun_url` VALUES ('19', '8', '/system/mulDelAppRole.do');
INSERT INTO `fun_url` VALUES ('20', '9', '/system/listAppRole.do');
INSERT INTO `fun_url` VALUES ('21', '9', '/system/grantXmlAppRole.do');
INSERT INTO `fun_url` VALUES ('22', '9', '/system/getAppRole.do');
INSERT INTO `fun_url` VALUES ('23', '9', '/system/grantAppRole.do');
INSERT INTO `fun_url` VALUES ('24', '10', '/system/listDepartment.do');
INSERT INTO `fun_url` VALUES ('25', '10', '/system/selectAppUser.do');
INSERT INTO `fun_url` VALUES ('26', '11', '/system/listDepartment.do');
INSERT INTO `fun_url` VALUES ('27', '11', '/system/addDepartment.do');
INSERT INTO `fun_url` VALUES ('28', '11', '/system/selectAppUser.do');
INSERT INTO `fun_url` VALUES ('29', '11', '/system/saveAppUser.do');
INSERT INTO `fun_url` VALUES ('30', '12', '/system/listDepartment.do');
INSERT INTO `fun_url` VALUES ('31', '12', '/system/addDepartment.do');
INSERT INTO `fun_url` VALUES ('32', '12', '/system/detailDepartment.do');
INSERT INTO `fun_url` VALUES ('33', '12', '/system/selectAppUser.do');
INSERT INTO `fun_url` VALUES ('34', '12', '/system/saveAppUser.do');
INSERT INTO `fun_url` VALUES ('35', '13', '/system/listDepartment.do');
INSERT INTO `fun_url` VALUES ('36', '13', '/system/removeDepartment.do');
INSERT INTO `fun_url` VALUES ('37', '13', '/system/selectAppUser.do');
INSERT INTO `fun_url` VALUES ('38', '13', '/system/saveAppUser.do');
INSERT INTO `fun_url` VALUES ('39', '14', '/system/listFileAttach.do');
INSERT INTO `fun_url` VALUES ('40', '15', '/system/saveFileAttach.do');
INSERT INTO `fun_url` VALUES ('41', '15', '/system/listFileAttach.do');
INSERT INTO `fun_url` VALUES ('42', '15', '/system/getFileAttach.do');
INSERT INTO `fun_url` VALUES ('43', '16', '/system/listFileAttach.do');
INSERT INTO `fun_url` VALUES ('44', '16', '/system/multiDelFileAttach.do');
INSERT INTO `fun_url` VALUES ('45', '17', '/system/listCompany.do');
INSERT INTO `fun_url` VALUES ('46', '17', '/system/addCompany.do');
INSERT INTO `fun_url` VALUES ('47', '18', '/flow/rootProType.do');
INSERT INTO `fun_url` VALUES ('48', '18', '/flow/listProDefinition.do');
INSERT INTO `fun_url` VALUES ('49', '18', '/flow/processDetail.do');
INSERT INTO `fun_url` VALUES ('50', '19', '/flow/rootProType.do');
INSERT INTO `fun_url` VALUES ('51', '19', '/flow/saveProType.do');
INSERT INTO `fun_url` VALUES ('52', '19', '/flow/removeProType.do');
INSERT INTO `fun_url` VALUES ('53', '19', '/flow/getProType.do');
INSERT INTO `fun_url` VALUES ('54', '20', '/flow/rootProType.do');
INSERT INTO `fun_url` VALUES ('55', '20', '/flow/listProDefinition.do');
INSERT INTO `fun_url` VALUES ('56', '20', '/flow/saveProDefinition.do');
INSERT INTO `fun_url` VALUES ('57', '20', '/flow/listProType.do');
INSERT INTO `fun_url` VALUES ('58', '20', '/flow/getProDefinition.do');
INSERT INTO `fun_url` VALUES ('59', '21', '/flow/rootProType.do');
INSERT INTO `fun_url` VALUES ('60', '21', '/flow/listProDefinition.do');
INSERT INTO `fun_url` VALUES ('61', '21', '/flow/saveProDefinition.do');
INSERT INTO `fun_url` VALUES ('62', '21', '/flow/listProType.do');
INSERT INTO `fun_url` VALUES ('63', '21', '/flow/getProDefinition.do');
INSERT INTO `fun_url` VALUES ('64', '22', '/flow/rootProType.do');
INSERT INTO `fun_url` VALUES ('65', '22', '/flow/listProDefinition.do');
INSERT INTO `fun_url` VALUES ('66', '22', '/flow/multiDelProDefinition.do');
INSERT INTO `fun_url` VALUES ('67', '23', '/flow/processDetail.do');
INSERT INTO `fun_url` VALUES ('68', '24', '/flow/saveProUserAssign.do');
INSERT INTO `fun_url` VALUES ('69', '24', '/flow/listProUserAssign.do');
INSERT INTO `fun_url` VALUES ('70', '25', '/document/saveDocFolder.do');
INSERT INTO `fun_url` VALUES ('71', '25', '/document/getDocFolder.do');
INSERT INTO `fun_url` VALUES ('72', '25', '/document/removeDocFolder.do');
INSERT INTO `fun_url` VALUES ('73', '26', '/document/listDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('74', '27', '/document/listDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('75', '27', '/document/addDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('76', '28', '/document/listDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('77', '28', '/document/changeDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('78', '29', '/document/listDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('79', '29', '/document/multiDelDocPrivilege.do');
INSERT INTO `fun_url` VALUES ('80', '30', '/task/listPlanType.do');
INSERT INTO `fun_url` VALUES ('81', '31', '/task/listPlanType.do');
INSERT INTO `fun_url` VALUES ('82', '31', '/task/savePlanType.do');
INSERT INTO `fun_url` VALUES ('83', '32', '/task/listPlanType.do');
INSERT INTO `fun_url` VALUES ('84', '32', '/task/savePlanType.do');
INSERT INTO `fun_url` VALUES ('85', '32', '/task/getPlanType.do');
INSERT INTO `fun_url` VALUES ('86', '33', '/task/listPlanType.do');
INSERT INTO `fun_url` VALUES ('87', '33', '/task/multiDelPlanType.do');
INSERT INTO `fun_url` VALUES ('88', '35', '/info/categoryNews.do');
INSERT INTO `fun_url` VALUES ('89', '35', '/info/treeNewsType.do');
INSERT INTO `fun_url` VALUES ('90', '36', '/info/categoryNews.do');
INSERT INTO `fun_url` VALUES ('91', '36', '/info/treeNewsType.do');
INSERT INTO `fun_url` VALUES ('92', '36', '/info/saveNews.do');
INSERT INTO `fun_url` VALUES ('93', '37', '/info/categoryNews.do');
INSERT INTO `fun_url` VALUES ('94', '37', '/info/treeNewsType.do');
INSERT INTO `fun_url` VALUES ('95', '37', '/info/saveNews.do');
INSERT INTO `fun_url` VALUES ('96', '38', '/info/categoryNews.do');
INSERT INTO `fun_url` VALUES ('97', '38', '/info/treeNewsType.do');
INSERT INTO `fun_url` VALUES ('98', '38', '/info/multiDelNews.do');
INSERT INTO `fun_url` VALUES ('99', '40', '/info/multiDelNewsComment.do');
INSERT INTO `fun_url` VALUES ('100', '41', '/info/listNewsType.do');
INSERT INTO `fun_url` VALUES ('101', '42', '/info/listNewsType.do');
INSERT INTO `fun_url` VALUES ('102', '42', '/info/addNewsType.do');
INSERT INTO `fun_url` VALUES ('103', '43', '/info/listNewsType.do');
INSERT INTO `fun_url` VALUES ('104', '43', '/info/addNewsType.do');
INSERT INTO `fun_url` VALUES ('105', '43', '/info/detailNewsType.do');
INSERT INTO `fun_url` VALUES ('106', '43', '/info/sortNewsType.do');
INSERT INTO `fun_url` VALUES ('107', '44', '/info/listNewsType.do');
INSERT INTO `fun_url` VALUES ('108', '44', '/info/removeNewsType.do');
INSERT INTO `fun_url` VALUES ('109', '46', '/info/saveNotice.do');
INSERT INTO `fun_url` VALUES ('110', '47', '/info/saveNotice.do');
INSERT INTO `fun_url` VALUES ('111', '48', '/info/multiDelNotice.do');
INSERT INTO `fun_url` VALUES ('112', '49', '/personal/listHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('113', '50', '/personal/listHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('114', '50', '/personal/saveHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('115', '51', '/personal/listHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('116', '51', '/personal/getHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('117', '51', '/personal/saveHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('118', '52', '/personal/listHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('119', '52', '/personal/multiDelHolidayRecord.do');
INSERT INTO `fun_url` VALUES ('120', '53', '/personal/listDutySection.do');
INSERT INTO `fun_url` VALUES ('121', '54', '/personal/listDutySection.do');
INSERT INTO `fun_url` VALUES ('122', '54', '/personal/saveDutySection.do');
INSERT INTO `fun_url` VALUES ('123', '55', '/personal/listDutySection.do');
INSERT INTO `fun_url` VALUES ('124', '55', '/personal/saveDutySection.do');
INSERT INTO `fun_url` VALUES ('125', '55', '/personal/getDutySection.do');
INSERT INTO `fun_url` VALUES ('126', '56', '/personal/listDutySection.do');
INSERT INTO `fun_url` VALUES ('127', '56', '/personal/multiDelDutySection.do');
INSERT INTO `fun_url` VALUES ('128', '57', '/personal/listDutySystem.do');
INSERT INTO `fun_url` VALUES ('129', '58', '/personal/listDutySystem.do');
INSERT INTO `fun_url` VALUES ('130', '58', '/personal/settingDutySystem.do');
INSERT INTO `fun_url` VALUES ('131', '58', '/personal/saveDutySystem.do');
INSERT INTO `fun_url` VALUES ('132', '59', '/personal/listDutySystem.do');
INSERT INTO `fun_url` VALUES ('133', '59', '/personal/getDutySystem.do');
INSERT INTO `fun_url` VALUES ('134', '59', '/personal/saveDutySystem.do');
INSERT INTO `fun_url` VALUES ('135', '60', '/personal/listDutySystem.do');
INSERT INTO `fun_url` VALUES ('136', '60', '/personal/multiDelDutySystem.do');
INSERT INTO `fun_url` VALUES ('137', '61', '/personal/listDuty.do');
INSERT INTO `fun_url` VALUES ('138', '62', '/personal/listDuty.do');
INSERT INTO `fun_url` VALUES ('139', '62', '/personal/saveDuty.do');
INSERT INTO `fun_url` VALUES ('140', '62', '/personal/comboDutySystem.do');
INSERT INTO `fun_url` VALUES ('141', '63', '/personal/listDuty.do');
INSERT INTO `fun_url` VALUES ('142', '63', '/personal/saveDuty.do');
INSERT INTO `fun_url` VALUES ('143', '63', '/personal/comboDutySystem.do');
INSERT INTO `fun_url` VALUES ('144', '63', '/personal/getDuty.do');
INSERT INTO `fun_url` VALUES ('145', '64', '/personal/listDuty.do');
INSERT INTO `fun_url` VALUES ('146', '64', '/personal/multiDelDuty.do');
INSERT INTO `fun_url` VALUES ('147', '65', '/personal/listDutyRegister.do');
INSERT INTO `fun_url` VALUES ('148', '66', '/personal/listDutyRegister.do');
INSERT INTO `fun_url` VALUES ('149', '66', '/personal/saveDutyRegister.do');
INSERT INTO `fun_url` VALUES ('150', '66', '/personal/comboDutySection.do');
INSERT INTO `fun_url` VALUES ('151', '67', '/personal/listDutyRegister.do');
INSERT INTO `fun_url` VALUES ('152', '67', '/personal/multiDelDutyRegister.do');
INSERT INTO `fun_url` VALUES ('153', '68', '/customer/listCustomer.do');
INSERT INTO `fun_url` VALUES ('154', '69', '/customer/listCustomer.do');
INSERT INTO `fun_url` VALUES ('155', '69', '/customer/saveCustomer.do');
INSERT INTO `fun_url` VALUES ('156', '69', '/customer/checkCustomer.do');
INSERT INTO `fun_url` VALUES ('157', '69', '/customer/numberCustomer.do');
INSERT INTO `fun_url` VALUES ('158', '69', '/system/listRegion.do');
INSERT INTO `fun_url` VALUES ('159', '70', '/customer/listCustomer.do');
INSERT INTO `fun_url` VALUES ('160', '70', '/customer/saveCustomer.do');
INSERT INTO `fun_url` VALUES ('161', '70', '/customer/checkCustomer.do');
INSERT INTO `fun_url` VALUES ('162', '70', '/customer/numberCustomer.do');
INSERT INTO `fun_url` VALUES ('163', '70', '/system/listRegion.do');
INSERT INTO `fun_url` VALUES ('164', '70', '/customer/getCustomer.do');
INSERT INTO `fun_url` VALUES ('165', '71', '/customer/listCustomer.do');
INSERT INTO `fun_url` VALUES ('166', '71', '/customer/multiDelCustomer.do');
INSERT INTO `fun_url` VALUES ('167', '72', '/customer/listCusLinkman.do');
INSERT INTO `fun_url` VALUES ('168', '73', '/customer/listCusLinkman.do');
INSERT INTO `fun_url` VALUES ('169', '73', '/customer/saveCusLinkman.do');
INSERT INTO `fun_url` VALUES ('170', '74', '/customer/listCusLinkman.do');
INSERT INTO `fun_url` VALUES ('171', '74', '/customer/saveCusLinkman.do');
INSERT INTO `fun_url` VALUES ('172', '74', '/customer/getCusLinkman.do');
INSERT INTO `fun_url` VALUES ('173', '75', '/customer/listCusLinkman.do');
INSERT INTO `fun_url` VALUES ('174', '75', '/customer/multiDelCusLinkman.do');
INSERT INTO `fun_url` VALUES ('175', '76', '/customer/listCusConnection.do');
INSERT INTO `fun_url` VALUES ('176', '77', '/customer/listCusConnection.do');
INSERT INTO `fun_url` VALUES ('177', '77', '/customer/saveCusConnection.do');
INSERT INTO `fun_url` VALUES ('178', '77', '/customer/findCusLinkman.do');
INSERT INTO `fun_url` VALUES ('179', '78', '/customer/listCusConnection.do');
INSERT INTO `fun_url` VALUES ('180', '78', '/customer/saveCusConnection.do');
INSERT INTO `fun_url` VALUES ('181', '78', '/customer/findCusLinkman.do');
INSERT INTO `fun_url` VALUES ('182', '78', '/customer/getCusConnection.do');
INSERT INTO `fun_url` VALUES ('183', '79', '/customer/listCusConnection.do');
INSERT INTO `fun_url` VALUES ('184', '79', '/customer/multiDelCusConnection.do');
INSERT INTO `fun_url` VALUES ('185', '80', '/customer/listProject.do');
INSERT INTO `fun_url` VALUES ('186', '81', '/customer/listProject.do');
INSERT INTO `fun_url` VALUES ('187', '81', '/customer/saveProject.do');
INSERT INTO `fun_url` VALUES ('188', '81', '/customer/numberProject.do');
INSERT INTO `fun_url` VALUES ('189', '81', '/customer/findCusLinkman.do');
INSERT INTO `fun_url` VALUES ('190', '82', '/customer/listProject.do');
INSERT INTO `fun_url` VALUES ('191', '82', '/customer/saveProject.do');
INSERT INTO `fun_url` VALUES ('192', '82', '/customer/numberProject.do');
INSERT INTO `fun_url` VALUES ('193', '82', '/customer/findCusLinkman.do');
INSERT INTO `fun_url` VALUES ('194', '82', '/customer/getProject.do');
INSERT INTO `fun_url` VALUES ('195', '83', '/customer/listProject.do');
INSERT INTO `fun_url` VALUES ('196', '83', '/customer/multiDelProject.do');
INSERT INTO `fun_url` VALUES ('197', '84', '/customer/listContract.do');
INSERT INTO `fun_url` VALUES ('198', '85', '/customer/listContract.do');
INSERT INTO `fun_url` VALUES ('199', '85', '/customer/saveContract.do');
INSERT INTO `fun_url` VALUES ('200', '85', '/customer/getProject.do');
INSERT INTO `fun_url` VALUES ('201', '85', '/customer/removeFileContract.do');
INSERT INTO `fun_url` VALUES ('202', '85', '/customer/listContractConfig.do');
INSERT INTO `fun_url` VALUES ('203', '85', '/customer/multiDelContractConfig.do');
INSERT INTO `fun_url` VALUES ('204', '86', '/customer/listContract.do');
INSERT INTO `fun_url` VALUES ('205', '86', '/customer/saveContract.do');
INSERT INTO `fun_url` VALUES ('206', '86', '/customer/getProject.do');
INSERT INTO `fun_url` VALUES ('207', '86', '/customer/removeFileContract.do');
INSERT INTO `fun_url` VALUES ('208', '86', '/customer/listContractConfig.do');
INSERT INTO `fun_url` VALUES ('209', '86', '/customer/multiDelContractConfig.do');
INSERT INTO `fun_url` VALUES ('210', '86', '/customer/getContract.do');
INSERT INTO `fun_url` VALUES ('211', '87', '/customer/listContract.do');
INSERT INTO `fun_url` VALUES ('212', '87', '/customer/multiDelContract.do');
INSERT INTO `fun_url` VALUES ('213', '88', '/customer/listProduct.do');
INSERT INTO `fun_url` VALUES ('214', '89', '/customer/saveProduct.do');
INSERT INTO `fun_url` VALUES ('215', '89', '/customer/listProvider.do');
INSERT INTO `fun_url` VALUES ('216', '90', '/customer/listProduct.do');
INSERT INTO `fun_url` VALUES ('217', '90', '/customer/getProduct.do');
INSERT INTO `fun_url` VALUES ('218', '90', '/customer/saveProduct.do');
INSERT INTO `fun_url` VALUES ('219', '91', '/customer/listProduct.do');
INSERT INTO `fun_url` VALUES ('220', '91', '/customer/multiDelProduct.do');
INSERT INTO `fun_url` VALUES ('221', '92', '/customer/listProvider.do');
INSERT INTO `fun_url` VALUES ('222', '93', '/customer/saveProvider.do');
INSERT INTO `fun_url` VALUES ('223', '94', '/customer/listProvider.do');
INSERT INTO `fun_url` VALUES ('224', '94', '/customer/getProvider.do');
INSERT INTO `fun_url` VALUES ('225', '94', '/customer/saveProvider.do');
INSERT INTO `fun_url` VALUES ('226', '95', '/customer/listProvider.do');
INSERT INTO `fun_url` VALUES ('227', '95', '/customer/multiDelProvider.do');
INSERT INTO `fun_url` VALUES ('228', '96', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('229', '96', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('230', '97', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('231', '97', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('232', '97', '/admin/multiDelOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('233', '97', '/admin/saveOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('234', '97', '/admin/getOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('235', '98', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('236', '98', '/admin/saveOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('237', '98', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('238', '99', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('239', '99', '/admin/saveOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('240', '99', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('241', '99', '/admin/getOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('242', '100', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('243', '100', '/admin/multiDelOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('244', '101', '/admin/listInStock.do');
INSERT INTO `fun_url` VALUES ('245', '102', '/admin/listInStock.do');
INSERT INTO `fun_url` VALUES ('246', '102', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('247', '102', '/admin/saveInStock.do');
INSERT INTO `fun_url` VALUES ('248', '102', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('249', '103', '/admin/listInStock.do');
INSERT INTO `fun_url` VALUES ('250', '103', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('251', '103', '/admin/saveInStock.do');
INSERT INTO `fun_url` VALUES ('252', '103', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('253', '103', '/admin/getInStock.do');
INSERT INTO `fun_url` VALUES ('254', '104', '/admin/listInStock.do');
INSERT INTO `fun_url` VALUES ('255', '104', '/admin/multiDelInStock.do');
INSERT INTO `fun_url` VALUES ('256', '105', '/admin/listGoodsApply.do');
INSERT INTO `fun_url` VALUES ('257', '106', '/admin/listGoodsApply.do');
INSERT INTO `fun_url` VALUES ('258', '106', '/admin/saveGoodsApply.do');
INSERT INTO `fun_url` VALUES ('259', '106', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('260', '106', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('261', '107', '/admin/listGoodsApply.do');
INSERT INTO `fun_url` VALUES ('262', '107', '/admin/saveGoodsApply.do');
INSERT INTO `fun_url` VALUES ('263', '107', '/admin/listOfficeGoods.do');
INSERT INTO `fun_url` VALUES ('264', '107', '/admin/treeOfficeGoodsType.do');
INSERT INTO `fun_url` VALUES ('265', '107', '/admin/getGoodsApply.do');
INSERT INTO `fun_url` VALUES ('266', '108', '/admin/listGoodsApply.do');
INSERT INTO `fun_url` VALUES ('267', '108', '/admin/multiDelGoodsApply.do');
INSERT INTO `fun_url` VALUES ('268', '109', '/admin/listCar.do');
INSERT INTO `fun_url` VALUES ('269', '110', '/admin/listCar.do');
INSERT INTO `fun_url` VALUES ('270', '110', '/admin/saveCar.do');
INSERT INTO `fun_url` VALUES ('271', '111', '/admin/listCar.do');
INSERT INTO `fun_url` VALUES ('272', '111', '/admin/saveCar.do');
INSERT INTO `fun_url` VALUES ('273', '111', '/admin/getCar.do');
INSERT INTO `fun_url` VALUES ('274', '112', '/admin/listCar.do');
INSERT INTO `fun_url` VALUES ('275', '112', '/admin/multiDelCar.do');
INSERT INTO `fun_url` VALUES ('276', '113', '/admin/listCartRepair.do');
INSERT INTO `fun_url` VALUES ('277', '114', '/admin/listCartRepair.do');
INSERT INTO `fun_url` VALUES ('278', '114', '/admin/saveCartRepair.do');
INSERT INTO `fun_url` VALUES ('279', '115', '/admin/listCartRepair.do');
INSERT INTO `fun_url` VALUES ('280', '115', '/admin/saveCartRepair.do');
INSERT INTO `fun_url` VALUES ('281', '115', '/admin/getCartRepair.do');
INSERT INTO `fun_url` VALUES ('282', '116', '/admin/listCartRepair.do');
INSERT INTO `fun_url` VALUES ('283', '116', '/admin/multiDelCartRepair.do');
INSERT INTO `fun_url` VALUES ('284', '117', '/admin/listCarApply.do');
INSERT INTO `fun_url` VALUES ('285', '118', '/admin/listCarApply.do');
INSERT INTO `fun_url` VALUES ('286', '118', '/admin/saveCarApply.do');
INSERT INTO `fun_url` VALUES ('287', '119', '/admin/listCarApply.do');
INSERT INTO `fun_url` VALUES ('288', '119', '/admin/saveCarApply.do');
INSERT INTO `fun_url` VALUES ('289', '119', '/admin/getCarApply.do');
INSERT INTO `fun_url` VALUES ('290', '120', '/admin/listCarApply.do');
INSERT INTO `fun_url` VALUES ('291', '120', '/admin/multiDelCarApply.do');
INSERT INTO `fun_url` VALUES ('292', '121', '/admin/listDepreType.do');
INSERT INTO `fun_url` VALUES ('293', '122', '/admin/listDepreType.do');
INSERT INTO `fun_url` VALUES ('294', '122', '/admin/saveDepreType.do');
INSERT INTO `fun_url` VALUES ('295', '123', '/admin/listDepreType.do');
INSERT INTO `fun_url` VALUES ('296', '123', '/admin/saveDepreType.do');
INSERT INTO `fun_url` VALUES ('297', '123', '/admin/getDepreType.do');
INSERT INTO `fun_url` VALUES ('298', '124', '/admin/listDepreType.do');
INSERT INTO `fun_url` VALUES ('299', '124', '/admin/multiDelDepreType.do');
INSERT INTO `fun_url` VALUES ('300', '125', '/admin/listFixedAssets.do');
INSERT INTO `fun_url` VALUES ('301', '125', '/admin/treeAssetsType.do');
INSERT INTO `fun_url` VALUES ('302', '126', '/admin/treeAssetsType.do');
INSERT INTO `fun_url` VALUES ('303', '126', '/admin/multiDelAssetsType.do');
INSERT INTO `fun_url` VALUES ('304', '126', '/admin/saveAssetsType.do');
INSERT INTO `fun_url` VALUES ('305', '126', '/admin/getAssetsType.do');
INSERT INTO `fun_url` VALUES ('306', '127', '/admin/listFixedAssets.do');
INSERT INTO `fun_url` VALUES ('307', '127', '/system/selectDepartment.do');
INSERT INTO `fun_url` VALUES ('308', '127', '/admin/treeAssetsType.do');
INSERT INTO `fun_url` VALUES ('309', '127', '/admin/saveFixedAssets.do');
INSERT INTO `fun_url` VALUES ('310', '127', '/admin/comboxAssetsType.do');
INSERT INTO `fun_url` VALUES ('311', '127', '/admin/comboxDepreType.do');
INSERT INTO `fun_url` VALUES ('312', '128', '/admin/listFixedAssets.do');
INSERT INTO `fun_url` VALUES ('313', '128', '/admin/treeAssetsType.do');
INSERT INTO `fun_url` VALUES ('314', '128', '/system/selectDepartment.do');
INSERT INTO `fun_url` VALUES ('315', '128', '/admin/saveFixedAssets.do');
INSERT INTO `fun_url` VALUES ('316', '128', '/admin/comboxAssetsType.do');
INSERT INTO `fun_url` VALUES ('317', '128', '/admin/comboxDepreType.do');
INSERT INTO `fun_url` VALUES ('318', '128', '/admin/getFixedAssets.do');
INSERT INTO `fun_url` VALUES ('319', '129', '/admin/listFixedAssets.do');
INSERT INTO `fun_url` VALUES ('320', '129', '/admin/treeAssetsType.do');
INSERT INTO `fun_url` VALUES ('321', '129', '/admin/multiDelFixedAssets.do');
INSERT INTO `fun_url` VALUES ('322', '130', '/admin/depreciateDepreRecord.do');
INSERT INTO `fun_url` VALUES ('323', '130', '/admin/workDepreRecord.do');
INSERT INTO `fun_url` VALUES ('324', '131', '/admin/listDepreRecord.do');
INSERT INTO `fun_url` VALUES ('325', '132', '/admin/listBookType.do');
INSERT INTO `fun_url` VALUES ('326', '133', '/admin/listBookType.do');
INSERT INTO `fun_url` VALUES ('327', '133', '/admin/saveBookType.do');
INSERT INTO `fun_url` VALUES ('328', '134', '/admin/listBookType.do');
INSERT INTO `fun_url` VALUES ('329', '134', '/admin/saveBookType.do');
INSERT INTO `fun_url` VALUES ('330', '134', '/admin/getBookType.do');
INSERT INTO `fun_url` VALUES ('331', '135', '/admin/listBookType.do');
INSERT INTO `fun_url` VALUES ('332', '135', '/admin/multiDelBookType.do');
INSERT INTO `fun_url` VALUES ('333', '136', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('334', '136', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('335', '137', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('336', '137', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('337', '137', '/admin/saveBook.do');
INSERT INTO `fun_url` VALUES ('338', '137', '/admin/treeBook.do');
INSERT INTO `fun_url` VALUES ('339', '138', '/admin/listBookType.do');
INSERT INTO `fun_url` VALUES ('340', '138', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('341', '138', '/admin/saveBookType.do');
INSERT INTO `fun_url` VALUES ('342', '138', '/admin/treeBook.do');
INSERT INTO `fun_url` VALUES ('343', '138', '/admin/getBook.do');
INSERT INTO `fun_url` VALUES ('344', '139', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('345', '139', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('346', '139', '/admin/multiDelBook.do');
INSERT INTO `fun_url` VALUES ('347', '140', '/admin/listBorrowBookBorRet.do');
INSERT INTO `fun_url` VALUES ('348', '141', '/admin/listBorrowBookBorRet.do');
INSERT INTO `fun_url` VALUES ('349', '141', '/admin/saveBorrowBookBorRet.do');
INSERT INTO `fun_url` VALUES ('350', '141', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('351', '141', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('352', '141', '/admin/getBook.do');
INSERT INTO `fun_url` VALUES ('353', '141', '/admin/getBorrowSnBookSn.do');
INSERT INTO `fun_url` VALUES ('354', '142', '/admin/listBorrowBookBorRet.do');
INSERT INTO `fun_url` VALUES ('355', '142', '/admin/saveBorrowBookBorRet.do');
INSERT INTO `fun_url` VALUES ('356', '142', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('357', '142', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('358', '142', '/admin/getBook.do');
INSERT INTO `fun_url` VALUES ('359', '142', '/admin/getBorrowSnBookSn.do');
INSERT INTO `fun_url` VALUES ('360', '142', '/admin/getBookBorRet.do');
INSERT INTO `fun_url` VALUES ('361', '143', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('362', '143', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('363', '143', '/admin/getReturnSnBookSn.do');
INSERT INTO `fun_url` VALUES ('364', '143', '/admin/getBorRetTimeBookBorRet.do');
INSERT INTO `fun_url` VALUES ('365', '143', '/admin/listReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('366', '143', '/admin/saveReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('367', '143', '/admin/getBookBorRet.do');
INSERT INTO `fun_url` VALUES ('368', '144', '/admin/listBorrowBookBorRet.do');
INSERT INTO `fun_url` VALUES ('369', '144', '/admin/multiDelBookBorRet.do');
INSERT INTO `fun_url` VALUES ('370', '145', '/admin/listReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('371', '146', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('372', '146', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('373', '146', '/admin/getReturnSnBookSn.do');
INSERT INTO `fun_url` VALUES ('374', '146', '/admin/getBorRetTimeBookBorRet.do');
INSERT INTO `fun_url` VALUES ('375', '146', '/admin/listReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('376', '146', '/admin/saveReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('377', '147', '/admin/listBook.do');
INSERT INTO `fun_url` VALUES ('378', '147', '/admin/treeBookType.do');
INSERT INTO `fun_url` VALUES ('379', '147', '/admin/getReturnSnBookSn.do');
INSERT INTO `fun_url` VALUES ('380', '147', '/admin/getBorRetTimeBookBorRet.do');
INSERT INTO `fun_url` VALUES ('381', '147', '/admin/listReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('382', '147', '/admin/saveReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('383', '147', '/admin/getBookBorRet.do');
INSERT INTO `fun_url` VALUES ('384', '148', '/admin/listReturnBookBorRet.do');
INSERT INTO `fun_url` VALUES ('385', '148', '/admin/multiDelBookBorRet.do');
INSERT INTO `fun_url` VALUES ('386', '149', '/system/listReportTemplate.do');
INSERT INTO `fun_url` VALUES ('387', '149', 'report/report.jsp');
INSERT INTO `fun_url` VALUES ('388', '150', '/system/listReportTemplate.do');
INSERT INTO `fun_url` VALUES ('389', '150', '/system/saveReportTemplate.do');
INSERT INTO `fun_url` VALUES ('390', '151', '/system/listReportTemplate.do');
INSERT INTO `fun_url` VALUES ('391', '151', '/system/getReportTemplate.do');
INSERT INTO `fun_url` VALUES ('392', '152', '/system/loadReportTemplate.do');
INSERT INTO `fun_url` VALUES ('393', '152', '/system/submitReportTemplate.do');
INSERT INTO `fun_url` VALUES ('394', '152', '/system/listReportParam.do');
INSERT INTO `fun_url` VALUES ('395', '152', '/system/multiDelReportParam.do');
INSERT INTO `fun_url` VALUES ('396', '152', '/system/saveReportTemplate.do');
INSERT INTO `fun_url` VALUES ('397', '152', '/system/saveReportParam.do');
INSERT INTO `fun_url` VALUES ('398', '152', '/system/getReportParam.do');
INSERT INTO `fun_url` VALUES ('399', '153', '/system/listReportTemplate.do');
INSERT INTO `fun_url` VALUES ('400', '153', '/system/multiDelReportTemplate.do');
INSERT INTO `fun_url` VALUES ('401', '154', '/system/listDictionary.do');
INSERT INTO `fun_url` VALUES ('402', '155', '/system/listDictionary.do');
INSERT INTO `fun_url` VALUES ('403', '155', '/system/saveDictionary.do');
INSERT INTO `fun_url` VALUES ('404', '155', '/system/itemsDictionary.do');
INSERT INTO `fun_url` VALUES ('405', '156', '/system/listDictionary.do');
INSERT INTO `fun_url` VALUES ('406', '156', '/system/saveDictionary.do');
INSERT INTO `fun_url` VALUES ('407', '156', '/system/itemsDictionary.do');
INSERT INTO `fun_url` VALUES ('408', '156', '/system/getDictionary.do');
INSERT INTO `fun_url` VALUES ('409', '157', '/system/listDictionary.do');
INSERT INTO `fun_url` VALUES ('410', '157', '/system/multiDelDictionary.do');
INSERT INTO `fun_url` VALUES ('411', '158', '/hrm/listJob.do');
INSERT INTO `fun_url` VALUES ('412', '159', '/hrm/listJob.do');
INSERT INTO `fun_url` VALUES ('413', '159', '/hrm/saveJob.do');
INSERT INTO `fun_url` VALUES ('414', '160', '/hrm/listJob.do');
INSERT INTO `fun_url` VALUES ('415', '160', '/hrm/saveJob.do');
INSERT INTO `fun_url` VALUES ('416', '160', '/hrm/getJob.do');
INSERT INTO `fun_url` VALUES ('417', '161', '/hrm/listJob.do');
INSERT INTO `fun_url` VALUES ('418', '161', '/hrm/multiDelJob.do');
INSERT INTO `fun_url` VALUES ('419', '162', '/hrm/listJob.do');
INSERT INTO `fun_url` VALUES ('420', '162', '/hrm/recoveryJob.do');
INSERT INTO `fun_url` VALUES ('421', '163', '/hrm/saveEmpProfile.do');
INSERT INTO `fun_url` VALUES ('422', '163', '/hrm/numberEmpProfile.do');
INSERT INTO `fun_url` VALUES ('423', '163', '/hrm/comboJob.do');
INSERT INTO `fun_url` VALUES ('424', '163', '/hrm/comboStandSalary.do');
INSERT INTO `fun_url` VALUES ('425', '164', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('426', '165', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('427', '165', '/hrm/saveEmpProfile.do');
INSERT INTO `fun_url` VALUES ('428', '165', '/hrm/numberEmpProfile.do');
INSERT INTO `fun_url` VALUES ('429', '165', '/hrm/comboJob.do');
INSERT INTO `fun_url` VALUES ('430', '165', '/hrm/comboStandSalary.do');
INSERT INTO `fun_url` VALUES ('431', '166', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('432', '166', '/hrm/saveEmpProfile.do');
INSERT INTO `fun_url` VALUES ('433', '166', '/hrm/numberEmpProfile.do');
INSERT INTO `fun_url` VALUES ('434', '166', '/hrm/comboJob.do');
INSERT INTO `fun_url` VALUES ('435', '166', '/hrm/comboStandSalary.do');
INSERT INTO `fun_url` VALUES ('436', '166', '/hrm/getEmpProfile.do');
INSERT INTO `fun_url` VALUES ('437', '167', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('438', '167', '/hrm/multiDelEmpProfile.do');
INSERT INTO `fun_url` VALUES ('439', '168', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('440', '168', '/hrm/checkEmpProfile.do');
INSERT INTO `fun_url` VALUES ('441', '169', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('442', '169', '/hrm/recoveryEmpProfile.do');
INSERT INTO `fun_url` VALUES ('443', '170', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('444', '171', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('445', '171', '/hrm/saveSalaryItem.do');
INSERT INTO `fun_url` VALUES ('446', '172', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('447', '172', '/hrm/saveSalaryItem.do');
INSERT INTO `fun_url` VALUES ('448', '172', '/hrm/getSalaryItem.do');
INSERT INTO `fun_url` VALUES ('449', '173', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('450', '173', '/hrm/multiDelSalaryItem.do');
INSERT INTO `fun_url` VALUES ('451', '174', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('452', '174', '/hrm/saveStandSalary.do');
INSERT INTO `fun_url` VALUES ('453', '174', '/hrm/numberStandSalary.do');
INSERT INTO `fun_url` VALUES ('454', '174', '/hrm/listStandSalaryItem.do');
INSERT INTO `fun_url` VALUES ('455', '175', '/hrm/listStandSalary.do');
INSERT INTO `fun_url` VALUES ('456', '176', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('457', '176', '/hrm/listStandSalary.do');
INSERT INTO `fun_url` VALUES ('458', '176', '/hrm/saveStandSalary.do');
INSERT INTO `fun_url` VALUES ('459', '176', '/hrm/numberStandSalary.do');
INSERT INTO `fun_url` VALUES ('460', '176', '/hrm/listStandSalaryItem.do');
INSERT INTO `fun_url` VALUES ('461', '177', '/hrm/listStandSalary.do');
INSERT INTO `fun_url` VALUES ('462', '177', '/hrm/listSalaryItem.do');
INSERT INTO `fun_url` VALUES ('463', '177', '/hrm/saveStandSalary.do');
INSERT INTO `fun_url` VALUES ('464', '177', '/hrm/getStandSalary.do');
INSERT INTO `fun_url` VALUES ('465', '177', '/hrm/listStandSalaryItem.do');
INSERT INTO `fun_url` VALUES ('466', '178', '/hrm/listStandSalary.do');
INSERT INTO `fun_url` VALUES ('467', '178', '/hrm/multiDelStandSalary.do');
INSERT INTO `fun_url` VALUES ('468', '179', '/hrm/listStandSalaryItem.do');
INSERT INTO `fun_url` VALUES ('469', '179', '/hrm/getStandSalary.do');
INSERT INTO `fun_url` VALUES ('470', '179', '/hrm/listStandSalary.do');
INSERT INTO `fun_url` VALUES ('471', '179', '/hrm/checkStandSalary.do');
INSERT INTO `fun_url` VALUES ('472', '180', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('473', '180', '/hrm/saveSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('474', '181', '/hrm/listSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('475', '182', '/hrm/listSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('476', '182', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('477', '182', '/hrm/saveSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('478', '183', '/hrm/listSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('479', '183', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('480', '183', '/hrm/saveSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('481', '183', '/hrm/getSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('482', '184', '/hrm/listSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('483', '184', '/hrm/multiDelSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('484', '185', '/hrm/checkSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('485', '185', '/hrm/listSalaryPayoff.do');
INSERT INTO `fun_url` VALUES ('486', '186', '/hrm/saveJobChange.do');
INSERT INTO `fun_url` VALUES ('487', '186', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('488', '186', '/hrm/comboJob.do');
INSERT INTO `fun_url` VALUES ('489', '186', '/hrm/comboStandSalary.do');
INSERT INTO `fun_url` VALUES ('490', '187', '/hrm/listJobChange.do');
INSERT INTO `fun_url` VALUES ('491', '188', '/hrm/saveJobChange.do');
INSERT INTO `fun_url` VALUES ('492', '188', '/hrm/listJobChange.do');
INSERT INTO `fun_url` VALUES ('493', '188', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('494', '188', '/hrm/comboJob.do');
INSERT INTO `fun_url` VALUES ('495', '188', '/hrm/comboStandSalary.do');
INSERT INTO `fun_url` VALUES ('496', '189', '/hrm/saveJobChange.do');
INSERT INTO `fun_url` VALUES ('497', '189', '/hrm/listJobChange.do');
INSERT INTO `fun_url` VALUES ('498', '189', '/hrm/listEmpProfile.do');
INSERT INTO `fun_url` VALUES ('499', '189', '/hrm/getJobChange.do');
INSERT INTO `fun_url` VALUES ('500', '189', '/hrm/comboJob.do');
INSERT INTO `fun_url` VALUES ('501', '189', '/hrm/comboStandSalary.do');
INSERT INTO `fun_url` VALUES ('502', '190', '/hrm/listJobChange.do');
INSERT INTO `fun_url` VALUES ('503', '190', '/hrm/multiDelJobChange.do');
INSERT INTO `fun_url` VALUES ('504', '191', '/hrm/loadJobChange.do');
INSERT INTO `fun_url` VALUES ('505', '191', '/hrm/checkJobChange.do');
INSERT INTO `fun_url` VALUES ('506', '191', '/hrm/listJobChange.do');
INSERT INTO `fun_url` VALUES ('507', '192', '/hrm/listHireIssue.do');
INSERT INTO `fun_url` VALUES ('508', '192', '/hrm/loadHireIssue.do');
INSERT INTO `fun_url` VALUES ('509', '193', '/hrm/listHireIssue.do');
INSERT INTO `fun_url` VALUES ('510', '193', '/hrm/saveHireIssue.do');
INSERT INTO `fun_url` VALUES ('511', '193', '/hrm/loadHireIssue.do');
INSERT INTO `fun_url` VALUES ('512', '194', '/hrm/listHireIssue.do');
INSERT INTO `fun_url` VALUES ('513', '194', '/hrm/saveHireIssue.do');
INSERT INTO `fun_url` VALUES ('514', '194', '/hrm/loadHireIssue.do');
INSERT INTO `fun_url` VALUES ('515', '194', '/hrm/getHireIssue.do');
INSERT INTO `fun_url` VALUES ('516', '195', '/hrm/multiDelHireIssue.do');
INSERT INTO `fun_url` VALUES ('517', '195', '/hrm/loadHireIssue.do');
INSERT INTO `fun_url` VALUES ('518', '195', '/hrm/listHireIssue.do');
INSERT INTO `fun_url` VALUES ('519', '196', '/hrm/multiDelHireIssue.do');
INSERT INTO `fun_url` VALUES ('520', '196', '/hrm/checkHireIssue.do');
INSERT INTO `fun_url` VALUES ('521', '196', '/hrm/loadHireIssue.do');
INSERT INTO `fun_url` VALUES ('522', '197', '/hrm/listResume.do');
INSERT INTO `fun_url` VALUES ('523', '198', '/hrm/listResume.do');
INSERT INTO `fun_url` VALUES ('524', '198', '/hrm/saveResume.do');
INSERT INTO `fun_url` VALUES ('525', '199', '/hrm/getResume.do');
INSERT INTO `fun_url` VALUES ('526', '199', '/hrm/listResume.do');
INSERT INTO `fun_url` VALUES ('527', '199', '/hrm/saveResume.do');
INSERT INTO `fun_url` VALUES ('528', '200', '/hrm/multiDelResume.do');
INSERT INTO `fun_url` VALUES ('529', '200', '/hrm/listResume.do');

-- ----------------------------
-- Table structure for goods_apply
-- ----------------------------
DROP TABLE IF EXISTS `goods_apply`;
CREATE TABLE `goods_apply` (
  `applyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `goodsId` bigint(20) NOT NULL,
  `applyDate` datetime NOT NULL,
  `applyNo` varchar(128) NOT NULL COMMENT '申请号,按系统时间产生，如GA20091002-0001',
  `useCounts` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  `proposer` varchar(32) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `approvalStatus` smallint(6) NOT NULL COMMENT '审批状态\r\n            1=通过审批\r\n            0=未审批\r\n            ',
  PRIMARY KEY (`applyId`),
  KEY `FK_GA_R_OG` (`goodsId`) USING BTREE,
  CONSTRAINT `goods_apply_ibfk_1` FOREIGN KEY (`goodsId`) REFERENCES `office_goods` (`goodsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品出库';

-- ----------------------------
-- Records of goods_apply
-- ----------------------------

-- ----------------------------
-- Table structure for hire_issue
-- ----------------------------
DROP TABLE IF EXISTS `hire_issue`;
CREATE TABLE `hire_issue` (
  `hireId` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `hireCount` int(11) NOT NULL,
  `jobName` varchar(128) NOT NULL,
  `jobCondition` varchar(1024) DEFAULT NULL,
  `regFullname` varchar(128) NOT NULL,
  `regDate` datetime NOT NULL,
  `modifyFullname` varchar(32) DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  `checkFullname` varchar(32) DEFAULT NULL,
  `checkOpinion` varchar(512) DEFAULT NULL,
  `checkDate` datetime DEFAULT NULL,
  `status` smallint(6) NOT NULL COMMENT '1=通过审核\r\n            0=未审核\r\n            2=审核不通过',
  `memo` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`hireId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='招聘发布';

-- ----------------------------
-- Records of hire_issue
-- ----------------------------

-- ----------------------------
-- Table structure for holiday_record
-- ----------------------------
DROP TABLE IF EXISTS `holiday_record`;
CREATE TABLE `holiday_record` (
  `recordId` bigint(20) NOT NULL AUTO_INCREMENT,
  `startTime` datetime NOT NULL COMMENT '开始日期',
  `endTime` datetime NOT NULL COMMENT '结束日期',
  `descp` varchar(512) DEFAULT NULL COMMENT '假期描述',
  `fullname` varchar(32) DEFAULT NULL COMMENT '用户名',
  `userId` bigint(20) DEFAULT NULL COMMENT '所属用户\r\n            若为某员工的假期，则为员工自己的id',
  `isAll` smallint(6) NOT NULL COMMENT '是否为全公司假期\r\n            1=是\r\n            0=否',
  PRIMARY KEY (`recordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='放假记录';

-- ----------------------------
-- Records of holiday_record
-- ----------------------------

-- ----------------------------
-- Table structure for index_display
-- ----------------------------
DROP TABLE IF EXISTS `index_display`;
CREATE TABLE `index_display` (
  `indexId` bigint(20) NOT NULL AUTO_INCREMENT,
  `portalId` varchar(64) NOT NULL COMMENT 'Portal ID',
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `colNum` int(11) NOT NULL COMMENT '列号',
  `rowNum` int(11) NOT NULL COMMENT '行号',
  PRIMARY KEY (`indexId`),
  KEY `FK_ID_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `index_display_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每个员工可以设置自己的显示方式';

-- ----------------------------
-- Records of index_display
-- ----------------------------

-- ----------------------------
-- Table structure for in_message
-- ----------------------------
DROP TABLE IF EXISTS `in_message`;
CREATE TABLE `in_message` (
  `receiveId` bigint(20) NOT NULL AUTO_INCREMENT,
  `messageId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `readFlag` smallint(6) NOT NULL COMMENT '1=has red\r\n            0=unread',
  `delFlag` smallint(6) NOT NULL,
  `userFullname` varchar(32) NOT NULL,
  PRIMARY KEY (`receiveId`),
  KEY `FK_IM_R_AU` (`userId`) USING BTREE,
  KEY `FK_IM_R_SM` (`messageId`) USING BTREE,
  CONSTRAINT `in_message_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `in_message_ibfk_2` FOREIGN KEY (`messageId`) REFERENCES `short_message` (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of in_message
-- ----------------------------
INSERT INTO `in_message` VALUES ('1', '1', '1', '1', '1', '?????');
INSERT INTO `in_message` VALUES ('2', '2', '3', '0', '0', '向刚');
INSERT INTO `in_message` VALUES ('3', '2', '4', '0', '0', '刘冲');
INSERT INTO `in_message` VALUES ('4', '2', '5', '0', '0', '曾成');

-- ----------------------------
-- Table structure for in_stock
-- ----------------------------
DROP TABLE IF EXISTS `in_stock`;
CREATE TABLE `in_stock` (
  `buyId` bigint(20) NOT NULL AUTO_INCREMENT,
  `goodsId` bigint(20) NOT NULL,
  `providerName` varchar(128) DEFAULT NULL,
  `stockNo` varchar(128) NOT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `inCounts` int(11) DEFAULT NULL,
  `amount` decimal(18,2) NOT NULL,
  `inDate` datetime NOT NULL,
  `buyer` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`buyId`),
  KEY `FK_IS_R_OG` (`goodsId`) USING BTREE,
  CONSTRAINT `in_stock_ibfk_1` FOREIGN KEY (`goodsId`) REFERENCES `office_goods` (`goodsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品入库需要同时更新办公用品表的库存';

-- ----------------------------
-- Records of in_stock
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_deployment
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_deployment`;
CREATE TABLE `jbpm4_deployment` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `NAME_` longtext,
  `TIMESTAMP_` bigint(20) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_deployment
-- ----------------------------
INSERT INTO `jbpm4_deployment` VALUES ('3', null, '0', 'active');

-- ----------------------------
-- Table structure for jbpm4_deployprop
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_deployprop`;
CREATE TABLE `jbpm4_deployprop` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DEPLOYMENT_` bigint(20) DEFAULT NULL,
  `OBJNAME_` varchar(255) DEFAULT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `STRINGVAL_` varchar(255) DEFAULT NULL,
  `LONGVAL_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_DEPLPROP_DEPL` (`DEPLOYMENT_`) USING BTREE,
  KEY `FK_DEPLPROP_DEPL` (`DEPLOYMENT_`) USING BTREE,
  CONSTRAINT `jbpm4_deployprop_ibfk_1` FOREIGN KEY (`DEPLOYMENT_`) REFERENCES `jbpm4_deployment` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_deployprop
-- ----------------------------
INSERT INTO `jbpm4_deployprop` VALUES ('7', '3', '两步审批', 'pdkey', '____', null);
INSERT INTO `jbpm4_deployprop` VALUES ('8', '3', '两步审批', 'pdid', '____-1', null);
INSERT INTO `jbpm4_deployprop` VALUES ('9', '3', '两步审批', 'pdversion', null, '1');

-- ----------------------------
-- Table structure for jbpm4_execution
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_execution`;
CREATE TABLE `jbpm4_execution` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ACTIVITYNAME_` varchar(255) DEFAULT NULL,
  `PROCDEFID_` varchar(255) DEFAULT NULL,
  `HASVARS_` bit(1) DEFAULT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `SUSPHISTSTATE_` varchar(255) DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `HISACTINST_` bigint(20) DEFAULT NULL,
  `PARENT_` bigint(20) DEFAULT NULL,
  `INSTANCE_` bigint(20) DEFAULT NULL,
  `SUPEREXEC_` bigint(20) DEFAULT NULL,
  `SUBPROCINST_` bigint(20) DEFAULT NULL,
  `PARENT_IDX_` int(11) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  UNIQUE KEY `ID_` (`ID_`) USING BTREE,
  KEY `IDX_EXEC_SUPEREXEC` (`SUPEREXEC_`) USING BTREE,
  KEY `IDX_EXEC_INSTANCE` (`INSTANCE_`) USING BTREE,
  KEY `IDX_EXEC_SUBPI` (`SUBPROCINST_`) USING BTREE,
  KEY `IDX_EXEC_PARENT` (`PARENT_`) USING BTREE,
  KEY `FK_EXEC_PARENT` (`PARENT_`) USING BTREE,
  KEY `FK_EXEC_SUBPI` (`SUBPROCINST_`) USING BTREE,
  KEY `FK_EXEC_INSTANCE` (`INSTANCE_`) USING BTREE,
  KEY `FK_EXEC_SUPEREXEC` (`SUPEREXEC_`) USING BTREE,
  CONSTRAINT `jbpm4_execution_ibfk_1` FOREIGN KEY (`INSTANCE_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `jbpm4_execution_ibfk_2` FOREIGN KEY (`PARENT_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `jbpm4_execution_ibfk_3` FOREIGN KEY (`SUBPROCINST_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `jbpm4_execution_ibfk_4` FOREIGN KEY (`SUPEREXEC_`) REFERENCES `jbpm4_execution` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_execution
-- ----------------------------
INSERT INTO `jbpm4_execution` VALUES ('1', 'pvm', '4', '经理审批', '____-1', '', null, null, '____.1', 'active-root', null, '0', '2', null, '1', null, null, null);
INSERT INTO `jbpm4_execution` VALUES ('2', 'pvm', '2', '上级审批', '____-1', '', null, null, '____.2', 'active-root', null, '0', '3', null, '2', null, null, null);
INSERT INTO `jbpm4_execution` VALUES ('3', 'pvm', '2', '上级审批', '____-1', '', null, null, '____.3', 'active-root', null, '0', '4', null, '3', null, null, null);
INSERT INTO `jbpm4_execution` VALUES ('4', 'pvm', '2', '上级审批', '____-1', '', null, null, '____.4', 'active-root', null, '0', '5', null, '4', null, null, null);
INSERT INTO `jbpm4_execution` VALUES ('5', 'pvm', '2', '上级审批', '____-1', '', null, null, '____.5', 'active-root', null, '0', '6', null, '5', null, null, null);

-- ----------------------------
-- Table structure for jbpm4_hist_actinst
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_actinst`;
CREATE TABLE `jbpm4_hist_actinst` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `HPROCI_` bigint(20) DEFAULT NULL,
  `TYPE_` varchar(255) DEFAULT NULL,
  `EXECUTION_` varchar(255) DEFAULT NULL,
  `ACTIVITY_NAME_` varchar(255) DEFAULT NULL,
  `START_` datetime DEFAULT NULL,
  `END_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `TRANSITION_` varchar(255) DEFAULT NULL,
  `NEXTIDX_` int(11) DEFAULT NULL,
  `HTASK_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_HACTI_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `IDX_HTI_HTASK` (`HTASK_`) USING BTREE,
  KEY `FK_HACTI_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `FK_HTI_HTASK` (`HTASK_`) USING BTREE,
  CONSTRAINT `jbpm4_hist_actinst_ibfk_1` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `jbpm4_hist_actinst_ibfk_2` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_actinst
-- ----------------------------
INSERT INTO `jbpm4_hist_actinst` VALUES ('1', 'task', '2', '1', 'task', '____.1', '上级审批', '2015-10-27 23:50:54', '2015-10-30 10:27:05', '210971991', 'to 经理审批', '1', '1');
INSERT INTO `jbpm4_hist_actinst` VALUES ('2', 'task', '1', '1', 'task', '____.1', '经理审批', '2015-10-30 10:27:06', null, '0', null, '1', '2');
INSERT INTO `jbpm4_hist_actinst` VALUES ('3', 'task', '1', '2', 'task', '____.2', '上级审批', '2015-11-04 13:45:29', null, '0', null, '1', '3');
INSERT INTO `jbpm4_hist_actinst` VALUES ('4', 'task', '1', '3', 'task', '____.3', '上级审批', '2015-11-04 13:46:37', null, '0', null, '1', '4');
INSERT INTO `jbpm4_hist_actinst` VALUES ('5', 'task', '1', '4', 'task', '____.4', '上级审批', '2015-11-13 16:23:38', null, '0', null, '1', '5');
INSERT INTO `jbpm4_hist_actinst` VALUES ('6', 'task', '1', '5', 'task', '____.5', '上级审批', '2015-11-13 16:37:20', null, '0', null, '1', '6');

-- ----------------------------
-- Table structure for jbpm4_hist_detail
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_detail`;
CREATE TABLE `jbpm4_hist_detail` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `USERID_` varchar(255) DEFAULT NULL,
  `TIME_` datetime DEFAULT NULL,
  `HPROCI_` bigint(20) DEFAULT NULL,
  `HPROCIIDX_` int(11) DEFAULT NULL,
  `HACTI_` bigint(20) DEFAULT NULL,
  `HACTIIDX_` int(11) DEFAULT NULL,
  `HTASK_` bigint(20) DEFAULT NULL,
  `HTASKIDX_` int(11) DEFAULT NULL,
  `HVAR_` bigint(20) DEFAULT NULL,
  `HVARIDX_` int(11) DEFAULT NULL,
  `MESSAGE_` longtext,
  `OLD_INT_` int(11) DEFAULT NULL,
  `NEW_INT_` int(11) DEFAULT NULL,
  `OLD_STR_` varchar(255) DEFAULT NULL,
  `NEW_STR_` varchar(255) DEFAULT NULL,
  `OLD_TIME_` datetime DEFAULT NULL,
  `NEW_TIME_` datetime DEFAULT NULL,
  `PARENT_` bigint(20) DEFAULT NULL,
  `PARENT_IDX_` int(11) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_HDET_HACTI` (`HACTI_`) USING BTREE,
  KEY `IDX_HDET_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `IDX_HDETAIL_HACTI` (`HACTI_`) USING BTREE,
  KEY `IDX_HDETAIL_HVAR` (`HVAR_`) USING BTREE,
  KEY `IDX_HDETAIL_HTASK` (`HTASK_`) USING BTREE,
  KEY `IDX_HDETAIL_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `IDX_HDET_HVAR` (`HVAR_`) USING BTREE,
  KEY `IDX_HDET_HTASK` (`HTASK_`) USING BTREE,
  KEY `FK_HDETAIL_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `FK_HDETAIL_HACTI` (`HACTI_`) USING BTREE,
  KEY `FK_HDETAIL_HTASK` (`HTASK_`) USING BTREE,
  KEY `FK_HDETAIL_HVAR` (`HVAR_`) USING BTREE,
  CONSTRAINT `jbpm4_hist_detail_ibfk_1` FOREIGN KEY (`HACTI_`) REFERENCES `jbpm4_hist_actinst` (`DBID_`),
  CONSTRAINT `jbpm4_hist_detail_ibfk_2` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `jbpm4_hist_detail_ibfk_3` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`),
  CONSTRAINT `jbpm4_hist_detail_ibfk_4` FOREIGN KEY (`HVAR_`) REFERENCES `jbpm4_hist_var` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_detail
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_hist_procinst
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_procinst`;
CREATE TABLE `jbpm4_hist_procinst` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `PROCDEFID_` varchar(255) DEFAULT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `START_` datetime DEFAULT NULL,
  `END_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `ENDACTIVITY_` varchar(255) DEFAULT NULL,
  `NEXTIDX_` int(11) DEFAULT NULL,
  PRIMARY KEY (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_procinst
-- ----------------------------
INSERT INTO `jbpm4_hist_procinst` VALUES ('1', '0', '____.1', '____-1', null, '2015-10-27 23:50:54', null, null, 'active', null, '1');
INSERT INTO `jbpm4_hist_procinst` VALUES ('2', '0', '____.2', '____-1', null, '2015-11-04 13:45:29', null, null, 'active', null, '1');
INSERT INTO `jbpm4_hist_procinst` VALUES ('3', '0', '____.3', '____-1', null, '2015-11-04 13:46:37', null, null, 'active', null, '1');
INSERT INTO `jbpm4_hist_procinst` VALUES ('4', '0', '____.4', '____-1', null, '2015-11-13 16:23:37', null, null, 'active', null, '1');
INSERT INTO `jbpm4_hist_procinst` VALUES ('5', '0', '____.5', '____-1', null, '2015-11-13 16:37:20', null, null, 'active', null, '1');

-- ----------------------------
-- Table structure for jbpm4_hist_task
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_task`;
CREATE TABLE `jbpm4_hist_task` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `EXECUTION_` varchar(255) DEFAULT NULL,
  `OUTCOME_` varchar(255) DEFAULT NULL,
  `ASSIGNEE_` varchar(255) DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `CREATE_` datetime DEFAULT NULL,
  `END_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `NEXTIDX_` int(11) DEFAULT NULL,
  `SUPERTASK_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_HSUPERT_SUB` (`SUPERTASK_`) USING BTREE,
  CONSTRAINT `jbpm4_hist_task_ibfk_1` FOREIGN KEY (`SUPERTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_task
-- ----------------------------
INSERT INTO `jbpm4_hist_task` VALUES ('1', '2', '____.1', 'to 经理审批', '1', '0', 'completed', '2015-10-27 23:50:54', '2015-10-30 10:27:05', '210971995', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('2', '1', '____.1', null, '1', '0', null, '2015-10-30 10:27:06', null, '0', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('3', '1', '____.2', null, '1', '0', null, '2015-11-04 13:45:29', null, '0', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('4', '1', '____.3', null, '1', '0', null, '2015-11-04 13:46:37', null, '0', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('5', '1', '____.4', null, '1', '0', null, '2015-11-13 16:23:38', null, '0', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('6', '1', '____.5', null, '1', '0', null, '2015-11-13 16:37:20', null, '0', '1', null);

-- ----------------------------
-- Table structure for jbpm4_hist_var
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_var`;
CREATE TABLE `jbpm4_hist_var` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `PROCINSTID_` varchar(255) DEFAULT NULL,
  `EXECUTIONID_` varchar(255) DEFAULT NULL,
  `VARNAME_` varchar(255) DEFAULT NULL,
  `VALUE_` varchar(255) DEFAULT NULL,
  `HPROCI_` bigint(20) DEFAULT NULL,
  `HTASK_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_HVAR_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `IDX_HVAR_HTASK` (`HTASK_`) USING BTREE,
  KEY `FK_HVAR_HPROCI` (`HPROCI_`) USING BTREE,
  KEY `FK_HVAR_HTASK` (`HTASK_`) USING BTREE,
  CONSTRAINT `jbpm4_hist_var_ibfk_1` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `jbpm4_hist_var_ibfk_2` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_var
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_id_group
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_id_group`;
CREATE TABLE `jbpm4_id_group` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `TYPE_` varchar(255) DEFAULT NULL,
  `PARENT_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_GROUP_PARENT` (`PARENT_`) USING BTREE,
  KEY `FK_GROUP_PARENT` (`PARENT_`) USING BTREE,
  CONSTRAINT `jbpm4_id_group_ibfk_1` FOREIGN KEY (`PARENT_`) REFERENCES `jbpm4_id_group` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_id_group
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_id_membership
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_id_membership`;
CREATE TABLE `jbpm4_id_membership` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DBVERSION_` int(11) NOT NULL,
  `USER_` bigint(20) DEFAULT NULL,
  `GROUP_` bigint(20) DEFAULT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_MEM_USER` (`USER_`) USING BTREE,
  KEY `IDX_MEM_GROUP` (`GROUP_`) USING BTREE,
  KEY `FK_MEM_GROUP` (`GROUP_`) USING BTREE,
  KEY `FK_MEM_USER` (`USER_`) USING BTREE,
  CONSTRAINT `jbpm4_id_membership_ibfk_1` FOREIGN KEY (`GROUP_`) REFERENCES `jbpm4_id_group` (`DBID_`),
  CONSTRAINT `jbpm4_id_membership_ibfk_2` FOREIGN KEY (`USER_`) REFERENCES `jbpm4_id_user` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_id_membership
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_id_user
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_id_user`;
CREATE TABLE `jbpm4_id_user` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `PASSWORD_` varchar(255) DEFAULT NULL,
  `GIVENNAME_` varchar(255) DEFAULT NULL,
  `FAMILYNAME_` varchar(255) DEFAULT NULL,
  `BUSINESSEMAIL_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_id_user
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_job
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_job`;
CREATE TABLE `jbpm4_job` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `DUEDATE_` datetime DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `ISEXCLUSIVE_` bit(1) DEFAULT NULL,
  `LOCKOWNER_` varchar(255) DEFAULT NULL,
  `LOCKEXPTIME_` datetime DEFAULT NULL,
  `EXCEPTION_` longtext,
  `RETRIES_` int(11) DEFAULT NULL,
  `PROCESSINSTANCE_` bigint(20) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  `CFG_` bigint(20) DEFAULT NULL,
  `SIGNAL_` varchar(255) DEFAULT NULL,
  `EVENT_` varchar(255) DEFAULT NULL,
  `REPEAT_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_JOBRETRIES` (`RETRIES_`) USING BTREE,
  KEY `IDX_JOB_CFG` (`CFG_`) USING BTREE,
  KEY `IDX_JOB_PRINST` (`PROCESSINSTANCE_`) USING BTREE,
  KEY `IDX_JOB_EXE` (`EXECUTION_`) USING BTREE,
  KEY `IDX_JOBLOCKEXP` (`LOCKEXPTIME_`) USING BTREE,
  KEY `IDX_JOBDUEDATE` (`DUEDATE_`) USING BTREE,
  KEY `FK_JOB_CFG` (`CFG_`) USING BTREE,
  CONSTRAINT `jbpm4_job_ibfk_1` FOREIGN KEY (`CFG_`) REFERENCES `jbpm4_lob` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_job
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_lob
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_lob`;
CREATE TABLE `jbpm4_lob` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DBVERSION_` int(11) NOT NULL,
  `BLOB_VALUE_` longblob,
  `DEPLOYMENT_` bigint(20) DEFAULT NULL,
  `NAME_` longtext,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_LOB_DEPLOYMENT` (`DEPLOYMENT_`) USING BTREE,
  KEY `FK_LOB_DEPLOYMENT` (`DEPLOYMENT_`) USING BTREE,
  CONSTRAINT `jbpm4_lob_ibfk_1` FOREIGN KEY (`DEPLOYMENT_`) REFERENCES `jbpm4_deployment` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_lob
-- ----------------------------
INSERT INTO `jbpm4_lob` VALUES ('3', '0', 0x3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D2247424B223F3E0A3C70726F63657373206E616D653D22C1BDB2BDC9F3C5FA2220786D6C6E733D22687474703A2F2F6A62706D2E6F72672F342E302F6A70646C223E0A2020203C737461727420673D223236332C31302C34382C343822206E616D653D22BFAACABC223E0A2020202020203C7472616E736974696F6E206E616D653D22746F20C9CFBCB6C9F3C5FA2220746F3D22C9CFBCB6C9F3C5FA2220673D222D37312C2D3137222F3E0A2020203C2F73746172743E0A2020203C656E6420673D223236382C3336372C34382C343822206E616D653D22BDE1CAF8222F3E0A2020203C7461736B20673D223234302C3131332C39322C353222206E616D653D22C9CFBCB6C9F3C5FA223E0A2020202020203C7472616E736974696F6E20673D223233312C3231343A2D35332C2D313722206E616D653D22746F20BEADC0EDC9F3C5FA2220746F3D22BEADC0EDC9F3C5FA222F3E0A2020202020203C7472616E736974696F6E206E616D653D22746F20C8A1CFFB2220746F3D22C8A1CFFB2220673D223530332C3133393A2D35332C2D3137222F3E0A2020203C2F7461736B3E0A2020203C7461736B20673D223234352C3234352C39322C353222206E616D653D22BEADC0EDC9F3C5FA223E0A2020202020203C7472616E736974696F6E20673D222D34372C2D313722206E616D653D22746F20BDE1CAF82220746F3D22BDE1CAF8222F3E0A2020202020203C7472616E736974696F6E20673D223334392C3231323A2D35332C2D313722206E616D653D22746F20C9CFBCB6C9F3C5FA2220746F3D22C9CFBCB6C9F3C5FA222F3E0A2020202020203C7472616E736974696F6E206E616D653D22746F20C8A1CFFB2220746F3D22C8A1CFFB2220673D223530362C3237313A2D35332C2D3137222F3E0A2020203C2F7461736B3E0A2020203C656E642D63616E63656C206E616D653D22C8A1CFFB2220673D223438322C3139332C34382C3438222F3E0A3C2F70726F636573733E, '3', 'process.jpdl.xml');
INSERT INTO `jbpm4_lob` VALUES ('4', '0', 0xACED000573720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365724EA1C822C86CD16D0200144C000D616363657373696F6E54696D657400104C6A6176612F7574696C2F446174653B4C0007616464726573737400124C6A6176612F6C616E672F537472696E673B4C000764656C466C61677400114C6A6176612F6C616E672F53686F72743B4C000A6465706172746D656E747400274C636F6D2F6874736F66742F6F612F6D6F64656C2F73797374656D2F4465706172746D656E743B4C0009656475636174696F6E71007E00024C0005656D61696C71007E00024C000366617871007E00024C000866756C6C6E616D6571007E00024C00066D6F62696C6571007E00024C000870617373776F726471007E00024C000570686F6E6571007E00024C000570686F746F71007E00024C0008706F736974696F6E71007E00024C000672696768747374000F4C6A6176612F7574696C2F5365743B4C0005726F6C657371007E00054C000673746174757371007E00034C00057469746C6571007E00034C00067573657249647400104C6A6176612F6C616E672F4C6F6E673B4C0008757365726E616D6571007E00024C00037A697071007E00027872001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C396940C2EA600CBC0200024C00066C6F676765727400204C6F72672F6170616368652F636F6D6D6F6E732F6C6F6767696E672F4C6F673B4C000776657273696F6E7400134C6A6176612F6C616E672F496E74656765723B78707372002B6F72672E6170616368652E636F6D6D6F6E732E6C6F6767696E672E696D706C2E4C6F67344A4C6F6767657228ACFDE82AD5D2380200014C00046E616D6571007E0002787074001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C70737200126A6176612E73716C2E54696D657374616D702618D5C80153BF650200014900056E616E6F737872000E6A6176612E7574696C2E44617465686A81014B59741903000078707708000001259D5DFC007800000000707372000F6A6176612E6C616E672E53686F7274684D37133460DA5202000153000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000073720025636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E4465706172746D656E747F2A123D44058D160200064C00076465704465736371007E00024C0005646570496471007E00064C00086465704C6576656C71007E00094C00076465704E616D6571007E00024C0008706172656E74496471007E00064C00047061746871007E00027871007E000771007E000C7074000CE585ACE58FB8E7AEA1E790867372000E6A6176612E6C616E672E4C6F6E673B8BE490CC8F23DF0200014A000576616C75657871007E00120000000000000001737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C75657871007E00120000000174000CE585ACE58FB8E7AEA1E7908670707074000B313532403136332E636F6D7074000FE8B685E7BAA7E7AEA1E79086E591987074002C61346179632F38302F4F47646134424F2F316F2F56306574704F71694C78314A77423553336265485730733D707070737200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F400000000000017400055F5F414C4C78737200266F72672E68696265726E6174652E636F6C6C656374696F6E2E50657273697374656E745365743770507425ED70B00200014C000373657471007E0005787200356F72672E68696265726E6174652E636F6C6C656374696F6E2E416273747261637450657273697374656E74436F6C6C656374696F6EB09154394BE626B302000749000A63616368656453697A655A000564697274795A000B696E697469616C697A65644C00036B65797400164C6A6176612F696F2F53657269616C697A61626C653B4C00056F776E65727400124C6A6176612F6C616E672F4F626A6563743B4C0004726F6C6571007E00024C000E73746F726564536E617073686F7471007E00247870FFFFFFFF00017371007E0017000000000000000171007E000A740028636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365722E726F6C6573737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000017708000000020000000173720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C658915988CB6F698900200084C0008617070557365727371007E00054C000966756E6374696F6E7371007E00054C000B697344656661756C74496E71007E00034C000672696768747371007E00024C0008726F6C654465736371007E00024C0006726F6C65496471007E00064C0008726F6C654E616D6571007E00024C000673746174757371007E00037871007E000771007E000C707371007E0022FFFFFFFF00007371007E0017FFFFFFFFFFFFFFFF71007E002C74002B636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E617070557365727370707371007E0022FFFFFFFF000071007E002E71007E002C74002C636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E66756E6374696F6E7370707371007E001100007400055F5F414C4C740022E8B685E7BAA7E7AEA1E79086E591982CE585B7E69C89E68980E69C89E69D83E9999071007E002E74000FE8B685E7BAA7E7AEA1E79086E591987371007E0011000171007E002C787371007E001F770C000000103F4000000000000171007E002C787371007E001100017371007E0011000171007E002774000561646D696E70, null, null);
INSERT INTO `jbpm4_lob` VALUES ('5', '0', 0xACED000573720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365724EA1C822C86CD16D0200144C000D616363657373696F6E54696D657400104C6A6176612F7574696C2F446174653B4C0007616464726573737400124C6A6176612F6C616E672F537472696E673B4C000764656C466C61677400114C6A6176612F6C616E672F53686F72743B4C000A6465706172746D656E747400274C636F6D2F6874736F66742F6F612F6D6F64656C2F73797374656D2F4465706172746D656E743B4C0009656475636174696F6E71007E00024C0005656D61696C71007E00024C000366617871007E00024C000866756C6C6E616D6571007E00024C00066D6F62696C6571007E00024C000870617373776F726471007E00024C000570686F6E6571007E00024C000570686F746F71007E00024C0008706F736974696F6E71007E00024C000672696768747374000F4C6A6176612F7574696C2F5365743B4C0005726F6C657371007E00054C000673746174757371007E00034C00057469746C6571007E00034C00067573657249647400104C6A6176612F6C616E672F4C6F6E673B4C0008757365726E616D6571007E00024C00037A697071007E00027872001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C396940C2EA600CBC0200024C00066C6F676765727400204C6F72672F6170616368652F636F6D6D6F6E732F6C6F6767696E672F4C6F673B4C000776657273696F6E7400134C6A6176612F6C616E672F496E74656765723B78707372002B6F72672E6170616368652E636F6D6D6F6E732E6C6F6767696E672E696D706C2E4C6F67344A4C6F6767657228ACFDE82AD5D2380200014C00046E616D6571007E0002787074001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C70737200126A6176612E73716C2E54696D657374616D702618D5C80153BF650200014900056E616E6F737872000E6A6176612E7574696C2E44617465686A81014B59741903000078707708000001259D5DFC007800000000707372000F6A6176612E6C616E672E53686F7274684D37133460DA5202000153000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000073720025636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E4465706172746D656E747F2A123D44058D160200064C00076465704465736371007E00024C0005646570496471007E00064C00086465704C6576656C71007E00094C00076465704E616D6571007E00024C0008706172656E74496471007E00064C00047061746871007E00027871007E000771007E000C7074000CE585ACE58FB8E7AEA1E790867372000E6A6176612E6C616E672E4C6F6E673B8BE490CC8F23DF0200014A000576616C75657871007E00120000000000000001737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C75657871007E00120000000174000CE585ACE58FB8E7AEA1E7908670707074000B313532403136332E636F6D7074000FE8B685E7BAA7E7AEA1E79086E591987074002C61346179632F38302F4F47646134424F2F316F2F56306574704F71694C78314A77423553336265485730733D707070737200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F400000000000017400055F5F414C4C78737200266F72672E68696265726E6174652E636F6C6C656374696F6E2E50657273697374656E745365743770507425ED70B00200014C000373657471007E0005787200356F72672E68696265726E6174652E636F6C6C656374696F6E2E416273747261637450657273697374656E74436F6C6C656374696F6EB09154394BE626B302000749000A63616368656453697A655A000564697274795A000B696E697469616C697A65644C00036B65797400164C6A6176612F696F2F53657269616C697A61626C653B4C00056F776E65727400124C6A6176612F6C616E672F4F626A6563743B4C0004726F6C6571007E00024C000E73746F726564536E617073686F7471007E00247870FFFFFFFF00017371007E0017000000000000000171007E000A740028636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365722E726F6C6573737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000017708000000020000000173720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C658915988CB6F698900200084C0008617070557365727371007E00054C000966756E6374696F6E7371007E00054C000B697344656661756C74496E71007E00034C000672696768747371007E00024C0008726F6C654465736371007E00024C0006726F6C65496471007E00064C0008726F6C654E616D6571007E00024C000673746174757371007E00037871007E000771007E000C707371007E0022FFFFFFFF00007371007E0017FFFFFFFFFFFFFFFF71007E002C74002B636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E617070557365727370707371007E0022FFFFFFFF000071007E002E71007E002C74002C636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E66756E6374696F6E7370707371007E001100007400055F5F414C4C740022E8B685E7BAA7E7AEA1E79086E591982CE585B7E69C89E68980E69C89E69D83E9999071007E002E74000FE8B685E7BAA7E7AEA1E79086E591987371007E0011000171007E002C787371007E001F770C000000103F4000000000000171007E002C787371007E001100017371007E0011000171007E002774000561646D696E70, null, null);
INSERT INTO `jbpm4_lob` VALUES ('6', '0', 0xACED000573720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365724EA1C822C86CD16D0200144C000D616363657373696F6E54696D657400104C6A6176612F7574696C2F446174653B4C0007616464726573737400124C6A6176612F6C616E672F537472696E673B4C000764656C466C61677400114C6A6176612F6C616E672F53686F72743B4C000A6465706172746D656E747400274C636F6D2F6874736F66742F6F612F6D6F64656C2F73797374656D2F4465706172746D656E743B4C0009656475636174696F6E71007E00024C0005656D61696C71007E00024C000366617871007E00024C000866756C6C6E616D6571007E00024C00066D6F62696C6571007E00024C000870617373776F726471007E00024C000570686F6E6571007E00024C000570686F746F71007E00024C0008706F736974696F6E71007E00024C000672696768747374000F4C6A6176612F7574696C2F5365743B4C0005726F6C657371007E00054C000673746174757371007E00034C00057469746C6571007E00034C00067573657249647400104C6A6176612F6C616E672F4C6F6E673B4C0008757365726E616D6571007E00024C00037A697071007E00027872001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C396940C2EA600CBC0200024C00066C6F676765727400204C6F72672F6170616368652F636F6D6D6F6E732F6C6F6767696E672F4C6F673B4C000776657273696F6E7400134C6A6176612F6C616E672F496E74656765723B78707372002B6F72672E6170616368652E636F6D6D6F6E732E6C6F6767696E672E696D706C2E4C6F67344A4C6F6767657228ACFDE82AD5D2380200014C00046E616D6571007E0002787074001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C70737200126A6176612E73716C2E54696D657374616D702618D5C80153BF650200014900056E616E6F737872000E6A6176612E7574696C2E44617465686A81014B59741903000078707708000001259D5DFC007800000000707372000F6A6176612E6C616E672E53686F7274684D37133460DA5202000153000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000073720025636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E4465706172746D656E747F2A123D44058D160200064C00076465704465736371007E00024C0005646570496471007E00064C00086465704C6576656C71007E00094C00076465704E616D6571007E00024C0008706172656E74496471007E00064C00047061746871007E00027871007E000771007E000C7074000CE585ACE58FB8E7AEA1E790867372000E6A6176612E6C616E672E4C6F6E673B8BE490CC8F23DF0200014A000576616C75657871007E00120000000000000001737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C75657871007E00120000000174000CE585ACE58FB8E7AEA1E7908670707074000B313532403136332E636F6D7074000FE8B685E7BAA7E7AEA1E79086E591987074002C61346179632F38302F4F47646134424F2F316F2F56306574704F71694C78314A77423553336265485730733D707070737200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F400000000000017400055F5F414C4C78737200266F72672E68696265726E6174652E636F6C6C656374696F6E2E50657273697374656E745365743770507425ED70B00200014C000373657471007E0005787200356F72672E68696265726E6174652E636F6C6C656374696F6E2E416273747261637450657273697374656E74436F6C6C656374696F6EB09154394BE626B302000749000A63616368656453697A655A000564697274795A000B696E697469616C697A65644C00036B65797400164C6A6176612F696F2F53657269616C697A61626C653B4C00056F776E65727400124C6A6176612F6C616E672F4F626A6563743B4C0004726F6C6571007E00024C000E73746F726564536E617073686F7471007E00247870FFFFFFFF00017371007E0017000000000000000171007E000A740028636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365722E726F6C6573737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000017708000000020000000173720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C658915988CB6F698900200084C0008617070557365727371007E00054C000966756E6374696F6E7371007E00054C000B697344656661756C74496E71007E00034C000672696768747371007E00024C0008726F6C654465736371007E00024C0006726F6C65496471007E00064C0008726F6C654E616D6571007E00024C000673746174757371007E00037871007E000771007E000C707371007E0022FFFFFFFF00007371007E0017FFFFFFFFFFFFFFFF71007E002C74002B636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E617070557365727370707371007E0022FFFFFFFF000071007E002E71007E002C74002C636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E66756E6374696F6E7370707371007E001100007400055F5F414C4C740022E8B685E7BAA7E7AEA1E79086E591982CE585B7E69C89E68980E69C89E69D83E9999071007E002E74000FE8B685E7BAA7E7AEA1E79086E591987371007E0011000171007E002C787371007E001F770C000000103F4000000000000171007E002C787371007E001100017371007E0011000171007E002774000561646D696E70, null, null);
INSERT INTO `jbpm4_lob` VALUES ('8', '0', 0xACED000573720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365724EA1C822C86CD16D0200144C000D616363657373696F6E54696D657400104C6A6176612F7574696C2F446174653B4C0007616464726573737400124C6A6176612F6C616E672F537472696E673B4C000764656C466C61677400114C6A6176612F6C616E672F53686F72743B4C000A6465706172746D656E747400274C636F6D2F6874736F66742F6F612F6D6F64656C2F73797374656D2F4465706172746D656E743B4C0009656475636174696F6E71007E00024C0005656D61696C71007E00024C000366617871007E00024C000866756C6C6E616D6571007E00024C00066D6F62696C6571007E00024C000870617373776F726471007E00024C000570686F6E6571007E00024C000570686F746F71007E00024C0008706F736974696F6E71007E00024C000672696768747374000F4C6A6176612F7574696C2F5365743B4C0005726F6C657371007E00054C000673746174757371007E00034C00057469746C6571007E00034C00067573657249647400104C6A6176612F6C616E672F4C6F6E673B4C0008757365726E616D6571007E00024C00037A697071007E00027872001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C396940C2EA600CBC0200024C00066C6F676765727400204C6F72672F6170616368652F636F6D6D6F6E732F6C6F6767696E672F4C6F673B4C000776657273696F6E7400134C6A6176612F6C616E672F496E74656765723B78707372002B6F72672E6170616368652E636F6D6D6F6E732E6C6F6767696E672E696D706C2E4C6F67344A4C6F6767657228ACFDE82AD5D2380200014C00046E616D6571007E0002787074001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C70737200126A6176612E73716C2E54696D657374616D702618D5C80153BF650200014900056E616E6F737872000E6A6176612E7574696C2E44617465686A81014B59741903000078707708000001259D5DFC007800000000707372000F6A6176612E6C616E672E53686F7274684D37133460DA5202000153000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000073720025636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E4465706172746D656E747F2A123D44058D160200064C00076465704465736371007E00024C0005646570496471007E00064C00086465704C6576656C71007E00094C00076465704E616D6571007E00024C0008706172656E74496471007E00064C00047061746871007E00027871007E000771007E000C7074000CE585ACE58FB8E7AEA1E790867372000E6A6176612E6C616E672E4C6F6E673B8BE490CC8F23DF0200014A000576616C75657871007E00120000000000000001737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C75657871007E00120000000174000CE585ACE58FB8E7AEA1E7908670707074000B313532403136332E636F6D7074000FE8B685E7BAA7E7AEA1E79086E591987074002C61346179632F38302F4F47646134424F2F316F2F56306574704F71694C78314A77423553336265485730733D707070737200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F400000000000017400055F5F414C4C78737200266F72672E68696265726E6174652E636F6C6C656374696F6E2E50657273697374656E745365743770507425ED70B00200014C000373657471007E0005787200356F72672E68696265726E6174652E636F6C6C656374696F6E2E416273747261637450657273697374656E74436F6C6C656374696F6EB09154394BE626B302000749000A63616368656453697A655A000564697274795A000B696E697469616C697A65644C00036B65797400164C6A6176612F696F2F53657269616C697A61626C653B4C00056F776E65727400124C6A6176612F6C616E672F4F626A6563743B4C0004726F6C6571007E00024C000E73746F726564536E617073686F7471007E00247870FFFFFFFF00017371007E0017000000000000000171007E000A740028636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365722E726F6C6573737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000017708000000020000000173720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C658915988CB6F698900200084C0008617070557365727371007E00054C000966756E6374696F6E7371007E00054C000B697344656661756C74496E71007E00034C000672696768747371007E00024C0008726F6C654465736371007E00024C0006726F6C65496471007E00064C0008726F6C654E616D6571007E00024C000673746174757371007E00037871007E000771007E000C707371007E0022FFFFFFFF00007371007E0017FFFFFFFFFFFFFFFF71007E002C74002B636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E617070557365727370707371007E0022FFFFFFFF000071007E002E71007E002C74002C636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E66756E6374696F6E7370707371007E001100007400055F5F414C4C740022E8B685E7BAA7E7AEA1E79086E591982CE585B7E69C89E68980E69C89E69D83E9999071007E002E74000FE8B685E7BAA7E7AEA1E79086E591987371007E0011000171007E002C787371007E001F770C000000103F4000000000000171007E002C787371007E001100017371007E0011000171007E002774000561646D696E70, null, null);
INSERT INTO `jbpm4_lob` VALUES ('11', '0', 0xACED000573720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365724EA1C822C86CD16D0200144C000D616363657373696F6E54696D657400104C6A6176612F7574696C2F446174653B4C0007616464726573737400124C6A6176612F6C616E672F537472696E673B4C000764656C466C61677400114C6A6176612F6C616E672F53686F72743B4C000A6465706172746D656E747400274C636F6D2F6874736F66742F6F612F6D6F64656C2F73797374656D2F4465706172746D656E743B4C0009656475636174696F6E71007E00024C0005656D61696C71007E00024C000366617871007E00024C000866756C6C6E616D6571007E00024C00066D6F62696C6571007E00024C000870617373776F726471007E00024C000570686F6E6571007E00024C000570686F746F71007E00024C0008706F736974696F6E71007E00024C000672696768747374000F4C6A6176612F7574696C2F5365743B4C0005726F6C657371007E00054C000673746174757371007E00034C00057469746C6571007E00034C00067573657249647400104C6A6176612F6C616E672F4C6F6E673B4C0008757365726E616D6571007E00024C00037A697071007E00027872001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C396940C2EA600CBC0200024C00066C6F676765727400204C6F72672F6170616368652F636F6D6D6F6E732F6C6F6767696E672F4C6F673B4C000776657273696F6E7400134C6A6176612F6C616E672F496E74656765723B78707372002B6F72672E6170616368652E636F6D6D6F6E732E6C6F6767696E672E696D706C2E4C6F67344A4C6F6767657228ACFDE82AD5D2380200014C00046E616D6571007E0002787074001F636F6D2E6874736F66742E636F72652E6D6F64656C2E426173654D6F64656C70737200126A6176612E73716C2E54696D657374616D702618D5C80153BF650200014900056E616E6F737872000E6A6176612E7574696C2E44617465686A81014B59741903000078707708000001259D5DFC007800000000707372000F6A6176612E6C616E672E53686F7274684D37133460DA5202000153000576616C7565787200106A6176612E6C616E672E4E756D62657286AC951D0B94E08B0200007870000073720025636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E4465706172746D656E747F2A123D44058D160200064C00076465704465736371007E00024C0005646570496471007E00064C00086465704C6576656C71007E00094C00076465704E616D6571007E00024C0008706172656E74496471007E00064C00047061746871007E00027871007E000771007E000C7074000CE585ACE58FB8E7AEA1E790867372000E6A6176612E6C616E672E4C6F6E673B8BE490CC8F23DF0200014A000576616C75657871007E00120000000000000001737200116A6176612E6C616E672E496E746567657212E2A0A4F781873802000149000576616C75657871007E00120000000174000CE585ACE58FB8E7AEA1E7908670707074000B313532403136332E636F6D7074000FE8B685E7BAA7E7AEA1E79086E591987074002C61346179632F38302F4F47646134424F2F316F2F56306574704F71694C78314A77423553336265485730733D707070737200116A6176612E7574696C2E48617368536574BA44859596B8B7340300007870770C000000103F400000000000017400055F5F414C4C78737200266F72672E68696265726E6174652E636F6C6C656374696F6E2E50657273697374656E745365743770507425ED70B00200014C000373657471007E0005787200356F72672E68696265726E6174652E636F6C6C656374696F6E2E416273747261637450657273697374656E74436F6C6C656374696F6EB09154394BE626B302000749000A63616368656453697A655A000564697274795A000B696E697469616C697A65644C00036B65797400164C6A6176612F696F2F53657269616C697A61626C653B4C00056F776E65727400124C6A6176612F6C616E672F4F626A6563743B4C0004726F6C6571007E00024C000E73746F726564536E617073686F7471007E00247870FFFFFFFF00017371007E0017000000000000000171007E000A740028636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070557365722E726F6C6573737200116A6176612E7574696C2E486173684D61700507DAC1C31660D103000246000A6C6F6164466163746F724900097468726573686F6C6478703F400000000000017708000000020000000173720022636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C658915988CB6F698900200084C0008617070557365727371007E00054C000966756E6374696F6E7371007E00054C000B697344656661756C74496E71007E00034C000672696768747371007E00024C0008726F6C654465736371007E00024C0006726F6C65496471007E00064C0008726F6C654E616D6571007E00024C000673746174757371007E00037871007E000771007E000C707371007E0022FFFFFFFF00007371007E0017FFFFFFFFFFFFFFFF71007E002C74002B636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E617070557365727370707371007E0022FFFFFFFF000071007E002E71007E002C74002C636F6D2E6874736F66742E6F612E6D6F64656C2E73797374656D2E417070526F6C652E66756E6374696F6E7370707371007E001100007400055F5F414C4C740022E8B685E7BAA7E7AEA1E79086E591982CE585B7E69C89E68980E69C89E69D83E9999071007E002E74000FE8B685E7BAA7E7AEA1E79086E591987371007E0011000171007E002C787371007E001F770C000000103F4000000000000171007E002C787371007E001100017371007E0011000171007E002774000561646D696E70, null, null);

-- ----------------------------
-- Table structure for jbpm4_participation
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_participation`;
CREATE TABLE `jbpm4_participation` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DBVERSION_` int(11) NOT NULL,
  `GROUPID_` varchar(255) DEFAULT NULL,
  `USERID_` varchar(255) DEFAULT NULL,
  `TYPE_` varchar(255) DEFAULT NULL,
  `TASK_` bigint(20) DEFAULT NULL,
  `SWIMLANE_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_PART_TASK` (`TASK_`) USING BTREE,
  KEY `FK_PART_SWIMLANE` (`SWIMLANE_`) USING BTREE,
  KEY `FK_PART_TASK` (`TASK_`) USING BTREE,
  CONSTRAINT `jbpm4_participation_ibfk_1` FOREIGN KEY (`SWIMLANE_`) REFERENCES `jbpm4_swimlane` (`DBID_`),
  CONSTRAINT `jbpm4_participation_ibfk_2` FOREIGN KEY (`TASK_`) REFERENCES `jbpm4_task` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_participation
-- ----------------------------
INSERT INTO `jbpm4_participation` VALUES ('2', '0', '-1', null, 'candidate', '2', null);
INSERT INTO `jbpm4_participation` VALUES ('3', '0', '-1', null, 'candidate', '3', null);
INSERT INTO `jbpm4_participation` VALUES ('4', '0', '-1', null, 'candidate', '4', null);
INSERT INTO `jbpm4_participation` VALUES ('5', '0', '-1', null, 'candidate', '5', null);
INSERT INTO `jbpm4_participation` VALUES ('6', '0', '-1', null, 'candidate', '6', null);

-- ----------------------------
-- Table structure for jbpm4_swimlane
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_swimlane`;
CREATE TABLE `jbpm4_swimlane` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `DBVERSION_` int(11) NOT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `ASSIGNEE_` varchar(255) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_SWIMLANE_EXEC` (`EXECUTION_`) USING BTREE,
  KEY `FK_SWIMLANE_EXEC` (`EXECUTION_`) USING BTREE,
  CONSTRAINT `jbpm4_swimlane_ibfk_1` FOREIGN KEY (`EXECUTION_`) REFERENCES `jbpm4_execution` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_swimlane
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_task
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_task`;
CREATE TABLE `jbpm4_task` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `CLASS_` char(1) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `DESCR_` longtext,
  `STATE_` varchar(255) DEFAULT NULL,
  `SUSPHISTSTATE_` varchar(255) DEFAULT NULL,
  `ASSIGNEE_` varchar(255) DEFAULT NULL,
  `FORM_` varchar(255) DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `CREATE_` datetime DEFAULT NULL,
  `DUEDATE_` datetime DEFAULT NULL,
  `PROGRESS_` int(11) DEFAULT NULL,
  `SIGNALLING_` bit(1) DEFAULT NULL,
  `EXECUTION_ID_` varchar(255) DEFAULT NULL,
  `ACTIVITY_NAME_` varchar(255) DEFAULT NULL,
  `HASVARS_` bit(1) DEFAULT NULL,
  `SUPERTASK_` bigint(20) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  `PROCINST_` bigint(20) DEFAULT NULL,
  `SWIMLANE_` bigint(20) DEFAULT NULL,
  `TASKDEFNAME_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_TASK_SUPERTASK` (`SUPERTASK_`) USING BTREE,
  KEY `FK_TASK_SWIML` (`SWIMLANE_`) USING BTREE,
  KEY `FK_TASK_SUPERTASK` (`SUPERTASK_`) USING BTREE,
  CONSTRAINT `jbpm4_task_ibfk_1` FOREIGN KEY (`SUPERTASK_`) REFERENCES `jbpm4_task` (`DBID_`),
  CONSTRAINT `jbpm4_task_ibfk_2` FOREIGN KEY (`SWIMLANE_`) REFERENCES `jbpm4_swimlane` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_task
-- ----------------------------
INSERT INTO `jbpm4_task` VALUES ('2', 'T', '2', '经理审批', null, 'open', null, '1', null, '0', '2015-10-30 10:27:06', null, null, '', '____.1', '经理审批', '\0', null, '1', '1', null, '经理审批');
INSERT INTO `jbpm4_task` VALUES ('3', 'T', '2', '上级审批', null, 'open', null, '1', null, '0', '2015-11-04 13:45:29', null, null, '', '____.2', '上级审批', '\0', null, '2', '2', null, '上级审批');
INSERT INTO `jbpm4_task` VALUES ('4', 'T', '2', '上级审批', null, 'open', null, '1', null, '0', '2015-11-04 13:46:37', null, null, '', '____.3', '上级审批', '\0', null, '3', '3', null, '上级审批');
INSERT INTO `jbpm4_task` VALUES ('5', 'T', '2', '上级审批', null, 'open', null, '1', null, '0', '2015-11-13 16:23:38', null, null, '', '____.4', '上级审批', '\0', null, '4', '4', null, '上级审批');
INSERT INTO `jbpm4_task` VALUES ('6', 'T', '2', '上级审批', null, 'open', null, '1', null, '0', '2015-11-13 16:37:20', null, null, '', '____.5', '上级审批', '\0', null, '5', '5', null, '上级审批');

-- ----------------------------
-- Table structure for jbpm4_variable
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_variable`;
CREATE TABLE `jbpm4_variable` (
  `DBID_` bigint(20) NOT NULL AUTO_INCREMENT,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `CONVERTER_` varchar(255) DEFAULT NULL,
  `HIST_` bit(1) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  `TASK_` bigint(20) DEFAULT NULL,
  `DATE_VALUE_` datetime DEFAULT NULL,
  `DOUBLE_VALUE_` double DEFAULT NULL,
  `LONG_VALUE_` bigint(20) DEFAULT NULL,
  `STRING_VALUE_` varchar(255) DEFAULT NULL,
  `TEXT_VALUE_` longtext,
  `LOB_` bigint(20) DEFAULT NULL,
  `EXESYS_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `IDX_VAR_EXESYS` (`EXESYS_`) USING BTREE,
  KEY `IDX_VAR_TASK` (`TASK_`) USING BTREE,
  KEY `IDX_VAR_EXECUTION` (`EXECUTION_`) USING BTREE,
  KEY `IDX_VAR_LOB` (`LOB_`) USING BTREE,
  KEY `FK_VAR_LOB` (`LOB_`) USING BTREE,
  KEY `FK_VAR_EXECUTION` (`EXECUTION_`) USING BTREE,
  KEY `FK_VAR_EXESYS` (`EXESYS_`) USING BTREE,
  KEY `FK_VAR_TASK` (`TASK_`) USING BTREE,
  CONSTRAINT `jbpm4_variable_ibfk_1` FOREIGN KEY (`EXECUTION_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `jbpm4_variable_ibfk_2` FOREIGN KEY (`EXESYS_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `jbpm4_variable_ibfk_3` FOREIGN KEY (`LOB_`) REFERENCES `jbpm4_lob` (`DBID_`),
  CONSTRAINT `jbpm4_variable_ibfk_4` FOREIGN KEY (`TASK_`) REFERENCES `jbpm4_task` (`DBID_`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_variable
-- ----------------------------
INSERT INTO `jbpm4_variable` VALUES ('1', 'blob', '0', 'flowStartUser', 'ser-bytes', '\0', '1', null, null, null, null, null, null, '4', null);
INSERT INTO `jbpm4_variable` VALUES ('2', 'string', '0', 'processName', null, '\0', '1', null, null, null, null, '两级审批', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('3', 'string', '0', 'note', null, '\0', '1', null, null, null, null, '', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('4', 'string', '0', 'approvalOption', null, '\0', '1', null, null, null, null, '', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('5', 'blob', '0', 'flowStartUser', 'ser-bytes', '\0', '2', null, null, null, null, null, null, '5', null);
INSERT INTO `jbpm4_variable` VALUES ('6', 'string', '0', 'processName', null, '\0', '2', null, null, null, null, '两级审批', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('7', 'string', '0', 'note', null, '\0', '2', null, null, null, null, '', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('8', 'blob', '0', 'flowStartUser', 'ser-bytes', '\0', '3', null, null, null, null, null, null, '6', null);
INSERT INTO `jbpm4_variable` VALUES ('9', 'string', '0', 'processName', null, '\0', '3', null, null, null, null, '两级审批', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('10', 'string', '0', 'note', null, '\0', '3', null, null, null, null, '222q', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('11', 'blob', '0', 'flowStartUser', 'ser-bytes', '\0', '4', null, null, null, null, null, null, '8', null);
INSERT INTO `jbpm4_variable` VALUES ('12', 'string', '0', 'processName', null, '\0', '4', null, null, null, null, '两级审批', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('13', 'string', '0', 'note', null, '\0', '4', null, null, null, null, '', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('14', 'blob', '0', 'flowStartUser', 'ser-bytes', '\0', '5', null, null, null, null, null, null, '11', null);
INSERT INTO `jbpm4_variable` VALUES ('15', 'string', '0', 'processName', null, '\0', '5', null, null, null, null, '两级审批', null, null, null);
INSERT INTO `jbpm4_variable` VALUES ('16', 'string', '0', 'note', null, '\0', '5', null, null, null, null, '', null, null, null);

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `jobId` bigint(20) NOT NULL AUTO_INCREMENT,
  `jobName` varchar(128) NOT NULL COMMENT '职位名称',
  `depId` bigint(20) NOT NULL COMMENT '所属部门',
  `memo` varchar(512) DEFAULT NULL COMMENT '备注',
  `delFlag` smallint(6) DEFAULT NULL COMMENT '删除状态',
  PRIMARY KEY (`jobId`),
  KEY `FK_JB_R_DPT` (`depId`) USING BTREE,
  CONSTRAINT `job_ibfk_1` FOREIGN KEY (`depId`) REFERENCES `department` (`depId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of job
-- ----------------------------

-- ----------------------------
-- Table structure for job_change
-- ----------------------------
DROP TABLE IF EXISTS `job_change`;
CREATE TABLE `job_change` (
  `changeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `profileId` bigint(20) NOT NULL,
  `profileNo` varchar(64) NOT NULL,
  `userName` varchar(64) DEFAULT NULL,
  `orgJobId` bigint(20) NOT NULL,
  `orgJobName` varchar(64) NOT NULL,
  `newJobId` bigint(20) NOT NULL,
  `newJobName` varchar(64) NOT NULL,
  `orgStandardNo` varchar(64) DEFAULT NULL,
  `orgStandardName` varchar(64) DEFAULT NULL,
  `orgDepId` bigint(20) DEFAULT NULL,
  `orgDepName` varchar(128) DEFAULT NULL,
  `orgTotalMoney` decimal(18,2) DEFAULT NULL,
  `newStandardNo` varchar(64) DEFAULT NULL,
  `newStandardName` varchar(64) DEFAULT NULL,
  `newDepId` bigint(20) DEFAULT NULL,
  `newDepName` varchar(128) DEFAULT NULL,
  `newTotalMoney` decimal(18,2) DEFAULT NULL,
  `changeReason` varchar(1024) DEFAULT NULL,
  `regTime` datetime DEFAULT NULL,
  `regName` varchar(64) DEFAULT NULL,
  `checkName` varchar(64) DEFAULT NULL,
  `checkTime` datetime DEFAULT NULL,
  `checkOpinion` varchar(512) DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL COMMENT '状态\r\n            \r\n            -1=草稿\r\n            0=提交审批\r\n            1=通过审批\r\n            2=未通过审批\r\n            ',
  `memo` varchar(1024) DEFAULT NULL,
  `orgStandardId` bigint(20) DEFAULT NULL COMMENT '原薪酬标准单编号',
  `newStandardId` bigint(20) DEFAULT NULL COMMENT '新酬标准单编号',
  PRIMARY KEY (`changeId`),
  KEY `FK_JBC_R_JBN` (`newJobId`) USING BTREE,
  KEY `FK_JBC_R_JBO` (`orgJobId`) USING BTREE,
  CONSTRAINT `job_change_ibfk_1` FOREIGN KEY (`newJobId`) REFERENCES `job` (`jobId`),
  CONSTRAINT `job_change_ibfk_2` FOREIGN KEY (`orgJobId`) REFERENCES `job` (`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of job_change
-- ----------------------------

-- ----------------------------
-- Table structure for mail
-- ----------------------------
DROP TABLE IF EXISTS `mail`;
CREATE TABLE `mail` (
  `mailId` bigint(20) NOT NULL AUTO_INCREMENT,
  `sender` varchar(32) NOT NULL,
  `senderId` bigint(20) NOT NULL,
  `importantFlag` smallint(6) NOT NULL COMMENT '1=一般\r\n            2=重要\r\n            3=非常重要',
  `sendTime` datetime NOT NULL,
  `content` varchar(5000) NOT NULL COMMENT '邮件内容',
  `subject` varchar(256) NOT NULL COMMENT '邮件标题',
  `copyToNames` varchar(1000) DEFAULT NULL COMMENT '抄送人姓名列表',
  `copyToIDs` varchar(1000) DEFAULT NULL COMMENT '抄送人ID列表\r\n            用'',''分开',
  `recipientNames` varchar(1000) NOT NULL COMMENT '收件人姓名列表',
  `recipientIDs` varchar(1000) NOT NULL COMMENT '收件人ID列表\r\n            用'',''分隔',
  `mailStatus` smallint(6) NOT NULL COMMENT '邮件状态\r\n            1=正式邮件\r\n            0=草稿邮件',
  `fileIds` varchar(500) DEFAULT NULL COMMENT '附件Ids，多个附件的ID，通过,分割',
  `filenames` varchar(500) DEFAULT NULL COMMENT '附件名称列表，通过,进行分割',
  PRIMARY KEY (`mailId`),
  KEY `FK_ML_R_AU` (`senderId`) USING BTREE,
  CONSTRAINT `mail_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='邮件';

-- ----------------------------
-- Records of mail
-- ----------------------------

-- ----------------------------
-- Table structure for mail_attach
-- ----------------------------
DROP TABLE IF EXISTS `mail_attach`;
CREATE TABLE `mail_attach` (
  `mailId` bigint(20) NOT NULL,
  `fileId` bigint(20) NOT NULL,
  PRIMARY KEY (`mailId`,`fileId`),
  KEY `FK_MA_R_FA` (`fileId`) USING BTREE,
  CONSTRAINT `mail_attach_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `mail_attach_ibfk_2` FOREIGN KEY (`mailId`) REFERENCES `mail` (`mailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mail_attach
-- ----------------------------

-- ----------------------------
-- Table structure for mail_box
-- ----------------------------
DROP TABLE IF EXISTS `mail_box`;
CREATE TABLE `mail_box` (
  `boxId` bigint(20) NOT NULL AUTO_INCREMENT,
  `mailId` bigint(20) NOT NULL,
  `folderId` bigint(20) NOT NULL,
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `sendTime` datetime NOT NULL,
  `delFlag` smallint(6) NOT NULL COMMENT 'del=1则代表删除',
  `readFlag` smallint(6) NOT NULL,
  `replyFlag` smallint(6) NOT NULL,
  `note` varchar(256) DEFAULT NULL COMMENT 'note',
  PRIMARY KEY (`boxId`),
  KEY `FK_MB_R_AU` (`userId`) USING BTREE,
  KEY `FK_MB_R_FD` (`folderId`) USING BTREE,
  KEY `FK_MB_R_ML` (`mailId`) USING BTREE,
  CONSTRAINT `mail_box_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `mail_box_ibfk_2` FOREIGN KEY (`folderId`) REFERENCES `mail_folder` (`folderId`),
  CONSTRAINT `mail_box_ibfk_3` FOREIGN KEY (`mailId`) REFERENCES `mail` (`mailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收件箱';

-- ----------------------------
-- Records of mail_box
-- ----------------------------

-- ----------------------------
-- Table structure for mail_folder
-- ----------------------------
DROP TABLE IF EXISTS `mail_folder`;
CREATE TABLE `mail_folder` (
  `folderId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '文件夹编号',
  `userId` bigint(20) DEFAULT NULL COMMENT '主键',
  `folderName` varchar(128) NOT NULL COMMENT '文件夹名称',
  `parentId` bigint(20) DEFAULT NULL COMMENT '父目录',
  `depLevel` int(11) NOT NULL COMMENT '目录层',
  `path` varchar(256) DEFAULT NULL,
  `isPublic` smallint(6) NOT NULL COMMENT '1=表示共享，则所有的员工均可以使用该文件夹\r\n            0=私人文件夹',
  `folderType` smallint(6) NOT NULL COMMENT '文件夹类型\r\n            1=收信箱\r\n            2=发信箱\r\n            3=草稿箱\r\n            4=删除箱\r\n            10=其他',
  PRIMARY KEY (`folderId`),
  KEY `FK_FD_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `mail_folder_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of mail_folder
-- ----------------------------
INSERT INTO `mail_folder` VALUES ('1', null, '收件箱', '0', '1', '0.1.', '1', '1');
INSERT INTO `mail_folder` VALUES ('2', null, '发件箱', '0', '1', '0.2.', '1', '2');
INSERT INTO `mail_folder` VALUES ('3', null, '草稿箱', '0', '1', '0.3.', '1', '3');
INSERT INTO `mail_folder` VALUES ('4', null, '垃圾箱', '0', '1', '0.4.', '1', '4');

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `newsId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `typeId` bigint(20) NOT NULL,
  `subjectIcon` varchar(128) DEFAULT NULL,
  `subject` varchar(128) NOT NULL COMMENT '新闻标题',
  `author` varchar(32) NOT NULL COMMENT '作者',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `replyCounts` int(11) DEFAULT NULL,
  `viewCounts` int(11) DEFAULT NULL COMMENT '浏览数',
  `issuer` varchar(32) NOT NULL,
  `content` text NOT NULL COMMENT '内容',
  `updateTime` datetime NOT NULL,
  `status` smallint(6) NOT NULL COMMENT '\r\n            0=待审核\r\n            1=审核通过',
  PRIMARY KEY (`newsId`),
  KEY `FK_NS_R_NT` (`typeId`) USING BTREE,
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `news_type` (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='新闻';

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('1', '1', '', '新浪创业训练营招募！与创业者携手过冬', 'admin', '2015-11-03 00:58:57', '0', '1', '超级管理员', '<p>&nbsp;</p><div class=\"img_wrapper\" style=\"text-align: center; padding-bottom: 5px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体; font-size: 14px; line-height: 23px;\"><img src=\"http://n.sinaimg.cn/transform/20151102/m4kh-fxkhcfn4293773.jpg\" alt=\"\" data-link=\"\" style=\"margin: 0px auto; padding: 0px; border: 1px solid rgb(231, 231, 231); display: block;\" /></div><p class=\"p1\" style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　重要的事，开头就说：<span id=\"usstock_SINA\"><a href=\"http://stock.finance.sina.com.cn/usstock/quotes/SINA.html\" class=\"keyword f_st\" target=\"_blank\" style=\"color: rgb(4, 84, 167); text-decoration: none;\">新浪</a></span>创业训练营，今天开始招募！（<a href=\"http://form.mikecrm.com/f.php?t=yog9Hu\" target=\"_blank\" style=\"color: rgb(4, 84, 167); text-decoration: none;\">立刻报名</a>）</p><p class=\"p1\" style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　立冬将至，天气转凉。资本的&ldquo;寒冬&rdquo;笼罩在创业者的四周。坐以待毙？还是努力求生？答案无需多言。方向是唯一的，道路却千条万条。聪明的创业者会怎么做？</p><p class=\"p1\" style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　没有通用答案，但现在多了一个选择：快来，参加新浪创业训练营。</p><p class=\"p1\" style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　简单来说，新浪创业训练营，准备在三个方面帮助创业者。</p><p class=\"p1\" style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　一、创业课程：新浪创业训练营为创业者提供产品、运营、公关、市场、股权、团队、融资等几个方面的针对性课程，邀请各个领域的大咖专家，帮助创业者获得全面提升。</p>', '2015-11-03 00:58:57', '1');
INSERT INTO `news` VALUES ('2', '2', '', '神秘太空物体接近地球:预计11月13日坠入大气层', 'admin', '2015-11-03 01:00:46', '0', '0', '超级管理员', '<p>&nbsp;</p><div class=\"img_wrapper\" style=\"text-align: center; padding-bottom: 5px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体; font-size: 14px; line-height: 23px;\"><img src=\"http://n.sinaimg.cn/transform/20151102/sjfp-fxkhqea2934449.jpg\" alt=\"科学家们注意到一块神秘的太空垃圾即将在11月13日坠入印度洋上空的地球大气层。这是利用夏威夷大学2.2米望远镜拍摄的图像，箭头所指即为太空垃圾WT1190F\" data-link=\"\" style=\"margin: 0px auto; padding: 0px; border: 1px solid rgb(231, 231, 231); display: block;\" /><span class=\"img_descr\" style=\"line-height: 20px; padding: 6px 0px; color: rgb(102, 102, 102); font-size: 12px; margin: 5px auto; display: inline-block; zoom: 1; text-align: left;\">　　科学家们注意到一块神秘的太空垃圾即将在11月13日坠入印度洋上空的地球大气层。这是利用夏威夷大学2.2米望远镜拍摄的图像，箭头所指即为太空垃圾WT1190F</span></div><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　新浪科技讯&nbsp;北京时间11月2日消息，据英国《自然》杂志网站报道，天文学家们近日注意到一个不同寻常的小天体。他们甚至专门给这个小天体起了一个特别的编号&ldquo;WT1190F&rdquo;。从这个编号中其实我们可以感受到天文学家们在观测到这个奇怪物体时的那种困惑不解&mdash;&mdash;想想这个代号中的WT和F几个字母所表示的是什么？（What&nbsp;the&nbsp;F*k!）</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　好了，那么究竟是什么样的物体竟然会引起天文学家们如此强烈的反应，它有什么不同寻常之处？答案就是，科学家们计算显示，这个小天体预计将在11月13日冲入地球大气层并在印度洋上空坠毁，从而使其成为极少数在撞击地球之前便被精确测算出轨道和撞击时间的天体之一。更加令人出乎意料的是，计算结果强烈暗示WT1190F应该是一个太空垃圾，而且还是一个此前未曾被记录过的&ldquo;失踪&rdquo;的太空垃圾，其轨道最远处甚至大大超越了月球轨道外侧。也就是说，在此之前我们对它的存在一无所知，直到今年10月份科学家们首次发现了它的踪迹。</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　设在荷兰境内的欧洲空间局近地天体观测办公室副主管吉哈德&middot;德罗尔斯哈根（Gerhard&nbsp;Drolshagen）表示，目前全世界各地的科学家们正在忙于组建一个针对这一突发目标的观测协作联盟。这一事件不仅仅将让科学界有机会对一颗天体坠入地球大气层的过程进行观测，也将测试天文学家们此前构建的，在面对潜在威胁天体时进行相互协调的机制制度的有效性。德罗尔斯哈根表示：&ldquo;我们之前的设计现在看来还是有效的。当然，我们还得等上三个星期呢。&rdquo;</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　WT1190F最早是由设在美国亚利桑那大学图森分校的卡特里娜巡天项目首先发现的，该项目本身旨在巡视并搜寻那些接近地球的小行星或彗星目标。独立天文软件开发者比尔&middot;格雷（Bill&nbsp;Gray）表示，起先科学家们并不清楚这个怪异的天体究竟是什么，但在找到了2012年和2013年对于同一目标的观测存档资料数据之后他们很快便计算出了这一天体的轨道。格雷本人多年来一直与美国宇航局喷气推进实验室（JPL）的科学家们一同开展对地球附近太空垃圾的监视追踪工作。</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　WT1190F运行在一个高偏心率椭圆轨道上，其距离地球最远处甚至达到了地月距离的两倍以上。格雷的计算结果表明这一天体将在11月13日国际标准时间6:20（北京时间14:20）冲入斯里兰卡以南大约65公里处的印度洋上空大气层。预计该物体的大部分都将在大气中焚毁，不过格雷也开玩笑地说：&ldquo;我可不想那时候正好在那里钓鱼。&rdquo;</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　这个物体的直径大约只有1~2米，其轨道特征表明其密度很低，很可能是中空的，这表明这应当是一个人造物体。对此，哈佛大学史密松天体物理学中心的天体物理学家乔纳森&middot;麦克多维尔（Jonathan&nbsp;McDowell）表示：&ldquo;一段逝去的太空历史自己又找回来了。&rdquo;它可能是源自最近几年执行的月球探测项目中留下的一截废弃的火箭箭体或其他组件。当然也有可能这个太空垃圾已经在太空中游荡了数十年之久，甚至可以追溯的美国阿波罗计划的年代。这样的事是有先例可循的，比如在2002年曾经有一枚围绕地球运行的物体最终被鉴定为当年将第二艘载人登月飞船送往月球的土星五号巨型火箭留下的一块碎片。</p>', '2015-11-03 01:00:46', '1');
INSERT INTO `news` VALUES ('3', '1', '', '若Android厂商缴齐专利费 微软将赚60亿美元', '小A', '2015-11-03 01:03:21', '0', '0', '超级管理员', '<p>&nbsp;</p><div class=\"img_wrapper\" style=\"text-align: center; padding-bottom: 5px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体; font-size: 14px; line-height: 23px;\"><img src=\"http://n.sinaimg.cn/transform/20151102/z6r8-fxkhcfn4278310.jpg\" alt=\"微软CEO纳德拉\" data-link=\"\" style=\"margin: 0px auto; padding: 0px; border: 1px solid rgb(231, 231, 231); display: block;\" /><span class=\"img_descr\" style=\"line-height: 20px; padding: 6px 0px; color: rgb(102, 102, 102); font-size: 12px; margin: 5px auto; display: inline-block; zoom: 1; text-align: left;\"><span id=\"usstock_MSFT\"><a href=\"http://stock.finance.sina.com.cn/usstock/quotes/MSFT.html\" class=\"keyword f_st\" target=\"_blank\" style=\"color: rgb(4, 84, 167); text-decoration: none;\">微软</a></span>CEO纳德拉</span></div><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\"><span style=\"font-family: KaiTi_GB2312, KaiTi;\">　　导语：美国《福布斯》杂志网络版今天撰文称，微软不仅借助专利授权协议通过Android平台获利约60亿美元，还通过各种协议接触到Android的庞大用户群。</span></p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\"><span style=\"font-family: KaiTi_GB2312, KaiTi;\">　　以下为文章主要内容：</span></p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　几年前，微软收购了<span id=\"usstock_NOK\"><a href=\"http://stock.finance.sina.com.cn/usstock/quotes/NOK.html\" class=\"keyword f_st\" target=\"_blank\" style=\"color: rgb(4, 84, 167); text-decoration: none;\">诺基亚</a></span>的终端设备和服务部门。在该交易宣布到最终完成期间，诺基亚的工程师又完成了最后的绝唱。诺基亚X系列手机采用了该公司自主定制的Android系统，与诺基亚ID关联，而且可以使用微软的云计算服务。</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　这款产品的配置瞄准了中低端市场，所以诺基亚的Android平台并未实现全面腾飞。但这些芬兰工程师似乎希望说明一个问题：倘若他们在2011年2月投入Andorid阵营，而没有使用Windows Phone，该公司究竟可以开发出什么样的产品。</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　随着该交易的完成，微软CEO萨提亚&middot;纳德拉(Satya Nadella)面临着一个新的问题：微软能否应对Android的挑战？诺基亚X是否会被抛弃？微软的重点转向了Windows Phone，并希望将Windows 10推向各种类型的设备，而诺基亚的Android手机似乎被抛于脑后。</p><p style=\"margin: 15px 0px; padding: 0px; font-size: 14px; line-height: 23px; color: rgb(51, 51, 51); font-family: \'Microsoft Yahei\', \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', 宋体;\">　　微软推进Windows 10的战略以桌面电脑为切入点，Surface设备目前更新了操作系统。与<span id=\"usstock_AAPL\"><a href=\"http://stock.finance.sina.com.cn/usstock/quotes/AAPL.html\" class=\"keyword f_st\" target=\"_blank\" style=\"color: rgb(4, 84, 167); text-decoration: none;\">苹果</a></span>一样，微软根本不准备生产或开发自己的Android设备。事实上，微软已经从Android平台中得到了自己想要的东西，所以没有必要开发自己的Android手机。</p>', '2015-11-03 01:03:21', '1');

-- ----------------------------
-- Table structure for news_comment
-- ----------------------------
DROP TABLE IF EXISTS `news_comment`;
CREATE TABLE `news_comment` (
  `commentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `newsId` bigint(20) NOT NULL,
  `content` varchar(500) NOT NULL,
  `createtime` datetime NOT NULL,
  `fullname` varchar(32) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY (`commentId`),
  KEY `FK_NC_R_AU` (`userId`) USING BTREE,
  KEY `FK_NC_R_NS` (`newsId`) USING BTREE,
  CONSTRAINT `news_comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `news_comment_ibfk_2` FOREIGN KEY (`newsId`) REFERENCES `news` (`newsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news_comment
-- ----------------------------

-- ----------------------------
-- Table structure for news_type
-- ----------------------------
DROP TABLE IF EXISTS `news_type`;
CREATE TABLE `news_type` (
  `typeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL,
  `sn` int(11) NOT NULL,
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='新闻类型';

-- ----------------------------
-- Records of news_type
-- ----------------------------
INSERT INTO `news_type` VALUES ('1', 'A', '1');
INSERT INTO `news_type` VALUES ('2', 'B', '2');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `noticeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `postName` varchar(128) NOT NULL,
  `noticeTitle` varchar(128) NOT NULL,
  `noticeContent` varchar(3000) DEFAULT NULL,
  `effectiveDate` date DEFAULT NULL,
  `expirationDate` date DEFAULT NULL,
  `state` smallint(6) NOT NULL,
  PRIMARY KEY (`noticeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='公告';

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('1', 'admin', 'admin', '​admin', '2015-10-06', '2015-10-31', '1');
INSERT INTO `notice` VALUES ('2', 'admin', 'v1.1发布', '​v1.1版本正式发布', '2015-11-02', '2020-11-25', '1');
INSERT INTO `notice` VALUES ('3', 'admin', 'v1.2发布', '​v1.2版本正式发布', '2015-11-02', '2020-11-25', '1');
INSERT INTO `notice` VALUES ('4', 'admin', 'v1.3发布', '​v1.2版本内测发布', '2010-11-25', '2020-11-25', '1');

-- ----------------------------
-- Table structure for office_goods
-- ----------------------------
DROP TABLE IF EXISTS `office_goods`;
CREATE TABLE `office_goods` (
  `goodsId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) NOT NULL COMMENT '所属分类',
  `goodsName` varchar(128) NOT NULL COMMENT '物品名称',
  `goodsNo` varchar(128) NOT NULL COMMENT '编号',
  `specifications` varchar(256) NOT NULL COMMENT '规格',
  `unit` varchar(64) NOT NULL COMMENT '计量单位',
  `isWarning` smallint(6) NOT NULL COMMENT '是否启用库存警示',
  `notes` varchar(500) DEFAULT NULL COMMENT '备注',
  `stockCounts` int(11) NOT NULL COMMENT '库存总数',
  `warnCounts` int(11) NOT NULL COMMENT '最低库存数',
  PRIMARY KEY (`goodsId`),
  KEY `FK_OG_R_OGT` (`typeId`) USING BTREE,
  CONSTRAINT `office_goods_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `office_goods_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品';

-- ----------------------------
-- Records of office_goods
-- ----------------------------

-- ----------------------------
-- Table structure for office_goods_type
-- ----------------------------
DROP TABLE IF EXISTS `office_goods_type`;
CREATE TABLE `office_goods_type` (
  `typeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='办公用品类型';

-- ----------------------------
-- Records of office_goods_type
-- ----------------------------
INSERT INTO `office_goods_type` VALUES ('1', '办公用品');

-- ----------------------------
-- Table structure for phone_book
-- ----------------------------
DROP TABLE IF EXISTS `phone_book`;
CREATE TABLE `phone_book` (
  `phoneId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(128) NOT NULL,
  `title` varchar(32) NOT NULL COMMENT '先生\r\n            女士\r\n            小姐',
  `birthday` datetime DEFAULT NULL,
  `nickName` varchar(32) DEFAULT NULL,
  `duty` varchar(50) DEFAULT NULL,
  `spouse` varchar(32) DEFAULT NULL,
  `childs` varchar(40) DEFAULT NULL,
  `companyName` varchar(100) DEFAULT NULL,
  `companyAddress` varchar(128) DEFAULT NULL,
  `companyPhone` varchar(32) DEFAULT NULL,
  `companyFax` varchar(32) DEFAULT NULL,
  `homeAddress` varchar(128) DEFAULT NULL,
  `homeZip` varchar(12) DEFAULT NULL,
  `mobile` varchar(32) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `QQ` varchar(64) DEFAULT NULL,
  `MSN` varchar(128) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `userId` bigint(20) NOT NULL,
  `groupId` bigint(20) DEFAULT NULL,
  `isShared` smallint(6) NOT NULL,
  PRIMARY KEY (`phoneId`),
  KEY `FK_PB_R_AU` (`userId`) USING BTREE,
  KEY `FK_PB_R_PG` (`groupId`) USING BTREE,
  CONSTRAINT `phone_book_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `phone_book_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `phone_group` (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通讯簿';

-- ----------------------------
-- Records of phone_book
-- ----------------------------

-- ----------------------------
-- Table structure for phone_group
-- ----------------------------
DROP TABLE IF EXISTS `phone_group`;
CREATE TABLE `phone_group` (
  `groupId` bigint(20) NOT NULL AUTO_INCREMENT,
  `groupName` varchar(128) NOT NULL COMMENT '分组名称',
  `isShared` smallint(6) NOT NULL COMMENT '1=共享\r\n            0=私有',
  `SN` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY (`groupId`),
  KEY `FK_PG_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `phone_group_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of phone_group
-- ----------------------------

-- ----------------------------
-- Table structure for plan_attend
-- ----------------------------
DROP TABLE IF EXISTS `plan_attend`;
CREATE TABLE `plan_attend` (
  `attendId` bigint(20) NOT NULL AUTO_INCREMENT,
  `depId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `planId` bigint(20) NOT NULL,
  `isDep` smallint(6) NOT NULL COMMENT '是否为部门',
  `isPrimary` smallint(6) DEFAULT NULL COMMENT '是否负责人',
  PRIMARY KEY (`attendId`),
  KEY `FK_PAD_R_DT` (`depId`) USING BTREE,
  KEY `FK_PAD_R_UA` (`userId`) USING BTREE,
  KEY `FK_PAD_R_WP` (`planId`) USING BTREE,
  CONSTRAINT `plan_attend_ibfk_1` FOREIGN KEY (`depId`) REFERENCES `department` (`depId`),
  CONSTRAINT `plan_attend_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `plan_attend_ibfk_3` FOREIGN KEY (`planId`) REFERENCES `work_plan` (`planId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of plan_attend
-- ----------------------------

-- ----------------------------
-- Table structure for plan_file
-- ----------------------------
DROP TABLE IF EXISTS `plan_file`;
CREATE TABLE `plan_file` (
  `fileId` bigint(20) NOT NULL,
  `planId` bigint(20) NOT NULL,
  PRIMARY KEY (`fileId`,`planId`),
  KEY `FK_PA_R_WP` (`planId`) USING BTREE,
  CONSTRAINT `plan_file_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `plan_file_ibfk_2` FOREIGN KEY (`planId`) REFERENCES `work_plan` (`planId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of plan_file
-- ----------------------------

-- ----------------------------
-- Table structure for plan_type
-- ----------------------------
DROP TABLE IF EXISTS `plan_type`;
CREATE TABLE `plan_type` (
  `typeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(128) NOT NULL COMMENT '类别名称',
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='计划类型';

-- ----------------------------
-- Records of plan_type
-- ----------------------------

-- ----------------------------
-- Table structure for process_form
-- ----------------------------
DROP TABLE IF EXISTS `process_form`;
CREATE TABLE `process_form` (
  `formId` bigint(20) NOT NULL AUTO_INCREMENT,
  `runId` bigint(20) NOT NULL COMMENT '所属运行流程',
  `activityName` varchar(128) NOT NULL COMMENT '活动或任务名称',
  `sn` int(11) NOT NULL DEFAULT '1' COMMENT '表单序号代表该流程任务执行经过的次数,如第一次经过时为1,第二次再次经过时变为2,\r\n            主要用于标识某一任务在流程中可能被不断回退.',
  `createtime` datetime NOT NULL,
  `creatorId` bigint(20) NOT NULL,
  `creatorName` varchar(64) NOT NULL,
  PRIMARY KEY (`formId`),
  KEY `FK_PF_R_PR` (`runId`) USING BTREE,
  CONSTRAINT `process_form_ibfk_1` FOREIGN KEY (`runId`) REFERENCES `process_run` (`runId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='流程表单\r\n存储保存在运行中的流程表单数据';

-- ----------------------------
-- Records of process_form
-- ----------------------------
INSERT INTO `process_form` VALUES ('1', '1', '开始', '1', '2015-10-27 23:50:52', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('2', '1', '上级审批', '1', '2015-10-30 10:27:05', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('3', '1', '上级审批', '2', '2015-10-30 10:27:14', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('4', '2', '开始', '1', '2015-11-02 11:05:08', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('5', '3', '开始', '1', '2015-11-04 13:45:22', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('6', '4', '开始', '1', '2015-11-04 13:45:29', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('7', '5', '开始', '1', '2015-11-04 13:46:37', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('8', '6', '开始', '1', '2015-11-13 16:23:37', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('9', '7', '开始', '1', '2015-11-13 16:25:25', '1', '超级管理员');
INSERT INTO `process_form` VALUES ('10', '8', '开始', '1', '2015-11-13 16:37:20', '1', '超级管理员');

-- ----------------------------
-- Table structure for process_run
-- ----------------------------
DROP TABLE IF EXISTS `process_run`;
CREATE TABLE `process_run` (
  `runId` bigint(20) NOT NULL AUTO_INCREMENT,
  `subject` varchar(256) NOT NULL COMMENT '标题\r\n            一般为流程名称＋格式化的时间',
  `creator` varchar(128) DEFAULT NULL COMMENT '创建人',
  `userId` bigint(20) NOT NULL COMMENT '所属用户',
  `defId` bigint(20) NOT NULL COMMENT '所属流程定义',
  `piId` varchar(64) DEFAULT NULL COMMENT '流程实例ID',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `runStatus` smallint(6) NOT NULL COMMENT '0=尚未启动\r\n            1=已经启动流程\r\n            2=运行结束',
  PRIMARY KEY (`runId`),
  KEY `FK_PR_R_AU` (`userId`) USING BTREE,
  KEY `FK_PR_R_PD` (`defId`) USING BTREE,
  CONSTRAINT `process_run_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `process_run_ibfk_2` FOREIGN KEY (`defId`) REFERENCES `pro_definition` (`defId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='运行中的流程';

-- ----------------------------
-- Records of process_run
-- ----------------------------
INSERT INTO `process_run` VALUES ('1', '两级审批20151027-235051(超级管理员)', '超级管理员', '1', '4', '____.1', '2015-10-27 23:50:51', '1');
INSERT INTO `process_run` VALUES ('2', '两级审批20151102-110508(超级管理员)', '超级管理员', '1', '4', null, '2015-11-02 11:05:08', '0');
INSERT INTO `process_run` VALUES ('3', '两级审批20151104-134522(超级管理员)', '超级管理员', '1', '4', null, '2015-11-04 13:45:22', '0');
INSERT INTO `process_run` VALUES ('4', '两级审批20151104-134529(超级管理员)', '超级管理员', '1', '4', '____.2', '2015-11-04 13:45:29', '1');
INSERT INTO `process_run` VALUES ('5', '两级审批20151104-134637(超级管理员)', '超级管理员', '1', '4', '____.3', '2015-11-04 13:46:37', '1');
INSERT INTO `process_run` VALUES ('6', '两级审批20151113-162335(超级管理员)', '超级管理员', '1', '4', '____.4', '2015-11-13 16:23:35', '1');
INSERT INTO `process_run` VALUES ('7', '两级审批20151113-162525(超级管理员)', '超级管理员', '1', '4', null, '2015-11-13 16:25:25', '0');
INSERT INTO `process_run` VALUES ('8', '两级审批20151113-163720(超级管理员)', '超级管理员', '1', '4', '____.5', '2015-11-13 16:37:20', '1');

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `productId` bigint(20) NOT NULL AUTO_INCREMENT,
  `productName` varchar(128) NOT NULL COMMENT '产品名称',
  `productModel` varchar(128) DEFAULT NULL COMMENT '产品型号',
  `unit` varchar(128) DEFAULT NULL COMMENT '计量单位',
  `costPrice` decimal(18,2) DEFAULT NULL COMMENT '成本价',
  `salesPrice` decimal(18,2) DEFAULT NULL COMMENT '出售价',
  `productDesc` varchar(512) DEFAULT NULL COMMENT '产品描述',
  `providerId` bigint(20) NOT NULL COMMENT '所属供应商',
  `createtime` datetime NOT NULL COMMENT '收录时间',
  `updatetime` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `FK_PD_R_PUT` (`providerId`) USING BTREE,
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`providerId`) REFERENCES `provider` (`providerId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='供应商产品';

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('1', 'asdad', 'asdad', '', null, null, '', '1', '2012-02-28 00:00:00', '2012-02-28 10:04:32');

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `projectId` bigint(20) NOT NULL AUTO_INCREMENT,
  `projectName` varchar(128) NOT NULL COMMENT '项目名称',
  `projectNo` varchar(64) NOT NULL COMMENT '项目编号',
  `reqDesc` text COMMENT '需求描述',
  `isContract` smallint(6) NOT NULL COMMENT '是否签订合同',
  `fullname` varchar(32) NOT NULL COMMENT '联系人姓名',
  `mobile` varchar(32) DEFAULT NULL COMMENT '手机',
  `phone` varchar(32) DEFAULT NULL COMMENT '电话',
  `fax` varchar(32) DEFAULT NULL COMMENT '传真',
  `otherContacts` varchar(128) DEFAULT NULL COMMENT '其他联系方式',
  `customerId` bigint(20) NOT NULL COMMENT '所属客户',
  `userId` bigint(20) NOT NULL COMMENT '业务人员',
  PRIMARY KEY (`projectId`),
  KEY `FK_PR_R_CS` (`customerId`) USING BTREE,
  KEY `FK_PT_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`),
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目信息';

-- ----------------------------
-- Records of project
-- ----------------------------

-- ----------------------------
-- Table structure for project_file
-- ----------------------------
DROP TABLE IF EXISTS `project_file`;
CREATE TABLE `project_file` (
  `fileId` bigint(20) NOT NULL,
  `projectId` bigint(20) NOT NULL,
  PRIMARY KEY (`fileId`,`projectId`),
  KEY `FK_PF_R_PT` (`projectId`) USING BTREE,
  CONSTRAINT `project_file_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `project_file_ibfk_2` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目附件';

-- ----------------------------
-- Records of project_file
-- ----------------------------

-- ----------------------------
-- Table structure for provider
-- ----------------------------
DROP TABLE IF EXISTS `provider`;
CREATE TABLE `provider` (
  `providerId` bigint(20) NOT NULL AUTO_INCREMENT,
  `providerName` varchar(128) NOT NULL COMMENT '供应商名称',
  `contactor` varchar(128) NOT NULL COMMENT '联系人',
  `phone` varchar(32) NOT NULL COMMENT '电话',
  `fax` varchar(32) DEFAULT NULL COMMENT '传真',
  `site` varchar(128) DEFAULT NULL COMMENT '网址',
  `email` varchar(128) DEFAULT NULL COMMENT '邮件',
  `address` varchar(128) NOT NULL COMMENT '地址',
  `zip` varchar(32) DEFAULT NULL COMMENT '邮编',
  `openBank` varchar(128) DEFAULT NULL COMMENT '开户行',
  `account` varchar(64) DEFAULT NULL COMMENT '帐号',
  `notes` varchar(500) DEFAULT NULL COMMENT '备注',
  `rank` int(11) DEFAULT NULL COMMENT '供应商等级\r\n            1=一级供应商\r\n            2＝二级供应商\r\n            3＝三级供应商\r\n            4＝四级供应商\r\n            ',
  PRIMARY KEY (`providerId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='供应商';

-- ----------------------------
-- Records of provider
-- ----------------------------
INSERT INTO `provider` VALUES ('1', 'asd', 'adsdad', 'adsa', '', '', '', 'dadsadasd', '', '', '', null, '1');

-- ----------------------------
-- Table structure for pro_definition
-- ----------------------------
DROP TABLE IF EXISTS `pro_definition`;
CREATE TABLE `pro_definition` (
  `defId` bigint(20) NOT NULL AUTO_INCREMENT,
  `typeId` bigint(20) DEFAULT NULL COMMENT '分类ID',
  `name` varchar(256) NOT NULL COMMENT '流程的名称',
  `description` varchar(1024) DEFAULT NULL COMMENT '描述',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `deployId` varchar(64) NOT NULL COMMENT 'Jbpm 工作流id',
  `defXml` varchar(4000) DEFAULT NULL COMMENT '流程定义XML',
  PRIMARY KEY (`defId`),
  KEY `FK_PD_R_PT` (`typeId`) USING BTREE,
  CONSTRAINT `pro_definition_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `pro_type` (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='流程定义';

-- ----------------------------
-- Records of pro_definition
-- ----------------------------
INSERT INTO `pro_definition` VALUES ('4', '1', '两级审批', '两级审批', '2012-03-16 10:12:15', '3', '<?xml version=\"1.0\" encoding=\"GBK\"?>\n<process name=\"两步审批\" xmlns=\"http://jbpm.org/4.0/jpdl\">\n   <start g=\"263,10,48,48\" name=\"开始\">\n      <transition name=\"to 上级审批\" to=\"上级审批\" g=\"-71,-17\"/>\n   </start>\n   <end g=\"268,367,48,48\" name=\"结束\"/>\n   <task g=\"240,113,92,52\" name=\"上级审批\">\n      <transition g=\"231,214:-53,-17\" name=\"to 经理审批\" to=\"经理审批\"/>\n      <transition name=\"to 取消\" to=\"取消\" g=\"503,139:-53,-17\"/>\n   </task>\n   <task g=\"245,245,92,52\" name=\"经理审批\">\n      <transition g=\"-47,-17\" name=\"to 结束\" to=\"结束\"/>\n      <transition g=\"349,212:-53,-17\" name=\"to 上级审批\" to=\"上级审批\"/>\n      <transition name=\"to 取消\" to=\"取消\" g=\"506,271:-53,-17\"/>\n   </task>\n   <end-cancel name=\"取消\" g=\"482,193,48,48\"/>\n</process>');

-- ----------------------------
-- Table structure for pro_type
-- ----------------------------
DROP TABLE IF EXISTS `pro_type`;
CREATE TABLE `pro_type` (
  `typeId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '类别ID',
  `typeName` varchar(128) NOT NULL COMMENT '分类名称',
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='流程分类';

-- ----------------------------
-- Records of pro_type
-- ----------------------------
INSERT INTO `pro_type` VALUES ('1', '通用');
INSERT INTO `pro_type` VALUES ('2', '111q');
INSERT INTO `pro_type` VALUES ('3', '00');
INSERT INTO `pro_type` VALUES ('4', 'hh');

-- ----------------------------
-- Table structure for pro_user_assign
-- ----------------------------
DROP TABLE IF EXISTS `pro_user_assign`;
CREATE TABLE `pro_user_assign` (
  `assignId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '授权ID',
  `deployId` varchar(128) NOT NULL COMMENT 'jbpm流程定义的id',
  `activityName` varchar(128) NOT NULL COMMENT '流程节点名称',
  `roleId` varchar(128) DEFAULT NULL COMMENT '角色Id',
  `roleName` varchar(256) DEFAULT NULL,
  `userId` varchar(128) DEFAULT NULL COMMENT '用户ID',
  `username` varchar(256) DEFAULT NULL,
  `isSigned` smallint(6) DEFAULT '0',
  PRIMARY KEY (`assignId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='流程过程中各个任务节点及启动流程时的角色及用户';

-- ----------------------------
-- Records of pro_user_assign
-- ----------------------------
INSERT INTO `pro_user_assign` VALUES ('3', '1', '审批', '-1', '超级管理员', '1', '超级管理员', null);
INSERT INTO `pro_user_assign` VALUES ('4', '1', '查看审批结果', '-1', '超级管理员', '1', '超级管理员', null);
INSERT INTO `pro_user_assign` VALUES ('5', '3', '上级审批', '-1', '超级管理员', '1', '超级管理员', null);
INSERT INTO `pro_user_assign` VALUES ('6', '3', '经理审批', '-1', '超级管理员', '1', '超级管理员', null);

-- ----------------------------
-- Table structure for region
-- ----------------------------
DROP TABLE IF EXISTS `region`;
CREATE TABLE `region` (
  `regionId` bigint(20) NOT NULL AUTO_INCREMENT,
  `regionName` varchar(128) NOT NULL COMMENT '地区名称',
  `regionType` smallint(6) NOT NULL COMMENT '地区类型\r\n            1=省份\r\n            2=市',
  `parentId` bigint(20) DEFAULT NULL COMMENT '上级地区',
  PRIMARY KEY (`regionId`)
) ENGINE=InnoDB AUTO_INCREMENT=393 DEFAULT CHARSET=utf8 COMMENT='地区管理';

-- ----------------------------
-- Records of region
-- ----------------------------
INSERT INTO `region` VALUES ('1', '北京', '2', '0');
INSERT INTO `region` VALUES ('2', '上海', '2', '0');
INSERT INTO `region` VALUES ('3', '天津', '2', '0');
INSERT INTO `region` VALUES ('4', '重庆', '2', '0');
INSERT INTO `region` VALUES ('5', '河北', '1', '0');
INSERT INTO `region` VALUES ('6', '山西', '1', '0');
INSERT INTO `region` VALUES ('7', '内蒙古', '1', '0');
INSERT INTO `region` VALUES ('8', '辽宁', '1', '0');
INSERT INTO `region` VALUES ('9', '吉林', '1', '0');
INSERT INTO `region` VALUES ('10', '黑龙江', '1', '0');
INSERT INTO `region` VALUES ('11', '江苏', '1', '0');
INSERT INTO `region` VALUES ('12', '浙江', '1', '0');
INSERT INTO `region` VALUES ('13', '安徽', '1', '0');
INSERT INTO `region` VALUES ('14', '福建', '1', '0');
INSERT INTO `region` VALUES ('15', '江西', '1', '0');
INSERT INTO `region` VALUES ('16', '山东', '1', '0');
INSERT INTO `region` VALUES ('17', '河南', '1', '0');
INSERT INTO `region` VALUES ('18', '湖北', '1', '0');
INSERT INTO `region` VALUES ('19', '湖南', '1', '0');
INSERT INTO `region` VALUES ('20', '广东', '1', '0');
INSERT INTO `region` VALUES ('21', '广西', '1', '0');
INSERT INTO `region` VALUES ('22', '海南', '1', '0');
INSERT INTO `region` VALUES ('23', '四川', '1', '0');
INSERT INTO `region` VALUES ('24', '贵州', '1', '0');
INSERT INTO `region` VALUES ('25', '云南', '1', '0');
INSERT INTO `region` VALUES ('26', '西藏', '1', '0');
INSERT INTO `region` VALUES ('27', '陕西', '1', '0');
INSERT INTO `region` VALUES ('28', '甘肃', '1', '0');
INSERT INTO `region` VALUES ('29', '青海', '1', '0');
INSERT INTO `region` VALUES ('30', '宁夏', '1', '0');
INSERT INTO `region` VALUES ('31', '新疆', '1', '0');
INSERT INTO `region` VALUES ('32', '台湾', '1', '0');
INSERT INTO `region` VALUES ('33', '港澳', '1', '0');
INSERT INTO `region` VALUES ('34', '石家庄', '2', '5');
INSERT INTO `region` VALUES ('35', '唐山', '2', '5');
INSERT INTO `region` VALUES ('36', '秦皇岛', '2', '5');
INSERT INTO `region` VALUES ('37', '邯郸', '2', '5');
INSERT INTO `region` VALUES ('38', '邢台', '2', '5');
INSERT INTO `region` VALUES ('39', '保定', '2', '5');
INSERT INTO `region` VALUES ('40', '张家口', '2', '5');
INSERT INTO `region` VALUES ('41', '承德', '2', '5');
INSERT INTO `region` VALUES ('42', '沧州', '2', '5');
INSERT INTO `region` VALUES ('43', '廊坊', '2', '5');
INSERT INTO `region` VALUES ('44', '衡水', '2', '5');
INSERT INTO `region` VALUES ('45', '太原', '2', '6');
INSERT INTO `region` VALUES ('46', '大同', '2', '6');
INSERT INTO `region` VALUES ('47', '阳泉', '2', '6');
INSERT INTO `region` VALUES ('48', '长治', '2', '6');
INSERT INTO `region` VALUES ('49', '晋城', '2', '6');
INSERT INTO `region` VALUES ('50', '朔州', '2', '6');
INSERT INTO `region` VALUES ('51', '晋中', '2', '6');
INSERT INTO `region` VALUES ('52', '运城', '2', '6');
INSERT INTO `region` VALUES ('53', '忻州', '2', '6');
INSERT INTO `region` VALUES ('54', '临汾', '2', '6');
INSERT INTO `region` VALUES ('55', '吕梁', '2', '6');
INSERT INTO `region` VALUES ('56', '呼和浩特', '2', '7');
INSERT INTO `region` VALUES ('57', '包头', '2', '7');
INSERT INTO `region` VALUES ('58', '乌海', '2', '7');
INSERT INTO `region` VALUES ('59', '赤峰', '2', '7');
INSERT INTO `region` VALUES ('60', '通辽', '2', '7');
INSERT INTO `region` VALUES ('61', '鄂尔多斯', '2', '7');
INSERT INTO `region` VALUES ('62', '呼伦贝尔', '2', '7');
INSERT INTO `region` VALUES ('63', '巴彦淖尔', '2', '7');
INSERT INTO `region` VALUES ('64', '乌兰察布', '2', '7');
INSERT INTO `region` VALUES ('65', '兴安', '2', '7');
INSERT INTO `region` VALUES ('66', '锡林郭勒', '2', '7');
INSERT INTO `region` VALUES ('67', '阿拉善', '2', '7');
INSERT INTO `region` VALUES ('68', '沈阳', '2', '8');
INSERT INTO `region` VALUES ('69', '大连', '2', '8');
INSERT INTO `region` VALUES ('70', '鞍山', '2', '8');
INSERT INTO `region` VALUES ('71', '抚顺', '2', '8');
INSERT INTO `region` VALUES ('72', '本溪', '2', '8');
INSERT INTO `region` VALUES ('73', '丹东', '2', '8');
INSERT INTO `region` VALUES ('74', '锦州', '2', '8');
INSERT INTO `region` VALUES ('75', '营口', '2', '8');
INSERT INTO `region` VALUES ('76', '阜新', '2', '8');
INSERT INTO `region` VALUES ('77', '辽阳', '2', '8');
INSERT INTO `region` VALUES ('78', '盘锦', '2', '8');
INSERT INTO `region` VALUES ('79', '铁岭', '2', '8');
INSERT INTO `region` VALUES ('80', '朝阳', '2', '8');
INSERT INTO `region` VALUES ('81', '葫芦岛', '2', '8');
INSERT INTO `region` VALUES ('82', '长春', '2', '9');
INSERT INTO `region` VALUES ('83', '吉林', '2', '9');
INSERT INTO `region` VALUES ('84', '四平', '2', '9');
INSERT INTO `region` VALUES ('85', '辽源', '2', '9');
INSERT INTO `region` VALUES ('86', '通化', '2', '9');
INSERT INTO `region` VALUES ('87', '白山', '2', '9');
INSERT INTO `region` VALUES ('88', '松原', '2', '9');
INSERT INTO `region` VALUES ('89', '白城', '2', '9');
INSERT INTO `region` VALUES ('90', '延边', '2', '9');
INSERT INTO `region` VALUES ('91', '哈尔滨', '2', '10');
INSERT INTO `region` VALUES ('92', '齐齐哈尔', '2', '10');
INSERT INTO `region` VALUES ('93', '鸡西', '2', '10');
INSERT INTO `region` VALUES ('94', '鹤岗', '2', '10');
INSERT INTO `region` VALUES ('95', '双鸭山', '2', '10');
INSERT INTO `region` VALUES ('96', '大庆', '2', '10');
INSERT INTO `region` VALUES ('97', '伊春', '2', '10');
INSERT INTO `region` VALUES ('98', '佳木斯', '2', '10');
INSERT INTO `region` VALUES ('99', '七台河', '2', '10');
INSERT INTO `region` VALUES ('100', '牡丹江', '2', '10');
INSERT INTO `region` VALUES ('101', '黑河', '2', '10');
INSERT INTO `region` VALUES ('102', '绥化', '2', '10');
INSERT INTO `region` VALUES ('103', '大兴安岭', '2', '10');
INSERT INTO `region` VALUES ('104', '南京', '2', '11');
INSERT INTO `region` VALUES ('105', '无锡', '2', '11');
INSERT INTO `region` VALUES ('106', '徐州', '2', '11');
INSERT INTO `region` VALUES ('107', '常州', '2', '11');
INSERT INTO `region` VALUES ('108', '苏州', '2', '11');
INSERT INTO `region` VALUES ('109', '南通', '2', '11');
INSERT INTO `region` VALUES ('110', '连云港', '2', '11');
INSERT INTO `region` VALUES ('111', '淮安', '2', '11');
INSERT INTO `region` VALUES ('112', '盐城', '2', '11');
INSERT INTO `region` VALUES ('113', '扬州', '2', '11');
INSERT INTO `region` VALUES ('114', '镇江', '2', '11');
INSERT INTO `region` VALUES ('115', '泰州', '2', '11');
INSERT INTO `region` VALUES ('116', '宿迁', '2', '11');
INSERT INTO `region` VALUES ('117', '杭州', '2', '12');
INSERT INTO `region` VALUES ('118', '宁波', '2', '12');
INSERT INTO `region` VALUES ('119', '温州', '2', '12');
INSERT INTO `region` VALUES ('120', '嘉兴', '2', '12');
INSERT INTO `region` VALUES ('121', '湖州', '2', '12');
INSERT INTO `region` VALUES ('122', '绍兴', '2', '12');
INSERT INTO `region` VALUES ('123', '金华', '2', '12');
INSERT INTO `region` VALUES ('124', '衢州', '2', '12');
INSERT INTO `region` VALUES ('125', '舟山', '2', '12');
INSERT INTO `region` VALUES ('126', '台州', '2', '12');
INSERT INTO `region` VALUES ('127', '丽水', '2', '12');
INSERT INTO `region` VALUES ('128', '合肥', '2', '13');
INSERT INTO `region` VALUES ('129', '芜湖', '2', '13');
INSERT INTO `region` VALUES ('130', '蚌埠', '2', '13');
INSERT INTO `region` VALUES ('131', '淮南', '2', '13');
INSERT INTO `region` VALUES ('132', '马鞍山', '2', '13');
INSERT INTO `region` VALUES ('133', '淮北', '2', '13');
INSERT INTO `region` VALUES ('134', '铜陵', '2', '13');
INSERT INTO `region` VALUES ('135', '安庆', '2', '13');
INSERT INTO `region` VALUES ('136', '黄山', '2', '13');
INSERT INTO `region` VALUES ('137', '滁州', '2', '13');
INSERT INTO `region` VALUES ('138', '阜阳', '2', '13');
INSERT INTO `region` VALUES ('139', '宿州', '2', '13');
INSERT INTO `region` VALUES ('140', '巢湖', '2', '13');
INSERT INTO `region` VALUES ('141', '六安', '2', '13');
INSERT INTO `region` VALUES ('142', '亳州', '2', '13');
INSERT INTO `region` VALUES ('143', '池州', '2', '13');
INSERT INTO `region` VALUES ('144', '宣城', '2', '13');
INSERT INTO `region` VALUES ('145', '福州', '2', '14');
INSERT INTO `region` VALUES ('146', '厦门', '2', '14');
INSERT INTO `region` VALUES ('147', '莆田', '2', '14');
INSERT INTO `region` VALUES ('148', '三明', '2', '14');
INSERT INTO `region` VALUES ('149', '泉州', '2', '14');
INSERT INTO `region` VALUES ('150', '漳州', '2', '14');
INSERT INTO `region` VALUES ('151', '南平', '2', '14');
INSERT INTO `region` VALUES ('152', '龙岩', '2', '14');
INSERT INTO `region` VALUES ('153', '宁德', '2', '14');
INSERT INTO `region` VALUES ('154', '南昌', '2', '15');
INSERT INTO `region` VALUES ('155', '景德镇', '2', '15');
INSERT INTO `region` VALUES ('156', '萍乡', '2', '15');
INSERT INTO `region` VALUES ('157', '九江', '2', '15');
INSERT INTO `region` VALUES ('158', '新余', '2', '15');
INSERT INTO `region` VALUES ('159', '鹰潭', '2', '15');
INSERT INTO `region` VALUES ('160', '赣州', '2', '15');
INSERT INTO `region` VALUES ('161', '吉安', '2', '15');
INSERT INTO `region` VALUES ('162', '宜春', '2', '15');
INSERT INTO `region` VALUES ('163', '抚州', '2', '15');
INSERT INTO `region` VALUES ('164', '上饶', '2', '15');
INSERT INTO `region` VALUES ('165', '济南', '2', '16');
INSERT INTO `region` VALUES ('166', '青岛', '2', '16');
INSERT INTO `region` VALUES ('167', '淄博', '2', '16');
INSERT INTO `region` VALUES ('168', '枣庄', '2', '16');
INSERT INTO `region` VALUES ('169', '东营', '2', '16');
INSERT INTO `region` VALUES ('170', '烟台', '2', '16');
INSERT INTO `region` VALUES ('171', '潍坊', '2', '16');
INSERT INTO `region` VALUES ('172', '济宁', '2', '16');
INSERT INTO `region` VALUES ('173', '泰安', '2', '16');
INSERT INTO `region` VALUES ('174', '日照', '2', '16');
INSERT INTO `region` VALUES ('175', '莱芜', '2', '16');
INSERT INTO `region` VALUES ('176', '临沂', '2', '16');
INSERT INTO `region` VALUES ('177', '德州', '2', '16');
INSERT INTO `region` VALUES ('178', '聊城', '2', '16');
INSERT INTO `region` VALUES ('179', '滨州', '2', '16');
INSERT INTO `region` VALUES ('180', '菏泽', '2', '16');
INSERT INTO `region` VALUES ('181', '郑州', '2', '17');
INSERT INTO `region` VALUES ('182', '开封', '2', '17');
INSERT INTO `region` VALUES ('183', '洛阳', '2', '17');
INSERT INTO `region` VALUES ('184', '平顶山', '2', '17');
INSERT INTO `region` VALUES ('185', '焦作', '2', '17');
INSERT INTO `region` VALUES ('186', '鹤壁', '2', '17');
INSERT INTO `region` VALUES ('187', '新乡', '2', '17');
INSERT INTO `region` VALUES ('188', '安阳', '2', '17');
INSERT INTO `region` VALUES ('189', '濮阳', '2', '17');
INSERT INTO `region` VALUES ('190', '许昌', '2', '17');
INSERT INTO `region` VALUES ('191', '渭河', '2', '17');
INSERT INTO `region` VALUES ('192', '三门峡', '2', '17');
INSERT INTO `region` VALUES ('193', '南阳', '2', '17');
INSERT INTO `region` VALUES ('194', '商丘', '2', '17');
INSERT INTO `region` VALUES ('195', '信阳', '2', '17');
INSERT INTO `region` VALUES ('196', '周口', '2', '17');
INSERT INTO `region` VALUES ('197', '驻马店', '2', '17');
INSERT INTO `region` VALUES ('198', '武汉', '2', '18');
INSERT INTO `region` VALUES ('199', '黄石', '2', '18');
INSERT INTO `region` VALUES ('200', '襄樊', '2', '18');
INSERT INTO `region` VALUES ('201', '十堰', '2', '18');
INSERT INTO `region` VALUES ('202', '荆州', '2', '18');
INSERT INTO `region` VALUES ('203', '宜昌', '2', '18');
INSERT INTO `region` VALUES ('204', '荆门', '2', '18');
INSERT INTO `region` VALUES ('205', '鄂州', '2', '18');
INSERT INTO `region` VALUES ('206', '孝感', '2', '18');
INSERT INTO `region` VALUES ('207', '黄冈', '2', '18');
INSERT INTO `region` VALUES ('208', '咸宁', '2', '18');
INSERT INTO `region` VALUES ('209', '随州', '2', '18');
INSERT INTO `region` VALUES ('210', '恩施', '2', '18');
INSERT INTO `region` VALUES ('211', '长沙', '2', '19');
INSERT INTO `region` VALUES ('212', '株洲', '2', '19');
INSERT INTO `region` VALUES ('213', '湘潭', '2', '19');
INSERT INTO `region` VALUES ('214', '衡阳', '2', '19');
INSERT INTO `region` VALUES ('215', '邵阳', '2', '19');
INSERT INTO `region` VALUES ('216', '岳阳', '2', '19');
INSERT INTO `region` VALUES ('217', '常德', '2', '19');
INSERT INTO `region` VALUES ('218', '张家界', '2', '19');
INSERT INTO `region` VALUES ('219', '溢阳', '2', '19');
INSERT INTO `region` VALUES ('220', '郴州', '2', '19');
INSERT INTO `region` VALUES ('221', '永州', '2', '19');
INSERT INTO `region` VALUES ('222', '怀化', '2', '19');
INSERT INTO `region` VALUES ('223', '娄底', '2', '19');
INSERT INTO `region` VALUES ('224', '湘西', '2', '19');
INSERT INTO `region` VALUES ('225', '广州', '2', '20');
INSERT INTO `region` VALUES ('226', '深圳', '2', '20');
INSERT INTO `region` VALUES ('227', '珠海', '2', '20');
INSERT INTO `region` VALUES ('228', '汕头', '2', '20');
INSERT INTO `region` VALUES ('229', '韶关', '2', '20');
INSERT INTO `region` VALUES ('230', '佛山', '2', '20');
INSERT INTO `region` VALUES ('231', '江门', '2', '20');
INSERT INTO `region` VALUES ('232', '湛江', '2', '20');
INSERT INTO `region` VALUES ('233', '茂名', '2', '20');
INSERT INTO `region` VALUES ('234', '肇庆', '2', '20');
INSERT INTO `region` VALUES ('235', '惠州', '2', '20');
INSERT INTO `region` VALUES ('236', '梅州', '2', '20');
INSERT INTO `region` VALUES ('237', '汕尾', '2', '20');
INSERT INTO `region` VALUES ('238', '河源', '2', '20');
INSERT INTO `region` VALUES ('239', '阳江', '2', '20');
INSERT INTO `region` VALUES ('240', '清远', '2', '20');
INSERT INTO `region` VALUES ('241', '东莞', '2', '20');
INSERT INTO `region` VALUES ('242', '中山', '2', '20');
INSERT INTO `region` VALUES ('243', '潮州', '2', '20');
INSERT INTO `region` VALUES ('244', '揭阳', '2', '20');
INSERT INTO `region` VALUES ('245', '云浮', '2', '20');
INSERT INTO `region` VALUES ('246', '南宁', '2', '21');
INSERT INTO `region` VALUES ('247', '柳州', '2', '21');
INSERT INTO `region` VALUES ('248', '桂林', '2', '21');
INSERT INTO `region` VALUES ('249', '梧州', '2', '21');
INSERT INTO `region` VALUES ('250', '北海', '2', '21');
INSERT INTO `region` VALUES ('251', '防城港', '2', '21');
INSERT INTO `region` VALUES ('252', '钦州', '2', '21');
INSERT INTO `region` VALUES ('253', '贵港', '2', '21');
INSERT INTO `region` VALUES ('254', '玉林', '2', '21');
INSERT INTO `region` VALUES ('255', '百色', '2', '21');
INSERT INTO `region` VALUES ('256', '贺州', '2', '21');
INSERT INTO `region` VALUES ('257', '河池', '2', '21');
INSERT INTO `region` VALUES ('258', '来宾', '2', '21');
INSERT INTO `region` VALUES ('259', '崇左', '2', '21');
INSERT INTO `region` VALUES ('260', '白沙黎族自治县', '2', '22');
INSERT INTO `region` VALUES ('261', '西沙群岛', '2', '22');
INSERT INTO `region` VALUES ('262', '儋州', '2', '22');
INSERT INTO `region` VALUES ('263', '屯昌县', '2', '22');
INSERT INTO `region` VALUES ('264', '安定县', '2', '22');
INSERT INTO `region` VALUES ('265', '琼中黎族苗族自治县', '2', '22');
INSERT INTO `region` VALUES ('266', '昌江黎族自治县', '2', '22');
INSERT INTO `region` VALUES ('267', '东方', '2', '22');
INSERT INTO `region` VALUES ('268', '三亚', '2', '22');
INSERT INTO `region` VALUES ('269', '中沙群岛的岛礁及其海域', '2', '22');
INSERT INTO `region` VALUES ('270', '琼海', '2', '22');
INSERT INTO `region` VALUES ('271', '澄迈县', '2', '22');
INSERT INTO `region` VALUES ('272', '五指山', '2', '22');
INSERT INTO `region` VALUES ('273', '海口', '2', '22');
INSERT INTO `region` VALUES ('274', '文昌', '2', '22');
INSERT INTO `region` VALUES ('275', '陵水黎族自治县', '2', '22');
INSERT INTO `region` VALUES ('276', '保亭黎族苗族自治县', '2', '22');
INSERT INTO `region` VALUES ('277', '南沙群岛', '2', '22');
INSERT INTO `region` VALUES ('278', '乐东黎族自治县', '2', '22');
INSERT INTO `region` VALUES ('279', '临高县', '2', '22');
INSERT INTO `region` VALUES ('280', '万宁', '2', '22');
INSERT INTO `region` VALUES ('281', '成都', '2', '23');
INSERT INTO `region` VALUES ('282', '自贡', '2', '23');
INSERT INTO `region` VALUES ('283', '攀枝花', '2', '23');
INSERT INTO `region` VALUES ('284', '泸州', '2', '23');
INSERT INTO `region` VALUES ('285', '德阳', '2', '23');
INSERT INTO `region` VALUES ('286', '绵阳', '2', '23');
INSERT INTO `region` VALUES ('287', '广元', '2', '23');
INSERT INTO `region` VALUES ('288', '遂宁', '2', '23');
INSERT INTO `region` VALUES ('289', '内江', '2', '23');
INSERT INTO `region` VALUES ('290', '乐山', '2', '23');
INSERT INTO `region` VALUES ('291', '南充', '2', '23');
INSERT INTO `region` VALUES ('292', '宜宾', '2', '23');
INSERT INTO `region` VALUES ('293', '广安', '2', '23');
INSERT INTO `region` VALUES ('294', '达州', '2', '23');
INSERT INTO `region` VALUES ('295', '眉山', '2', '23');
INSERT INTO `region` VALUES ('296', '雅安', '2', '23');
INSERT INTO `region` VALUES ('297', '巴中', '2', '23');
INSERT INTO `region` VALUES ('298', '资阳', '2', '23');
INSERT INTO `region` VALUES ('299', '阿坝', '2', '23');
INSERT INTO `region` VALUES ('300', '甘孜', '2', '23');
INSERT INTO `region` VALUES ('301', '凉山', '2', '23');
INSERT INTO `region` VALUES ('302', '贵阳', '2', '24');
INSERT INTO `region` VALUES ('303', '六盘水', '2', '24');
INSERT INTO `region` VALUES ('304', '遵义', '2', '24');
INSERT INTO `region` VALUES ('305', '安顺', '2', '24');
INSERT INTO `region` VALUES ('306', '铜仁', '2', '24');
INSERT INTO `region` VALUES ('307', '毕节', '2', '24');
INSERT INTO `region` VALUES ('308', '黔西南', '2', '24');
INSERT INTO `region` VALUES ('309', '黔东南', '2', '24');
INSERT INTO `region` VALUES ('310', '黔南', '2', '24');
INSERT INTO `region` VALUES ('311', '昆明', '2', '25');
INSERT INTO `region` VALUES ('312', '曲靖', '2', '25');
INSERT INTO `region` VALUES ('313', '玉溪', '2', '25');
INSERT INTO `region` VALUES ('314', '保山', '2', '25');
INSERT INTO `region` VALUES ('315', '昭通', '2', '25');
INSERT INTO `region` VALUES ('316', '丽江', '2', '25');
INSERT INTO `region` VALUES ('317', '普洱', '2', '25');
INSERT INTO `region` VALUES ('318', '临沧', '2', '25');
INSERT INTO `region` VALUES ('319', '文山', '2', '25');
INSERT INTO `region` VALUES ('320', '红河', '2', '25');
INSERT INTO `region` VALUES ('321', '西双版纳', '2', '25');
INSERT INTO `region` VALUES ('322', '楚雄', '2', '25');
INSERT INTO `region` VALUES ('323', '大理', '2', '25');
INSERT INTO `region` VALUES ('324', '德宏', '2', '25');
INSERT INTO `region` VALUES ('325', '怒江', '2', '25');
INSERT INTO `region` VALUES ('326', '迪庆', '2', '25');
INSERT INTO `region` VALUES ('327', '拉萨', '2', '26');
INSERT INTO `region` VALUES ('328', '昌都', '2', '26');
INSERT INTO `region` VALUES ('329', '山南', '2', '26');
INSERT INTO `region` VALUES ('330', '日喀则', '2', '26');
INSERT INTO `region` VALUES ('331', '那曲', '2', '26');
INSERT INTO `region` VALUES ('332', '阿里', '2', '26');
INSERT INTO `region` VALUES ('333', '林芝', '2', '26');
INSERT INTO `region` VALUES ('334', '西安', '2', '27');
INSERT INTO `region` VALUES ('335', '铜川', '2', '27');
INSERT INTO `region` VALUES ('336', '宝鸡', '2', '27');
INSERT INTO `region` VALUES ('337', '咸阳', '2', '27');
INSERT INTO `region` VALUES ('338', '渭南', '2', '27');
INSERT INTO `region` VALUES ('339', '延安', '2', '27');
INSERT INTO `region` VALUES ('340', '汉中', '2', '27');
INSERT INTO `region` VALUES ('341', '榆林', '2', '27');
INSERT INTO `region` VALUES ('342', '安康', '2', '27');
INSERT INTO `region` VALUES ('343', '商洛', '2', '27');
INSERT INTO `region` VALUES ('344', '兰州', '2', '28');
INSERT INTO `region` VALUES ('345', '嘉峪关', '2', '28');
INSERT INTO `region` VALUES ('346', '金昌', '2', '28');
INSERT INTO `region` VALUES ('347', '白银', '2', '28');
INSERT INTO `region` VALUES ('348', '天水', '2', '28');
INSERT INTO `region` VALUES ('349', '武威', '2', '28');
INSERT INTO `region` VALUES ('350', '张掖', '2', '28');
INSERT INTO `region` VALUES ('351', '平凉', '2', '28');
INSERT INTO `region` VALUES ('352', '酒泉', '2', '28');
INSERT INTO `region` VALUES ('353', '庆阳', '2', '28');
INSERT INTO `region` VALUES ('354', '定西', '2', '28');
INSERT INTO `region` VALUES ('355', '陇南', '2', '28');
INSERT INTO `region` VALUES ('356', '临夏', '2', '28');
INSERT INTO `region` VALUES ('357', '甘南', '2', '28');
INSERT INTO `region` VALUES ('358', '西宁', '2', '29');
INSERT INTO `region` VALUES ('359', '海东', '2', '29');
INSERT INTO `region` VALUES ('360', '海北', '2', '29');
INSERT INTO `region` VALUES ('361', '黄南', '2', '29');
INSERT INTO `region` VALUES ('362', '海南', '2', '29');
INSERT INTO `region` VALUES ('363', '果洛', '2', '29');
INSERT INTO `region` VALUES ('364', '玉树', '2', '29');
INSERT INTO `region` VALUES ('365', '海西', '2', '29');
INSERT INTO `region` VALUES ('366', '银川', '2', '30');
INSERT INTO `region` VALUES ('367', '石嘴山', '2', '30');
INSERT INTO `region` VALUES ('368', '吴忠', '2', '30');
INSERT INTO `region` VALUES ('369', '固原', '2', '30');
INSERT INTO `region` VALUES ('370', '中卫', '2', '30');
INSERT INTO `region` VALUES ('371', '乌鲁木齐', '2', '31');
INSERT INTO `region` VALUES ('372', '克拉玛依', '2', '31');
INSERT INTO `region` VALUES ('373', '吐鲁番', '2', '31');
INSERT INTO `region` VALUES ('374', '哈密', '2', '31');
INSERT INTO `region` VALUES ('375', '和田', '2', '31');
INSERT INTO `region` VALUES ('376', '阿克苏', '2', '31');
INSERT INTO `region` VALUES ('377', '喀什', '2', '31');
INSERT INTO `region` VALUES ('378', '克孜勒苏柯尔克孜', '2', '31');
INSERT INTO `region` VALUES ('379', '巴音郭楞蒙古', '2', '31');
INSERT INTO `region` VALUES ('380', '昌吉', '2', '31');
INSERT INTO `region` VALUES ('381', '博尔塔拉蒙古', '2', '31');
INSERT INTO `region` VALUES ('382', '伊犁哈萨克', '2', '31');
INSERT INTO `region` VALUES ('383', '塔城', '2', '31');
INSERT INTO `region` VALUES ('384', '阿勒泰', '2', '31');
INSERT INTO `region` VALUES ('385', '台北', '2', '32');
INSERT INTO `region` VALUES ('386', '高雄', '2', '32');
INSERT INTO `region` VALUES ('387', '基隆', '2', '32');
INSERT INTO `region` VALUES ('388', '台中', '2', '32');
INSERT INTO `region` VALUES ('389', '台南', '2', '32');
INSERT INTO `region` VALUES ('390', '新竹', '2', '32');
INSERT INTO `region` VALUES ('391', '香港', '2', '33');
INSERT INTO `region` VALUES ('392', '澳门', '2', '33');

-- ----------------------------
-- Table structure for report_param
-- ----------------------------
DROP TABLE IF EXISTS `report_param`;
CREATE TABLE `report_param` (
  `paramId` bigint(20) NOT NULL AUTO_INCREMENT,
  `reportId` bigint(20) NOT NULL COMMENT '所属报表',
  `paramName` varchar(64) NOT NULL COMMENT '参数名称',
  `paramKey` varchar(64) NOT NULL COMMENT '参数Key',
  `defaultVal` varchar(128) NOT NULL COMMENT '缺省值',
  `paramType` varchar(32) NOT NULL COMMENT '类型\r\n            字符类型--varchar\r\n            整型--int\r\n            精度型--decimal\r\n            日期型--date\r\n            日期时间型--datetime\r\n            ',
  `sn` int(11) NOT NULL COMMENT '系列号',
  PRIMARY KEY (`paramId`),
  KEY `FK_RP_R_RPT` (`reportId`) USING BTREE,
  CONSTRAINT `report_param_ibfk_1` FOREIGN KEY (`reportId`) REFERENCES `report_template` (`reportId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报表参数';

-- ----------------------------
-- Records of report_param
-- ----------------------------

-- ----------------------------
-- Table structure for report_template
-- ----------------------------
DROP TABLE IF EXISTS `report_template`;
CREATE TABLE `report_template` (
  `reportId` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL COMMENT '标题',
  `descp` varchar(500) NOT NULL COMMENT '描述',
  `reportLocation` varchar(128) NOT NULL COMMENT '报表模块的jasper文件的路径',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `updatetime` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`reportId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报表模板\r\nreport_template';

-- ----------------------------
-- Records of report_template
-- ----------------------------

-- ----------------------------
-- Table structure for resume
-- ----------------------------
DROP TABLE IF EXISTS `resume`;
CREATE TABLE `resume` (
  `resumeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(64) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `address` varchar(128) DEFAULT NULL,
  `zip` varchar(32) DEFAULT NULL,
  `sex` varchar(32) DEFAULT NULL,
  `position` varchar(64) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `mobile` varchar(64) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `hobby` varchar(256) DEFAULT NULL,
  `religion` varchar(128) DEFAULT NULL,
  `party` varchar(128) DEFAULT NULL,
  `nationality` varchar(32) DEFAULT NULL,
  `race` varchar(32) DEFAULT NULL,
  `birthPlace` varchar(128) DEFAULT NULL,
  `eduCollege` varchar(128) DEFAULT NULL,
  `eduDegree` varchar(128) DEFAULT NULL,
  `eduMajor` varchar(128) DEFAULT NULL,
  `startWorkDate` datetime DEFAULT NULL,
  `idNo` varchar(64) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `status` varchar(64) DEFAULT NULL COMMENT '状态\r\n            \r\n            通过\r\n            未通过\r\n            准备安排面试\r\n            面试通过\r\n            \r\n            ',
  `memo` varchar(1024) DEFAULT NULL,
  `registor` varchar(64) DEFAULT NULL,
  `regTime` datetime DEFAULT NULL,
  `workCase` text,
  `trainCase` text,
  `projectCase` text,
  PRIMARY KEY (`resumeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='简历管理';

-- ----------------------------
-- Records of resume
-- ----------------------------

-- ----------------------------
-- Table structure for resume_file
-- ----------------------------
DROP TABLE IF EXISTS `resume_file`;
CREATE TABLE `resume_file` (
  `fileId` bigint(20) NOT NULL,
  `resumeId` bigint(20) NOT NULL,
  PRIMARY KEY (`fileId`,`resumeId`),
  KEY `FK_RMF_R_RM` (`resumeId`) USING BTREE,
  CONSTRAINT `resume_file_ibfk_1` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `resume_file_ibfk_2` FOREIGN KEY (`resumeId`) REFERENCES `resume` (`resumeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resume_file
-- ----------------------------

-- ----------------------------
-- Table structure for role_fun
-- ----------------------------
DROP TABLE IF EXISTS `role_fun`;
CREATE TABLE `role_fun` (
  `roleId` bigint(20) NOT NULL,
  `functionId` bigint(20) NOT NULL,
  PRIMARY KEY (`roleId`,`functionId`),
  KEY `FK_RF_R_AFN` (`functionId`) USING BTREE,
  CONSTRAINT `role_fun_ibfk_1` FOREIGN KEY (`functionId`) REFERENCES `app_function` (`functionId`),
  CONSTRAINT `role_fun_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `app_role` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_fun
-- ----------------------------
INSERT INTO `role_fun` VALUES ('1', '1');
INSERT INTO `role_fun` VALUES ('1', '2');
INSERT INTO `role_fun` VALUES ('1', '3');
INSERT INTO `role_fun` VALUES ('1', '4');
INSERT INTO `role_fun` VALUES ('1', '10');
INSERT INTO `role_fun` VALUES ('1', '11');
INSERT INTO `role_fun` VALUES ('1', '12');
INSERT INTO `role_fun` VALUES ('1', '13');
INSERT INTO `role_fun` VALUES ('3', '25');
INSERT INTO `role_fun` VALUES ('3', '26');
INSERT INTO `role_fun` VALUES ('3', '27');
INSERT INTO `role_fun` VALUES ('3', '28');
INSERT INTO `role_fun` VALUES ('3', '29');
INSERT INTO `role_fun` VALUES ('4', '30');
INSERT INTO `role_fun` VALUES ('4', '31');
INSERT INTO `role_fun` VALUES ('4', '32');
INSERT INTO `role_fun` VALUES ('4', '33');
INSERT INTO `role_fun` VALUES ('1', '34');
INSERT INTO `role_fun` VALUES ('2', '34');
INSERT INTO `role_fun` VALUES ('4', '34');
INSERT INTO `role_fun` VALUES ('5', '34');
INSERT INTO `role_fun` VALUES ('4', '35');
INSERT INTO `role_fun` VALUES ('4', '36');
INSERT INTO `role_fun` VALUES ('4', '37');
INSERT INTO `role_fun` VALUES ('4', '38');
INSERT INTO `role_fun` VALUES ('4', '39');
INSERT INTO `role_fun` VALUES ('4', '40');
INSERT INTO `role_fun` VALUES ('4', '41');
INSERT INTO `role_fun` VALUES ('4', '42');
INSERT INTO `role_fun` VALUES ('4', '43');
INSERT INTO `role_fun` VALUES ('4', '44');
INSERT INTO `role_fun` VALUES ('4', '45');
INSERT INTO `role_fun` VALUES ('4', '46');
INSERT INTO `role_fun` VALUES ('4', '47');
INSERT INTO `role_fun` VALUES ('4', '48');
INSERT INTO `role_fun` VALUES ('1', '49');
INSERT INTO `role_fun` VALUES ('1', '50');
INSERT INTO `role_fun` VALUES ('1', '51');
INSERT INTO `role_fun` VALUES ('1', '52');
INSERT INTO `role_fun` VALUES ('1', '53');
INSERT INTO `role_fun` VALUES ('1', '54');
INSERT INTO `role_fun` VALUES ('1', '55');
INSERT INTO `role_fun` VALUES ('1', '56');
INSERT INTO `role_fun` VALUES ('1', '57');
INSERT INTO `role_fun` VALUES ('1', '58');
INSERT INTO `role_fun` VALUES ('1', '59');
INSERT INTO `role_fun` VALUES ('1', '60');
INSERT INTO `role_fun` VALUES ('1', '61');
INSERT INTO `role_fun` VALUES ('1', '62');
INSERT INTO `role_fun` VALUES ('1', '63');
INSERT INTO `role_fun` VALUES ('1', '64');
INSERT INTO `role_fun` VALUES ('1', '65');
INSERT INTO `role_fun` VALUES ('1', '66');
INSERT INTO `role_fun` VALUES ('1', '67');
INSERT INTO `role_fun` VALUES ('5', '68');
INSERT INTO `role_fun` VALUES ('5', '69');
INSERT INTO `role_fun` VALUES ('5', '70');
INSERT INTO `role_fun` VALUES ('5', '71');
INSERT INTO `role_fun` VALUES ('5', '72');
INSERT INTO `role_fun` VALUES ('5', '73');
INSERT INTO `role_fun` VALUES ('5', '74');
INSERT INTO `role_fun` VALUES ('5', '75');
INSERT INTO `role_fun` VALUES ('5', '76');
INSERT INTO `role_fun` VALUES ('5', '77');
INSERT INTO `role_fun` VALUES ('5', '78');
INSERT INTO `role_fun` VALUES ('5', '79');
INSERT INTO `role_fun` VALUES ('5', '80');
INSERT INTO `role_fun` VALUES ('5', '81');
INSERT INTO `role_fun` VALUES ('5', '82');
INSERT INTO `role_fun` VALUES ('5', '83');
INSERT INTO `role_fun` VALUES ('5', '84');
INSERT INTO `role_fun` VALUES ('5', '85');
INSERT INTO `role_fun` VALUES ('5', '86');
INSERT INTO `role_fun` VALUES ('5', '87');
INSERT INTO `role_fun` VALUES ('5', '88');
INSERT INTO `role_fun` VALUES ('5', '89');
INSERT INTO `role_fun` VALUES ('5', '90');
INSERT INTO `role_fun` VALUES ('5', '91');
INSERT INTO `role_fun` VALUES ('5', '92');
INSERT INTO `role_fun` VALUES ('5', '93');
INSERT INTO `role_fun` VALUES ('5', '94');
INSERT INTO `role_fun` VALUES ('5', '95');
INSERT INTO `role_fun` VALUES ('2', '96');
INSERT INTO `role_fun` VALUES ('2', '97');
INSERT INTO `role_fun` VALUES ('2', '98');
INSERT INTO `role_fun` VALUES ('2', '99');
INSERT INTO `role_fun` VALUES ('2', '100');
INSERT INTO `role_fun` VALUES ('2', '101');
INSERT INTO `role_fun` VALUES ('2', '102');
INSERT INTO `role_fun` VALUES ('2', '103');
INSERT INTO `role_fun` VALUES ('2', '104');
INSERT INTO `role_fun` VALUES ('2', '105');
INSERT INTO `role_fun` VALUES ('2', '106');
INSERT INTO `role_fun` VALUES ('2', '107');
INSERT INTO `role_fun` VALUES ('2', '108');
INSERT INTO `role_fun` VALUES ('2', '109');
INSERT INTO `role_fun` VALUES ('2', '110');
INSERT INTO `role_fun` VALUES ('2', '111');
INSERT INTO `role_fun` VALUES ('2', '112');
INSERT INTO `role_fun` VALUES ('2', '113');
INSERT INTO `role_fun` VALUES ('2', '114');
INSERT INTO `role_fun` VALUES ('2', '115');
INSERT INTO `role_fun` VALUES ('2', '116');
INSERT INTO `role_fun` VALUES ('2', '117');
INSERT INTO `role_fun` VALUES ('2', '118');
INSERT INTO `role_fun` VALUES ('2', '119');
INSERT INTO `role_fun` VALUES ('2', '120');
INSERT INTO `role_fun` VALUES ('2', '121');
INSERT INTO `role_fun` VALUES ('2', '122');
INSERT INTO `role_fun` VALUES ('2', '123');
INSERT INTO `role_fun` VALUES ('2', '124');
INSERT INTO `role_fun` VALUES ('2', '125');
INSERT INTO `role_fun` VALUES ('2', '126');
INSERT INTO `role_fun` VALUES ('2', '127');
INSERT INTO `role_fun` VALUES ('2', '128');
INSERT INTO `role_fun` VALUES ('2', '129');
INSERT INTO `role_fun` VALUES ('2', '130');
INSERT INTO `role_fun` VALUES ('2', '131');
INSERT INTO `role_fun` VALUES ('2', '132');
INSERT INTO `role_fun` VALUES ('2', '133');
INSERT INTO `role_fun` VALUES ('2', '134');
INSERT INTO `role_fun` VALUES ('2', '135');
INSERT INTO `role_fun` VALUES ('2', '136');
INSERT INTO `role_fun` VALUES ('2', '137');
INSERT INTO `role_fun` VALUES ('2', '138');
INSERT INTO `role_fun` VALUES ('2', '139');
INSERT INTO `role_fun` VALUES ('2', '140');
INSERT INTO `role_fun` VALUES ('2', '141');
INSERT INTO `role_fun` VALUES ('2', '142');
INSERT INTO `role_fun` VALUES ('2', '143');
INSERT INTO `role_fun` VALUES ('2', '144');
INSERT INTO `role_fun` VALUES ('2', '145');
INSERT INTO `role_fun` VALUES ('2', '146');
INSERT INTO `role_fun` VALUES ('2', '147');
INSERT INTO `role_fun` VALUES ('2', '148');

-- ----------------------------
-- Table structure for salary_item
-- ----------------------------
DROP TABLE IF EXISTS `salary_item`;
CREATE TABLE `salary_item` (
  `salaryItemId` bigint(20) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(128) NOT NULL COMMENT '项目名称',
  `defaultVal` decimal(18,2) NOT NULL COMMENT '缺省值',
  PRIMARY KEY (`salaryItemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='薪酬组成项目';

-- ----------------------------
-- Records of salary_item
-- ----------------------------

-- ----------------------------
-- Table structure for salary_payoff
-- ----------------------------
DROP TABLE IF EXISTS `salary_payoff`;
CREATE TABLE `salary_payoff` (
  `recordId` bigint(20) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(64) NOT NULL COMMENT '员工姓名',
  `userId` bigint(20) NOT NULL COMMENT '所属员工',
  `profileNo` varchar(128) DEFAULT NULL COMMENT '档案编号',
  `idNo` varchar(128) DEFAULT NULL COMMENT '身份证号',
  `standAmount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '薪标金额',
  `encourageAmount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '奖励金额',
  `deductAmount` decimal(18,2) NOT NULL DEFAULT '0.00' COMMENT '扣除工资',
  `achieveAmount` decimal(18,2) DEFAULT '0.00' COMMENT '效绩工资',
  `encourageDesc` varchar(512) DEFAULT NULL COMMENT '奖励描述',
  `deductDesc` varchar(512) DEFAULT NULL COMMENT '扣除描述',
  `memo` varchar(512) DEFAULT NULL COMMENT '备注描述',
  `acutalAmount` decimal(18,2) DEFAULT NULL COMMENT '实发金额',
  `regTime` datetime NOT NULL COMMENT '登记时间',
  `register` varchar(64) DEFAULT NULL COMMENT '登记人',
  `checkName` varchar(64) DEFAULT NULL COMMENT '审批人',
  `checkTime` datetime DEFAULT NULL COMMENT '审批时间',
  `checkStatus` smallint(6) DEFAULT NULL COMMENT '审批状态\r\n            0=草稿\r\n            1=通过审批\r\n            2=未通过审批\r\n            ',
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `checkOpinion` varchar(1024) DEFAULT NULL COMMENT '审批意见',
  PRIMARY KEY (`recordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salary_payoff
-- ----------------------------

-- ----------------------------
-- Table structure for short_message
-- ----------------------------
DROP TABLE IF EXISTS `short_message`;
CREATE TABLE `short_message` (
  `messageId` bigint(20) NOT NULL AUTO_INCREMENT,
  `senderId` bigint(20) DEFAULT NULL COMMENT '主键',
  `content` varchar(256) NOT NULL,
  `sender` varchar(64) NOT NULL,
  `msgType` smallint(6) NOT NULL COMMENT '1=个人信息\r\n            2=日程安排\r\n            3=计划任务\r\n            ',
  `sendTime` datetime NOT NULL,
  PRIMARY KEY (`messageId`),
  KEY `FK_SM_R_AU` (`senderId`) USING BTREE,
  CONSTRAINT `short_message_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='短信消息';

-- ----------------------------
-- Records of short_message
-- ----------------------------
INSERT INTO `short_message` VALUES ('1', '1', 'adasdadsad', '?????', '1', '2012-02-28 09:24:07');
INSERT INTO `short_message` VALUES ('2', '1', '内部测试', '超级管理员', '1', '2015-11-03 00:39:17');

-- ----------------------------
-- Table structure for stand_salary
-- ----------------------------
DROP TABLE IF EXISTS `stand_salary`;
CREATE TABLE `stand_salary` (
  `standardId` bigint(20) NOT NULL AUTO_INCREMENT,
  `standardNo` varchar(128) NOT NULL COMMENT '薪酬标准编号\r\n            惟一',
  `standardName` varchar(128) NOT NULL COMMENT '标准名称',
  `totalMoney` decimal(18,2) NOT NULL DEFAULT '0.00',
  `framer` varchar(64) DEFAULT NULL,
  `setdownTime` datetime DEFAULT NULL,
  `checkName` varchar(64) DEFAULT NULL,
  `checkTime` datetime DEFAULT NULL,
  `modifyName` varchar(64) DEFAULT NULL,
  `modifyTime` datetime DEFAULT NULL,
  `checkOpinion` varchar(512) DEFAULT NULL,
  `status` smallint(6) NOT NULL COMMENT '0=草稿\r\n            1=审批\r\n            2=未通过审批',
  `memo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`standardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stand_salary
-- ----------------------------

-- ----------------------------
-- Table structure for stand_salary_item
-- ----------------------------
DROP TABLE IF EXISTS `stand_salary_item`;
CREATE TABLE `stand_salary_item` (
  `itemId` bigint(20) NOT NULL AUTO_INCREMENT,
  `standardId` bigint(20) NOT NULL,
  `itemName` varchar(64) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `salaryItemId` bigint(20) DEFAULT NULL COMMENT '所属工资组成ID\r\n            外键，但不需要在数据库层建立外键',
  PRIMARY KEY (`itemId`),
  KEY `FK_SSI_R_SSY` (`standardId`) USING BTREE,
  CONSTRAINT `stand_salary_item_ibfk_1` FOREIGN KEY (`standardId`) REFERENCES `stand_salary` (`standardId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='薪酬标准明细';

-- ----------------------------
-- Records of stand_salary_item
-- ----------------------------

-- ----------------------------
-- Table structure for sys_config
-- ----------------------------
DROP TABLE IF EXISTS `sys_config`;
CREATE TABLE `sys_config` (
  `configId` bigint(20) NOT NULL AUTO_INCREMENT,
  `configKey` varchar(64) NOT NULL COMMENT 'Key',
  `configName` varchar(64) NOT NULL COMMENT '配置名称',
  `configDesc` varchar(256) DEFAULT NULL COMMENT '配置描述',
  `typeName` varchar(32) NOT NULL COMMENT '所属分类名称',
  `dataType` smallint(6) NOT NULL COMMENT '数据类型\r\n            1=varchar\r\n            2=intger\r\n            3=decimal\r\n            4=datetime\r\n            5=time\r\n            ',
  `dataValue` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`configId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='系统配置\r\n\r\n用于系统的全局配置\r\n如邮件服务器的配置';

-- ----------------------------
-- Records of sys_config
-- ----------------------------
INSERT INTO `sys_config` VALUES ('1', 'host', '主机Host', '主机IP', '系统邮件配置', '1', '192.168.1.11');
INSERT INTO `sys_config` VALUES ('2', 'username', '用户名', '邮件发送的邮箱用户名', '系统邮件配置', '1', 'lyy');
INSERT INTO `sys_config` VALUES ('3', 'password', '密码', '邮件发送的邮箱密码', '系统邮件配置', '1', '111111');
INSERT INTO `sys_config` VALUES ('4', 'from', '来自', '发送人的邮箱或用户名', '系统邮件配置', '1', 'lyy');
INSERT INTO `sys_config` VALUES ('5', 'goodsStockUser', '用户帐号', '当库存产生警报时，接收消息的人员', '行政管理配置', '1', 'admin');

-- ----------------------------
-- Table structure for task_sign
-- ----------------------------
DROP TABLE IF EXISTS `task_sign`;
CREATE TABLE `task_sign` (
  `signId` bigint(20) NOT NULL,
  `assignId` bigint(20) NOT NULL,
  `voteCounts` int(11) DEFAULT NULL,
  `votePercents` int(11) DEFAULT NULL,
  `decideType` smallint(6) NOT NULL COMMENT '1=pass 通过 2=reject 拒绝',
  PRIMARY KEY (`signId`),
  KEY `FK_TS_R_PUA` (`assignId`) USING BTREE,
  CONSTRAINT `task_sign_ibfk_1` FOREIGN KEY (`assignId`) REFERENCES `pro_user_assign` (`assignId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_sign
-- ----------------------------

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `userId` bigint(20) NOT NULL COMMENT '主键',
  `roleId` bigint(20) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `FK_UR_R_AR` (`roleId`) USING BTREE,
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `app_role` (`roleId`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('-1', '-1');
INSERT INTO `user_role` VALUES ('1', '-1');
INSERT INTO `user_role` VALUES ('4', '8');

-- ----------------------------
-- Table structure for user_sub
-- ----------------------------
DROP TABLE IF EXISTS `user_sub`;
CREATE TABLE `user_sub` (
  `subId` bigint(20) NOT NULL AUTO_INCREMENT,
  `subUserId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY (`subId`),
  KEY `FK_USB_R_AU` (`subUserId`) USING BTREE,
  KEY `FK_US_R_AU` (`userId`) USING BTREE,
  CONSTRAINT `user_sub_ibfk_1` FOREIGN KEY (`subUserId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `user_sub_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='subordinate';

-- ----------------------------
-- Records of user_sub
-- ----------------------------
INSERT INTO `user_sub` VALUES ('1', '3', '1');
INSERT INTO `user_sub` VALUES ('2', '4', '1');
INSERT INTO `user_sub` VALUES ('3', '5', '1');

-- ----------------------------
-- Table structure for work_plan
-- ----------------------------
DROP TABLE IF EXISTS `work_plan`;
CREATE TABLE `work_plan` (
  `planId` bigint(20) NOT NULL AUTO_INCREMENT,
  `planName` varchar(128) NOT NULL COMMENT '计划名称',
  `planContent` varchar(5000) DEFAULT NULL COMMENT '计划内容',
  `startTime` datetime NOT NULL COMMENT '开始日期',
  `endTime` datetime NOT NULL COMMENT '结束日期',
  `typeId` bigint(20) NOT NULL COMMENT '计划类型',
  `userId` bigint(20) DEFAULT NULL COMMENT '员工ID',
  `issueScope` varchar(2000) DEFAULT NULL COMMENT '发布范围\r\n            0则代表全部部门\r\n            存放所有的参与部门ID\r\n            ',
  `participants` varchar(2000) DEFAULT NULL COMMENT '参与人\r\n            0则代表全部参与\r\n            参与人,即员工ID列表',
  `principal` varchar(256) NOT NULL COMMENT '负责人',
  `note` varchar(500) DEFAULT NULL COMMENT '备注',
  `status` smallint(6) NOT NULL COMMENT '状态\r\n            1=激活\r\n            0=禁用',
  `isPersonal` smallint(6) NOT NULL COMMENT '是否为个人计划\r\n            1=则为个人工作计划，这时发布范围，参与人均为空，负责人为当前用户\r\n            0=则代表为其他任务',
  `icon` varchar(128) DEFAULT NULL COMMENT '图标',
  PRIMARY KEY (`planId`),
  KEY `FK_WP_R_AU` (`userId`) USING BTREE,
  KEY `FK_WP_R_PT` (`typeId`) USING BTREE,
  CONSTRAINT `work_plan_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `work_plan_ibfk_2` FOREIGN KEY (`typeId`) REFERENCES `plan_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作计划';

-- ----------------------------
-- Records of work_plan
-- ----------------------------
