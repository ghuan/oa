package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.AppFunction;

/**
 * 
 * @author 
 *
 */
public interface AppFunctionDao extends BaseDao<AppFunction>{
	/**
	 * 按Key 取得Function的值
	 * @param key
	 * @return
	 */
	public AppFunction getByKey(String key);
}