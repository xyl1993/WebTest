package qyzx.controller;

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

import qyzx.model.QyzxModel;
import qyzx.service.QyzxService;

import base.util.CommonFun;
import base.util.ConstDefine;


@Controller
@RequestMapping("qy")
public class QyzxController {

	private static Logger logger = Logger.getLogger("QyController");
	
	@Autowired
	private QyzxService qyService;
	
	@RequestMapping("/getQyzxInfo.do")
	@ResponseBody
	public Map<String, Object> getQyInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = CommonFun.getParamsMap(request);
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<QyzxModel> qyModels = qyService
					.getQyzxInfo(paramsMap);
			paramsMap.remove("start");
			paramsMap.remove("limit");
			int total = qyService.getQyzxInfo(paramsMap).size();
			respMap.put(ConstDefine.CONST_TOTAL_KEY, total);
			respMap.put(ConstDefine.CONST_DATA_KEY, qyModels);
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
	public Map<String, Object> doSave(QyzxModel qyzxModel,
			HttpServletRequest request) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			qyService.doUpdateQyzx(qyzxModel);
			respMap.put(ConstDefine.CONST_DATA_KEY, qyzxModel);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
}
