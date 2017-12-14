package com.htsoft.oa.service.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.util.Map;

import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.service.BaseService;

import com.htsoft.oa.model.flow.FlowStartInfo;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;

public interface ProcessRunService extends BaseService<ProcessRun>{
	
	public ProcessRun initNewProcessRun(ProDefinition proDefinition);
	/**
	 * 
	 * @param processRun
	 * @param processForm
	 * @param fieldMap
	 * @param startFlow
	 */
	public void saveProcessRun(ProcessRun processRun,ProcessForm processForm,Map<String, ParamField>fieldMap,FlowStartInfo startInfo);
	/**
	 * 
	 * @param piId
	 * @return
	 */
	public ProcessRun getByPiId(String piId);
	
	/**
	 * 完成任务，同时把数据保存至form_data表，记录该任务填写的表单数据
	 * @param piId
	 * @param transitionName
	 * @param variables
	 */
	public void saveAndNextstep(String piId,String activityName, String transitionName,Map<String, ParamField> fieldMap);
	
	/**
	 * 删除某一流程的所有实例
	 * @param defId 流程定义的Id，则表pro_defintion的defId
	 */
	public void removeByDefId(Long defId);
	
	
}


