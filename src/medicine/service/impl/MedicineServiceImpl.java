package medicine.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import medicine.mapper.MedicineMapper;
import medicine.model.MedicineModel;
import medicine.model.QyModel;
import medicine.service.MedicineService;

@Service("MedicineService")
public class MedicineServiceImpl implements MedicineService {

	@Autowired
	private MedicineMapper medicineMapper;
	
	@Override
	public List<MedicineModel> getMedicineInfo(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return medicineMapper.getMedicineInfo(paramsMap);
	}

	@Override
	public List<QyModel> getQyInfo(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return medicineMapper.getQyInfo(paramsMap);
	}

}
