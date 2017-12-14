package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.system.DiaryDao;
import com.htsoft.oa.model.system.Diary;

public class DiaryDaoImpl extends BaseDaoImpl<Diary> implements DiaryDao{

	public DiaryDaoImpl() {
		super(Diary.class);
	}

	@Override
	public List<Diary> getSubDiary(String userIds, PagingBean pb) {
		String hql="from Diary vo where vo.appUser.userId in ("+userIds+") and vo.diaryType=1";
		return findByHql(hql,null, pb);
	}


//	@Override
//	public List<Diary> getAllBySn(PagingBean pb) {
//		final String hql = "from Diary dy order by dy.dayTime";
//		return findByHql(hql,null,pb);
//	}
}