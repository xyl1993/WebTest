package report.controller;

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

import report.model.ReportModel;
import report.service.ReportService;
import base.util.CommonFun;
import base.util.ConstDefine;

@Controller
@RequestMapping("report")
public class ReportController {

	private Logger logger = Logger.getLogger("ReportController");

	@Autowired
	private ReportService reportService;

	@RequestMapping("/getHzReport.do")
	@ResponseBody
	public Map<String, Object> getHzReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = CommonFun.getParamsMap(request);
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<ReportModel> reportModels = reportService.getHzReport(paramsMap);
			paramsMap.remove("start");
			paramsMap.remove("limit");
			int total = reportService.getHzReport(paramsMap).size();
			respMap.put(ConstDefine.CONST_TOTAL_KEY,total);
			respMap.put(ConstDefine.CONST_DATA_KEY, reportModels);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
}
