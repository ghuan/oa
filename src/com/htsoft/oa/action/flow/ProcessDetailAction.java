package com.htsoft.oa.action.flow;

/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import javax.annotation.Resource;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.service.flow.ProDefinitionService;
/**
 * 流程明细
 * @author csx
 *
 */
public class ProcessDetailAction extends BaseAction {
	@Resource
	private ProDefinitionService proDefinitionService;
	
	private ProDefinition proDefinition;

	public ProDefinition getProDefinition() {
		return proDefinition;
	}

	public void setProDefinition(ProDefinition proDefinition) {
		this.proDefinition = proDefinition;
	}

	@Override
	public String execute() throws Exception {
		String defId=getRequest().getParameter("defId");
		proDefinition=proDefinitionService.get(new Long(defId));
		return SUCCESS;
	}
}
