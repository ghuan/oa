package com.htsoft.oa.service.personal.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.personal.ErrandsRegisterDao;
import com.htsoft.oa.model.personal.ErrandsRegister;
import com.htsoft.oa.service.personal.ErrandsRegisterService;

public class ErrandsRegisterServiceImpl extends BaseServiceImpl<ErrandsRegister> implements ErrandsRegisterService{
	private ErrandsRegisterDao dao;
	
	public ErrandsRegisterServiceImpl(ErrandsRegisterDao dao) {
		super(dao);
		this.dao=dao;
	}

}