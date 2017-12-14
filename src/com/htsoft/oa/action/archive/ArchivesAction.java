package com.htsoft.oa.action.archive;
/*
 *  广州宏天软件有限公司 JOffice协同办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Limited company.
*/
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.BeanUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.archive.Archives;
import com.htsoft.oa.model.archive.ArchivesType;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.service.archive.ArchivesService;
import com.htsoft.oa.service.archive.ArchivesTypeService;
/**
 * 
 * @author 
 *
 */
public class ArchivesAction extends BaseAction{
	@Resource
	private ArchivesService archivesService;
	@Resource
	private ArchivesTypeService archivesTypeService;
	
	private Archives archives;
	
	private Long archivesId;

	public Long getArchivesId() {
		return archivesId;
	}

	public void setArchivesId(Long archivesId) {
		this.archivesId = archivesId;
	}

	public Archives getArchives() {
		return archives;
	}

	public void setArchives(Archives archives) {
		this.archives = archives;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Archives> list= archivesService.getAll(filter);
		
		Type type=new TypeToken<List<Archives>>(){}.getType();
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
				archivesService.remove(new Long(id));
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
		Archives archives=archivesService.get(archivesId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(archives));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		logger.info("enter the save method...");
		
		if(archives.getArchivesId()==null){
			//初始化发文的数据
			AppUser curUser=ContextUtil.getCurrentUser();
			
			archives.setIssuer(curUser.getFullname());
			archives.setIssuerId(curUser.getUserId());
			//设置发文的分类
			ArchivesType archivesType=archivesTypeService.get(archives.getArchivesType().getTypeId());
			archives.setArchivesType(archivesType);
			archives.setTypeName(archivesType.getTypeName());
			
			//发文
			archives.setArchType(Archives.ARCHIVE_TYPE_DISPATCH);
			//草稿状态
			archives.setStatus(Archives.STATUS_DRAFT);
			archives.setCreatetime(new Date());
			archives.setIssueDate(new Date());
			//TODO count the files here
			archives.setFileCounts(0);
			archivesService.save(archives);
			
		}else{
			Archives orgArchives=archivesService.get(archives.getArchivesId());
			try{
				BeanUtil.copyNotNullProperties(orgArchives, archives);
				archivesService.save(orgArchives);
			}catch(Exception ex){
				logger.error("update achives has errors:" + ex.getMessage());
			}
			
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
}
