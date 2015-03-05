package qyzx.mapper;

import java.util.List;
import java.util.Map;

import qyzx.model.QyzxModel;
import sfzx.model.SfzxModel;

public interface QyzxMapper {

	public List<QyzxModel> getQyzxInfo(Map<String, Object> paramsMap);
	
	
	//只跟新取药状态
	public void doUpdateQyzx(QyzxModel qyzxModel);
}
