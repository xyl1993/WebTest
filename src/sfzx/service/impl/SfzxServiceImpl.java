package sfzx.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sfzx.mapper.SfzxMapper;
import sfzx.model.SfzxModel;
import sfzx.service.SfzxService;

@Service("SfzxService")
public class SfzxServiceImpl implements SfzxService {

	@Autowired
	private SfzxMapper sfzxMapper;

	@Override
	public List<SfzxModel> getSfzxInfo(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return sfzxMapper.getSfzxInfo(paramsMap);
	}

	@Override
	public void doUpdateSfzx(SfzxModel sfzxModel) {
		// TODO Auto-generated method stub
		sfzxMapper.doUpdateSfzx(sfzxModel);
	}

}
