package com.htsoft.oa.dao.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.ShortMessage;

public interface ShortMessageDao extends BaseDao<ShortMessage> {

//	public ShortMessage findByRead(AppUser user);
	public List<ShortMessage> findAll(Long userId,PagingBean pb);
	public List<ShortMessage> findByUser(Long userId);
	public List searchShortMessage(Long userId,ShortMessage shortMessage,Date from,Date to,PagingBean pb);
}
