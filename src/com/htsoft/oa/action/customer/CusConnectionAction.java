package com.htsoft.oa.action.customer;
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
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.customer.CusConnection;
import com.htsoft.oa.service.customer.CusConnectionService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class CusConnectionAction extends BaseAction{
	@Resource
	private CusConnectionService cusConnectionService;
	private CusConnection cusConnection;
	
	private Long connId;

	public Long getConnId() {
		return connId;
	}

	public void setConnId(Long connId) {
		this.connId = connId;
	}

	public CusConnection getCusConnection() {
		return cusConnection;
	}

	public void setCusConnection(CusConnection cusConnection) {
		this.cusConnection = cusConnection;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<CusConnection> list= cusConnectionService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer json = JsonUtil.getJSONSerializer("startDate","endDate");//new JSONSerializer();
		buff.append(json.exclude(new String[]{"class"}).serialize(list));
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
				cusConnectionService.remove(new Long(id));
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
		CusConnection cusConnection=cusConnectionService.get(connId);
		
		JSONSerializer json = JsonUtil.getJSONSerializer("startDate","endDate");//new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(json.exclude(new String[]{"class"}).serialize(cusConnection));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		boolean pass = false;
		StringBuffer buff = new StringBuffer("{");
		if(cusConnection.getStartDate().getTime()<cusConnection.getEndDate().getTime()){
							pass = true;
		}else buff.append("msg:'交往结束日期不能早于开始日期!',");
					
		if(pass){
			cusConnection.setCreator(ContextUtil.getCurrentUser().getFullname());
			cusConnectionService.save(cusConnection);
			buff.append("success:true}");
		}else{
			buff.append("failure:true}");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
}
