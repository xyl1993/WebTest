package webservice.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import webservice.model.UserInfoModel;

public interface UserService {
	public List<UserInfoModel> getUserInfor(Map<String,Object> paramsMap);
}
