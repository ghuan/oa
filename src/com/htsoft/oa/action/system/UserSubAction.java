package com.htsoft.oa.action.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.UserSub;
import com.htsoft.oa.service.system.AppUserService;
import com.htsoft.oa.service.system.UserSubService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class UserSubAction extends BaseAction{
	@Resource
	private UserSubService userSubService;
	private UserSub userSub;
	
	@Resource
	private AppUserService appUserService;
	
	private Long subId;

	public Long getSubId() {
		return subId;
	}

	public void setSubId(Long subId) {
		this.subId = subId;
	}

	public UserSub getUserSub() {
		return userSub;
	}

	public void setUserSub(UserSub userSub) {
		this.userSub = userSub;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_userId_L_EQ", (ContextUtil.getCurrentUserId()).toString());
		filter.addFilter("Q_subAppUser.delFlag_SN_EQ","0");
		List<UserSub> list= userSubService.getAll(filter);
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd"),new String[]{"subAppUser.accessionTime"});
		buff.append(serializer.exclude(new String[]{"subAppUser.password","class"}).serialize(list));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
	
	public String combo(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_userId_L_EQ", (ContextUtil.getCurrentUserId()).toString());
		List<UserSub> list= userSubService.getAll(filter);
		 StringBuffer buff=new StringBuffer("[");
		 for(UserSub sub:list){
			buff.append("['"+sub.getSubAppUser().getUserId().toString()+"','"+sub.getSubAppUser().getFullname()+"'],");
		 }
		 if(list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		 }
		 buff.append("]");
		 setJsonString(buff.toString());
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
				userSubService.remove(new Long(id));
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
		UserSub userSub=userSubService.get(subId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(userSub));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		String subUserIds=getRequest().getParameter("subUserIds");
		String []strSubUserId=subUserIds.split(",");
		for(int i=0;i<strSubUserId.length;i++){
			UserSub usb=new UserSub();
			usb.setUserId(ContextUtil.getCurrentUserId());
			Long subUserId=new Long(strSubUserId[i]);
			AppUser subAppUser=appUserService.get(subUserId);
			usb.setSubAppUser(subAppUser);
			userSubService.save(usb);
		}		
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
