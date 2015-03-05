package webservice.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webservice.mapper.UserMapper;
import webservice.model.UserInfoModel;
import webservice.service.UserService;
@Service("UserService")
public class UserServiceImpl implements UserService {

	@Autowired
	private UserMapper userMapper;
	
	@Override
	public List<UserInfoModel> getUserInfor(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return userMapper.getUserInfor(paramsMap);
	}



}
