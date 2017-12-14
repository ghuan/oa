package com.htsoft.oa.dao.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.StandSalaryItemDao;
import com.htsoft.oa.model.hrm.StandSalaryItem;

public class StandSalaryItemDaoImpl extends BaseDaoImpl<StandSalaryItem> implements StandSalaryItemDao{

	public StandSalaryItemDaoImpl() {
		super(StandSalaryItem.class);
	}

	@Override
	public List<StandSalaryItem> getAllByStandardId(Long standardId) {
		String hql = "from StandSalaryItem ssi where ssi.standSalary.standardId=?";
		return findByHql(hql, new Object[]{standardId});
	}

}