package com.htsoft.oa.dao.task.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.task.PlanTypeDao;
import com.htsoft.oa.model.task.PlanType;

public class PlanTypeDaoImpl extends BaseDaoImpl<PlanType> implements PlanTypeDao{

	public PlanTypeDaoImpl() {
		super(PlanType.class);
	}

}