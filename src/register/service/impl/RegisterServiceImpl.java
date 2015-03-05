package register.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import common.mapper.CommonMapper;

import register.mapper.RegisterMapper;
import register.model.RegisterModel;
import register.service.RegisterService;

@Service("RegisterService")
public class RegisterServiceImpl implements RegisterService {

	@Autowired
	private RegisterMapper registerMapper;
	
	@Autowired
	private CommonMapper commonMapper;
	
	@Override
	public List<RegisterModel> getRegisterInfo(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return registerMapper.getRegisterInfo(paramsMap);
	}

	@Override
	public void doDelRegister(String id) {
		// TODO Auto-generated method stub
		registerMapper.doDelRegister(id);
	}

	@Override
	public void doSave(RegisterModel registerModel,String value) {
		// TODO Auto-generated method stub
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		// TODO Auto-generated method stub
		Date date=commonMapper.getDbDate();
		// 获取当前登录用户信息
		// 根据id查看是否存在该id对应的数据
		paramsMap.put("id", registerModel.getId());
		int count = registerMapper.isExtjs(paramsMap);
		if(count>0){//修改
			registerModel.setModify_time(date);
			registerMapper.doUpdateRegister(registerModel);
		}else{//新增
			registerModel.setCreate_time(date);
			registerModel.setModify_time(null);
			registerModel.setCreate_name(value);
			registerMapper.doAddRegister(registerModel);
		}
	}

}
