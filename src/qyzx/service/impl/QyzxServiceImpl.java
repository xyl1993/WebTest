package qyzx.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import qyzx.mapper.QyzxMapper;
import qyzx.model.QyzxModel;
import qyzx.service.QyzxService;

@Service("QyService")
public class QyzxServiceImpl implements QyzxService{

	@Autowired
	private QyzxMapper qyMapper;
	
	
	@Override
	public List<QyzxModel> getQyzxInfo(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return qyMapper.getQyzxInfo(paramsMap);
	}


	@Override
	public void doUpdateQyzx(QyzxModel qyzxModel) {
		// TODO Auto-generated method stub
		qyMapper.doUpdateQyzx(qyzxModel);
	}

}
