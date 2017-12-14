package com.htsoft.oa.service.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.ResumeDao;
import com.htsoft.oa.model.hrm.Resume;
import com.htsoft.oa.service.hrm.ResumeService;

public class ResumeServiceImpl extends BaseServiceImpl<Resume> implements ResumeService{
	private ResumeDao dao;
	
	public ResumeServiceImpl(ResumeDao dao) {
		super(dao);
		this.dao=dao;
	}

}