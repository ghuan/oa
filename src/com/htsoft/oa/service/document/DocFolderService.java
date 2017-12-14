package com.htsoft.oa.service.document;

/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.document.DocFolder;

public interface DocFolderService extends BaseService<DocFolder>{
	/**
	 * 按父Id取得某目录下的所有子文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId);
	
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path);
	/**
	 * 获取公共文件夹
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getPublicFolderByParentId(Long parentId);
}


