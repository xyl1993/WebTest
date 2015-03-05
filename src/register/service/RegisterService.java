package register.service;

import java.util.List;
import java.util.Map;

import register.model.RegisterModel;

public interface RegisterService {

	public List<RegisterModel> getRegisterInfo(Map<String, Object> paramsMap);
	
	public void doDelRegister(String id);
	
	public void doSave(RegisterModel registerModel,String value);
}
