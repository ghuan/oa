package com.htsoft.oa.dao.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.info.NewsCommentDao;
import com.htsoft.oa.model.info.NewsComment;

public class NewsCommentDaoImpl extends BaseDaoImpl<NewsComment> implements NewsCommentDao{

	public NewsCommentDaoImpl() {
		super(NewsComment.class);
	}

}