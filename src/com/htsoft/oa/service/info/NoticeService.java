package com.htsoft.oa.service.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.Notice;

public interface NoticeService extends BaseService<Notice> {
	public List<Notice> findByNoticeId(Long noticeId,PagingBean pb);
	public List<Notice> findBySearch(Notice notice,Date from,Date to,PagingBean pb);
	public List<Notice> findBySearch(String searchContent, PagingBean pb);
}
