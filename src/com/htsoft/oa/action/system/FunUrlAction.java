package com.htsoft.oa.action.system;
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


import com.htsoft.oa.model.system.FunUrl;
import com.htsoft.oa.service.system.FunUrlService;
/**
 * 
 * @author csx
 *
 */
public class FunUrlAction extends BaseAction{
	@Resource
	private FunUrlService funUrlService;
	private FunUrl funUrl;
	
	private Long urlId;

	public Long getUrlId() {
		return urlId;
	}

	public void setUrlId(Long urlId) {
		this.urlId = urlId;
	}

	public FunUrl getFunUrl() {
		return funUrl;
	}

	public void setFunUrl(FunUrl funUrl) {
		this.funUrl = funUrl;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<FunUrl> list= funUrlService.getAll(filter);
		
		Type type=new TypeToken<List<FunUrl>>(){}.getType();
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
				funUrlService.remove(new Long(id));
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
		FunUrl funUrl=funUrlService.get(urlId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(funUrl));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		funUrlService.save(funUrl);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
