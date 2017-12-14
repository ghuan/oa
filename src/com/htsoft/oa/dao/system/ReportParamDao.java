package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.ReportParam;

/**
 * 
 * @author 
 *
 */
public interface ReportParamDao extends BaseDao<ReportParam>{
	/**
	 * 根据ID来查找参数
	 * @param reportId
	 * @return
	 */
	public List<ReportParam> findByRepTemp(Long reportId);
}