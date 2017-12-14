package com.htsoft.oa.action.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.NewsType;
import com.htsoft.oa.service.info.NewsService;
import com.htsoft.oa.service.info.NewsTypeService;

import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class NewsAction extends BaseAction{
	@Resource
	private NewsService newsService;
	@Resource
	private NewsTypeService newsTypeService;
	
	private News news;
	private List<News> list;
	
	public List<News> getList() {
		return list;
	}

	public void setList(List<News> list) {
		this.list = list;
	}
	private Long newsId;
	
	private Long typeId;
	
	private NewsType newsType;

	
	
	public Long getTypeId() {
		return typeId;
	}

	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}

	public Long getNewsId() {
		return newsId;
	}

	public void setNewsId(Long newsId) {
		this.newsId = newsId;
	}

	public News getNews() {
		return news;
	}

	public void setNews(News news) {
		this.news = news;
	}
	
	
	public NewsType getNewsType() {
		return newsType;
	}

	public void setNewsType(NewsType newsType) {
		this.newsType = newsType;
	}
	
	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<News> list= newsService.getAll(filter);
		
		Type type=new TypeToken<List<News>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
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
				newsService.remove(new Long(id));
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
		News news=newsService.get(newsId);
		
		//Gson gson=new Gson();
		JSONSerializer serializer = new JSONSerializer();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(serializer.exclude(new String[] {"class","newsComments"}).serialize(news));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		News old = new News();
		Boolean isNew = false;
		if(news.getNewsId()==null){
			isNew = true ;
		}
		if(news.getTypeId()!=null){
			setNewsType(newsTypeService.get(news.getTypeId()));
			news.setNewsType(newsType);
		}
		if(isNew){
			news.setCreatetime(new Date());
			news.setUpdateTime(new Date());
			news.setReplyCounts(0);
			news.setViewCounts(0);
			newsService.save(news);
		}else{
			old = newsService.get(news.getNewsId());
			news.setUpdateTime(new Date());
			news.setCreatetime(old.getCreatetime());
			news.setViewCounts(old.getViewCounts()+1);//浏览次数加1
			news.setReplyCounts(old.getReplyCounts());
			newsService.merge(news);
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 按类型查询新闻
	 */
	public String category(){
		
		List<News> list = null;
		PagingBean pb = getInitPagingBean();
		if(typeId!=null&&typeId>0){
			list = newsService.findByTypeId(typeId, pb);
		}else{
			list = newsService.getAll(pb);
		}
		Type type=new TypeToken<List<News>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':"+pb.getTotalItems()+",result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 删除新闻图标在新闻表中的记录
	 */
	public String icon(){
		setNews(newsService.get(getNewsId()));
		news.setSubjectIcon("");
		newsService.save(news);
		return SUCCESS;
	}
	
	/**
	 * 首页新闻查询,该方法按输入的字段模糊查询新闻标题和新闻内容
	 * @return
	 */
	public String search(){
		PagingBean pb = getInitPagingBean();
		String searchContent = getRequest().getParameter("searchContent");
		List<News> list = newsService.findBySearch(searchContent,pb);
		Type type=new TypeToken<List<News>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}

}
