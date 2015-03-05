package user.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import base.util.ConstDefine;

import user.model.UserModel;
import user.service.UserInfoService;

@Controller
@RequestMapping("User")
public class UserInfoController {
	protected static Logger logger = Logger.getLogger("UserController");// 异常信息
	@Autowired
	private UserInfoService userService;

	@RequestMapping("/getUserInfo.do")
	@ResponseBody
	public Map<String, Object> doLogin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<UserModel> userInfo = userService.getUserInfor(paramsMap);
			paramsMap.remove("start");
			paramsMap.remove("limit");
			int total = userService.getUserInfor(paramsMap).size();
			respMap.put(ConstDefine.CONST_DATA_KEY, userInfo);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
			respMap.put(ConstDefine.CONST_TOTAL_KEY, total);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
		}
		return respMap;
	}

	@RequestMapping("/doAddUser.do")
	@ResponseBody
	public Map<String, Object> doAddUser(UserModel userModel,
			HttpServletRequest request) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			userService.doSave(userModel);
			respMap.put(ConstDefine.CONST_DATA_KEY, userModel);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}

	@RequestMapping("/doDelUser.do")
	@ResponseBody
	public Map<String, Object> doDelUser(String[] ids) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			for (String id : ids) {
				userService.doDelUser(id);
			}
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setLenient(true);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, true));
	}
}
