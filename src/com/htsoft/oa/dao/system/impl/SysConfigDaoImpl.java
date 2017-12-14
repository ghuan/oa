package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import org.hibernate.Query;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.SysConfigDao;
import com.htsoft.oa.model.system.SysConfig;

public class SysConfigDaoImpl extends BaseDaoImpl<SysConfig> implements SysConfigDao{

	public SysConfigDaoImpl() {
		super(SysConfig.class);
	}

	@Override
	public SysConfig findByKey(String key) {
		String hql="from SysConfig vo where vo.configKey=?";
		Object[] objs={key};
		List<SysConfig> list=findByHql(hql, objs);
		return (SysConfig)list.get(0);
	}

	@Override
	public List<SysConfig> findConfigByTypeName(String typeName) {
		String hql="from SysConfig vo where vo.typeName=?";
		Object[] objs={typeName};
		return findByHql(hql, objs);
	}

	@Override
	public List findTypeNames() {
		String sql="select vo.typeName from SysConfig vo group by vo.typeName";
		Query query=getSession().createQuery(sql);
		return query.list();
	}

}