package com.htsoft.oa.action.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;
import javax.annotation.Resource;
import com.google.gson.Gson;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.archive.ArchTemplate;
import com.htsoft.oa.service.archive.ArchTemplateService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class ArchTemplateAction extends BaseAction{
	@Resource
	private ArchTemplateService archTemplateService;
	private ArchTemplate archTemplate;
	
	private Long templateId;

	public Long getTemplateId() {
		return templateId;
	}

	public void setTemplateId(Long templateId) {
		this.templateId = templateId;
	}

	public ArchTemplate getArchTemplate() {
		return archTemplate;
	}

	public void setArchTemplate(ArchTemplate archTemplate) {
		this.archTemplate = archTemplate;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ArchTemplate> list= archTemplateService.getAll(filter);
		
		JSONSerializer jsonSerializer=JsonUtil.getJSONSerializer();
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		buff.append(jsonSerializer.serialize(list));
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
				archTemplateService.remove(new Long(id));
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
		ArchTemplate archTemplate=archTemplateService.get(templateId);
		
		JSONSerializer jsonSerializer=JsonUtil.getJSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(jsonSerializer.serialize(archTemplate));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		archTemplateService.save(archTemplate);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
