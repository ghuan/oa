package com.htsoft.oa.service.info.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.info.NoticeDao;
import com.htsoft.oa.model.info.Notice;
import com.htsoft.oa.service.info.NoticeService;

/**
 * @author 谢宏溪
 *
 */
public class NoticeServiceImpl extends BaseServiceImpl<Notice> implements
		NoticeService {
	private NoticeDao noticeDao;
	
	public NoticeServiceImpl(NoticeDao noticeDao) {
		super(noticeDao);
		this.noticeDao = noticeDao;
	}

	@Override
	public List<Notice> findByNoticeId(Long noticeId, PagingBean pb) {
		return noticeDao.findByNoticeId(noticeId, pb);
	}

	@Override
	public List<Notice> findBySearch(Notice notice, Date from, Date to,
			PagingBean pb) {
		return noticeDao.findBySearch(notice, from, to, pb);
	}

	@Override
	public List<Notice> findBySearch(String searchContent, PagingBean pb) {
		return noticeDao.findBySearch(searchContent,pb);
	}
	
}
