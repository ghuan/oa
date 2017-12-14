package com.htsoft.oa.service.archive.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchivesTypeDao;
import com.htsoft.oa.model.archive.ArchivesType;
import com.htsoft.oa.service.archive.ArchivesTypeService;

public class ArchivesTypeServiceImpl extends BaseServiceImpl<ArchivesType> implements ArchivesTypeService{
	private ArchivesTypeDao dao;
	
	public ArchivesTypeServiceImpl(ArchivesTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}