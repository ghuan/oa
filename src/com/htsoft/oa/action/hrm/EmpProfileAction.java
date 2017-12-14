package com.htsoft.oa.action.hrm;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import net.sf.json.util.JSONUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.JsonUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.hrm.EmpProfile;
import com.htsoft.oa.service.hrm.EmpProfileService;

import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class EmpProfileAction extends BaseAction{
//	private static short DELETEFLAG_NOT = (short)0;
//	private static short DELETEFLAG_HAD = (short)1;
	@Resource
	private EmpProfileService empProfileService;
	private EmpProfile empProfile;
	
	private Long profileId;

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public EmpProfile getEmpProfile() {
		return empProfile;
	}

	public void setEmpProfile(EmpProfile empProfile) {
		this.empProfile = empProfile;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		
//		//把删除掉的档案过滤
//		filter.addFilter("Q_delFlag_SN_EQ","0");
//		
		List<EmpProfile> list= empProfileService.getAll(filter);
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		JSONSerializer serializer=JsonUtil.getJSONSerializer("birthday","startWorkDate","checktime","createtime");
		buff.append(serializer.exclude(new String[]{"class","job.class","job.department"}).serialize(list));
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
				EmpProfile deletePro = empProfileService.get(new Long(id));
				deletePro.setDelFlag(EmpProfile.DELETE_FLAG_HAD);
				empProfileService.save(deletePro);
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
		EmpProfile empProfile=empProfileService.get(profileId);
		//Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		JSONSerializer json = JsonUtil.getJSONSerializer("birthday","startWorkDate","createtime","checktime");
		
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		//sb.append(gson.toJson(empProfile));
		sb.append(json.exclude(new String[]{"class","department"}).serialize(empProfile));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		//验证
		boolean pass = false;
		StringBuffer buff = new StringBuffer("{");
		if(empProfile.getProfileId() == null){
			if(empProfileService.checkProfileNo(empProfile.getProfileNo())){
				empProfile.setCreator(ContextUtil.getCurrentUser().getFullname());
				empProfile.setCreatetime(new Date());
				empProfile.setDelFlag(EmpProfile.DELETE_FLAG_NOT);
				pass = true;
			}else{
				buff.append("msg:'档案编号已存在,请重新输入.',");
			}
		}else{
			pass = true;
		}
		if(pass){
			empProfile.setApprovalStatus(EmpProfile.CHECK_FLAG_NONE);
			empProfileService.save(empProfile);
			buff.append("success:true}");
		}else{
			buff.append("failure:true}");
		}
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 系统生成档案编号
	 * @return
	 */
	public String number(){
		SimpleDateFormat date = new SimpleDateFormat("yyyyMMddHHmmss-SSSS");
		String profileNo = date.format(new Date());
		setJsonString("{success:true,profileNo:'PN"+profileNo+"'}");
		return SUCCESS;
	}
	
	/**
	 * 档案审核动作类
	 * @return
	 */
	public String check(){
		EmpProfile checkProfile = empProfileService.get(new Long(profileId));
		checkProfile.setCheckName(ContextUtil.getCurrentUser().getFullname());
		checkProfile.setChecktime(new Date());
		checkProfile.setApprovalStatus(empProfile.getApprovalStatus());
		checkProfile.setOpprovalOpinion(empProfile.getOpprovalOpinion());
		empProfileService.save(checkProfile);
		return SUCCESS;
	}
	/**
	 * 恢复删除掉的记录
	 * @return
	 */
	public String recovery(){
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				EmpProfile deletePro = empProfileService.get(new Long(id));
				deletePro.setDelFlag(EmpProfile.DELETE_FLAG_NOT);
				empProfileService.save(deletePro);
			}
		}
		jsonString="{success:true}";
		return SUCCESS;
	}
}
