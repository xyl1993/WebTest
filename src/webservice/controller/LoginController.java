package webservice.controller;

import gp.util.WebUtil;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import base.util.ConstDefine;

import webservice.model.UserInfoModel;
import webservice.service.UserService;

@Controller
@RequestMapping("main")
@Scope("prototype")
public class LoginController {

	// 异常信息
	protected static Logger logger = Logger.getLogger("lOGINcontroller");
	@Autowired
	private UserService userService;

	/**
	 * 登录
	 * 
	 * @param request
	 *            请求
	 * @param response
	 *            响应
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/doLogin.do")
	@ResponseBody
	public Map<String, Object> doLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		paramsMap.put("login_id", request.getParameter("login_id"));
		paramsMap.put("pwd", request.getParameter("pwd"));
		try {
			List<UserInfoModel> userInfo = userService.getUserInfor(paramsMap);
			String userName = userInfo.get(0).getLogin_name();
			int total = userService.getUserInfor(paramsMap).size();
			respMap.put(ConstDefine.CONST_DATA_KEY, userInfo);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
			respMap.put(ConstDefine.CONST_TOTAL_KEY, total);
			respMap.put("message", "\u6210\u529F\u767B\u5F55!");
			// 将用户名放入session中
			HttpSession session = request.getSession();
			session.setAttribute("userName", userName);
			session.setAttribute("login_id", request.getParameter("login_id"));
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put("message",
					"\u7528\u6237\u6216\u5BC6\u7801\u8F93\u5165\u9519\u8BEF!");
		}
		return respMap;
	}

	/**
	 * 清除session
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/doCancel.do")
	@ResponseBody
	public Map<String, Object> doCancel(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			@SuppressWarnings("rawtypes")
			Enumeration em = request.getSession().getAttributeNames();
			while (em.hasMoreElements()) {
				request.getSession().removeAttribute(
						em.nextElement().toString());
			}
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
		}

		return respMap;
	}

	@RequestMapping("/doGetSession.do")
	@ResponseBody
	public Map<String, Object> doGetSession(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		String value = "";
		value = (String) request.getSession().getAttribute("userName");
		respMap.put(ConstDefine.CONST_DATA_KEY, value);
		respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		return respMap;
	}

	@RequestMapping("/doGetUserInfo.do")
	@ResponseBody
	public Map<String, Object> doGetUserInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> respMap = WebUtil.getDefaultResponseMap();
		try {
			String login_id = (String) request.getSession().getAttribute(
					"login_id");
			paramsMap.put("login_id", login_id);
			List<UserInfoModel> userInfo = userService.getUserInfor(paramsMap);
			respMap.put(ConstDefine.CONST_DATA_KEY, userInfo);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put("message", e.getMessage());
		}
		return respMap;
	}

}
