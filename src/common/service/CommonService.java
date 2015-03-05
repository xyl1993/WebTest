package common.service;

/**
 * 基础数据service
 */
import java.util.List;
import java.util.Map;

import common.model.CommonModel;

public interface CommonService {

	public List<CommonModel> getCommonList(Map<String, Object> paramsMap);
}
