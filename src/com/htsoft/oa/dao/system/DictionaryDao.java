package com.htsoft.oa.dao.system;

import java.util.List;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.system.Dictionary;

/**
 * 
 * @author 
 *
 */
public interface DictionaryDao extends BaseDao<Dictionary>{

	public List<String> getAllItems();

	public List<String> getAllByItemName(String itemName);
	
}