package com.htsoft.oa.model.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * ArchivesDoc Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class ArchivesDoc extends com.htsoft.core.model.BaseModel {

    protected Long docId;
	protected String creator;
	protected Long creatorId;
	protected Long menderId;
	protected String mender;
	protected String docName;
	protected Short docStatus;
	protected Integer curVersion;
	protected String docPath;
	protected java.util.Date updatetime;
	protected java.util.Date createtime;
	protected com.htsoft.oa.model.system.FileAttach fileAttach;

	protected java.util.Set docHistorys = new java.util.HashSet();

	/**
	 * Default Empty Constructor for class ArchivesDoc
	 */
	public ArchivesDoc () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ArchivesDoc
	 */
	public ArchivesDoc (
		 Long in_docId
        ) {
		this.setDocId(in_docId);
    }

	
	public com.htsoft.oa.model.system.FileAttach getFileAttach () {
		return fileAttach;
	}	
	
	public void setFileAttach (com.htsoft.oa.model.system.FileAttach in_fileAttach) {
		this.fileAttach = in_fileAttach;
	}

	public java.util.Set getDocHistorys () {
		return docHistorys;
	}	
	
	public void setDocHistorys (java.util.Set in_docHistorys) {
		this.docHistorys = in_docHistorys;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="docId" type="java.lang.Long" generator-class="native"
	 */
	public Long getDocId() {
		return this.docId;
	}
	
	/**
	 * Set the docId
	 */	
	public void setDocId(Long aValue) {
		this.docId = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getFileId() {
		return this.getFileAttach()==null?null:this.getFileAttach().getFileId();
	}
	
	/**
	 * Set the fileId
	 */	
	public void setFileId(Long aValue) {
	    if (aValue==null) {
	    	fileAttach = null;
	    } else if (fileAttach == null) {
	        fileAttach = new com.htsoft.oa.model.system.FileAttach(aValue);
	        fileAttach.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			fileAttach.setFileId(aValue);
	    }
	}	

	/**
	 * 拟稿人	 * @return String
	 * @hibernate.property column="creator" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getCreator() {
		return this.creator;
	}
	
	/**
	 * Set the creator
	 * @spring.validator type="required"
	 */	
	public void setCreator(String aValue) {
		this.creator = aValue;
	}	

	/**
	 * 拟稿人ID	 * @return Long
	 * @hibernate.property column="creatorId" type="java.lang.Long" length="19" not-null="true" unique="false"
	 */
	public Long getCreatorId() {
		return this.creatorId;
	}
	
	/**
	 * Set the creatorId
	 * @spring.validator type="required"
	 */	
	public void setCreatorId(Long aValue) {
		this.creatorId = aValue;
	}	

	/**
	 * 	 * @return Long
	 * @hibernate.property column="menderId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getMenderId() {
		return this.menderId;
	}
	
	/**
	 * Set the menderId
	 */	
	public void setMenderId(Long aValue) {
		this.menderId = aValue;
	}	

	/**
	 * 修改人	 * @return String
	 * @hibernate.property column="mender" type="java.lang.String" length="64" not-null="false" unique="false"
	 */
	public String getMender() {
		return this.mender;
	}
	
	/**
	 * Set the mender
	 */	
	public void setMender(String aValue) {
		this.mender = aValue;
	}	

	/**
	 * 文档名称	 * @return String
	 * @hibernate.property column="docName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getDocName() {
		return this.docName;
	}
	
	/**
	 * Set the docName
	 * @spring.validator type="required"
	 */	
	public void setDocName(String aValue) {
		this.docName = aValue;
	}	

	/**
	 * 文档状态
            0=修改中
            1=修改完成	 * @return Short
	 * @hibernate.property column="docStatus" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getDocStatus() {
		return this.docStatus;
	}
	
	/**
	 * Set the docStatus
	 * @spring.validator type="required"
	 */	
	public void setDocStatus(Short aValue) {
		this.docStatus = aValue;
	}	

	/**
	 * 当前版本
            取当前最新的版本	 * @return Integer
	 * @hibernate.property column="curVersion" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getCurVersion() {
		return this.curVersion;
	}
	
	/**
	 * Set the curVersion
	 * @spring.validator type="required"
	 */	
	public void setCurVersion(Integer aValue) {
		this.curVersion = aValue;
	}	

	/**
	 * 文档路径	 * @return String
	 * @hibernate.property column="docPath" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getDocPath() {
		return this.docPath;
	}
	
	/**
	 * Set the docPath
	 * @spring.validator type="required"
	 */	
	public void setDocPath(String aValue) {
		this.docPath = aValue;
	}	

	/**
	 * 更新时间	 * @return java.util.Date
	 * @hibernate.property column="updatetime" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getUpdatetime() {
		return this.updatetime;
	}
	
	/**
	 * Set the updatetime
	 * @spring.validator type="required"
	 */	
	public void setUpdatetime(java.util.Date aValue) {
		this.updatetime = aValue;
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ArchivesDoc)) {
			return false;
		}
		ArchivesDoc rhs = (ArchivesDoc) object;
		return new EqualsBuilder()
				.append(this.docId, rhs.docId)
						.append(this.creator, rhs.creator)
				.append(this.creatorId, rhs.creatorId)
				.append(this.menderId, rhs.menderId)
				.append(this.mender, rhs.mender)
				.append(this.docName, rhs.docName)
				.append(this.docStatus, rhs.docStatus)
				.append(this.curVersion, rhs.curVersion)
				.append(this.docPath, rhs.docPath)
				.append(this.updatetime, rhs.updatetime)
				.append(this.createtime, rhs.createtime)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.docId) 
						.append(this.creator) 
				.append(this.creatorId) 
				.append(this.menderId) 
				.append(this.mender) 
				.append(this.docName) 
				.append(this.docStatus) 
				.append(this.curVersion) 
				.append(this.docPath) 
				.append(this.updatetime) 
				.append(this.createtime) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("docId", this.docId) 
						.append("creator", this.creator) 
				.append("creatorId", this.creatorId) 
				.append("menderId", this.menderId) 
				.append("mender", this.mender) 
				.append("docName", this.docName) 
				.append("docStatus", this.docStatus) 
				.append("curVersion", this.curVersion) 
				.append("docPath", this.docPath) 
				.append("updatetime", this.updatetime) 
				.append("createtime", this.createtime) 
				.toString();
	}



}
