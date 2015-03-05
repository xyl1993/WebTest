package menu.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import menu.mapper.NodeMapper;
import menu.model.ChildNodeModel;
import menu.model.ParentNodeModel;
import menu.service.NodeService;

@Service("NodeService")
public class NodeServiceImpl implements NodeService {

	@Autowired
	private NodeMapper nodeMapper;
	
	@Override
	public List<ChildNodeModel> getChildNode(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return nodeMapper.getChildNode(paramsMap);
	}

	@Override
	public List<ParentNodeModel> getParentNode(Map<String, Object> paramsMap) {
		// TODO Auto-generated method stub
		return nodeMapper.getParentNode(paramsMap);
	}

}
