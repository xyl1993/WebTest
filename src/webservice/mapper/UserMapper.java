package webservice.mapper;

import java.util.List;
import java.util.Map;

import webservice.model.UserInfoModel;

public interface UserMapper {
	
	public List<UserInfoModel> getUserInfor(Map<String,Object> paramsMap);
}
