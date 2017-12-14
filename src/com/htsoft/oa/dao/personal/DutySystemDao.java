package com.htsoft.oa.dao.personal;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.personal.DutySystem;

/**
 * 
 * @author 
 *
 */
public interface DutySystemDao extends BaseDao<DutySystem>{
	/**
	 *  更新为非缺省
	 */
	public void updateForNotDefult();
	/**
	 * 取得缺省的班制
	 * @return
	 */
	public List<DutySystem> getDefaultDutySystem();
}