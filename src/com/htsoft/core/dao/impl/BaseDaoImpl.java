package com.htsoft.core.dao.impl;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.BaseDao;

/**
 * 
 * @author csx
 *
 * @param <T> 基础表类，对于主键为long类型　，则直接继承该类，若主键为其他类型，
 * 需要直接继承GenericDaoImpl
 */
public class BaseDaoImpl<T> extends GenericDaoImpl<T, Long> implements BaseDao<T>{

	public BaseDaoImpl(Class persistType) {
		super(persistType);
	}
	
}
