package menu.service;

import java.util.List;
import java.util.Map;

import menu.model.ChildNodeModel;
import menu.model.ParentNodeModel;

public interface NodeService {

	public List<ChildNodeModel> getChildNode(Map<String,Object> paramsMap);
	
	public List<ParentNodeModel> getParentNode(Map<String,Object> paramsMap);
}
