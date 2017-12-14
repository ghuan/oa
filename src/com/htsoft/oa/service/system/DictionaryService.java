package com.htsoft.oa.service.system;
import java.util.List;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.system.Dictionary;

public interface DictionaryService extends BaseService<Dictionary>{

	public List<String> getAllItems();

	public List<String> getAllByItemName(String itemName);
	
}


