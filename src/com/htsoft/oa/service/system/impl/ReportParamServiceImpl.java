package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.ReportParamDao;
import com.htsoft.oa.model.system.ReportParam;
import com.htsoft.oa.service.system.ReportParamService;

public class ReportParamServiceImpl extends BaseServiceImpl<ReportParam> implements ReportParamService{
	private ReportParamDao dao;
	
	public ReportParamServiceImpl(ReportParamDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public List<ReportParam> findByRepTemp(Long reportId) {
		return dao.findByRepTemp(reportId);
	}

}