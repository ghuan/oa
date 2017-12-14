package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Map;
import java.util.Set;
import java.util.HashMap;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.AppRoleDao;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.service.system.AppRoleService;

public class AppRoleServiceImpl extends BaseServiceImpl<AppRole> implements AppRoleService{
	private AppRoleDao dao;
	
	public AppRoleServiceImpl(AppRoleDao dao) {
		super(dao);
		this.dao=dao;
	}
	
	public AppRole getByRoleName(String roleName){
		return dao.getByRoleName(roleName);
	}
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.service.system.AppRoleService#getSecurityDataSource()
	 */
	public HashMap<String,Set<String>>getSecurityDataSource(){
		return dao.getSecurityDataSource();
	}

}
