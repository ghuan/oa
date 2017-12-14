package com.htsoft.oa.action.info;
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
import com.htsoft.core.web.paging.PagingBean;


import com.htsoft.oa.model.info.Notice;
import com.htsoft.oa.service.info.NoticeService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class NoticeAction extends BaseAction{
	@Resource
	private NoticeService noticeService;
	private Notice notice;
	private List<Notice> list;
	public List<Notice> getList() {
		return list;
	}

	public void setList(List<Notice> list) {
		this.list = list;
	}
	private Long noticeId;

	public Long getNoticeId() {
		return noticeId;
	}

	public void setNoticeId(Long noticeId) {
		this.noticeId = noticeId;
	}

	public Notice getNotice() {
		return notice;
	}

	public void setNotice(Notice notice) {
		this.notice = notice;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Notice> list= noticeService.getAll(filter);
		
		Type type=new TypeToken<List<Notice>>(){}.getType();
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
				noticeService.remove(new Long(id));
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
		Notice notice=noticeService.get(noticeId);
		
		JSONSerializer serializer=new JSONSerializer();
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"effectiveDate");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"),"expirationDate");
		
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.exclude(new String[]{"class"}).serialize(notice));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		noticeService.save(notice);
		setJsonString("{success:true}");
		return SUCCESS;
	}

	/**
	 * 首页公告查询,该方法按输入的字段模糊查询公告标题和公告内容
	 * @return
	 */
	public String search(){
		PagingBean pb = getInitPagingBean();
		String searchContent = getRequest().getParameter("searchContent");
		List<Notice> list = noticeService.findBySearch(searchContent,pb);
		Type type=new TypeToken<List<Notice>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	
}
