package medicine.service;

import java.util.List;
import java.util.Map;

import medicine.model.MedicineModel;
import medicine.model.QyModel;

public interface MedicineService {
	public List<MedicineModel> getMedicineInfo(Map<String, Object> paramsMap);
	
	public List<QyModel> getQyInfo(Map<String,Object> paramsMap);
	
}
