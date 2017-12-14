package com.htsoft.oa.service.personal.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.personal.DutySectionDao;
import com.htsoft.oa.model.personal.DutySection;
import com.htsoft.oa.service.personal.DutySectionService;

public class DutySectionServiceImpl extends BaseServiceImpl<DutySection> implements DutySectionService{
	private DutySectionDao dao;
	
	public DutySectionServiceImpl(DutySectionDao dao) {
		super(dao);
		this.dao=dao;
	}

}