package com.htsoft.oa.service.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;

import com.htsoft.oa.dao.admin.BookTypeDao;
import com.htsoft.oa.model.admin.BookType;
import com.htsoft.oa.service.admin.BookTypeService;

public class BookTypeServiceImpl extends BaseServiceImpl<BookType> implements BookTypeService{
	private BookTypeDao dao;
	
	public BookTypeServiceImpl(BookTypeDao dao) {
		super(dao);
		this.dao=dao;
	}

}