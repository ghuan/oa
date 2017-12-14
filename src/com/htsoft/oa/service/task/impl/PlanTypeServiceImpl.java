package com.htsoft.oa.service.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.task.PlanTypeDao;
import com.htsoft.oa.model.task.PlanType;
import com.htsoft.oa.service.task.PlanTypeService;

public class PlanTypeServiceImpl extends BaseServiceImpl<PlanType> implements PlanTypeService{
	private PlanTypeDao dao;
	
	public PlanTypeServiceImpl(PlanTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}