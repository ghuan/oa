package com.htsoft.core.service;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.Serializable;
import java.util.List;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.paging.PagingBean;
/**
 * 
 * @author csx
 *
 * @param <T>
 * @param <PK>
 */
public interface GenericService<T,PK extends Serializable> {
	/**
	 * 
	 * @param entity
	 * @return
	 */
	public T save(T entity);
	/**
	 * merge the object
	 * @param entity
	 * @return
	 */
	public T merge(T entity);
	
	/**
	 * evict the object
	 * @param entity
	 */
	public void evict(T entity);
	/**
	 * 
	 * @param id
	 * @return
	 */
	public T get(PK id);
	
	/**
	 * 
	 * @return
	 */
	public List<T> getAll();
	
	/**
	 * 
	 * @param pb
	 * @return
	 */
	public List<T> getAll(PagingBean pb);
	
	/**
	 * 
	 * @param filter
	 * @return
	 */
	public List<T> getAll(QueryFilter filter);
	
	
	public void remove(PK id);
	
	
	public void remove(T entity);

	
}
