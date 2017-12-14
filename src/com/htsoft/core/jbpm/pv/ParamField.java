package com.htsoft.core.jbpm.pv;
/*
 *  广州宏天软件有限公司 OA办公自动管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
/**
 * 参数字段
 * @author csx
 *
 */
public class ParamField {
	
	public final static String FIELD_TYPE_DATE="date";
	public final static String FIELD_TYPE_DATETIME="datetime";
	public final static String FIELD_TYPE_INT="int";
	public final static String FIELD_TYPE_LONG="long";
	public final static String FIELD_TYPE_DECIMAL="decimal";
	public final static String FIELD_TYPE_VARCHAR="varchar";
	public final static String FIELD_TYPE_BOOL="bool";
	public final static String FIELD_TYPE_TEXT="text";
	public final static String FIELD_TYPE_FILE="file";

	private String name;
	private String type;
	private String label;
	private Integer length;
	//是否显示 1=show,0=unshow
	private Short isShowed;
	
	//暂存参数的值
	private String value;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		//对于Boolean的类型特别处理
		if(FIELD_TYPE_BOOL.equals(type)){
			if(value!=null){
				this.value="1";
			}else{
				this.value="0";
			}
		}else{
			this.value = value;
		}
	}

	public ParamField(String name,String type,String label,Integer length,Short isShowed){
		this.name=name;
		this.type=type;
		this.label=label;
		this.length=length;
		this.isShowed=isShowed;
	}
	
	public ParamField() {
		
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public Integer getLength() {
		return length;
	}
	public void setLength(Integer length) {
		this.length = length;
	}

	public Short getIsShowed() {
		return isShowed;
	}

	public void setIsShowed(Short isShowed) {
		this.isShowed = isShowed;
	}

}
