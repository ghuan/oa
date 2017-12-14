package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.DepreTypeDao;
import com.htsoft.oa.model.admin.DepreType;
import com.htsoft.oa.service.admin.DepreTypeService;

public class DepreTypeServiceImpl extends BaseServiceImpl<DepreType> implements DepreTypeService{
	private DepreTypeDao dao;
	
	public DepreTypeServiceImpl(DepreTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}