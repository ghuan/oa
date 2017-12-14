package com.htsoft.oa.action.document;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.web.action.BaseAction;

import com.htsoft.oa.model.document.DocFolder;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.document.Document;
import com.htsoft.oa.model.system.AppUser;

import com.htsoft.oa.service.document.DocFolderService;
import com.htsoft.oa.service.document.DocPrivilegeService;
import com.htsoft.oa.service.document.DocumentService;
/**
 * 
 * @author csx
 *
 */
public class DocFolderAction extends BaseAction{
	@Resource
	private DocFolderService docFolderService;
	@Resource
	private DocPrivilegeService docPrivilegeService;
	@Resource
	private DocumentService documentService;
	private DocFolder docFolder;
	
	private Long folderId;
	
	private static Integer ALL_RIGHT =7;// 7的二进制为111 
	private static Integer NOT_RIGHT=0;
	private static Long ISPARENT=0l;

	public Long getFolderId() {
		return folderId;
	}

	public void setFolderId(Long folderId) {
		this.folderId = folderId;
	}

	public DocFolder getDocFolder() {
		return docFolder;
	}

	public void setDocFolder(DocFolder docFolder) {
		this.docFolder = docFolder;
	}

	/**
	 * 显示个人文件树
	 */
	public String list(){
			String method=getRequest().getParameter("method");
			StringBuffer buff = new StringBuffer();
			boolean flag=false;
			if(StringUtils.isNotEmpty(method)){
				buff.append("[");
				flag=true;
			}else{
		        buff.append("[{id:'0',text:'我的文件夹',expanded:true,children:[");
			}
		    Long curUserId=ContextUtil.getCurrentUserId();
			List<DocFolder> docList=docFolderService.getUserFolderByParentId(curUserId, 0l);//最顶层父节点
			for(DocFolder folder:docList){
				buff.append("{id:'"+folder.getFolderId()).append("',text:'"+folder.getFolderName()).append("',");
			    buff.append(findChildsFolder(curUserId,folder.getFolderId()));
			}
			if (!docList.isEmpty()) {
				buff.deleteCharAt(buff.length() - 1);
		    }
			if(flag==true){
				buff.append("]");
			}else{
			    buff.append("]}]");
			}
			setJsonString(buff.toString());
			logger.info("tree json:" + buff.toString());
			return SUCCESS;
		
	}
	
	/**
	 * 列表树
	 * @return
	 */
	
