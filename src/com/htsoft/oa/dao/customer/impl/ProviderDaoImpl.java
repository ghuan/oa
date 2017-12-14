package com.htsoft.oa.dao.customer.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.customer.ProviderDao;
import com.htsoft.oa.model.customer.Provider;

public class ProviderDaoImpl extends BaseDaoImpl<Provider> implements ProviderDao{

	public ProviderDaoImpl() {
		super(Provider.class);
	}

}