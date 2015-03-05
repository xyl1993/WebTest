package report.model;

public class ReportModel implements java.io.Serializable {

	private static final long serialVersionUID = -7285513651993404975L;

	private String id;

	private String name;

	private String code;

	private String user;

	private String sex;

	private String phone;

	private String state;   //就诊
	
	private String sf_state;
	
	private String qy_state;
	
	private String remarks;

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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getSf_state() {
		return sf_state;
	}

	public void setSf_state(String sf_state) {
		this.sf_state = sf_state;
	}

	public String getQy_state() {
		return qy_state;
	}

	public void setQy_state(String qy_state) {
		this.qy_state = qy_state;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	
	
}
