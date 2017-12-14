package com.htsoft.oa.service.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NewsDao;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.service.info.NewsService;

public class NewsServiceImpl extends BaseServiceImpl<News> implements NewsService{
	private NewsDao newsDao;
	
	public NewsServiceImpl(NewsDao dao) {
		super(dao);
		this.newsDao=dao;
	}

	@Override
	public List<News> findByTypeId(Long typeId,PagingBean pb) {
		return newsDao.findByTypeId(typeId,pb);
	}

	@Override
	public List<News> findBySearch(String searchContent,PagingBean pb) {
		return newsDao.findBySearch(searchContent,pb);
	}


}
