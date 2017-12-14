package com.htsoft.oa.service.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.info.NewsCommentDao;
import com.htsoft.oa.model.info.NewsComment;
import com.htsoft.oa.service.info.NewsCommentService;

public class NewsCommentServiceImpl extends BaseServiceImpl<NewsComment> implements NewsCommentService{
	private NewsCommentDao dao;
	
	public NewsCommentServiceImpl(NewsCommentDao dao) {
		super(dao);
		this.dao=dao;
	}

}