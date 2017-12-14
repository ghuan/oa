package com.htsoft.oa.action.document;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.core.web.paging.PagingBean;


import com.htsoft.oa.model.document.DocFolder;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppRole;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.Department;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.document.DocFolderService;
import com.htsoft.oa.service.document.DocPrivilegeService;
import com.htsoft.oa.service.document.DocumentService;
import com.htsoft.oa.service.system.FileAttachService;

import flexjson.DateTransformer;
import flexjson.JSONSerializer;
/**
 * 
 * @author csx
 *
 */
public class DocumentAction extends BaseAction{
	@Resource
	private DocumentService documentService;
	@Resource
	private FileAttachService fileAttachService;
	@Resource
	private DocFolderService docFolderService;
	@Resource
	private DocPrivilegeService docPrivilegeService;
	private AppUser appUser;
	private Document document;
	private Date from;
	private Date to;
	
	public AppUser getAppUser() {
		return appUser;
	}

	public void setAppUser(AppUser appUser) {
		this.appUser = appUser;
	}

	public Date getFrom() {
		return from;
	}

	public void setFrom(Date from) {
		this.from = from;
	}

	public Date getTo() {
		return to;
	}

	public void setTo(Date to) {
		this.to = to;
	}


	private Long docId;

	public Long getDocId() {
		return docId;
	}

	public void setDocId(Long docId) {
		this.docId = docId;
	}

	public Document getDocument() {
		return document;
	}

	public void setDocument(Document document) {
		this.document = document;
	}
	/**
	 * 文档共享
	 * @return
	 */
	public String share(){
		HttpServletRequest request=getRequest();
		String userIds=request.getParameter("sharedUserIds");
		String depIds=request.getParameter("sharedDepIds");
		String roleIds=request.getParameter("sharedRoleIds");
		String docId=request.getParameter("docId");
		String userNames=request.getParameter("sharedUserNames");
		String depNames=request.getParameter("sharedDepNames");
		String roleNames=request.getParameter("sharedRoleNames");
		if(StringUtils.isNotEmpty(userIds)||StringUtils.isNotEmpty(depIds)||StringUtils.isNotEmpty(roleIds)){
			Document doc=documentService.get(new Long(docId));
			doc.setSharedUserIds(userIds);
			doc.setSharedRoleIds(roleIds);
			doc.setSharedDepIds(depIds);
			doc.setSharedUserNames(userNames);
			doc.setSharedDepNames(depNames);
			doc.setSharedRoleNames(roleNames);
			doc.setIsShared(Document.SHARED);
			documentService.save(doc);
		}
		
		return SUCCESS;
	}
	
	/**
	 * 显示共享列表
	 */
      
