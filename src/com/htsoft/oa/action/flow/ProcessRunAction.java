package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.text.SimpleDateFormat;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.service.flow.ProcessRunService;

import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class ProcessRunAction extends BaseAction{
	@Resource
	private ProcessRunService processRunService;
	private ProcessRun processRun;
	
	private Long runId;

	public Long getRunId() {
		return runId;
	}

	public void setRunId(Long runId) {
		this.runId = runId;
	}

	public ProcessRun getProcessRun() {
		return processRun;
	}

	public void setProcessRun(ProcessRun processRun) {
		this.processRun = processRun;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		
		//加上过滤条件，表示只显示当前用户的申请
		filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		
		List<ProcessRun> list= processRunService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:[");
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		for(ProcessRun run:list){
			buff.append("{runId:'").append(run.getRunId()).append("',subject:'")
			.append(run.getSubject()).append("',createtime:'").append(sdf.format(run.getCreatetime()))
			.append("',piId:'").append(run.getPiId()).append("',defId:'").append(run.getProDefinition().getDefId())
			.append("',runStatus:'").append(run.getRunStatus()).append("'},");
		}
		
		if(list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		}
		buff.append("]");
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 删除一个尚未启动的流程
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				processRunService.remove(new Long(id));
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ProcessRun processRun=processRunService.get(runId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(processRun));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		processRunService.save(processRun);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
