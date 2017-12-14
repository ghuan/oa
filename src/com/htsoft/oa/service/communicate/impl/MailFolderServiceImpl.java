package com.htsoft.oa.service.communicate.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.communicate.MailFolderDao;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.document.DocFolder;
import com.htsoft.oa.service.communicate.MailFolderService;

public class MailFolderServiceImpl extends BaseServiceImpl<MailFolder> implements MailFolderService{
	private MailFolderDao dao;
	
	public MailFolderServiceImpl(MailFolderDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<MailFolder> getUserFolderByParentId(Long curUserId,Long parentId) {
		
		return dao.getUserFolderByParentId(curUserId, parentId);
	}

	@Override
	public List<MailFolder> getAllUserFolderByParentId(Long userId,
			Long parentId) {
		return dao.getAllUserFolderByParentId(userId,parentId);
	}

	@Override
	public List<MailFolder> getFolderLikePath(String path) {
		return dao.getFolderLikePath(path);
	}

	

}