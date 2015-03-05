/**
 * 收费中心model 只显示用户基本信息
 */
package sfzx.model;

public class SfzxModel implements java.io.Serializable {

	private static final long serialVersionUID = 148142964214390454L;

	private String id;

	private String name;

	private String code;

	private String phone;
	
	private String user;

	private String sex;
	
	private String remarks;

	private String sf_state; // 是否收费

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

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getSf_state() {
		return sf_state;
	}

	public void setSf_state(String sf_state) {
		this.sf_state = sf_state;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

}
