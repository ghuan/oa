package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.GoodsApplyDao;
import com.htsoft.oa.model.admin.GoodsApply;
import com.htsoft.oa.service.admin.GoodsApplyService;

public class GoodsApplyServiceImpl extends BaseServiceImpl<GoodsApply> implements GoodsApplyService{
	private GoodsApplyDao dao;
	
	public GoodsApplyServiceImpl(GoodsApplyDao dao) {
		super(dao);
		this.dao=dao;
	}

}