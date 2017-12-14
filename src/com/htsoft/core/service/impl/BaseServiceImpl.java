package com.htsoft.core.service.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.GenericDao;
import com.htsoft.core.service.BaseService;

public class BaseServiceImpl<T> extends GenericServiceImpl<T, Long> implements BaseService<T>{

	public BaseServiceImpl(GenericDao dao) {
		super(dao);
	}
	
}
