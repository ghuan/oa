package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.util.List;

import javax.annotation.Resource;

import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.service.flow.ProcessFormService;
import com.htsoft.oa.service.flow.ProcessRunService;

/**
 * 显示运行中的流程信息
 * @author csx
 *
 */
public class ProcessRunDetailAction extends BaseAction{
	@Resource
	private ProcessRunService processRunService;
	@Resource
	private ProcessFormService processFormService;
	
	private Long runId;

	public Long getRunId() {
		return runId;
	}

	public void setRunId(Long runId) {
		this.runId = runId;
	}

	private String piId;

	public String getPiId() {
		return piId;
	}

	public void setPiId(String piId) {
		this.piId = piId;
	}

	@Override
	public String execute() throws Exception {
		ProcessRun processRun=null;
		
		if(runId==null){
			processRun=processRunService.getByPiId(piId);
			getRequest().setAttribute("processRun", processRun);
			runId=processRun.getRunId();
		}else{
			processRun=processRunService.get(runId);
		}
		List pfList=processFormService.getByRunId(runId);
		
		getRequest().setAttribute("pfList", pfList);
		
		return SUCCESS;
	}
}
