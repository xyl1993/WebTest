package qyzx.model;
/**
 * 取药model
 *
 */
public class QyzxModel implements java.io.Serializable {

	private static final long serialVersionUID = 8633487660580010473L;

	private String id;

	private String name;

	private String code;

	private String phone;
	
	private String user;

	private String sex;
	
	private String remarks;

	private String qy_state; // 是否取药

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public String getQy_state() {
		return qy_state;
	}

	public void setQy_state(String qy_state) {
		this.qy_state = qy_state;
	}
	
	

}
