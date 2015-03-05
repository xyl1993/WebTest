package register.controller;

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

import register.model.RegisterModel;
import register.service.RegisterService;

import base.util.CommonFun;
import base.util.ConstDefine;

@Controller
@RequestMapping("register")
public class RegisterController {

	protected static Logger logger = Logger.getLogger("RegisterController");// 异常信息

	@Autowired
	private RegisterService registerService;

	@RequestMapping("/getRegisterInfo.do")
	@ResponseBody
	public Map<String, Object> getRegisterInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = CommonFun.getParamsMap(request);
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<RegisterModel> registerList = registerService.getRegisterInfo(paramsMap);
			paramsMap.remove("start");
			paramsMap.remove("limit");
			int total = registerService.getRegisterInfo(paramsMap).size();
			respMap.put(ConstDefine.CONST_TOTAL_KEY, total);
			respMap.put(ConstDefine.CONST_DATA_KEY, registerList);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
	

	@RequestMapping("/doDelRegister.do")
	@ResponseBody
	public Map<String, Object> doDelRegister(String[] ids) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			for (String id : ids) {
				registerService.doDelRegister(id);
			}
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
	
	@RequestMapping("/doSave.do")
	@ResponseBody
	public Map<String, Object> doAddUser(RegisterModel registerModel,
			HttpServletRequest request) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		String sessionValue = CommonFun.getSession("userName", request);
		try {
			registerService.doSave(registerModel,sessionValue);
			respMap.put(ConstDefine.CONST_DATA_KEY, registerModel);
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
