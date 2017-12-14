package com.htsoft.core.web.servlet;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.htsoft.core.util.AppUtil;
import com.htsoft.core.util.ContextUtil;
import com.htsoft.core.util.FileUtil;
import com.htsoft.oa.model.system.AppUser;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;

/**
 * 文件上传类
 * @author 宏天软件
 *
 */
public class FileUploadServlet extends HttpServlet{
	
	private Log logger=LogFactory.getLog(FileUploadServlet.class);
	
	private ServletConfig servletConfig=null;
	
	private FileAttachService fileAttachService=(FileAttachService)AppUtil.getBean("fileAttachService");
	
	private String uploadPath=""; // 上传文件的目录   
	private String tempPath=""; // 临时文件目录 
	
	private String fileCat="others";
	//指定保存至某个目录,若提交时，指定了该参数值，则表示保存的操作　
	private String filePath="";
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		req.setCharacterEncoding("UTF-8");
		resp.setCharacterEncoding("UTF-8");
		try {
			
			DiskFileItemFactory factory = new DiskFileItemFactory();
			// 缓存大小
			factory.setSizeThreshold(4096);
			factory.setRepository(new File(tempPath));
			ServletFileUpload fu=new ServletFileUpload(factory);

	        List<FileItem> fileItems = fu.parseRequest(req); 
	        //取得相关参数值
	        for(FileItem fi:fileItems){
	        	if("file_cat".equals(fi.getFieldName())){
	        		fileCat=fi.getString();
	        		//break;
	        	}
	        	if("file_path".equals(fi.getFieldName())){
	        		filePath=fi.getString();
	        	}
	        }

	        Iterator i = fileItems.iterator();
	        //目前处理每次只上传一个文件
	        while(i.hasNext()) {
	            
	        	FileItem fi = (FileItem)i.next();
	        
	            if(fi.getContentType()==null){
	            	continue;
	            }
	            
	            //返回文件名及路径及fileId.
	            String path = fi.getName();
	            
		        int start=path.lastIndexOf("\\");
		        
		        //原文件名
		        String fileName=path.substring(start+1);
		        
		        String relativeFullPath=null;
		        
		        if(!"".equals(filePath)){
		        	relativeFullPath=filePath;
		        }else{
		        	relativeFullPath=fileCat+"/" + FileUtil.generateFilename(fileName);
		        }
		        
		        int index=relativeFullPath.lastIndexOf("/");

		        File dirPath=new File(uploadPath+"/" + relativeFullPath.substring(0,index+1));
		        
		        if(!dirPath.exists()){
		        	dirPath.mkdirs();
		        }

		        fi.write(new File(uploadPath+"/" + relativeFullPath));
		        FileAttach file=null;
		        
		        if(!"".equals(filePath)){
		        	file=fileAttachService.getByPath(filePath);
		        }
		        
		        if(file==null)
		        {
		        	file=new FileAttach();
			        file.setCreatetime(new Date());
			        AppUser curUser=ContextUtil.getCurrentUser();
			        if(curUser!=null){
			        	file.setCreator(curUser.getFullname());
			        }else{
			        	file.setCreator("UNKown");
			        }
			        int dotIndex=fileName.lastIndexOf(".");
			        file.setExt(fileName.substring(dotIndex+1));
			        file.setFileName(fileName);
			        file.setFilePath(relativeFullPath);
			        file.setFileType(fileCat);
			        file.setNote(fi.getSize()+" bytes");
			        fileAttachService.save(file);
		        }
		        
		        StringBuffer sb=new StringBuffer("{success:true");
		        sb.append(",fileId:").append(file.getFileId())
		        .append(",fileName:'").append(file.getFileName())
		        .append("',filePath:'").append(file.getFilePath()).append("',message:'upload file success.("+ fi.getSize()+" bytes)'");
		        sb.append("}");
		        resp.getWriter().write(sb.toString());
	        }
	        
	    }    
	    catch(Exception e) {    
	    	resp.getWriter().write("{'success':false,'message':'error..."+e.getMessage()+"'}");
	    }    
	}
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		this.servletConfig=config;
	}
	
	public void init() throws ServletException {
	   
		//初始化上传的路径及临时文件路径
		
		uploadPath=getServletContext().getRealPath("/attachFiles/");
		
	    File uploadPathFile=new File(uploadPath);
	    if(!uploadPathFile.exists()){
	    	uploadPathFile.mkdirs();
	    }
	    tempPath=uploadPath+"/temp";
	    
	    File tempPathFile=new File(tempPath); 
	    if(!tempPathFile.exists()){
	    	tempPathFile.mkdirs();
	    }
	}
	
	
	/*------------------------------------------------------------
	保存文档到服务器磁盘，返回值true，保存成功，返回值为false时，保存失败。
	--------------------------------------------------------------*/
	public boolean saveFileToDisk(String officefileNameDisk)
	{
		File officeFileUpload = null;
		FileItem officeFileItem =null ;
		
		boolean result=true ;
		try
		{
			if(!"".equalsIgnoreCase(officefileNameDisk)&&officeFileItem!=null)
			{
				officeFileUpload =  new File(uploadPath+officefileNameDisk);
				officeFileItem.write(officeFileUpload);
			}
		}catch(FileNotFoundException e){
			
		}catch(Exception e){
			e.printStackTrace();
			result=false;
		}
		return result;	
	}
	
	
}
