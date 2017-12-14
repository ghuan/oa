package com.htsoft.oa.service.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.FileAttach;

public interface FileAttachService extends BaseService<FileAttach>{
	
	public void removeByPath(String filePath);
	
	/**
	 * 按文件路径取得路径
	 * @param filePath
	 * @return
	 */
	public FileAttach getByPath(String filePath);
	
}


