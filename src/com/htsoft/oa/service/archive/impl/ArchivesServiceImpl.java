package com.htsoft.oa.service.archive.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchivesDao;
import com.htsoft.oa.model.archive.Archives;
import com.htsoft.oa.service.archive.ArchivesService;

public class ArchivesServiceImpl extends BaseServiceImpl<Archives> implements ArchivesService{
	private ArchivesDao dao;
	
	public ArchivesServiceImpl(ArchivesDao dao) {
		super(dao);
		this.dao=dao;
	}

}