package com.htsoft.oa.model.info;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;

/**
 * News Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 */
public class News extends com.htsoft.core.model.BaseModel {

	@Expose
    protected Long newsId;
	@Expose
	protected String subjectIcon;
	@Expose
	protected String subject;
	@Expose
	protected String author;
	@Expose
	protected java.util.Date createtime;
	@Expose
	protected Integer replyCounts;
	@Expose
	protected Integer viewCounts;
	@Expose
	protected String content;
	@Expose
	protected java.util.Date updateTime;
	@Expose
	protected Short status;
	@Expose
	protected NewsType newsType;
	@Expose
	protected String issuer;

	protected java.util.Set<NewsComment> newsComments = new java.util.HashSet<NewsComment>();
	/**
	 * Default Empty Constructor for class News
	 */
	public News () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class News
	 */
	public News (
		 Long in_newsId
        ) {
		this.setNewsId(in_newsId);
    }

	
	public java.util.Set<NewsComment> getNewsComments() {
		return newsComments;
	}

	public void setNewsComments(java.util.Set<NewsComment> newsComments) {
		this.newsComments = newsComments;
	}

	public com.htsoft.oa.model.info.NewsType getNewsType () {
		return newsType;
	}	
	
	public void setNewsType (com.htsoft.oa.model.info.NewsType in_newsType) {
		this.newsType = in_newsType;
	}
    

	/**
	 * ID	 * @return Long
     * @hibernate.id column="newsId" type="java.lang.Long" generator-class="native"
	 */
	public Long getNewsId() {
		return this.newsId;
	}
	
	/**
	 * Set the newsId
	 */	
	public void setNewsId(Long aValue) {
		this.newsId = aValue;
	}	

	/**
	 * 类别ID	 * @return Long
	 */
	public Long getTypeId() {
		return this.getNewsType()==null?null:this.getNewsType().getTypeId();
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
	    if (aValue==null) {
	    	newsType = null;
	    } else if (newsType == null) {
	        newsType = new NewsType();
	        newsType.setTypeId(aValue);//set a version to cheat hibernate only
	    } else {
			newsType.setTypeId(aValue);
	    }
	}	

	/**
	 * 新闻图标	 * @return String
	 * @hibernate.property column="subjectIcon" type="java.lang.String" length="128" not-null="false" unique="false"
	 */
	public String getSubjectIcon() {
		return this.subjectIcon;
	}
	
	/**
	 * Set the subjectIcon
	 */	
	public void setSubjectIcon(String aValue) {
		this.subjectIcon = aValue;
	}	

	/**
	 * 新闻标题	 * @return String
	 * @hibernate.property column="subject" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getSubject() {
		return this.subject;
	}
	
	/**
	 * Set the subject
	 * @spring.validator type="required"
	 */	
	public void setSubject(String aValue) {
		this.subject = aValue;
	}	

	/**
	 * 作者	 * @return String
	 * @hibernate.property column="author" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getAuthor() {
		return this.author;
	}
	
	/**
	 * Set the author
	 * @spring.validator type="required"
	 */	
	public void setAuthor(String aValue) {
		this.author = aValue;
	}	

	/**
	 * 创建时间	 * @return java.util.Date
	 * @hibernate.property column="createtime" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getCreatetime() {
		return this.createtime;
	}
	
	/**
	 * Set the createtime
	 * @spring.validator type="required"
	 */	
	public void setCreatetime(java.util.Date aValue) {
		this.createtime = aValue;
	}	

	/**
	 * 回复次数	 * @return Integer
	 * @hibernate.property column="replyCounts" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getReplyCounts() {
		return this.replyCounts;
	}
	
	/**
	 * Set the replyCounts
	 */	
	public void setReplyCounts(Integer aValue) {
		this.replyCounts = aValue;
	}	

	/**
	 * 浏览数	 * @return Integer
	 * @hibernate.property column="viewCounts" type="java.lang.Integer" length="10" not-null="false" unique="false"
	 */
	public Integer getViewCounts() {
		return this.viewCounts;
	}
	
	/**
	 * Set the viewCounts
	 */	
	public void setViewCounts(Integer aValue) {
		this.viewCounts = aValue;
	}	

	/**
	 * 内容	 * @return String
	 * @hibernate.property column="content" type="java.lang.String" length="65535" not-null="true" unique="false"
	 */
	public String getContent() {
		return this.content;
	}
	
	/**
	 * Set the content
	 * @spring.validator type="required"
	 */	
	public void setContent(String aValue) {
		this.content = aValue;
	}	

	/**
	 * 修改时间	 * @return java.util.Date
	 * @hibernate.property column="updateTime" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getUpdateTime() {
		return this.updateTime;
	}
	
	/**
	 * Set the updateTime
	 * @spring.validator type="required"
	 */	
	public void setUpdateTime(java.util.Date aValue) {
		this.updateTime = aValue;
	}	

	/**
	 * 状态	 * @return Short
	 * @hibernate.property column="status" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getStatus() {
		return this.status;
	}
	
	/**
	 * Set the status
	 * @spring.validator type="required"
	 */	
	public void setStatus(Short aValue) {
		this.status = aValue;
	}	

	public String getIssuer() {
		return issuer;
	}

	public void setIssuer(String issuer) {
		this.issuer = issuer;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof News)) {
			return false;
		}
		News rhs = (News) object;
		return new EqualsBuilder()
				.append(this.newsId, rhs.newsId)
						.append(this.subjectIcon, rhs.subjectIcon)
				.append(this.subject, rhs.subject)
				.append(this.author, rhs.author)
				.append(this.createtime, rhs.createtime)
				.append(this.replyCounts, rhs.replyCounts)
				.append(this.viewCounts, rhs.viewCounts)
				.append(this.content, rhs.content)
				.append(this.updateTime, rhs.updateTime)
				.append(this.status, rhs.status)
				.append(this.issuer, rhs.issuer)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.newsId) 
						.append(this.subjectIcon) 
				.append(this.subject) 
				.append(this.author) 
				.append(this.createtime) 
				.append(this.replyCounts) 
				.append(this.viewCounts) 
				.append(this.content) 
				.append(this.updateTime) 
				.append(this.status) 
				.append(this.issuer)
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("newsId", this.newsId) 
						.append("subjectIcon", this.subjectIcon) 
				.append("subject", this.subject) 
				.append("author", this.author) 
				.append("createtime", this.createtime) 
				.append("replyCounts", this.replyCounts) 
				.append("viewCounts", this.viewCounts) 
				.append("content", this.content) 
				.append("updateTime", this.updateTime) 
				.append("status", this.status) 
				.append("issuer",this.issuer)
				.toString();
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "newsId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return newsId;
	}

}
