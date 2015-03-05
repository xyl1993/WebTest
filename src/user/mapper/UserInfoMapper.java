package user.mapper;

import java.util.List;
import java.util.Map;

import user.model.UserModel;

public interface UserInfoMapper {
	public List<UserModel> getUserInfor(Map<String,Object> paramsMap);
	
	public void doAddUser(UserModel userModel);
	
	public void doDelUser(String id);
	
	public void doUpdateUser(UserModel userModel);
}
