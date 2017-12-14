package com.htsoft.oa.dao.document;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;
import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.document.DocFolder;

/**
 * 
 * @author 
 *
 */
public interface DocFolderDao extends BaseDao<DocFolder>{
	
	/**
	 * 根据父节点来获取用户文件夹列表
	 * @param userId
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getUserFolderByParentId(Long userId,Long parentId);
	/**
	 * 根据父节点来获取所有子文件夹
	 * @param parentId
	 * @return
	 */
	public List<DocFolder> getPublicFolderByParentId(Long parentId);
	/**
	 * 取得某path下的所有Folder
	 * @param path
	 * @return
	 */
	public List<DocFolder> getFolderLikePath(String path);
	
}