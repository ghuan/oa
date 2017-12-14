package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Department;

public interface DepartmentDao extends BaseDao<Department> {

	public List<Department> findByParentId(Long parentId);
	public List<Department> findByVo(Department department,PagingBean pb);
	public List<Department> findByDepName(String depName);
	public List<Department> findByPath(String path);
}
