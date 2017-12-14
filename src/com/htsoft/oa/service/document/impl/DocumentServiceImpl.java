package com.htsoft.oa.service.document.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.document.DocPrivilegeDao;
import com.htsoft.oa.dao.document.DocumentDao;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.document.DocumentService;

public class DocumentServiceImpl extends BaseServiceImpl<Document> implements DocumentService{
	private DocumentDao dao;
	@Resource
	private DocPrivilegeDao docPrivilegeDao;
	
	public DocumentServiceImpl(DocumentDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Document> findByIsShared(Document document, Date from, Date to,
			Long userId, ArrayList<Long> roleIds, Long depId, PagingBean pb) {
		return dao.findByIsShared(document, from, to, userId, roleIds, depId, pb);
	}

	@Override
	public List<Document> findByPublic(String path,Document document,Date from,Date to,AppUser appUser, PagingBean pb) {
		return dao.findByPublic(path,document, from, to, appUser, pb);
	}

	@Override
	public List<Document> findByPersonal(Long userId, Document document,
			Date from, Date to, String path, PagingBean pb) {
		return dao.findByPersonal(userId, document, from, to, path, pb);
	}

	@Override
	public List<Document> findByFolder(String path) {
		return dao.findByFolder(path);
	}

	@Override
	public List<Document> searchDocument(AppUser appUser, String content,
			PagingBean pb) {
			boolean isHaveData=false;
			Integer count=docPrivilegeDao.countPrivilege();
			if(count>0){
				isHaveData=true;
			}
			return dao.searchDocument(appUser, content,isHaveData, pb);
		}

	


}