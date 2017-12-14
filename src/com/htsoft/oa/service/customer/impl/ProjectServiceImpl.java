package com.htsoft.oa.service.customer.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.customer.ProjectDao;
import com.htsoft.oa.model.customer.Project;
import com.htsoft.oa.service.customer.ProjectService;

public class ProjectServiceImpl extends BaseServiceImpl<Project> implements ProjectService{
	private ProjectDao dao;
	
	public ProjectServiceImpl(ProjectDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkProjectNo(String projectNo) {
		return dao.checkProjectNo(projectNo);
	}

}