	public String tree(){
		StringBuffer buff = new StringBuffer("[{id:'"+0+"',text:'公共文件夹',expanded:true,children:[");
		List<DocFolder> docList=docFolderService.getPublicFolderByParentId(0l);//最顶层父节点
		for(DocFolder folder:docList){
			buff.append("{id:'"+folder.getFolderId()).append("',text:'"+folder.getFolderName()).append("',");
		    buff.append(findChildsFolder(folder.getFolderId()));
		}
		if (!docList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]}]");
		setJsonString(buff.toString());
		
		logger.info("tree json:" + buff.toString());		
		return SUCCESS;
	}
	
	/**
	 * 选择树
	 * @return
	 */
	
	public String select(){
		AppUser appUser =ContextUtil.getCurrentUser();
		StringBuffer buff = new StringBuffer("[{id:'"+0+"',text:'公共文件夹',expanded:true,children:[");
		List<DocFolder> docList=docFolderService.getPublicFolderByParentId(0l);//最顶层父节点
		for(DocFolder docFolder:docList){
			List<Integer> rights=docPrivilegeService.getRightsByFolder(appUser, docFolder.getFolderId());
			Integer right=NOT_RIGHT;
			for(Integer in:rights){
			    right|=in;
			}
			Set<String> roleRight=appUser.getRights();
			if(roleRight.contains("__ALL")){
				right=ALL_RIGHT;
			}
			if(right==NOT_RIGHT){
				buff.append("{id:'"+docFolder.getFolderId()).append("',disabled:true,text:'"+docFolder.getFolderName()).append("',");
				buff.append(findChildsFolderByRight(docFolder.getFolderId(),right,false));
			}else{
				buff.append("{id:'"+docFolder.getFolderId()).append("',text:'"+docFolder.getFolderName()).append("',");
				if(right==ALL_RIGHT){
					buff.append(findChildsFolderByRight(docFolder.getFolderId(),right,true));
				}else{
					buff.append(findChildsFolderByRight(docFolder.getFolderId(),right,false));
				}
			}
		}
		if (!docList.isEmpty()) {
			buff.deleteCharAt(buff.length() - 1);
	    }
		buff.append("]}]");
		setJsonString(buff.toString());		
		return SUCCESS;
	}
	
	/**
	 * 共享列表
	 * @return
	 */
	
	public String share(){
		QueryFilter filter=new QueryFilter(getRequest());
		filter.addFilter("Q_isShared_SN_EQ", "1");
		List<DocFolder> list=docFolderService.getAll(filter);
		Type type=new TypeToken<List<DocFolder>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");		
		jsonString=buff.toString();
		return SUCCESS;
	}

	/**
	 * 找子文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public String findChildsFolder(Long userId,Long parentId){
		StringBuffer sb=new StringBuffer();
		List<DocFolder> list=docFolderService.getUserFolderByParentId(userId, parentId);
		if(list.size()==0){
			sb.append("leaf:true,expanded:true},");
			return sb.toString(); 
		}else {
			sb.append("children:[");
			for(DocFolder folder:list){				
				sb.append("{id:'"+folder.getFolderId()+"',text:'"+folder.getFolderName()+"',");
				sb.append(findChildsFolder(userId,folder.getFolderId()));
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]},");
			return sb.toString();
		}
		
		
	}
	
	/**
	 * 找子文件夹
	 * @param parentId
	 * @return
	 */
	
	public String findChildsFolder(Long parentId){
		StringBuffer sb=new StringBuffer();
		List<DocFolder> list=docFolderService.getPublicFolderByParentId(parentId);
		if(list.size()==0){
			sb.append("leaf:true,expanded:true},");
			return sb.toString(); 
		}else {
			sb.append("children:[");
			for(DocFolder folder:list){				
				sb.append("{id:'"+folder.getFolderId()+"',text:'"+folder.getFolderName()+"',");
				sb.append(findChildsFolder(folder.getFolderId()));
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]},");
			return sb.toString();
		}
		
		
	}
	
    /**
     * 通过权限来查找子文件夹
     * @param parentId
     * @param right
     * @return
     */
	public String findChildsFolderByRight(Long parentId,Integer right,boolean isAllRight){
		StringBuffer sb=new StringBuffer();
		List<DocFolder> list=docFolderService.getPublicFolderByParentId(parentId);
		if(list.size()==0){
			sb.append("leaf:true,expanded:true},");
			return sb.toString(); 
		}else {
			sb.append("children:[");
			for(DocFolder folder:list){
				Integer in=right;
				if(isAllRight){
					in=ALL_RIGHT;
				}else{
					if(in!=NOT_RIGHT){
						in=NOT_RIGHT;
						AppUser appUser=ContextUtil.getCurrentUser();					
					    List<Integer> rights=docPrivilegeService.getRightsByFolder(appUser, folder.getFolderId());
						for(Integer inte:rights){
						    in|=inte;
						}
					}
				}
				if(in==NOT_RIGHT){
					sb.append("{id:'"+folder.getFolderId()+"',disabled:true,text:'"+folder.getFolderName()+"',");
					sb.append(findChildsFolderByRight(folder.getFolderId(),in,isAllRight));
				}else{
					sb.append("{id:'"+folder.getFolderId()+"',text:'"+folder.getFolderName()+"',");
					sb.append(findChildsFolderByRight(folder.getFolderId(),in,isAllRight));
				}
			}
			sb.deleteCharAt(sb.length() - 1);
			sb.append("]},");
			return sb.toString();
		}
		
		
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				docFolderService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 删除目录
	 * @return
	 */
	public String remove(){
		String folderId=getRequest().getParameter("folderId");
		if(StringUtils.isNotEmpty(folderId)){
			DocFolder tmpFolder=docFolderService.get(new Long(folderId));
			List<DocFolder> docFolderList=docFolderService.getFolderLikePath(tmpFolder.getPath());
			//批量删除其下的目录
			for(DocFolder folder:docFolderList){
				List<Document> list=documentService.findByFolder(folder.getPath());
				if(list.size()>0){
					jsonString="{success:false,message:'该目录下还有文档，请把文件删除后删除该目录'}";
					return SUCCESS;
				}
				QueryFilter filter = new QueryFilter(getRequest());
				filter.addFilter("Q_docFolder.folderId_L_EQ",folder.getFolderId().toString());
				List<DocPrivilege> priList= docPrivilegeService.getAll(filter);
				for(DocPrivilege dp:priList){
					docPrivilegeService.remove(dp);
				}
				docFolderService.remove(folder.getFolderId());
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
		DocFolder docFolder=docFolderService.get(folderId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(docFolder));
		sb.append("}");
		setJsonString(sb.toString());
	
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		
		if(docFolder.getFolderId()==null){//添加的操作			
			if(docFolder.getIsShared()!=null){
			    docFolder.setIsShared(DocFolder.IS_SHARED);
			}else{
				docFolder.setAppUser(ContextUtil.getCurrentUser());
				docFolder.setIsShared(DocFolder.IS_NOT_SHARED);	
			}
			docFolderService.save(docFolder);
			
			//保存它的相对路径
			if(docFolder.getParentId()==null || docFolder.getParentId()==0){
				docFolder.setPath(docFolder.getFolderId()+ ".");
			}else{
				DocFolder pFolder=docFolderService.get(docFolder.getParentId());
				if(pFolder!=null){
					docFolder.setPath(pFolder.getPath()+docFolder.getFolderId()+ ".");
				}
			}
			
			docFolderService.save(docFolder);
		}else{
			DocFolder df=docFolderService.get(docFolder.getFolderId());
			
			df.setFolderName(docFolder.getFolderName());
			docFolderService.save(df);
		}
		
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 文件夹移动
	 * @return
	 */
	public String move(){
		String strFolderIdOld=getRequest().getParameter("folderIdOld");
		String strFolderIdNew=getRequest().getParameter("folderIdNew");
		if(StringUtils.isNotEmpty(strFolderIdOld)&&StringUtils.isNotEmpty(strFolderIdNew)){
			Long folderIdOld=new Long(strFolderIdOld);
			Long folderIdNew=new Long(strFolderIdNew);
			String newPath=null;
			DocFolder folderOld=docFolderService.get(folderIdOld);
			DocFolder folderNew=new DocFolder();
			if(folderIdNew>0){				
				folderNew=docFolderService.get(folderIdNew);	
				newPath=folderNew.getPath()+folderIdOld.toString()+".";
				boolean flag=Pattern.compile(folderOld.getPath()).matcher(folderNew.getPath()).find();
				if(flag){
					setJsonString("{success:false,msg:'不能移到子文件夹下！'}");
					return SUCCESS;
				}
			}else{
				folderIdNew=ISPARENT;
				newPath=folderIdOld.toString()+".";
			}
			String oldPath=folderOld.getPath();
			folderOld.setParentId(folderIdNew);
			folderOld.setPath(newPath);		
			List<DocFolder> list=docFolderService.getFolderLikePath(oldPath);
			for(DocFolder folder:list){
				folder.setPath(folder.getPath().replaceFirst(oldPath, newPath));
				docFolderService.save(folder);
			}
			docFolderService.save(folderOld);			
			setJsonString("{success:true}");
		}else{
			setJsonString("{success:false,msg:'请联系系统管理员！'}");
		}
		return SUCCESS;
	}

	
	
}
