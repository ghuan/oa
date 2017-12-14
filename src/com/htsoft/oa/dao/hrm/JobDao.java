package com.htsoft.oa.dao.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.hrm.Job;

/**
 * 
 * @author 
 *
 */
public interface JobDao extends BaseDao<Job>{
	/**
	 * @author lyy
	 * @param depId
	 * 根据部门的ID来查找部门下面的职位
	 * @return
	 */
	public List<Job> findByDep(Long depId);
	
}