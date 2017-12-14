package com.htsoft.oa.model.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/

import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

import com.google.gson.annotations.Expose;

/**
 * FileAttach Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * 
 */
public class FileAttach extends com.htsoft.core.model.BaseModel {

	@Expose
    protected Long fileId;
	@Expose
	protected String fileName;
	@Expose
	protected String filePath;
	@Expose
	protected java.util.Date createtime;
	@Expose
	protected String ext;
	@Expose
	protected String fileType;
	@Expose
	protected String note;
	@Expose
	protected String creator;


	/**
	 * Default Empty Constructor for class FileAttach
	 */
	public FileAttach () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class FileAttach
	 */
	public FileAttach (
		 Long in_fileId
        ) {
		this.setFileId(in_fileId);
    }

    

	/**
	 * 	 * @return Long
     * @hibernate.id column="fileId" type="java.lang.Long" generator-class="native"
	 */
	public Long getFileId() {
		return this.fileId;
	}
	
	/**
	 * Set the fileId
	 */	
	public void setFileId(Long aValue) {
		this.fileId = aValue;
	}	

	/**
	 * 文件名	 * @return String
	 * @hibernate.property column="fileName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getFileName() {
		return this.fileName;
	}
	
	/**
	 * Set the fileName
	 * @spring.validator type="required"
	 */	
	public void setFileName(String aValue) {
		this.fileName = aValue;
	}	

	/**
	 * 文件路径	 * @return String
	 * @hibernate.property column="filePath" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getFilePath() {
		return this.filePath;
	}
	
	/**
	 * Set the filePath
	 * @spring.validator type="required"
	 */	
	public void setFilePath(String aValue) {
		this.filePath = aValue;
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
	 * 扩展名	 * @return String
	 * @hibernate.property column="ext" type="java.lang.String" length="32" not-null="false" unique="false"
	 */
	public String getExt() {
		return this.ext;
	}
	
	/**
	 * Set the ext
	 */	
	public void setExt(String aValue) {
		this.ext = aValue;
	}	

	/**
	 * 附件类型
            如：邮件附件	 * @return String
	 * @hibernate.property column="fileType" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getFileType() {
		return this.fileType;
	}
	
	/**
	 * Set the type
	 * @spring.validator type="required"
	 */	
	public void setFileType(String aValue) {
		this.fileType = aValue;
	}	

	/**
	 * 说明	 * @return String
	 * @hibernate.property column="note" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getNote() {
		return this.note;
	}
	
	/**
	 * Set the note
	 */	
	public void setNote(String aValue) {
		this.note = aValue;
	}	

	/**
	 * 上传者	 * @return String
	 * @hibernate.property column="creator" type="java.lang.String" length="32" not-null="true" unique="false"
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
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof FileAttach)) {
			return false;
		}
		FileAttach rhs = (FileAttach) object;
		return new EqualsBuilder()
				.append(this.fileId, rhs.fileId)
				.append(this.fileName, rhs.fileName)
				.append(this.filePath, rhs.filePath)
				.append(this.createtime, rhs.createtime)
				.append(this.ext, rhs.ext)
				.append(this.fileType, rhs.fileType)
				.append(this.note, rhs.note)
				.append(this.creator, rhs.creator)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.fileId) 
				.append(this.fileName) 
				.append(this.filePath) 
				.append(this.createtime) 
				.append(this.ext) 
				.append(this.fileType) 
				.append(this.note) 
				.append(this.creator) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("fileId", this.fileId) 
				.append("fileName", this.fileName) 
				.append("filePath", this.filePath) 
				.append("createtime", this.createtime) 
				.append("ext", this.ext) 
				.append("type", this.fileType) 
				.append("note", this.note) 
				.append("creator", this.creator) 
				.toString();
	}

	/**
	 * Return the name of the first key column
	 */
	public String getFirstKeyColumnName() {
		return "fileId";
	}
	
	/**
	 * Return the Id (pk) of the entity, must be Integer
	 */
	public Long getId() {
		return fileId;
	}

}
