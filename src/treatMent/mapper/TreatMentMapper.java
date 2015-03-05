package treatMent.mapper;

import java.util.List;
import java.util.Map;

import medicine.model.MedicineModel;
import medicine.model.QyModel;

import treatMent.model.TreatMentModel;

public interface TreatMentMapper {
	//获取病人的基本信息
	public List<TreatMentModel> getTreatMentInfo(Map<String, Object> paramsMap);
	
	/**
	 * 保存主表
	 * @param medicineModel
	 */
	public void doUpdateMedicine(TreatMentModel treatMentModel);  
	
	public void doSaveList(QyModel qyModel);
	
	public int isExtjs(Map<String,Object> paramsMap);
	
	public void doUpdateList(QyModel qyModel);
	
	public void doDelList(String id);
}
