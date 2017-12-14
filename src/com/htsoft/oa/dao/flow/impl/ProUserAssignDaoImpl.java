package com.htsoft.oa.dao.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProUserAssignDao;
import com.htsoft.oa.model.flow.ProUserAssign;

public class ProUserAssignDaoImpl extends BaseDaoImpl<ProUserAssign> implements ProUserAssignDao{

	public ProUserAssignDaoImpl() {
		super(ProUserAssign.class);
	}
	
	public List<ProUserAssign> getByDeployId(String deployId){
		String hql="from ProUserAssign pua where pua.deployId=?";
		return findByHql(hql, new Object[]{deployId});
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.htsoft.oa.dao.flow.ProUserAssignDao#getByDeployIdActivityName(java.lang.String, java.lang.String)
	 */
	public ProUserAssign getByDeployIdActivityName(String deployId,String activityName){
		String hql="from ProUserAssign pua where pua.deployId=? and pua.activityName=?";
		return (ProUserAssign)findUnique(hql, new Object[]{deployId,activityName});
	}

}