package com.htsoft.oa.model.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/


import com.google.gson.annotations.Expose;
import com.htsoft.core.model.BaseModel;

public class Department extends BaseModel {
	@Expose
	private Long depId;
	@Expose
	private String depName;
	@Expose
	private String depDesc;
	@Expose
	private Integer depLevel;
	@Expose
	private Long parentId;
	@Expose
	private String path;
	public Department() {

	}

	public Department(Long depId) {
         this.setDepId(depId);
	}

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

	public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getDepDesc() {
		return depDesc;
	}

	public void setDepDesc(String depDesc) {
		this.depDesc = depDesc;
	}

	public Integer getDepLevel() {
		return depLevel;
	}

	public void setDepLevel(Integer depLevel) {
		this.depLevel = depLevel;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	
	

	
}
