package com.htsoft.oa.dao.communicate.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.communicate.MailDao;
import com.htsoft.oa.model.communicate.Mail;

public class MailDaoImpl extends BaseDaoImpl<Mail> implements MailDao{

	public MailDaoImpl() {
		super(Mail.class);
	}

}