package sfzx.service;

import java.util.List;
import java.util.Map;

import sfzx.model.SfzxModel;

public interface SfzxService {

	//显示已就诊未收费的病人
	public List<SfzxModel> getSfzxInfo(Map<String, Object> paramsMap);
	
	//只跟新收费状态
	public void doUpdateSfzx(SfzxModel sfzxModel);
}
