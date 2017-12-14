package com.htsoft.oa.dao.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import com.htsoft.core.Constants;
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NewsDao;
import com.htsoft.oa.model.info.News;

public class NewsDaoImpl extends BaseDaoImpl<News> implements NewsDao{
	
	public NewsDaoImpl() {
		super(News.class);
	}

	@Override
	public List<News> findByTypeId(final Long typeId,final PagingBean pb) {
		final String hql = "from News n where n.newsType.typeId=?";
		Object[] params ={typeId};
		return findByHql(hql, params, pb);
	}

	@Override
	public List<News> findBySearch(String searchContent,PagingBean pb) {
		ArrayList params=new ArrayList();
		StringBuffer hql = new StringBuffer("from News n where n.status = ?");
		params.add(Constants.FLAG_ACTIVATION);	
		if(StringUtils.isNotEmpty(searchContent)){
			hql.append(" and (n.subject like ? or n.content like ?)");
			params.add("%"+searchContent+"%");
			params.add("%"+searchContent+"%");
		}
		return findByHql(hql.toString(),params.toArray(), pb);
	}

	
}
