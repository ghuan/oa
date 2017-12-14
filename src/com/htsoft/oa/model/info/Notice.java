package com.htsoft.oa.model.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import java.util.Date;

public class Notice {
	//公告属性：公告ID号、发布人、发布标题、发布内容、生效日期、失效日期、当前状态
	private long noticeId;
	private String postName;
	private String noticeTitle;
	private String noticeContent;
	private Date effectiveDate;
	private Date expirationDate;
	//状态：1表示正式发布0表示草稿
	private short state;
	
	//相应的setter/getter方法
	
	public String getPostName() {
		return postName;
	}
	public long getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(long noticeId) {
		this.noticeId = noticeId;
	}
	public void setPostName(String postName) {
		this.postName = postName;
	}
	public String getNoticeTitle() {
		return noticeTitle;
	}
	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}
	
	public String getNoticeContent() {
		return noticeContent;
	}
	public void setNoticeContent(String noticeContent) {
		this.noticeContent = noticeContent;
	}
	public Date getEffectiveDate() {
		return effectiveDate;
	}
	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}
	public Date getExpirationDate() {
		return expirationDate;
	}
	public void setExpirationDate(Date expirationDate) {
		this.expirationDate = expirationDate;
	}
	public short getState() {
		return state;
	}
	public void setState(short state) {
		this.state = state;
	}

	

}
