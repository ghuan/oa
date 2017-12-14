package com.htsoft.oa.dao.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.hrm.EmpProfile;

/**
 * 
 * @author 
 *
 */
public interface EmpProfileDao extends BaseDao<EmpProfile>{

	public boolean checkProfileNo(String profileNo);
	
}