package com.htsoft.oa.service.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;
import java.util.Set;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;


public interface AppUserService extends BaseService<AppUser>{
	
	public AppUser findByUserName(String username);
	public List findByDepartment(String path,PagingBean pb);
	public List findByRole(Long roleId,PagingBean pb);
	public List findByRoleId(Long roleId);
	/**
	 * 根据部门查找不是上属的用户
	 */
	public List<AppUser> findSubAppUser(String path,Set<Long> userIds,PagingBean pb);
	/**
	 * 根据角色查找不是上属的用户
	 */
	public List<AppUser> findSubAppUserByRole(Long roleId,Set<Long> userIds,PagingBean pb);

}
