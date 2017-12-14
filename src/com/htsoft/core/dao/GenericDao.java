package com.htsoft.core.dao;

import java.io.Serializable;
import java.util.List;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.paging.PagingBean;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

/**
 * 
 * @author csx
 *
 */
public interface GenericDao<T,PK extends Serializable> {
	public T save(T entity);
	public T merge(T entity);
	public T get(PK id);
	public void remove(PK id);
	public void remove(T entity);
	public void evict(T entity);
	
	public List<T> getAll();
	public List<T> getAll(PagingBean pb);
	public List<T> getAll(QueryFilter filter);
	
	public List<T> findByHql( String hql, Object[]objs);
	public List<T> findByHql( String hql, Object[]objs,PagingBean pb );
	public List<T> findByHql( String hql, Object[]objs, int firstResult, int pageSize );
	
}
