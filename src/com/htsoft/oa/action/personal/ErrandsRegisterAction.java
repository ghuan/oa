package com.htsoft.oa.action.personal;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.htsoft.core.Constants;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.jbpm.pv.ParamField;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;

import com.htsoft.oa.action.flow.ProcessActivityAssistant;
import com.htsoft.oa.model.flow.FlowStartInfo;
import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProcessForm;
import com.htsoft.oa.model.flow.ProcessRun;
import com.htsoft.oa.model.personal.ErrandsRegister;
import com.htsoft.oa.service.flow.JbpmService;

import com.htsoft.oa.service.flow.ProcessRunService;
import com.htsoft.oa.service.personal.ErrandsRegisterService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class ErrandsRegisterAction extends BaseAction{
	
	@Resource
	private ProcessRunService processRunService;
	
	@Resource
	private JbpmService jbpmService;
	
	@Resource
	private ErrandsRegisterService errandsRegisterService;
	private ErrandsRegister errandsRegister;
	
	private Long dateId;

	public Long getDateId() {
		return dateId;
	}

	public void setDateId(Long dateId) {
		this.dateId = dateId;
	}

	public ErrandsRegister getErrandsRegister() {
		return errandsRegister;
	}

	public void setErrandsRegister(ErrandsRegister errandsRegister) {
		this.errandsRegister = errandsRegister;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());
		List<ErrandsRegister> list= errandsRegisterService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");		
		
		JSONSerializer serializer=JsonUtil.getJSONSerializer("startTime","endTime");
		buff.append(serializer.serialize(list));
		
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				errandsRegisterService.remove(new Long(id));
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
		ErrandsRegister errandsRegister=errandsRegisterService.get(dateId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(errandsRegister));
		sb.append("}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		//是否为新记录
		boolean isNew=errandsRegister.getDateId()==null? true:false;
		
		errandsRegister.setAppUser(ContextUtil.getCurrentUser());
		errandsRegister.setStatus((short)0);//未通过
		errandsRegisterService.save(errandsRegister);
		
		if(ErrandsRegister.FLAG_LEAVE.equals(errandsRegister.getFlag())
				&& isNew ){//请假
			Map fieldMap=constructStartFlowMap(errandsRegister);
			//取得请假流程的定义
			ProDefinition proDefintion=jbpmService.getProDefinitionByKey(Constants.FLOW_LEAVE_KEY);
			
			if(proDefintion!=null){
				ProcessRun processRun=processRunService.initNewProcessRun(proDefintion);
				//流程的启动表单信息
				ProcessForm processForm=new ProcessForm();
				processForm.setActivityName("开始");
				processForm.setProcessRun(processRun);
				
				//流程启动的信息
				FlowStartInfo flowStartInfo=new FlowStartInfo(true);
				//设置审批人
				flowStartInfo.setdAssignId(errandsRegister.getApprovalId().toString());
				//启动流程
				processRunService.saveProcessRun(processRun, processForm,fieldMap,flowStartInfo);
				
			}else{
				logger.error("请假流程没有定义！");
			}
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	
	protected Map<String, ParamField> constructStartFlowMap(ErrandsRegister register){
		
		String activityName="开始";
		String processName="请假";

		Map<String,ParamField> map=ProcessActivityAssistant.constructFieldMap(processName, activityName);

		ParamField pfDateId=map.get("dateId");
		
		if(pfDateId!=null){
			pfDateId.setValue(register.getDateId().toString());
		}
		
		SimpleDateFormat sdf=new SimpleDateFormat(Constants.DATE_FORMAT_FULL);
		ParamField pfOption=map.get("reqDesc");
		if(pfOption!=null){
			pfOption.setValue(register.getDescp());
		}
		
		ParamField pfStartTime=map.get("startTime");
		if(pfStartTime!=null){
			pfStartTime.setValue(sdf.format(register.getStartTime()));
		}
		
		ParamField pfEndTime=map.get("endTime");
		if(pfEndTime!=null){
			pfEndTime.setValue(sdf.format(register.getEndTime()));
		}
		
		ParamField pfApprovalName=map.get("approvalName");
		if(pfApprovalName!=null){
			pfApprovalName.setValue(register.getApprovalName());
		}

		return map;
	}
	
}
