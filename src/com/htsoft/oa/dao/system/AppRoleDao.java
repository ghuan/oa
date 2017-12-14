package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.HashMap;
import java.util.Set;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.AppRole;

/**
 * 用户
 * @author 
 *
 */
public interface AppRoleDao extends BaseDao<AppRole>{
	public AppRole getByRoleName(String roleName);
	
	/**
	 * 获取安全认证的数据源
	 * @return
	 */
	public HashMap<String,Set<String>>getSecurityDataSource();
}
