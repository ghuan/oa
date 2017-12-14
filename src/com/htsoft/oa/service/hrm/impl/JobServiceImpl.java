package com.htsoft.oa.service.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.JobDao;
import com.htsoft.oa.model.hrm.Job;
import com.htsoft.oa.service.hrm.JobService;

public class JobServiceImpl extends BaseServiceImpl<Job> implements JobService{
	private JobDao dao;
	
	public JobServiceImpl(JobDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Job> findByDep(Long depId) {
		return dao.findByDep(depId);
	}

}