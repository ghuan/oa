package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.admin.AssetsTypeDao;
import com.htsoft.oa.model.admin.AssetsType;
import com.htsoft.oa.service.admin.AssetsTypeService;

public class AssetsTypeServiceImpl extends BaseServiceImpl<AssetsType> implements AssetsTypeService{
	private AssetsTypeDao dao;
	
	public AssetsTypeServiceImpl(AssetsTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}