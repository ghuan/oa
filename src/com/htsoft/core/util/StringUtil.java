package com.htsoft.core.util;
/*
 *  广州宏天软件有限公司 OA办公管理系统   -- http://www.jee-soft.cn
 *  Copyright (C) 2008-2009 GuangZhou HongTian Software Company
*/
import java.security.MessageDigest;
import org.apache.commons.codec.binary.Base64;

/**
 * 字符转换类
 * 
 * @author csx
 * 
 */
public class StringUtil {

	/**
	 * 把字符串中的带‘与"转成\'与\"
	 * 
	 * @param orgStr
	 * @return
	 */
	public static String convertQuot(String orgStr) {
		return orgStr.replace("'", "\\'").replace("\"", "\\\"");
	}

	public static synchronized String encryptSha256(String inputStr) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");

			byte digest[] = md.digest(inputStr.getBytes("UTF-8"));

			return new String(Base64.encodeBase64(digest));

			// return (new BASE64Encoder()).encode(digest);
			// return new String(Hex.encodeHex(digest));
		} catch (Exception e) {
			return null;
		}
	}

	public static void main(String[] args) {
		String password = "111";
		String result = encryptSha256(password);

		// byte[]dis={-10, -32, -95, -30, -84, 65, -108, 90, -102, -89, -1,
		// -118, -118, -86, 12, -21, -63, 42, 59, -52, -104, 26, -110, -102,
		// -43, -49, -127, 10, 9, 14, 17, -82};
		// System.out.println("array:"+ new String(Hex.encodeHex(dis)));
		System.out.println("result:" + result);
	}

	public static String html2Text(String inputString) {
		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		java.util.regex.Pattern p_script;
		java.util.regex.Matcher m_script;
		java.util.regex.Pattern p_style;
		java.util.regex.Matcher m_style;
		java.util.regex.Pattern p_html;
		java.util.regex.Matcher m_html;

		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script>]*?>[\s\S]*?<\/script>
																										// }
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style>]*?>[\s\S]*?<\/style>
																									// }
			String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式

			p_script = java.util.regex.Pattern.compile(regEx_script,
					java.util.regex.Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = java.util.regex.Pattern.compile(regEx_style,
					java.util.regex.Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			p_html = java.util.regex.Pattern.compile(regEx_html,
					java.util.regex.Pattern.CASE_INSENSITIVE);
			m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll(""); // 过滤html标签

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}

		return textStr;// 返回文本字符串
	}
}
