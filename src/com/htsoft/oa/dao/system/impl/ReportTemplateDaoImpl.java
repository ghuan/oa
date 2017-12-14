package com.htsoft.oa.dao.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.impl.BaseDaoImpl;
import com.htsoft.oa.dao.system.ReportTemplateDao;
import com.htsoft.oa.model.system.ReportTemplate;

public class ReportTemplateDaoImpl extends BaseDaoImpl<ReportTemplate> implements ReportTemplateDao{

	public ReportTemplateDaoImpl() {
		super(ReportTemplate.class);
	}

}