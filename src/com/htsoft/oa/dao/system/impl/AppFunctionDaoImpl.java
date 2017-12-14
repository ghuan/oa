package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.AppFunctionDao;
import com.htsoft.oa.model.system.AppFunction;

public class AppFunctionDaoImpl extends BaseDaoImpl<AppFunction> implements AppFunctionDao{

	public AppFunctionDaoImpl() {
		super(AppFunction.class);
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.system.AppFunctionDao#getByKey(java.lang.String)
	 */
	public AppFunction getByKey(String key){
		String hql="from AppFunction af where af.funKey=?";
		return (AppFunction)findUnique(hql, new String[]{key});
	}

}