package com.htsoft.oa.dao.customer;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.customer.Project;

/**
 * 
 * @author 
 *
 */
public interface ProjectDao extends BaseDao<Project>{

	public boolean checkProjectNo(String projectNo);
	
}