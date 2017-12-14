package com.htsoft.oa.dao.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NewsTypeDao;
import com.htsoft.oa.model.info.NewsType;

public class NewsTypeDaoImpl extends BaseDaoImpl<NewsType> implements NewsTypeDao{
	
	public NewsTypeDaoImpl() {
		super(NewsType.class);
	}

	/**
	 * 得到新闻类别顺序的最大值
	 */
	@Override
	public Short getTop() {
		final String hql = "select max(sn) from NewsType";
		List list =findByHql(hql);
		return (Short)list.get(0);
	}

	/**
	 * 按顺序查找出所有新闻类别,类别树中用到
	 */
	public List<NewsType> getAllBySn(){
		final String hql = "from NewsType nt order by nt.sn asc";
		return findByHql(hql);
	}
	/**
	 * 按顺序查找出所有新闻类别,类别管理中用到
	 */
	@Override
	public List<NewsType> getAllBySn(PagingBean pb) {
		final String hql = "from NewsType nt order by nt.sn asc";
		return findByHql(hql,null,pb);
	}
	/**
	 * 按新闻类别的顺序查找
	 */
	@Override
	public NewsType findBySn(final Short sn) {
		final String hql = "from NewsType nt where nt.sn=?";
		Object[] objs = {sn};
		List<NewsType> list = findByHql(hql, objs);
		return (NewsType)list.get(0);
	}
	/**
	 * 按条件查询出新闻
	 */
	@Override
	public List<NewsType> findBySearch(NewsType newsType, PagingBean pb) {
		StringBuffer hql = new StringBuffer("from NewsType nt where 1=1 ");
		List params = new ArrayList();
		if(newsType!=null){
			if(!"".equals(newsType.getTypeName())&&newsType.getTypeName()!=null){
				hql.append("and nt.typeName like ?");
				params.add("%"+newsType.getTypeName()+"%");
			}
			if(newsType.getSn()!=null&&newsType.getSn()>0){
				hql.append("and nt.sn = ?");
				params.add(newsType.getSn());
			}
		}
		hql.append("order by nt.sn asc");
		return findByHql(hql.toString(), params.toArray(), pb);
	}


	
	
}