	public String shareList(){
		PagingBean pb=getInitPagingBean();
		AppUser appUser=ContextUtil.getCurrentUser();
		Set<AppRole> appRoles=appUser.getRoles();
		Long depId=null;
		if(!appUser.getUserId().equals(AppUser.SUPER_USER)){
		  Department dep=appUser.getDepartment();
		  depId=dep.getDepId();
		}
		Iterator it=appRoles.iterator();
		ArrayList<Long> arrayList=new ArrayList<Long>();
		while(it.hasNext()){
			arrayList.add(((AppRole)it.next()).getRoleId());
		}
		List<Document> list=documentService.findByIsShared(document,from,to,appUser.getUserId(), arrayList, depId,pb);
		Type type=new TypeToken<List<Document>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 显示列表
	 */
	public String list(){
		QueryFilter filter = new QueryFilter(getRequest());
		filter.addFilter("Q_docFolder.appUser.userId_L_EQ", ContextUtil.getCurrentUserId().toString());	
		String folderId=getRequest().getParameter("folderId");
		String path=null;
		if(StringUtils.isNotEmpty(folderId)&&!"0".equals(folderId)){
		     path=docFolderService.get(new Long(folderId)).getPath();
		}	
		if(path!=null){
		   filter.addFilter("Q_docFolder.path_S_LK", path+"%");
		}
		List<Document> list=documentService.getAll(filter);
		Type type=new TypeToken<List<Document>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list, type));
		buff.append("}");		
		jsonString=buff.toString();		
		return SUCCESS;
	}
	
	/**
	 * 公共文档列表
	 */
	
	public String publicList(){
	    PagingBean pb=getInitPagingBean();	
		String strFolderId=getRequest().getParameter("folderId");		
		String path=null;
		if(StringUtils.isNotEmpty(strFolderId)){
			Long folderId=new Long(strFolderId);
			if(folderId>0){
				path=docFolderService.get(new Long(strFolderId)).getPath();
			}
		}
		List<Document> list= documentService.findByPublic(path, document, from, to, ContextUtil.getCurrentUser(), pb);		
		Type type=new TypeToken<List<Document>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		buff.append(gson.toJson(list,type));
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
				//TODO 删除对应的附件文件
				documentService.remove(new Long(id));
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
		Document document=documentService.get(docId);		
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:[");
		sb.append(gson.toJson(document));
		sb.append("]}");
		setJsonString(sb.toString());
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		String fileIds=getRequest().getParameter("fileIds");
		String folderId=getRequest().getParameter("folderId");
		document.setSharedDepIds(document.getSharedDepIds());
		document.setSharedRoleIds(document.getSharedRoleIds());
		document.setSharedUserIds(document.getSharedUserIds());
		if(StringUtils.isNotEmpty(fileIds)){
			document.getAttachFiles().clear();
			String[]fIds=fileIds.split(",");
			for(int i=0;i<fIds.length;i++){
				FileAttach fileAttach=fileAttachService.get(new Long(fIds[i]));
				document.getAttachFiles().add(fileAttach);
			}
		}
		
		if(StringUtils.isNotEmpty(folderId)&&!"0".equals(folderId)){
			DocFolder folder=docFolderService.get(new Long(folderId));
			document.setDocFolder(folder);
		}
		if(document.getDocId()==null){
			AppUser appUser=ContextUtil.getCurrentUser();
			document.setAppUser(appUser);
			document.setFullname(appUser.getFullname());
			document.setCreatetime(new Date());
			document.setUpdatetime(new Date());
			document.setIsShared(Document.NOT_SHARED);
			//包括附件
			if(document.getAttachFiles().size()>0){
				document.setHaveAttach(Document.HAVE_ATTACH);
			}else{
				document.setHaveAttach(Document.NOT_HAVE_ATTACH);
			}
			documentService.save(document);
			
		}else{
			Document doc=documentService.get(document.getDocId());
			doc.setUpdatetime(new Date());
			doc.setDocName(document.getDocName());
			doc.setContent(document.getContent());
			doc.setAttachFiles(document.getAttachFiles());
			if(document.getAttachFiles().size()>0){
				doc.setHaveAttach(Document.HAVE_ATTACH);
			}else{
				doc.setHaveAttach(Document.NOT_HAVE_ATTACH);
			}
			documentService.save(doc);
		}
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 文档页面详细信息显示
	 *
	 * 
	 * 
	 */
	public String detail(){
		String strDocId=getRequest().getParameter("docId");
		if(StringUtils.isNotEmpty(strDocId)){
			Long docId=Long.parseLong(strDocId);
			document=documentService.get(docId);			
		}
		return "detail";
	}
	
	public String publicDetail(){
		String strDocId=getRequest().getParameter("docId");
		if(StringUtils.isNotEmpty(strDocId)){
			Long docId=Long.parseLong(strDocId);
			document=documentService.get(docId);			
		}
		return "publicDetail";
	}
	
	/**
	 * 获取权限的分配
	 * @return
	 */
	public String right(){
		String strDocId=getRequest().getParameter("docId");
		Integer right=0;
		Document document=new Document();
		AppUser appUser=ContextUtil.getCurrentUser();
		if(StringUtils.isNotEmpty(strDocId)){			 
             Long docId=new Long(strDocId);
			 right=docPrivilegeService.getRightsByDocument(appUser,docId);	
             document=documentService.get(docId);
		}
		Integer rightD=0;
		Integer rightM=0;
		String strRight=Integer.toBinaryString(right);
		char[] cc=strRight.toCharArray();
    	  if(cc.length==2){
    		  if(cc[0]=='1'){
    			  rightM=1;
    		  }
    	  }
    	 if(cc.length==3){
    		 if(cc[0]=='1') {
    			 rightD=1;
    		 }
    		  if(cc[1]=='1'){
    			  rightM=1;
    		  }
    	  }
    	
		setJsonString("{success:true,rightM:'"+rightM+"',rightD:'"+rightD+"',docName:'"+document.getDocName()+"'}");
		return SUCCESS;
	}
	
	public String search(){
		PagingBean pb=getInitPagingBean();
		String content=getRequest().getParameter("content");
		AppUser appUser=ContextUtil.getCurrentUser();
		List<Document> list=documentService.searchDocument(appUser, content, pb);
		Gson gson=new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
		Type type=new TypeToken<List<Document>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(pb.getTotalItems()).append(",result:");
		buff.append(gson.toJson(list,type));
		buff.append("}");
		jsonString=buff.toString();
		return SUCCESS;
	}
}
