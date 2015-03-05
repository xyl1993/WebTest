package common.controller;

/**
 * 通用基础数据控制器
 */
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import base.util.CommonFun;
import base.util.ConstDefine;

import common.model.CommonModel;
import common.service.CommonService;

@Controller
@RequestMapping("Common")
public class CommonController {

	@Autowired
	private CommonService commonService;

	// 记录日志
	protected static Logger logger = Logger.getLogger("CommonController");

	@RequestMapping(value = "/getCommonList.do")
	@ResponseBody
	public Map<String, Object> getCommonList(HttpServletResponse response,
			HttpServletRequest request) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		// 返回值
		Map<String, Object> respMap = new HashMap<String, Object>();
		paramsMap = CommonFun.getParamsMap(request);
		try {
			List<CommonModel> commonModel = commonService
					.getCommonList(paramsMap);
			respMap.put(ConstDefine.CONST_DATA_KEY, commonModel);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			logger.error(e.getMessage());
		}
		return respMap;
	}

}
