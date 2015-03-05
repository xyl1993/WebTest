package common.model;
/**
 * 基础数据model
 */
import java.io.Serializable;

public class CommonModel implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String id;   //主键
	
	private String type_code;     //基础数据类型
	
	private String code;          //基础数据编码
	
	private String name;          //基础数据名称

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType_code() {
		return type_code;
	}

	public void setType_code(String type_code) {
		this.type_code = type_code;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
}
