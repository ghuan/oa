package com.htsoft.oa.service.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NewsTypeDao;
import com.htsoft.oa.model.info.NewsType;
import com.htsoft.oa.service.info.NewsTypeService;


public class NewsTypeServiceImpl extends BaseServiceImpl<NewsType> implements NewsTypeService{
	private NewsTypeDao newsTypeDao;
	
	public NewsTypeServiceImpl(NewsTypeDao dao) {
		super(dao);
		this.newsTypeDao=dao;
	}

	@Override
	public Short getTop() {
		return newsTypeDao.getTop();
	}

	@Override
	public NewsType findBySn(Short sn) {
		return newsTypeDao.findBySn(sn);
	}

	@Override
	public List<NewsType> getAllBySn() {
		return newsTypeDao.getAllBySn();
	}

	@Override
	public List<NewsType> getAllBySn(PagingBean pb) {
		return newsTypeDao.getAllBySn(pb);
	}

	@Override
	public List<NewsType> findBySearch(NewsType newsType, PagingBean pb) {
		return newsTypeDao.findBySearch(newsType, pb);
	}
	
}
