package com.htsoft.oa.dao.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import org.jbpm.pvm.internal.task.TaskImpl;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;

public interface TaskDao extends BaseDao<TaskImpl>{
	public List<TaskImpl> getTasksByUserId(String userId,PagingBean pb);
}
