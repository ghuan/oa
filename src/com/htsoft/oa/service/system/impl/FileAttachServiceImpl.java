package com.htsoft.oa.service.system.impl;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.io.File;

import com.htsoft.core.service.impl.BaseServiceImpl;
import com.htsoft.core.util.AppUtil;
import com.htsoft.oa.dao.system.FileAttachDao;
import com.htsoft.oa.model.system.FileAttach;
import com.htsoft.oa.service.system.FileAttachService;

public class FileAttachServiceImpl extends BaseServiceImpl<FileAttach> implements FileAttachService{
	private FileAttachDao dao;
	
	public FileAttachServiceImpl(FileAttachDao dao) {
		super(dao);
		this.dao=dao;
	}

	@Override
	public void removeByPath(String filePath) {
		//删除数据库的文件的同时，也删除对应的文件
		
		FileAttach fileAttach=dao.getByPath(filePath);
		
		String fullFilePath=AppUtil.getAppAbsolutePath()+"/attachFiles/"+filePath;
		
		logger.info("file:" + fullFilePath);
		
		File file=new File(fullFilePath);
		
		if(file.exists()){
			file.delete();
		}
		
		dao.remove(fileAttach);
	}
	
	@Override
	public FileAttach getByPath(String filePath) {
		return dao.getByPath(filePath);
	}

}