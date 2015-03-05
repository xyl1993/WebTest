package treatMent.service;

import java.util.List;
import java.util.Map;

import medicine.model.MedicineModel;
import medicine.model.QyModel;

import treatMent.model.TreatMentModel;

public interface TreatMentService {
	public List<TreatMentModel> getTreatMentInfo(Map<String, Object> paramsMap);
	
	/**
	 * 保存主表
	 * @param medicineModel
	 */
	public void doUpdateMedicine(TreatMentModel treatMentModel,String value);  
	
	public void doSaveList(QyModel[] qyModel);
	
	public void doDelList(String id);
}

