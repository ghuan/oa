package com.htsoft.oa.action.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.NewsComment;
import com.htsoft.oa.service.info.NewsCommentService;
import com.htsoft.oa.service.info.NewsService;
import com.htsoft.oa.service.system.AppUserService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author 
 *
 */
public class NewsCommentAction extends BaseAction{
	@Resource
	private NewsCommentService newsCommentService;
	@Resource
	private AppUserService appUserService;
	@Resource
	private NewsService newsService;
	private NewsComment newsComment;
	
	private Long commentId;

	public Long getCommentId() {
		return commentId;
	}

	public void setCommentId(Long commentId) {
		this.commentId = commentId;
	}

	public NewsComment getNewsComment() {
		return newsComment;
	}

	public void setNewsComment(NewsComment newsComment) {
		this.newsComment = newsComment;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		String start = getRequest().getParameter("start");
		List<NewsComment> list= newsCommentService.getAll(filter);
		
		Gson gson = new Gson();
		SimpleDateFormat simpleDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:[");
		for(NewsComment newsComment : list){
			buff.append("{commentId:'")
				.append(newsComment.getCommentId())
				.append("',content:'")
				.append(gson.toJson(newsComment.getContent()).replace("\"", ""))
				.append("',createtime:'")
				.append(gson.toJson(simpleDate.format(newsComment.getCreatetime())).replace("\"", ""))
				.append("',fullname:'")
				.append(newsComment.getFullname())
				.append("',start:'")
				.append(start)
				.append("'},");
		}
		if(list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		}
		buff.append("]}");
		
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
				NewsComment delComment = newsCommentService.get(new Long(id));
				News news = delComment.getNews();
				if(news.getReplyCounts()>1){
					news.setReplyCounts(news.getReplyCounts()-1);
				}
				newsService.save(news);
				newsCommentService.remove(new Long(id));
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
		NewsComment newsComment=newsCommentService.get(commentId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(newsComment));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		//被回复的新闻回复次数加1
		News news = newsService.get(newsComment.getNewsId());
		news.setReplyCounts(news.getReplyCounts()+1);
		newsService.save(news);
		
		newsComment.setAppUser(appUserService.get(newsComment.getUserId()));
		newsComment.setCreatetime(new Date());
		newsComment.setNews(news);
		newsCommentService.save(newsComment);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
