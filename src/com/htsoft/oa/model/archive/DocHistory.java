package com.htsoft.oa.model.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * DocHistory Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * TODO: add class/table comments
 */
public class DocHistory extends com.htsoft.core.model.BaseModel {

    protected Long historyId;
	protected String docName;
	protected String path;
	protected Integer version;
	protected java.util.Date updatetime;
	protected String mender;
	protected com.htsoft.oa.model.system.FileAttach fileAttach;
	protected com.htsoft.oa.model.archive.ArchivesDoc archivesDoc;


	/**
	 * Default Empty Constructor for class DocHistory
	 */
	public DocHistory () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class DocHistory
	 */
	public DocHistory (
		 Long in_historyId
        ) {
		this.setHistoryId(in_historyId);
    }

	
	public com.htsoft.oa.model.system.FileAttach getFileAttach () {
		return fileAttach;
	}	
	
	public void setFileAttach (com.htsoft.oa.model.system.FileAttach in_fileAttach) {
		this.fileAttach = in_fileAttach;
	}
	
	public com.htsoft.oa.model.archive.ArchivesDoc getArchivesDoc () {
		return archivesDoc;
	}	
	
	public void setArchivesDoc (com.htsoft.oa.model.archive.ArchivesDoc in_archivesDoc) {
		this.archivesDoc = in_archivesDoc;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="historyId" type="java.lang.Long" generator-class="native"
	 */
	public Long getHistoryId() {
		return this.historyId;
	}
	
	/**
	 * Set the historyId
	 */	
	public void setHistoryId(Long aValue) {
		this.historyId = aValue;
	}	

	/**
	 * 	 * @return Long
	 */
	public Long getDocId() {
		return this.getArchivesDoc()==null?null:this.getArchivesDoc().getDocId();
	}
	
	/**
	 * Set the docId
	 */	
	public void setDocId(Long aValue) {
	    if (aValue==null) {
	    	archivesDoc = null;
	    } else if (archivesDoc == null) {
	        archivesDoc = new com.htsoft.oa.model.archive.ArchivesDoc(aValue);
	        archivesDoc.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			archivesDoc.setDocId(aValue);
	    }
	}	

	/**
	 * 附件ID	 * @return Long
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
	 * 路径	 * @return String
	 * @hibernate.property column="path" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getPath() {
		return this.path;
	}
	
	/**
	 * Set the path
	 * @spring.validator type="required"
	 */	
	public void setPath(String aValue) {
		this.path = aValue;
	}	

	/**
	 * 版本	 * @return Integer
	 * @hibernate.property column="version" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getVersion() {
		return this.version;
	}
	
	/**
	 * Set the version
	 * @spring.validator type="required"
	 */	
	public void setVersion(Integer aValue) {
		this.version = aValue;
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
	 * 修改人	 * @return String
	 * @hibernate.property column="mender" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getMender() {
		return this.mender;
	}
	
	/**
	 * Set the mender
	 * @spring.validator type="required"
	 */	
	public void setMender(String aValue) {
		this.mender = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof DocHistory)) {
			return false;
		}
		DocHistory rhs = (DocHistory) object;
		return new EqualsBuilder()
				.append(this.historyId, rhs.historyId)
								.append(this.docName, rhs.docName)
				.append(this.path, rhs.path)
				.append(this.version, rhs.version)
				.append(this.updatetime, rhs.updatetime)
				.append(this.mender, rhs.mender)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.historyId) 
								.append(this.docName) 
				.append(this.path) 
				.append(this.version) 
				.append(this.updatetime) 
				.append(this.mender) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("historyId", this.historyId) 
								.append("docName", this.docName) 
				.append("path", this.path) 
				.append("version", this.version) 
				.append("updatetime", this.updatetime) 
				.append("mender", this.mender) 
				.toString();
	}



}
