package com.htsoft.oa.dao.communicate;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.communicate.PhoneGroup;

/**
 * 
 * @author 
 *
 */
public interface PhoneGroupDao extends BaseDao<PhoneGroup>{
	
	public Integer findLastSn(Long userId);
	public PhoneGroup findBySn(Integer sn,Long userId);
	public List<PhoneGroup> findBySnUp(Integer sn,Long userId);
	public List<PhoneGroup> findBySnDown(Integer sn,Long userId);
	public List<PhoneGroup> getAll(Long userId);
}