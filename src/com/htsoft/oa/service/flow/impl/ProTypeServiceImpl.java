package com.htsoft.oa.service.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.flow.ProTypeDao;
import com.htsoft.oa.model.flow.ProType;
import com.htsoft.oa.service.flow.ProTypeService;

public class ProTypeServiceImpl extends BaseServiceImpl<ProType> implements ProTypeService{
	private ProTypeDao dao;
	
	public ProTypeServiceImpl(ProTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}