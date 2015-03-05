package user.service;

import java.util.List;
import java.util.Map;

import user.model.UserModel;

public interface UserInfoService {
	public List<UserModel> getUserInfor(Map<String,Object> paramsMap);
	
	public void doSave(UserModel userModel);
	
	public void doDelUser(String id);
}
