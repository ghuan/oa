package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.SysConfig;

/**
 * 
 * @author 
 *
 */
public interface SysConfigDao extends BaseDao<SysConfig>{
	
	public SysConfig findByKey(String key);
	
	public List<SysConfig> findConfigByTypeName(String typeName);
	
	public List findTypeNames();
	
}