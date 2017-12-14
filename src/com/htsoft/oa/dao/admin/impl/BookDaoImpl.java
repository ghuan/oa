package com.htsoft.oa.dao.admin.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.admin.BookDao;
import com.htsoft.oa.model.admin.Book;

public class BookDaoImpl extends BaseDaoImpl<Book> implements BookDao{

	public BookDaoImpl() {
		super(Book.class);
	}

	@Override
	public List<Book> findByTypeId(final Long typeId, final PagingBean pb) {
		final String hql = "from Book b where b.bookType.typeId=?";
		Object[] params ={typeId};
		return findByHql(hql, params, pb);
	}

}