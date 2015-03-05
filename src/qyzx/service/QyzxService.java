package qyzx.service;

import java.util.List;
import java.util.Map;

import qyzx.model.QyzxModel;

public interface QyzxService {

	public List<QyzxModel> getQyzxInfo(Map<String, Object> paramsMap);
	//只跟新取药状态
	public void doUpdateQyzx(QyzxModel qyzxModel);
}
