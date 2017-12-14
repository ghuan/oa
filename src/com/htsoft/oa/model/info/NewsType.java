package com.htsoft.oa.model.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/



import com.htsoft.core.model.BaseModel;

public class NewsType extends BaseModel {
	private Long typeId;
	private String typeName;
	private Short sn;
//	private Set<News> news;
	public NewsType() {
		// TODO Auto-generated constructor stub
	}
	public Long getTypeId() {
		return typeId;
	}
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Short getSn() {
		return sn;
	}
	public void setSn(Short sn) {
		this.sn = sn;
	}
//	public Set<News> getNews() {
//		return news;
//	}
//	public void setNews(Set<News> news) {
//		this.news = news;
//	}
	
	
}
