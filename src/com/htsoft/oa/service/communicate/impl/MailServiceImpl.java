package com.htsoft.oa.service.communicate.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.MailDao;
import com.htsoft.oa.model.communicate.Mail;
import com.htsoft.oa.service.communicate.MailService;

public class MailServiceImpl extends BaseServiceImpl<Mail> implements MailService{
	private MailDao dao;
	
	public MailServiceImpl(MailDao dao) {
		super(dao);
		this.dao=dao;
	}

}