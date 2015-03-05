package common.mapper;
/**
 * 基础数据mapper查询接口
 */
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.joda.time.DateTime;

import common.model.CommonModel;

public interface CommonMapper {
	//查询基础数据
	public List<CommonModel> getCommonList(Map<String,Object> paramsMap);
	
	//查询数据库中的时间
	public Date getDbDate();
	
	//判断表中是否存在此条数据，存在则是修改
	public int isExtjs(Map<String,Object> paramsMap);
}
