package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import org.apache.commons.lang.StringUtils;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.flow.ProDefinition;
import com.htsoft.oa.model.flow.ProType;
import com.htsoft.oa.service.flow.JbpmService;
import com.htsoft.oa.service.flow.ProDefinitionService;
import com.htsoft.oa.service.flow.ProTypeService;

import flexjson.JSONSerializer;

/**
 * 
 * @author csx
 *
 */
public class ProDefinitionAction extends BaseAction{
	@Resource
	private ProDefinitionService proDefinitionService;
	@Resource
	private ProTypeService proTypeService;
	@Resource
	private JbpmService jbpmService;
	
	private ProDefinition proDefinition;
	
	private Long defId;

	public Long getDefId() {
		return defId;
	}

	public void setDefId(Long defId) {
		this.defId = defId;
	}

	public ProDefinition getProDefinition() {
		return proDefinition;
	}

	public void setProDefinition(ProDefinition proDefinition) {
		this.proDefinition = proDefinition;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		
		String typeId=getRequest().getParameter("typeId");
		
		if(StringUtils.isNotEmpty(typeId)&&!"0".equals(typeId)){
			filter.addFilter("Q_proType.typeId_L_EQ", typeId);
		}
		
		List<ProDefinition> list= proDefinitionService.getAll(filter);

		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer serializer=JsonUtil.getJSONSerializer("createtime").exclude("defXml");
		
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
				//删除流程的定义，就会删除流程的实例，表单的数据及Jbpm的流程相关的内容
				//proDefinitionService.remove(new Long(id));
				jbpmService.doUnDeployProDefinition(new Long(id));
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
	
		if(defId!=null){
			proDefinition=proDefinitionService.get(defId);
		}else{
			proDefinition=new ProDefinition();
			String proTypeId=getRequest().getParameter("proTypeId");
			if(StringUtils.isNotEmpty(proTypeId)){
				ProType proType=proTypeService.get(new Long(proTypeId));
				proDefinition.setProType(proType);
			}
		}
		
		//用JSONSerializer解决延迟加载的问题
		JSONSerializer serializer=JsonUtil.getJSONSerializer("createtime");
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.serialize(proDefinition));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		Long proTypeId=proDefinition.getProTypeId();	
		if(proTypeId!=null){
			ProType proType=proTypeService.get(proTypeId);
			proDefinition.setProType(proType);
		}
		if(proDefinition.getDefId()!=null){//更新操作
			ProDefinition proDef=proDefinitionService.get(proDefinition.getDefId());
			try{
				BeanUtil.copyNotNullProperties(proDef, proDefinition);
				
				jbpmService.saveOrUpdateDeploy(proDef);
			}catch(Exception ex){
				logger.error(ex.getMessage());
			}
		}else{//添加流程
			proDefinition.setCreatetime(new Date());
			jbpmService.saveOrUpdateDeploy(proDefinition);
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
}
