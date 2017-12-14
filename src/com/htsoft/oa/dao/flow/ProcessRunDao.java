package com.htsoft.oa.dao.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.flow.ProcessRun;

/**
 * 
 * @author 
 *
 */
public interface ProcessRunDao extends BaseDao<ProcessRun>{
	/**
	 * 
	 * @param piId
	 * @return
	 */
	public ProcessRun getByPiId(String piId);	
	/**
	 * 
	 * @param defId
	 * @param pb
	 * @return
	 */
	public List<ProcessRun> getByDefId(Long defId,PagingBean pb);
}