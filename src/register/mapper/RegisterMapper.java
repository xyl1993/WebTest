package register.mapper;

import java.util.List;
import java.util.Map;

import register.model.RegisterModel;

public interface RegisterMapper {

	public List<RegisterModel> getRegisterInfo(Map<String, Object> paramsMap);

	public void doDelRegister(String id);

	public void doUpdateRegister(RegisterModel registerModel);

	// 判断表中是否存在此条数据，存在则是修改
	public int isExtjs(Map<String, Object> paramsMap);
	
	public void doAddRegister(RegisterModel model);
}
