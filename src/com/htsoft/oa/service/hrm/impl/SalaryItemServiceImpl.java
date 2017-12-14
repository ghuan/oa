package com.htsoft.oa.service.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.hrm.SalaryItemDao;
import com.htsoft.oa.model.hrm.SalaryItem;
import com.htsoft.oa.service.hrm.SalaryItemService;

public class SalaryItemServiceImpl extends BaseServiceImpl<SalaryItem> implements SalaryItemService{
	private SalaryItemDao dao;
	
	public SalaryItemServiceImpl(SalaryItemDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<SalaryItem> getAllExcludeId(String excludeIds,PagingBean pb) {
		return dao.getAllExcludeId(excludeIds,pb);
	}

}