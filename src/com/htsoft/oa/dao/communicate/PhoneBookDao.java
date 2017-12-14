package com.htsoft.oa.dao.communicate;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.communicate.PhoneBook;

/**
 * 
 * @author 
 *
 */
public interface PhoneBookDao extends BaseDao<PhoneBook>{
	public List<PhoneBook> sharedPhoneBooks(String fullname,String ownerName,PagingBean pb); 
}