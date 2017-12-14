package com.htsoft.oa.action.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;


import com.htsoft.oa.model.hrm.SalaryItem;
import com.htsoft.oa.service.hrm.SalaryItemService;
/**
 * 
 * @author 
 *
 */
public class SalaryItemAction extends BaseAction{
	@Resource
	private SalaryItemService salaryItemService;
	private SalaryItem salaryItem;
	
	private Long salaryItemId;

	public Long getSalaryItemId() {
		return salaryItemId;
	}

	public void setSalaryItemId(Long salaryItemId) {
		this.salaryItemId = salaryItemId;
	}

	public SalaryItem getSalaryItem() {
		return salaryItem;
	}

	public void setSalaryItem(SalaryItem salaryItem) {
		this.salaryItem = salaryItem;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		PagingBean pb = getInitPagingBean();
		String ids = getRequest().getParameter("exclude");
		if(StringUtils.isNotEmpty(ids)){
			ids = ids.substring(0, ids.length()-1);//删除掉最后一个",";
		};
		
		//QueryFilter filter=new QueryFilter(getRequest());
		List<SalaryItem> list= salaryItemService.getAllExcludeId(ids,pb);
		
		Type type=new TypeToken<List<SalaryItem>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 
	 * @return
	 */
	public String search(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<SalaryItem> list= salaryItemService.getAll(filter);
		
		Type type=new TypeToken<List<SalaryItem>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
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
				salaryItemService.remove(new Long(id));
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
		SalaryItem salaryItem=salaryItemService.get(salaryItemId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(salaryItem));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		salaryItemService.save(salaryItem);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
