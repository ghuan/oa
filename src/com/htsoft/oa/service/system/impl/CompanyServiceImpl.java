package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.CompanyDao;

import com.htsoft.oa.model.system.Company;
import com.htsoft.oa.service.system.CompanyService;

public  class CompanyServiceImpl extends BaseServiceImpl<Company> implements
		CompanyService {
	
	private CompanyDao companyDao;
	
	public CompanyServiceImpl(CompanyDao companyDao) {
		super(companyDao);
		this.companyDao=companyDao;
	}

	@Override
	public List<Company> findCompany() {
		
		return companyDao.findCompany();
	}

	@Override
	public List<Company> findByHql(String hql) {
		// TODO Auto-generated method stub
		return null;
	}


}
