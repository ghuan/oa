package com.htsoft.oa.dao.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.JobDao;
import com.htsoft.oa.model.hrm.Job;

public class JobDaoImpl extends BaseDaoImpl<Job> implements JobDao{

	public JobDaoImpl() {
		super(Job.class);
	}

	@Override
	public List<Job> findByDep(Long depId) {
		String hql="from Job vo where vo.department.depId=?";
		Object[] objs={depId};
		return findByHql(hql, objs);
	}

}