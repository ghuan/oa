package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Diary;

/**
 * 
 * @author 
 *
 */
public interface DiaryDao extends BaseDao<Diary>{
	//public List<Diary> getAllBySn(PagingBean pb);
	/**
	 * 查找所有下属的工作日志
	 */
	public List<Diary> getSubDiary(String userIds,PagingBean pb);
}