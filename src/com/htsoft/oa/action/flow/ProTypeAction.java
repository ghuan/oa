package com.htsoft.oa.action.flow;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.flow.ProType;
import com.htsoft.oa.service.flow.ProTypeService;
/**
 * 
 * @author csx
 *
 */
public class ProTypeAction extends BaseAction{
	@Resource
	private ProTypeService proTypeService;
	private ProType proType;
	
	private Long typeId;

	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public ProType getProType() {
		return proType;
	}

	public void setProType(ProType proType) {
		this.proType = proType;
	}

	/**
	 * 显示列表,用于数据的显示
	 */
	public String list(){
		List<ProType> processTypeList=proTypeService.getAll();
		StringBuffer sb=new StringBuffer("[");
		for(ProType proType:processTypeList){
			sb.append("{id:'").append(proType.getTypeId()).append("',text:'").append(proType.getTypeName()).append("',leaf:true},");
		}
		if (!processTypeList.isEmpty()) {
			 sb.deleteCharAt(sb.length() - 1);
	    }
		sb.append("]");
		jsonString=sb.toString();
		
		return SUCCESS;
	}
	
	public String root(){
		List<ProType> processTypeList=proTypeService.getAll();
		StringBuffer sb=new StringBuffer("[{id:'0',text:'流程分类',leaf:false,expanded:true,children:[");
		for(ProType proType:processTypeList){
			sb.append("{id:'").append(proType.getTypeId()).append("',text:'").append(proType.getTypeName()).append("',leaf:true},");
		}
		if (!processTypeList.isEmpty()) {
			 sb.deleteCharAt(sb.length() - 1);
	    }
		sb.append("]}]");
		jsonString=sb.toString();
		
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
				proTypeService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 删除
	 * @return
	 */
	public String remove(){
		proTypeService.remove(typeId);
		jsonString="{success:true}";
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ProType proType=proTypeService.get(typeId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(proType));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		proTypeService.save(proType);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
