package com.htsoft.oa.action.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.info.News;
import com.htsoft.oa.model.info.NewsType;
import com.htsoft.oa.service.info.NewsTypeService;

public class NewsTypeAction extends BaseAction{
	private NewsType newsType;

	public void setNewsType(NewsType newsType) {
		this.newsType = newsType;
	}

	public NewsType getNewsType() {
		return newsType;
	}

	@Resource
	private NewsTypeService newsTypeService;
	/**
	 * 显示所有新闻类别
	 */
	public String list(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addSorted("sn", "asc");
		List<NewsType> list= newsTypeService.getAll(filter);
		Type type=new TypeToken<List<NewsType>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':'"
				+filter.getPagingBean().getTotalItems()+"',result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 显示新闻类别树
	 * @return
	 */
	public String tree(){
		List<NewsType> list=newsTypeService.getAllBySn();
		StringBuffer sb=new StringBuffer("[");
		String opt = getRequest().getParameter("opt");//判断是否是下拉树需要的数据
		if(opt==null || !opt.equals("treeSelector")){
			sb.append("{id:'0',text:'全部新闻',leaf:true,iconCls:'menu-news'},");
		}
		for(NewsType newsType:list){
			sb.append("{id:'").append(newsType.getTypeId()).append("',text:'").append(newsType.getTypeName()).append("',leaf:true,iconCls:'menu-news'},");
		}
		if (!list.isEmpty()) {
			 sb.deleteCharAt(sb.length() - 1);
	    }
		sb.append("]");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 增加新闻类别
	 * @return
	 */
	public String add(){
		Short top = newsTypeService.getTop();
		if(top==null)top=0;
		//Short sn = newsType.getSn();
		if(newsType.getTypeId()==null){
			newsType.setSn((short)(top+1));
		}
		newsTypeService.save(newsType);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	/**
	 * 删除新闻类别
	 * @return
	 */
	public String remove(){
		Long typeId = Long.valueOf(getRequest().getParameter("typeId"));
		setNewsType(newsTypeService.get(typeId));
		if(newsType!=null){
			Short sn = newsType.getSn();
			newsTypeService.remove(typeId);
			
			//处理删除后的排序
			Short top = newsTypeService.getTop();
			if(top>sn){
				for(int i=0;i<top-sn;i++){
					setNewsType(newsTypeService.findBySn((short)(sn+i+1)));
					newsType.setSn((short)(sn+i));
					newsTypeService.save(newsType);
				}
			}
		}
		return SUCCESS;
	}
	/**
	 * 明细新闻类别
	 * @return
	 */
	public String detail(){
		Long typeId = Long.valueOf(getRequest().getParameter("typeId"));
		setNewsType(newsTypeService.get(typeId));
		Gson gson = new Gson();
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(newsType));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 按条件查询新闻类别
	 * @return
	 */
	public String search(){
		PagingBean pb=getInitPagingBean();
		List<NewsType> list=newsTypeService.findBySearch(newsType, pb);
		Type type=new TypeToken<List<NewsType>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':'"+pb.getTotalItems()+"',result:");
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	
	/**
	 * 新闻类型排序
	 */
	public String sort(){
		Integer opt = Integer.parseInt(getRequest().getParameter("opt"));
		Long typeId = Long.valueOf(getRequest().getParameter("typeId"));
		setNewsType(newsTypeService.get(typeId));
		Short top = newsTypeService.getTop();
		Short sn = newsType.getSn();
		NewsType change = new NewsType();
		if(opt==1){//置顶
			if(sn!=1){
				for(int i=0;i<sn-1;i++){
					change = newsTypeService.findBySn((short)(sn-i-1));
					change.setSn((short)(sn-i));
					newsTypeService.save(change);
				}
				newsType.setSn((short)1);
				newsTypeService.save(newsType);
			}
		}
		if(opt==2){//上移
			if(sn!=1){
				change = newsTypeService.findBySn((short)(sn-1));
				change.setSn(sn);
				newsTypeService.save(change);
				newsType.setSn((short)(sn-1));
				newsTypeService.save(newsType);
			}
		}
		if(opt==3){//下移
			if(sn<top){
				change = newsTypeService.findBySn((short)(sn+1));
				change.setSn(sn);
				newsTypeService.save(change);
				newsType.setSn((short)(sn+1));
				newsTypeService.save(newsType);
			}
		}
		if(opt==4){//置末
			if(sn<top){
				for(int i=0;i<top-sn;i++){
					change = newsTypeService.findBySn((short)(sn+i+1));
					change.setSn((short)(sn+i));
					newsTypeService.save(change);
				}
				newsType.setSn(top);
				newsTypeService.save(newsType);
			}
		}
		return SUCCESS;
	}
}
