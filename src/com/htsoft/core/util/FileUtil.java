package com.htsoft.core.util;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.text.SimpleDateFormat;
import java.util.Date;




public class FileUtil {

	public static String generateFilename(String originalFilename){
		
		SimpleDateFormat dirSdf=new SimpleDateFormat("yyyyMM");
		String filePre=dirSdf.format(new Date());
		
        String fileExt="";
        int lastIndex=originalFilename.lastIndexOf('.');
        //取得文件的扩展名
        if(lastIndex!=-1){
        	fileExt=originalFilename.substring(lastIndex);
        }

        String filename=filePre+"/"+UUIDGenerator.getUUID()+fileExt;
        
        return filename;
	}
}
