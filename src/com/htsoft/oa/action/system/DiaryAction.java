package com.htsoft.oa.action.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Diary;
import com.htsoft.oa.service.system.DiaryService;
import com.htsoft.oa.service.system.UserSubService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class DiaryAction extends BaseAction{
	@Resource
	private DiaryService diaryService;
	@Resource
	private UserSubService userSubService;
	private Diary diary;
	private Date from;
	private Date to;
	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}
	
	private Long diaryId;

	public Long getDiaryId() {
		return diaryId;
	}

	public void setDiaryId(Long diaryId) {
		this.diaryId = diaryId;
	}

	public Diary getDiary() {
		return diary;
	}

	public void setDiary(Diary diary) {
		this.diary = diary;
	}

	/**
	 * 显示列表
	 */
	public String list(){

		AppUser user = ContextUtil.getCurrentUser();
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_appUser.userId_L_EQ", (user.getId()).toString());
		List<Diary> list= diaryService.getAll(filter);	
		Type type=new TypeToken<List<Diary>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
	    .append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		jsonString=buff.toString();		
		return SUCCESS;
	}
	
	/**
	 * 查找下属的工作日志
	 * @return
	 */
	public String subUser(){
		PagingBean pb=getInitPagingBean();
		String usrIds=getRequest().getParameter("userId");
		StringBuffer sb=new StringBuffer();
		if(StringUtils.isNotEmpty(usrIds)){
			sb.append(usrIds);
		}else{
			List<Long> list=userSubService.subUsers(ContextUtil.getCurrentUserId());			
			for(Long l:list){
				sb.append(l.toString()).append(",");
			}
			if(list.size()>0){
				sb.deleteCharAt(sb.length()-1);
			}
		}
		List<Diary> diaryList=new ArrayList<Diary>();
		
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':");
		
		if(sb.length()>0){
			diaryList=diaryService.getSubDiary(sb.toString(), pb);
			buff.append(pb.getTotalItems());
		}else{
			buff.append("0");//记录数为0
		}
		buff.append(",result:");
		JSONSerializer serializer=new JSONSerializer();
        serializer.transform(new DateTransformer("yyyy-MM-dd"),
        "dayTime");
        buff.append(serializer.exclude(new String[] { "class" }).serialize(diaryList));
		buff.append("}");
		jsonString=buff.toString();		
		return SUCCESS;
	}
	
	/*
	 * 查询列表
	 */
	public String search(){

		AppUser user = ContextUtil.getCurrentUser();
		QueryFilter filter=new QueryFilter(getRequest());
		//按用户查询
		filter.addFilter("Q_appUser.userId_L_EQ", (user.getId()).toString());
		//按起始时间查询
		if(getRequest().getParameter("from")!=""){
			filter.addFilter("Q_dayTime_D_GE", getRequest().getParameter("from"));
		}
		//按最终时间查询
		if(getRequest().getParameter("to")!=""){
			filter.addFilter("Q_dayTime_D_LE", getRequest().getParameter("to"));
		}
		//按内容查询
		filter.addFilter("Q_content_S_LK", diary.getContent());
		//按类型查询
		if(diary.getDiaryType()!=null){
			filter.addFilter("Q_diaryType_SN_EQ", (diary.getDiaryType()).toString());
		}
		
		List<Diary> list= diaryService.getAll(filter);	
		Type type=new TypeToken<List<Diary>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
	    .append(filter.getPagingBean().getTotalItems()).append(",result:");
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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
				diaryService.remove(new Long(id));
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
		Diary diary=diaryService.get(diaryId);
		Gson gson=new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(diary));
		sb.append("}");
		setJsonString(sb.toString());	
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		AppUser user = ContextUtil.getCurrentUser();
		diary.setAppUser(user);
		diaryService.save(diary);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	public String check(){
		String strId=getRequest().getParameter("diaryId");
		if(StringUtils.isNotEmpty(strId)){
			diary=diaryService.get(new Long(strId));
		}
		return "check";
	}
}
