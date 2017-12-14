package com.htsoft.oa.dao.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.flow.ProTypeDao;
import com.htsoft.oa.model.flow.ProType;

public class ProTypeDaoImpl extends BaseDaoImpl<ProType> implements ProTypeDao{

	public ProTypeDaoImpl() {
		super(ProType.class);
	}

}