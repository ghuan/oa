package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.CarApplyDao;
import com.htsoft.oa.model.admin.CarApply;
import com.htsoft.oa.service.admin.CarApplyService;

public class CarApplyServiceImpl extends BaseServiceImpl<CarApply> implements CarApplyService{
	private CarApplyDao dao;
	
	public CarApplyServiceImpl(CarApplyDao dao) {
		super(dao);
		this.dao=dao;
	}

}