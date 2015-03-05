package medicine.mapper;

import java.util.List;
import java.util.Map;

import medicine.model.MedicineModel;
import medicine.model.QyModel;

public interface MedicineMapper {

	public List<MedicineModel> getMedicineInfo(Map<String,Object> paramsMap);
	
	public List<QyModel> getQyInfo(Map<String,Object> paramsMap);
	
}
