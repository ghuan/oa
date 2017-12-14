package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.AppUtil;
import com.htsoft.oa.dao.admin.OfficeGoodsDao;
import com.htsoft.oa.dao.system.AppUserDao;
import com.htsoft.oa.model.admin.OfficeGoods;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.SysConfig;
import com.htsoft.oa.service.admin.OfficeGoodsService;
import com.htsoft.oa.service.info.ShortMessageService;

public class OfficeGoodsServiceImpl extends BaseServiceImpl<OfficeGoods> implements OfficeGoodsService{
	private static Log logger=LogFactory.getLog(OfficeGoodsServiceImpl.class);
	private OfficeGoodsDao dao;
	@Resource
	private AppUserDao appUserDao;
	@Resource
	private ShortMessageService shortMessageService;
	
	public OfficeGoodsServiceImpl(OfficeGoodsDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public void sendWarmMessage() {
		List<OfficeGoods> list=dao.findByWarm();
		if(list.size()>0){
			StringBuffer sb=new StringBuffer("办公用品：");
			for(OfficeGoods goods:list){
			   if(goods.getIsWarning()==1){
				 sb.append(goods.getGoodsName()+"已经低于警报库存量"+goods.getWarnCounts()+"了.");
			   }else{
				 sb.append(goods.getGoodsName()+"已经没有库存了.");
			   }
			}
			sb.append("请尽快购买相应的用品");
		Map map=AppUtil.getSysConfig();
		String username=(String)map.get("goodsStockUser");
		if(StringUtils.isNotEmpty(username)){
			AppUser user=appUserDao.findByUserName(username);
			if(user!=null){
				shortMessageService.save(AppUser.SYSTEM_USER,user.getUserId().toString(), sb.toString(),ShortMessage.MSG_TYPE_SYS);
			}else{
				logger.info("can not find the user in the system.");
			}
		}
		logger.info(sb.toString());
		}else{
			logger.info("没有产品要补仓.");
		}
	
	}

}