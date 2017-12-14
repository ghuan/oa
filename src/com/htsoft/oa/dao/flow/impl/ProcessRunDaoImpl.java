package com.htsoft.oa.dao.flow.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.dao.flow.ProcessRunDao;
import com.htsoft.oa.model.flow.ProcessRun;

public class ProcessRunDaoImpl extends BaseDaoImpl<ProcessRun> implements ProcessRunDao{

	public ProcessRunDaoImpl() {
		super(ProcessRun.class);
	}
	/**
	 * get ProcessRun by PiId
	 * @param piId
	 * @return
	 */
	public ProcessRun getByPiId(String piId){
		String hql="from ProcessRun pr where pr.piId=?";
		return (ProcessRun)findUnique(hql, new Object[]{piId});
	}
	
	/**
	 * ProcessRun
	 * @param defId
	 * @param pb
	 * @return
	 */
	public List<ProcessRun> getByDefId(Long defId,PagingBean pb){
		String hql=" from ProcessRun pr where pr.proDefinition.defId=? ";
		return findByHql(hql, new Object[]{ defId }, pb);
	}
	
}