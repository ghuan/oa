package com.htsoft.oa.service.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.InMessage;
import com.htsoft.oa.model.info.ShortMessage;
import com.htsoft.oa.model.system.AppUser;

public interface InMessageService extends BaseService<InMessage> {

	/**
	 * 读出最新的一条未读信息
	 */
	public InMessage findByRead(Long userId);
	public Integer findByReadFlag(Long userId);
	public List<InMessage> findAll(Long userId,PagingBean pb);
	public List findByUser(Long userId,PagingBean pb);
	public List searchInMessage(Long userId,InMessage inMessage,ShortMessage shortMessage,Date from,Date to,PagingBean pb);

}
