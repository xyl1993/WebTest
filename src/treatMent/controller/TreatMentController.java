package treatMent.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import medicine.model.QyModel;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import base.util.CommonFun;
import base.util.ConstDefine;

import treatMent.model.TreatMentModel;
import treatMent.service.TreatMentService;

@Controller
@RequestMapping("tm")
public class TreatMentController {

	private static Logger logger = Logger.getLogger("TreatMentController");

	@Autowired
	private TreatMentService treatMentService;

	private ObjectMapper objectMapper = new ObjectMapper();

	@RequestMapping("/getTreatMentInfo.do")
	@ResponseBody
	public Map<String, Object> getTreatMentInfo(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		Map<String, Object> respMap = new HashMap<String, Object>();
		paramsMap = CommonFun.getParamsMap(request);
		try {
			List<TreatMentModel> treatMentModels = treatMentService
					.getTreatMentInfo(paramsMap);
			respMap.put(ConstDefine.CONST_DATA_KEY, treatMentModels);
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
	public Map<String, Object> doSave(TreatMentModel treatMentModel,
			HttpServletRequest request) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		String sessionValue = CommonFun.getSession("userName", request);
		try {
			treatMentService.doUpdateMedicine(treatMentModel, sessionValue);
			respMap.put(ConstDefine.CONST_DATA_KEY, treatMentModel);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}

	/**
	 * 保存从表数据
	 * 
	 * @param response
	 * @param request
	 * @return
	 */
	@RequestMapping("/doSaveList.do")
	@ResponseBody
	public Map<String, Object> doSaveList(HttpServletResponse response,
			HttpServletRequest request) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		String postData = request.getParameter("bdis");// 传过来的参数
		try {
			QyModel[] bdis = objectMapper.readValue(postData, QyModel[].class);
			treatMentService.doSaveList(bdis);
			// respMap.put(ConstDefine.CONST_DATA_KEY, treatMentModel);
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			respMap.put(ConstDefine.CONST_MESSAGE_KEY, e.getMessage());
			logger.error(e.getMessage());
		}
		return respMap;
	}

	@RequestMapping("doDelList.do")
	@ResponseBody
	public Map<String, Object> doDelList(String[] ids) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			for (String id : ids) {
				treatMentService.doDelList(id);
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
