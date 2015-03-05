/**
 * 收费中心controller
 */
package sfzx.controller;

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

import sfzx.model.SfzxModel;
import sfzx.service.SfzxService;
import treatMent.model.TreatMentModel;

@Controller
@RequestMapping("sf")
public class SfzxController {

	private static Logger logger = Logger.getLogger("SfzxController");

	@Autowired
	private SfzxService sfzxService;

	@RequestMapping("/getSfzxInfo.do")
	@ResponseBody
	public Map<String, Object> getSfzxInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = CommonFun.getParamsMap(request);
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<SfzxModel> sfzxModels = sfzxService
					.getSfzxInfo(paramsMap);
			paramsMap.remove("start");
			paramsMap.remove("limit");
			int total = sfzxService.getSfzxInfo(paramsMap).size();
			respMap.put(ConstDefine.CONST_TOTAL_KEY, total);
			respMap.put(ConstDefine.CONST_DATA_KEY, sfzxModels);
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
	public Map<String, Object> doSave(SfzxModel sfzxModel,
			HttpServletRequest request) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			sfzxService.doUpdateSfzx(sfzxModel);
			respMap.put(ConstDefine.CONST_DATA_KEY, sfzxModel);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
}
