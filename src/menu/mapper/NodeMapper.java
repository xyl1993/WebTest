package menu.mapper;

import java.util.List;
import java.util.Map;

import menu.model.ChildNodeModel;
import menu.model.ParentNodeModel;

public interface NodeMapper {

	//获取所有的子节点
	public List<ChildNodeModel> getChildNode(Map<String,Object> paramsMap);
	
	//获取所有的父节点
	public List<ParentNodeModel> getParentNode(Map<String,Object> paramsMap);
}
