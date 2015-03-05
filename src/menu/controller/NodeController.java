package menu.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import menu.model.ChildNode;
import menu.model.ChildNodeModel;
import menu.model.ParentNode;
import menu.model.ParentNodeModel;
import menu.service.NodeService;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import base.util.CommonFun;
import base.util.ConstDefine;

/**
 * 菜单生成控制器
 * 
 * 
 */
@Controller
@RequestMapping("menu")
public class NodeController {

	protected static Logger logger = Logger.getLogger("NodeController");

	@Autowired
	private NodeService nodeService;

	// 处理JSON数据的对象
	private ObjectMapper objectMapper = new ObjectMapper();

	@RequestMapping(value = "/getNode.do")
	@ResponseBody
	public Map<String, Object> getNode(HttpServletResponse response,
			HttpServletRequest request) throws Exception {
		Map<String, Object> paramsMap = new HashMap<String, Object>();
		// 返回值
		Map<String, Object> respMap = new HashMap<String, Object>();
		paramsMap = CommonFun.getParamsMap(request);
		respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);

		try {
			HttpSession session = request.getSession();

			// 获取子节点的目录
			List<ChildNodeModel> childNode = nodeService
					.getChildNode(paramsMap);
			if (session.getAttribute("userName") == "admin") {
				paramsMap.put("power", "admin");
			}
			List<ParentNodeModel> parentNode = nodeService
					.getParentNode(paramsMap);
			List<ChildNode> treeList = new ArrayList<ChildNode>();
			for (ParentNodeModel parentNodeMod : parentNode) {
				ParentNode tree = new ParentNode(
						parentNodeMod.getId(), parentNodeMod.getText(),
						parentNodeMod.getModCode(),
						parentNodeMod.isExpanded(),
						parentNodeMod.isIsvalid(), parentNodeMod.isLeaf(),
						new ArrayList<ChildNode>());
				for (ChildNodeModel childNodeMod : childNode) {
					if (childNodeMod.getParentId()
							.equals(parentNodeMod.getId())) {
						ChildNode Childtree = new ChildNode(
								childNodeMod.getId(), childNodeMod.getText(),
								childNodeMod.getModCode(),
								childNodeMod.isIsvalid(), childNodeMod.isLeaf());
						treeList.add(Childtree);
					}
				}
				tree.setChildren(treeList);
				// 根节点下的子项
				respMap.put("children", tree);
			}
		
		} catch (Exception e) {
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
			logger.error(e.getMessage());
		}
		return respMap;
	}
	
	@RequestMapping(value="/getSession.do")
	@ResponseBody
	public Map<String, Object> getSession(HttpServletResponse response,
			HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		Map<String, Object> respMap = new HashMap<String, Object>();
		if(session.getAttribute("userName")!=""){
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, true);
			respMap.put(ConstDefine.CONST_DATA_KEY, (String) session.getAttribute("userName"));
		}else{
			respMap.put(ConstDefine.CONST_SUCCESS_KEY, false);
		}
		
		return respMap;
	}

}
