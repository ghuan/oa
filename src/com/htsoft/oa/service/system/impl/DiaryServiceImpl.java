package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.DiaryDao;
import com.htsoft.oa.model.system.Diary;
import com.htsoft.oa.service.system.DiaryService;

public class DiaryServiceImpl extends BaseServiceImpl<Diary> implements DiaryService{
	private DiaryDao dao;
	
	public DiaryServiceImpl(DiaryDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<Diary> getAllBySn(PagingBean pb) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Diary> getSubDiary(String userIds, PagingBean pb) {
		// TODO Auto-generated method stub
		return dao.getSubDiary(userIds, pb);
	}



}