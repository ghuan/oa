package com.htsoft.oa.dao.system;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.FileAttach;

/**
 * 
 * @author 
 *
 */
public interface FileAttachDao extends BaseDao<FileAttach>{

	public void removeByPath(String filePath);
	
	/**
	 * 按文件路径取得路径
	 * @param filePath
	 * @return
	 */
	public FileAttach getByPath(String filePath);
	
}