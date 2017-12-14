package com.htsoft.oa.action.system;
import java.util.List;
import javax.annotation.Resource;

import java.lang.reflect.Type;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;


import com.htsoft.oa.model.system.Dictionary;
import com.htsoft.oa.service.system.DictionaryService;
/**
 * 
 * @author 
 *
 */
public class DictionaryAction extends BaseAction{
	@Resource
	private DictionaryService dictionaryService;
	private Dictionary dictionary;
	
	private Long dicId;
	
	private String itemName;
	
	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Long getDicId() {
		return dicId;
	}

	public void setDicId(Long dicId) {
		this.dicId = dicId;
	}

	public Dictionary getDictionary() {
		return dictionary;
	}

	public void setDictionary(Dictionary dictionary) {
		this.dictionary = dictionary;
	}

	/**
	 * 显示列表
	 */
	public String list(){
		
		QueryFilter filter=new QueryFilter(getRequest());
		List<Dictionary> list= dictionaryService.getAll(filter);
		
		Type type=new TypeToken<List<Dictionary>>(){}.getType();
		StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
		.append(filter.getPagingBean().getTotalItems()).append(",result:");
		
		Gson gson=new Gson();
		buff.append(gson.toJson(list, type));
		buff.append("}");
		
		jsonString=buff.toString();
		
		return SUCCESS;
	}
	/**
	 * 根据条目查询出字典的value并返回数组
	 * @return
	 */
	public String load(){
		List<String> list= dictionaryService.getAllByItemName(itemName);
		StringBuffer buff = new StringBuffer("[");
		for(String itemName : list){
			buff.append("'").append(itemName).append("',");
		}
		if(list.size()>0){
			buff.deleteCharAt(buff.length()-1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
	/**
	 * 批量删除
	 * @return
	 */
	public String multiDel(){
		
		String[]ids=getRequest().getParameterValues("ids");
		if(ids!=null){
			for(String id:ids){
				dictionaryService.remove(new Long(id));
			}
		}
		
		jsonString="{success:true}";
		
		return SUCCESS;
	}
	
	/**
	 * 显示详细信息
	 * @return
	 */
	public String get(){
		Dictionary dictionary=dictionaryService.get(dicId);
		
		Gson gson=new Gson();
		//将数据转成JSON格式
		StringBuffer sb = new StringBuffer("{success:true,data:");
		sb.append(gson.toJson(dictionary));
		sb.append("}");
		setJsonString(sb.toString());
		
		return SUCCESS;
	}
	/**
	 * 添加及保存操作
	 */
	public String save(){
		dictionaryService.save(dictionary);
		setJsonString("{success:true}");
		return SUCCESS;
	}
	
	/**
	 * 获得条目
	 * @return
	 */
	public String items(){
		List<String> list = dictionaryService.getAllItems();
		StringBuffer buff = new StringBuffer("[");
		for(String str : list){
			buff.append("'").append(str).append("',");
		}
		if(list.size() > 0){
			buff.deleteCharAt(buff.length() - 1);
		}
		buff.append("]");
		setJsonString(buff.toString());
		return SUCCESS;
	}
}
