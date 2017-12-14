package com.htsoft.oa.service.hrm.impl;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.hrm.EmpProfileDao;
import com.htsoft.oa.model.hrm.EmpProfile;
import com.htsoft.oa.service.hrm.EmpProfileService;

public class EmpProfileServiceImpl extends BaseServiceImpl<EmpProfile> implements EmpProfileService{
	private EmpProfileDao dao;
	
	public EmpProfileServiceImpl(EmpProfileDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public boolean checkProfileNo(String profileNo) {
		return dao.checkProfileNo(profileNo);
	}

}