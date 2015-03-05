package treatMent.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import medicine.model.QyModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import common.mapper.CommonMapper;

import treatMent.mapper.TreatMentMapper;
import treatMent.model.TreatMentModel;
import treatMent.service.TreatMentService;

@Service("TreatMentService")
public class TreatMentServiceImpl implements TreatMentService {

	@Autowired
	private TreatMentMapper treatMentMapper;

	@Autowired
	private CommonMapper commonMapper;

	@Override
	public List<TreatMentModel> getTreatMentInfo(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return treatMentMapper.getTreatMentInfo(paramsMap);
	}

	@Override
	public void doUpdateMedicine(TreatMentModel treatMentModel, String value) {
		// TODO Auto-generated method stub
		Date date = commonMapper.getDbDate();
		// 获取当前登录用户信息
		// 根据id查看是否存在该id对应的数据
		treatMentModel.setModify_time(date);
		treatMentModel.setAuditorName(value);
		treatMentMapper.doUpdateMedicine(treatMentModel);
	}

	@Override
	public void doSaveList(QyModel[] qyModel) {
		// TODO Auto-generated method stub
		Map<String,Object> paramsMap = new HashMap<String, Object>();
		for (QyModel model : qyModel) {
			paramsMap.put("id", model.getId());
			if (treatMentMapper.isExtjs(paramsMap) > 0) {
				// 修改
				treatMentMapper.doUpdateList(model);
			} else {// 新增
				treatMentMapper.doSaveList(model);
			}
		}

	}

	@Override
	public void doDelList(String id) {
		// TODO Auto-generated method stub
		treatMentMapper.doDelList(id);
	}

}
