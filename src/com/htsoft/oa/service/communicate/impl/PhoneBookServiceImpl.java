package com.htsoft.oa.service.communicate.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.communicate.PhoneBookDao;
import com.htsoft.oa.model.communicate.PhoneBook;
import com.htsoft.oa.service.communicate.PhoneBookService;

public class PhoneBookServiceImpl extends BaseServiceImpl<PhoneBook> implements PhoneBookService{
	private PhoneBookDao dao;
	
	public PhoneBookServiceImpl(PhoneBookDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<PhoneBook> sharedPhoneBooks(String fullname, String ownerName,
			PagingBean pb) {
		return dao.sharedPhoneBooks(fullname, ownerName, pb);
	}

}