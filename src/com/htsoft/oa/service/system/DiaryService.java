package com.htsoft.oa.service.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.Diary;

public interface DiaryService extends BaseService<Diary>{
	
	public List<Diary> getAllBySn(PagingBean pb);
	/**
	 * 查找下属的所有工作日志
	 * @param userIds
	 * @param pb
	 * @return
	 */
	public List<Diary> getSubDiary(String userIds, PagingBean pb);
}


