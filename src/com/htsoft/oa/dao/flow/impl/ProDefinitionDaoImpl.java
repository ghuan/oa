package com.htsoft.oa.dao.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProDefinitionDao;
import com.htsoft.oa.model.flow.ProDefinition;

public class ProDefinitionDaoImpl extends BaseDaoImpl<ProDefinition> implements ProDefinitionDao{

	public ProDefinitionDaoImpl() {
		super(ProDefinition.class);
	}
	
	public ProDefinition getByDeployId(String deployId){
		String hql="from ProDefinition pd where pd.deployId=?";
		return (ProDefinition)findUnique(hql, new Object[]{deployId});
	}
	
}