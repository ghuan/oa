package com.htsoft.oa.service.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.JobChangeDao;
import com.htsoft.oa.model.hrm.JobChange;
import com.htsoft.oa.service.hrm.JobChangeService;

public class JobChangeServiceImpl extends BaseServiceImpl<JobChange> implements JobChangeService{
	private JobChangeDao dao;
	
	public JobChangeServiceImpl(JobChangeDao dao) {
		super(dao);
		this.dao=dao;
	}

}