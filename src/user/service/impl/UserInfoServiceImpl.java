package user.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import common.mapper.CommonMapper;

import user.mapper.UserInfoMapper;
import user.model.UserModel;
import user.service.UserInfoService;

@Service("UserInfoService")
public class UserInfoServiceImpl implements UserInfoService {

	@Autowired
	private UserInfoMapper userMapper;
	
	@Autowired
	private CommonMapper commonMapper;
	
	@Override
	public List<UserModel> getUserInfor(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return userMapper.getUserInfor(paramsMap);
	}
	@Override
	@Transactional
	public void doSave(UserModel userModel) {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		// TODO Auto-generated method stub
		Date date=commonMapper.getDbDate();
		// 根据id查看是否存在该id对应的数据
		paramsMap.put("id", userModel.getId());
		int count = commonMapper.isExtjs(paramsMap);
		if(count>0){//修改
			userModel.setModify_time(date);
			userMapper.doUpdateUser(userModel);
		}else{
			userModel.setCreate_time(date);
			userModel.setModify_time(null);
			userMapper.doAddUser(userModel);
		}
	}
	@Override
	public void doDelUser(String id) {
		// TODO Auto-generated method stub
		userMapper.doDelUser(id);
	}

}
