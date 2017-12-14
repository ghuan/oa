package com.htsoft.oa.dao.communicate;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.document.DocFolder;

/**
 * 
 * @author 
 *
 */
public interface MailFolderDao extends BaseDao<MailFolder>{

	public List<MailFolder> getUserFolderByParentId(Long userId, Long parentId);

	public List<MailFolder> getAllUserFolderByParentId(Long userId,Long parentId);

	public List<MailFolder> getFolderLikePath(String path);
	
}