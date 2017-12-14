package com.htsoft.oa.action.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.archive.ArchivesDep;
import com.htsoft.oa.service.archive.ArchivesDepService;
/**
 * 
 * @author 
 *
 */
public class ArchivesDepAction extends BaseAction{
	@Resource
	private ArchivesDepService archivesDepService;
	private ArchivesDep archivesDep;
	
	private Long archDepId;

	public Long getArchDepId() {
		return archDepId;
	}

	public void setArchDepId(Long archDepId) {
		this.archDepId = archDepId;
	}

	public ArchivesDep getArchivesDep() {
		return archivesDep;
	}

	public void setArchivesDep(ArchivesDep archivesDep) {
		this.archivesDep = archivesDep;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ArchivesDep> list= archivesDepService.getAll(filter);
		
		Type type=new TypeToken<List<ArchivesDep>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				archivesDepService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		ArchivesDep archivesDep=archivesDepService.get(archDepId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(archivesDep));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		archivesDepService.save(archivesDep);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
