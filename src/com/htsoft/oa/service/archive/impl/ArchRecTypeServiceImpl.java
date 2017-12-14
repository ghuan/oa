package com.htsoft.oa.service.archive.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.archive.ArchRecTypeDao;
import com.htsoft.oa.model.archive.ArchRecType;
import com.htsoft.oa.service.archive.ArchRecTypeService;

public class ArchRecTypeServiceImpl extends BaseServiceImpl<ArchRecType> implements ArchRecTypeService{
	private ArchRecTypeDao dao;
	
	public ArchRecTypeServiceImpl(ArchRecTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}