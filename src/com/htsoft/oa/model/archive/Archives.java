package com.htsoft.oa.model.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * Archives Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 */
public class Archives extends com.htsoft.core.model.BaseModel {
	/**
	 * 公文状态--草稿
	 */
	public static final Short STATUS_DRAFT=0;
	/**
	 * 公文状态--发文
	 */
	public static final Short STATUS_ISSUE=1;
	/**
	 * 公文状态--归档
	 */
	public static final Short STATUS_ARCHIVE=2;
	
	/**
	 * 发文
	 */
	public static final Short ARCHIVE_TYPE_DISPATCH=0;
	
	/**
	 * 收文
	 */
	public static final Short ARCHIVE_TYPE_RECEIVE=1;
	
    protected Long archivesId;
	protected String typeName;
	protected String archivesNo;
	protected String issueDep;
	protected String subject;
	protected java.util.Date issueDate;
	protected java.util.Date createtime;
	
	protected Short status;
	protected String shortContent;
	protected Integer fileCounts;
	protected String handleOpinion;
	protected String privacyLevel;
	protected String urgentLevel;
	protected String issuer;
	protected Long issuerId;
	protected String keywords;
	protected String sources;
	protected Short archType;
	protected com.htsoft.oa.model.archive.ArchivesType archivesType;
	protected com.htsoft.oa.model.system.Department department;

	protected java.util.Set archivesDeps = new java.util.HashSet();
	
	/**
	 * Default Empty Constructor for class Archives
	 */
	public Archives () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class Archives
	 */
	public Archives (
		 Long in_archivesId
        ) {
		this.setArchivesId(in_archivesId);
    }

	
	public com.htsoft.oa.model.archive.ArchivesType getArchivesType () {
		return archivesType;
	}	
	
	public void setArchivesType (com.htsoft.oa.model.archive.ArchivesType in_archivesType) {
		this.archivesType = in_archivesType;
	}
	
	public com.htsoft.oa.model.system.Department getDepartment () {
		return department;
	}	
	
	public void setDepartment (com.htsoft.oa.model.system.Department in_department) {
		this.department = in_department;
	}

	public java.util.Set getArchivesDeps () {
		return archivesDeps;
	}	
	
	public void setArchivesDeps (java.util.Set in_archivesDeps) {
		this.archivesDeps = in_archivesDeps;
	}

	/**
	 * 	 * @return Long
     * @hibernate.id column="archivesId" type="java.lang.Long" generator-class="native"
	 */
	public Long getArchivesId() {
		return this.archivesId;
	}
	
	/**
	 * Set the archivesId
	 */	
	public void setArchivesId(Long aValue) {
		this.archivesId = aValue;
	}	

	/**
	 * 公文类型	 * @return Long
	 */
	public Long getTypeId() {
		return this.getArchivesType()==null?null:this.getArchivesType().getTypeId();
	}
	
	/**
	 * Set the typeId
	 */	
	public void setTypeId(Long aValue) {
	    if (aValue==null) {
	    	archivesType = null;
	    } else if (archivesType == null) {
	        archivesType = new com.htsoft.oa.model.archive.ArchivesType(aValue);
	        archivesType.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			archivesType.setTypeId(aValue);
	    }
	}	

	/**
	 * 公文类型名称	 * @return String
	 * @hibernate.property column="typeName" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getTypeName() {
		return this.typeName;
	}
	
	/**
	 * Set the typeName
	 * @spring.validator type="required"
	 */	
	public void setTypeName(String aValue) {
		this.typeName = aValue;
	}	

	/**
	 * 发文字号	 * @return String
	 * @hibernate.property column="archivesNo" type="java.lang.String" length="100" not-null="true" unique="false"
	 */
	public String getArchivesNo() {
		return this.archivesNo;
	}
	
	/**
	 * Set the archivesNo
	 * @spring.validator type="required"
	 */	
	public void setArchivesNo(String aValue) {
		this.archivesNo = aValue;
	}	

	/**
	 * 发文机关或部门	 * @return String
	 * @hibernate.property column="issueDep" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getIssueDep() {
		return this.issueDep;
	}
	
	/**
	 * Set the issueDep
	 * @spring.validator type="required"
	 */	
	public void setIssueDep(String aValue) {
		this.issueDep = aValue;
	}	

	/**
	 * 发文部门ID	 * @return Long
	 */
	public Long getDepId() {
		return this.getDepartment()==null?null:this.getDepartment().getDepId();
	}
	
	/**
	 * Set the depId
	 */	
	public void setDepId(Long aValue) {
	    if (aValue==null) {
	    	department = null;
	    } else if (department == null) {
	        department = new com.htsoft.oa.model.system.Department(aValue);
	        department.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			department.setDepId(aValue);
	    }
	}	

	/**
	 * 文件标题	 * @return String
	 * @hibernate.property column="subject" type="java.lang.String" length="256" not-null="true" unique="false"
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
	 * 发布日期	 * @return java.util.Date
	 * @hibernate.property column="issueDate" type="java.util.Date" length="19" not-null="true" unique="false"
	 */
	public java.util.Date getIssueDate() {
		return this.issueDate;
	}
	
	/**
	 * Set the issueDate
	 * @spring.validator type="required"
	 */	
	public void setIssueDate(java.util.Date aValue) {
		this.issueDate = aValue;
	}	

	/**
	 * 公文状态
            0=拟稿、修改状态
            1=发文状态
            2=归档状态	 * @return Short
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

	/**
	 * 内容简介	 * @return String
	 * @hibernate.property column="shortContent" type="java.lang.String" length="1024" not-null="false" unique="false"
	 */
	public String getShortContent() {
		return this.shortContent;
	}
	
