package menu.model;

public class ChildNode {
	private static final long serialVersionUID = 1L;

	private String id;// 主键

	private String parentId;   //父节点id
	
	private String modCode; // 模块编码

	private String text; // 模块名称
	
	private boolean leaf; // 设置为true表明本节点没有子节点。 不会为本节点渲染展开图标或箭头

	private boolean isvalid; // 检查传递的参数是否可以转换为哟个有效的的javascript日期对象。

	
	
	public ChildNode(String id, String modCode,
			String text, boolean leaf, boolean isvalid) {
		super();
		this.id = id;
		this.modCode = modCode;
		this.text = text;
		this.leaf = leaf;
		this.isvalid = isvalid;
	}


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
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
}
