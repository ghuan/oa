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


import com.htsoft.oa.model.archive.ArchivesDoc;
import com.htsoft.oa.service.archive.ArchivesDocService;
/**
 * 
 * @author 
 *
 */
public class ArchivesDocAction extends BaseAction{
	@Resource
	private ArchivesDocService archivesDocService;
	private ArchivesDoc archivesDoc;
	
	private Long docId;

	public Long getDocId() {
		return docId;
	}

	public void setDocId(Long docId) {
		this.docId = docId;
	}

	public ArchivesDoc getArchivesDoc() {
		return archivesDoc;
	}

	public void setArchivesDoc(ArchivesDoc archivesDoc) {
		this.archivesDoc = archivesDoc;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<ArchivesDoc> list= archivesDocService.getAll(filter);
		
		Type type=new TypeToken<List<ArchivesDoc>>(){}.getType();
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
				archivesDocService.remove(new Long(id));
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
		ArchivesDoc archivesDoc=archivesDocService.get(docId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(archivesDoc));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		archivesDocService.save(archivesDoc);
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
