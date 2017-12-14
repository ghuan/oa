package com.htsoft.oa.action.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import java.math.BigDecimal;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.hrm.SalaryPayoff;
import com.htsoft.oa.service.hrm.SalaryPayoffService;
/**
 * 
 * @author 
 *
 */
public class SalaryPayoffAction extends BaseAction{
	@Resource
	private SalaryPayoffService salaryPayoffService;
	private SalaryPayoff salaryPayoff;
	
	private Long recordId;

	public Long getRecordId() {
		return recordId;
	}

	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	public SalaryPayoff getSalaryPayoff() {
		return salaryPayoff;
	}

	public void setSalaryPayoff(SalaryPayoff salaryPayoff) {
		this.salaryPayoff = salaryPayoff;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<SalaryPayoff> list= salaryPayoffService.getAll(filter);
		
		Type type=new TypeToken<List<SalaryPayoff>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
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
				salaryPayoffService.remove(new Long(id));
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
		SalaryPayoff salaryPayoff=salaryPayoffService.get(recordId);
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(salaryPayoff));
		sb.append("]}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		if(salaryPayoff.getRecordId()==null){
			salaryPayoff.setCheckStatus(SalaryPayoff.CHECK_FLAG_NONE);
			salaryPayoff.setRegTime(new Date());
			salaryPayoff.setRegister(ContextUtil.getCurrentUser().getFullname());
		}
		BigDecimal acutalAmount = salaryPayoff.getStandAmount().add(salaryPayoff.getEncourageAmount()).add(salaryPayoff.getEncourageAmount());
		if(salaryPayoff.getAchieveAmount() != null){
			acutalAmount.add(salaryPayoff.getAchieveAmount());
		}
		salaryPayoff.setAcutalAmount(acutalAmount);
		salaryPayoffService.save(salaryPayoff);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 审核薪酬发放
	 * @return
	 */
	public String check(){
		SalaryPayoff checkSalaryPayoff = salaryPayoffService.get(new Long(recordId));
		checkSalaryPayoff.setCheckTime(new Date());
		checkSalaryPayoff.setCheckName(ContextUtil.getCurrentUser().getFullname());
		checkSalaryPayoff.setCheckStatus(salaryPayoff.getCheckStatus());
		checkSalaryPayoff.setCheckOpinion(salaryPayoff.getCheckOpinion());
		salaryPayoffService.save(checkSalaryPayoff);
		return SUCCESS;
	}
	/**
	 * 查询个人薪酬
	 * @return
	 */
	public String personal(){
		QueryFilter filter=new QueryFilter(getRequest());
		List<SalaryPayoff> list= salaryPayoffService.getAll(filter);
		
		Type type=new TypeToken<List<SalaryPayoff>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		return SUCCESS;
	}
}
