package com.htsoft.oa.service.communicate;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.MailBox;

public interface MailBoxService extends BaseService<MailBox>{

	public Long CountByFolderId(Long folderId);
	
	public List<MailBox> findByFolderId(Long folderId);

	public List<MailBox> findBySearch(String searchContent, PagingBean pb);
}


