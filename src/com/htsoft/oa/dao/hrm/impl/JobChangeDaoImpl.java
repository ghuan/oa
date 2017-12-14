package com.htsoft.oa.dao.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.JobChangeDao;
import com.htsoft.oa.model.hrm.JobChange;

public class JobChangeDaoImpl extends BaseDaoImpl<JobChange> implements JobChangeDao{

	public JobChangeDaoImpl() {
		super(JobChange.class);
	}

}