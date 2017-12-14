package com.htsoft.oa.dao.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.hrm.ResumeDao;
import com.htsoft.oa.model.hrm.Resume;

public class ResumeDaoImpl extends BaseDaoImpl<Resume> implements ResumeDao{

	public ResumeDaoImpl() {
		super(Resume.class);
	}

}