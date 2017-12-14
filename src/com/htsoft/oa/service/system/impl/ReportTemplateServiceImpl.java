package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.oa.dao.system.ReportTemplateDao;
import com.htsoft.oa.model.system.ReportTemplate;
import com.htsoft.oa.service.system.ReportTemplateService;

public class ReportTemplateServiceImpl extends BaseServiceImpl<ReportTemplate> implements ReportTemplateService{
	private ReportTemplateDao dao;
	
	public ReportTemplateServiceImpl(ReportTemplateDao dao) {
		super(dao);
		this.dao=dao;
	}

}