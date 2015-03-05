package common.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mapper.CommonMapper;
import common.model.CommonModel;
import common.service.CommonService;

@Service("CommonService")
public class CommonServiceImpl implements CommonService {

	@Autowired
	private CommonMapper commonMapper;

	@Override
	public List<CommonModel> getCommonList(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return commonMapper.getCommonList(paramsMap);
	}

}
