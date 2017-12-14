package com.htsoft.oa.service.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.admin.BookBorRet;

public interface BookBorRetService extends BaseService<BookBorRet>{
	public BookBorRet getByBookSnId(Long bookSnId);
	//根据图书状态得到已借出图书列表
	public List getBorrowInfo(PagingBean pb);
	//根据图书状态得到已归还图书列表
	public List getReturnInfo(PagingBean pb);
	/**
	 * 根据SN来查找记录ID
	 * @param snId
	 * @return
	 */
	public Long getBookBorRetId(Long snId);
}


