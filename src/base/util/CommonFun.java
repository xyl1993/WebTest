package base.util;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class CommonFun {

	/**
	 * 获取request中的数据
	 * @param request
	 * @return
	 */
	public static Map<String, Object> getParamsMap(HttpServletRequest request) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		Enumeration<String> pNames = request.getParameterNames();
		while (pNames.hasMoreElements()) {
			String pName = pNames.nextElement();
			paramMap.put(pName, request.getParameter(pName));
		}
		return paramMap;
	}
	/**
	 * 获取session中的值
	 * @param key
	 * @param request
	 * @return
	 */
	public static String getSession(String key,HttpServletRequest request){
		String value="";
		value = (String)request.getSession().getAttribute(key);
		return value;
	}

}
