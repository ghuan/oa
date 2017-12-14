package com.htsoft.core.util;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import flexjson.DateTransformer;
import flexjson.JSONSerializer;

public class JsonUtil {
	
	/**
	 * 取得json的格式化器，用JSONSerializer可以解决延迟加载的问题
	 * @param dateFields　日期字段
	 * @return
	 */
	public static JSONSerializer getJSONSerializer(String...dateFields){
		JSONSerializer serializer=new JSONSerializer();
		serializer.exclude("class");
		serializer.transform(new DateTransformer("yyyy-MM-dd HH:mm:ss"), dateFields);
		return serializer;
	}
}
