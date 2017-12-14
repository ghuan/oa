package com.htsoft.oa.service.communicate;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.communicate.MailFolder;
import com.htsoft.oa.model.document.DocFolder;

public interface MailFolderService extends BaseService<MailFolder>{

	public List<MailFolder> getUserFolderByParentId(Long curUserId, Long parentId);

	public List<MailFolder> getAllUserFolderByParentId(Long userId, Long parentId);
	
	public List<MailFolder> getFolderLikePath(String path);
}


