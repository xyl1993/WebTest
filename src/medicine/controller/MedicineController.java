package medicine.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import medicine.model.MedicineModel;
import medicine.model.QyModel;
import medicine.service.MedicineService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import base.util.CommonFun;
import base.util.ConstDefine;

@Controller
@RequestMapping("md")
public class MedicineController {

	private static Logger logger = Logger.getLogger("MedicineController");

	@Autowired
	private MedicineService medicineService;

	@RequestMapping("/getMedicineInfo.do")
	@ResponseBody
	public Map<String, Object> getTreatMedicineInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<MedicineModel> medicineModels = medicineService
					.getMedicineInfo(paramsMap);
			respMap.put(ConstDefine.CONST_DATA_KEY, medicineModels);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
	
	@RequestMapping("/getQyInfo.do")
	@ResponseBody
	public Map<String, Object> getQyInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = CommonFun.getParamsMap(request);
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			List<QyModel> medicineModels = medicineService
					.getQyInfo(paramsMap);
			respMap.put(ConstDefine.CONST_DATA_KEY, medicineModels);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}
}
