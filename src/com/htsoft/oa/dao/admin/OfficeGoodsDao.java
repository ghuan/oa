package com.htsoft.oa.dao.admin;
/*
 *  广州宏天软件有限公司 OA办公管理系统   --  http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.OfficeGoods;

/**
 * 
 * @author 
 *
 */
public interface OfficeGoodsDao extends BaseDao<OfficeGoods>{
	public List<OfficeGoods> findByWarm();
}