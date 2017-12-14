package com.htsoft.oa.service.document;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.core.web.paging.PagingBean;
import com.htsoft.oa.model.document.DocPrivilege;
import com.htsoft.oa.model.system.AppUser;

public interface DocPrivilegeService extends BaseService<DocPrivilege>{
	public List<DocPrivilege> getAll(DocPrivilege docPrivilege,Long folderId,PagingBean pb);
	public List<Integer> getRightsByFolder(AppUser user, Long folderId);
	public Integer getRightsByDocument(AppUser user, Long docId);
}


