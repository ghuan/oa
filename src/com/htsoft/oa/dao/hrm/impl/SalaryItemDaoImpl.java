package com.htsoft.oa.dao.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.util.StringUtil;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.hrm.SalaryItemDao;
import com.htsoft.oa.model.hrm.SalaryItem;

public class SalaryItemDaoImpl extends BaseDaoImpl<SalaryItem> implements SalaryItemDao{

	public SalaryItemDaoImpl() {
		super(SalaryItem.class);
	}

	@Override
	public List<SalaryItem> getAllExcludeId(String excludeIds,PagingBean pb) {
		String hql = "from SalaryItem ";
		if(StringUtils.isNotEmpty(excludeIds)){
			hql += "where salaryItemId not in("+excludeIds+")";
		}
		return findByHql(hql,null, pb);
	}

}