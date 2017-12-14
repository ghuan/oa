package com.htsoft.oa.dao.document;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.system.AppUser;

/**
 * 
 * @author 
 *
 */
public interface DocPrivilegeDao extends BaseDao<DocPrivilege>{
	
	/**
	 * 获取全部权限
	 * @param docPrivilege
	 * @param folderId
	 * @param pb
	 * @return
	 */
	public List<DocPrivilege> getAll(DocPrivilege docPrivilege,Long folderId,PagingBean pb);
	/**
	 * 获取某个人的全部公共文档权限
	 * @param docPrivilege
	 * @param urdId
	 * @return
	 */
	public List<DocPrivilege> getByPublic(DocPrivilege docPrivilege,Long urdId);
	/**
	 * 获取单个文件夹的权限数组
	 * @param user
	 * @param folderId
	 * @return
	 */
	public List<Integer> getRightsByFolder(AppUser user, Long folderId);
	/**
	 * 根据个人来获取文档的权限
	 * @param user
	 * @param docId
	 * @return
	 */
	public Integer getRightsByDocument(AppUser user,Long docId);
	/**
	 * 获取权限个数
	 */
	public Integer countPrivilege();
}