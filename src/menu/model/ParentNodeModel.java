package menu.model;

import java.util.List;


/**
 * 菜单跟节点model
 *
 */
public class ParentNodeModel {
	private static final long serialVersionUID = 1L;
	
	private String id;//主键
	
	private String modCode;   //模块编码
	
	private String text;    //模块名称
	
	private boolean expanded;   //控制节点是否展开
	
	private boolean leaf;    //设置为true表明本节点没有子节点。 不会为本节点渲染展开图标或箭头
	
	private boolean isvalid;  //检查传递的参数是否可以转换为哟个有效的的javascript日期对象。
	
	private String power;  //权限
	
	//子节点List
	private List<ChildNodeModel> children;  
	


	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getModCode() {
		return modCode;
	}

	public void setModCode(String modCode) {
		this.modCode = modCode;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean isExpanded() {
		return expanded;
	}

	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isIsvalid() {
		return isvalid;
	}

	public void setIsvalid(boolean isvalid) {
		this.isvalid = isvalid;
	}

	public List<ChildNodeModel> getChildren() {
		return children;
	}

	public void setChildren(List<ChildNodeModel> children) {
		this.children = children;
	}
	
	
}
