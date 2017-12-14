package com.htsoft.oa.model.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.EqualsBuilder;

/**
 * ReportParam Base Java Bean, base class for the.oa.model, mapped directly to database table
 * 
 * Avoid changing this file if not necessary, will be overwritten. 
 *
 * ������������
 */
public class ReportParam extends com.htsoft.core.model.BaseModel {

    protected Long paramId;
	protected String paramName;
	protected String paramKey;
	protected String defaultVal;
	protected String paramType;
	protected Integer sn;
	protected com.htsoft.oa.model.system.ReportTemplate reportTemplate;


	/**
	 * Default Empty Constructor for class ReportParam
	 */
	public ReportParam () {
		super();
	}
	
	/**
	 * Default Key Fields Constructor for class ReportParam
	 */
	public ReportParam (
		 Long in_paramId
        ) {
		this.setParamId(in_paramId);
    }

	
	public com.htsoft.oa.model.system.ReportTemplate getReportTemplate () {
		return reportTemplate;
	}	
	
	public void setReportTemplate (com.htsoft.oa.model.system.ReportTemplate in_reportTemplate) {
		this.reportTemplate = in_reportTemplate;
	}
    

	/**
	 * 	 * @return Long
     * @hibernate.id column="paramId" type="java.lang.Long" generator-class="native"
	 */
	public Long getParamId() {
		return this.paramId;
	}
	
	/**
	 * Set the paramId
	 */	
	public void setParamId(Long aValue) {
		this.paramId = aValue;
	}	

	/**
	 * 所属报表	 * @return Long
	 */
	public Long getReportId() {
		return this.getReportTemplate()==null?null:this.getReportTemplate().getReportId();
	}
	
	/**
	 * Set the reportId
	 */	
	public void setReportId(Long aValue) {
	    if (aValue==null) {
	    	reportTemplate = null;
	    } else if (reportTemplate == null) {
	        reportTemplate = new com.htsoft.oa.model.system.ReportTemplate(aValue);
	        reportTemplate.setVersion(new Integer(0));//set a version to cheat hibernate only
	    } else {
			reportTemplate.setReportId(aValue);
	    }
	}	

	/**
	 * 参数名称	 * @return String
	 * @hibernate.property column="paramName" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getParamName() {
		return this.paramName;
	}
	
	/**
	 * Set the paramName
	 * @spring.validator type="required"
	 */	
	public void setParamName(String aValue) {
		this.paramName = aValue;
	}	

	/**
	 * 参数Key	 * @return String
	 * @hibernate.property column="paramKey" type="java.lang.String" length="64" not-null="true" unique="false"
	 */
	public String getParamKey() {
		return this.paramKey;
	}
	
	/**
	 * Set the paramKey
	 * @spring.validator type="required"
	 */	
	public void setParamKey(String aValue) {
		this.paramKey = aValue;
	}	

	/**
	 * 缺省值	 * @return String
	 * @hibernate.property column="defaultVal" type="java.lang.String" length="128" not-null="true" unique="false"
	 */
	public String getDefaultVal() {
		return this.defaultVal;
	}
	
	/**
	 * Set the defaultVal
	 * @spring.validator type="required"
	 */	
	public void setDefaultVal(String aValue) {
		this.defaultVal = aValue;
	}	

	/**
	 * 类型
            字符类型--varchar
            整型--int
            精度型--decimal
            日期型--date
            日期时间型--datetime
            	 * @return String
	 * @hibernate.property column="paramType" type="java.lang.String" length="32" not-null="true" unique="false"
	 */
	public String getParamType() {
		return this.paramType;
	}
	
	/**
	 * Set the paramType
	 * @spring.validator type="required"
	 */	
	public void setParamType(String aValue) {
		this.paramType = aValue;
	}	

	/**
	 * 系列号	 * @return Integer
	 * @hibernate.property column="sn" type="java.lang.Integer" length="10" not-null="true" unique="false"
	 */
	public Integer getSn() {
		return this.sn;
	}
	
	/**
	 * Set the sn
	 * @spring.validator type="required"
	 */	
	public void setSn(Integer aValue) {
		this.sn = aValue;
	}	

	/**
	 * @see java.lang.Object#equals(Object)
	 */
	public boolean equals(Object object) {
		if (!(object instanceof ReportParam)) {
			return false;
		}
		ReportParam rhs = (ReportParam) object;
		return new EqualsBuilder()
				.append(this.paramId, rhs.paramId)
						.append(this.paramName, rhs.paramName)
				.append(this.paramKey, rhs.paramKey)
				.append(this.defaultVal, rhs.defaultVal)
				.append(this.paramType, rhs.paramType)
				.append(this.sn, rhs.sn)
				.isEquals();
	}

	/**
	 * @see java.lang.Object#hashCode()
	 */
	public int hashCode() {
		return new HashCodeBuilder(-82280557, -700257973)
				.append(this.paramId) 
						.append(this.paramName) 
				.append(this.paramKey) 
				.append(this.defaultVal) 
				.append(this.paramType) 
				.append(this.sn) 
				.toHashCode();
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this)
				.append("paramId", this.paramId) 
						.append("paramName", this.paramName) 
				.append("paramKey", this.paramKey) 
				.append("defaultVal", this.defaultVal) 
				.append("paramType", this.paramType) 
				.append("sn", this.sn) 
				.toString();
	}



}