	/**
	 * Set the shortContent
	 */	
	public void setShortContent(String aValue) {
		this.shortContent = aValue;
	}	

	/**
	 * 文件数	 * @return Integer
	 * @hibernate.property column="fileCounts" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getFileCounts() {
		return this.fileCounts;
	}
	
	/**
	 * Set the fileCounts
	 * @spring.validator type="required"
	 */	
	public void setFileCounts(Integer aValue) {
		this.fileCounts = aValue;
	}	

	/**
	 * 拟办意见	 * @return String
	 * @hibernate.property column="handleOpinion" type="java.lang.String" length="512" not-null="false" unique="false"
	 */
	public String getHandleOpinion() {
		return this.handleOpinion;
	}
	
	/**
	 * Set the handleOpinion
	 */	
	public void setHandleOpinion(String aValue) {
		this.handleOpinion = aValue;
	}	

	/**
	 * 秘密等级
            普通
            秘密
            机密
            绝密	 * @return String
	 * @hibernate.property column="privacyLevel" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getPrivacyLevel() {
		return this.privacyLevel;
	}
	
	/**
	 * Set the privacyLevel
	 */	
	public void setPrivacyLevel(String aValue) {
		this.privacyLevel = aValue;
	}	

	/**
	 * 紧急程度
            普通
            紧急
            特急
            特提	 * @return String
	 * @hibernate.property column="urgentLevel" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getUrgentLevel() {
		return this.urgentLevel;
	}
	
	/**
	 * Set the urgentLevel
	 */	
	public void setUrgentLevel(String aValue) {
		this.urgentLevel = aValue;
	}	

	/**
	 * 发文人	 * @return String
	 * @hibernate.property column="issuer" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getIssuer() {
		return this.issuer;
	}
	
	/**
	 * Set the issuer
	 */	
	public void setIssuer(String aValue) {
		this.issuer = aValue;
	}	

	/**
	 * 发文人ID	 * @return Long
	 * @hibernate.property column="issuerId" type="java.lang.Long" length="19" not-null="false" unique="false"
	 */
	public Long getIssuerId() {
		return this.issuerId;
	}
	
	/**
	 * Set the issuerId
	 */	
	public void setIssuerId(Long aValue) {
		this.issuerId = aValue;
	}	

	/**
	 * 主题词	 * @return String
	 * @hibernate.property column="keywords" type="java.lang.String" length="256" not-null="false" unique="false"
	 */
	public String getKeywords() {
		return this.keywords;
	}
	
	/**
	 * Set the keywords
	 */	
	public void setKeywords(String aValue) {
		this.keywords = aValue;
	}	

	/**
	 * 公文来源
            仅在收文中指定，发公文不需要指定
            上级公文
            下级公文	 * @return String
	 * @hibernate.property column="sources" type="java.lang.String" length="50" not-null="false" unique="false"
	 */
	public String getSources() {
		return this.sources;
	}
	
	/**
	 * Set the sources
	 */	
	public void setSources(String aValue) {
		this.sources = aValue;
	}	

	/**
	 * 	 * @return Short
	 * @hibernate.property column="archType" type="java.lang.Short" length="5" not-null="true" unique="false"
	 */
	public Short getArchType() {
		return this.archType;
	}
	
	/**
	 * Set the archType
	 * @spring.validator type="required"
	 */	
	public void setArchType(Short aValue) {
		this.archType = aValue;
	}	

	public java.util.Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(java.util.Date createtime) {
		this.createtime = createtime;
	}

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof Archives)) {
			return false;
		}
		Archives rhs = (Archives) object;
		return new EqualsBuilder()
				.append(this.archivesId, rhs.archivesId)
						.append(this.typeName, rhs.typeName)
				.append(this.archivesNo, rhs.archivesNo)
				.append(this.issueDep, rhs.issueDep)
						.append(this.subject, rhs.subject)
				.append(this.issueDate, rhs.issueDate)
				.append(this.status, rhs.status)
				.append(this.shortContent, rhs.shortContent)
				.append(this.fileCounts, rhs.fileCounts)
				.append(this.handleOpinion, rhs.handleOpinion)
				.append(this.privacyLevel, rhs.privacyLevel)
				.append(this.urgentLevel, rhs.urgentLevel)
				.append(this.issuer, rhs.issuer)
				.append(this.issuerId, rhs.issuerId)
				.append(this.keywords, rhs.keywords)
				.append(this.sources, rhs.sources)
				.append(this.archType, rhs.archType)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.archivesId) 
						.append(this.typeName) 
				.append(this.archivesNo) 
				.append(this.issueDep) 
						.append(this.subject) 
				.append(this.issueDate) 
				.append(this.status) 
				.append(this.shortContent) 
				.append(this.fileCounts) 
				.append(this.handleOpinion) 
				.append(this.privacyLevel) 
				.append(this.urgentLevel) 
				.append(this.issuer) 
				.append(this.issuerId) 
				.append(this.keywords) 
				.append(this.sources) 
				.append(this.archType) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("archivesId", this.archivesId) 
						.append("typeName", this.typeName) 
				.append("archivesNo", this.archivesNo) 
				.append("issueDep", this.issueDep) 
						.append("subject", this.subject) 
				.append("issueDate", this.issueDate) 
				.append("status", this.status) 
				.append("shortContent", this.shortContent) 
				.append("fileCounts", this.fileCounts) 
				.append("handleOpinion", this.handleOpinion) 
				.append("privacyLevel", this.privacyLevel) 
				.append("urgentLevel", this.urgentLevel) 
				.append("issuer", this.issuer) 
				.append("issuerId", this.issuerId) 
				.append("keywords", this.keywords) 
				.append("sources", this.sources) 
				.append("archType", this.archType) 
				.toString();
	}



}
