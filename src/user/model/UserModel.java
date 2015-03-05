package user.model;

import java.util.Date;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import base.util.CustomDateSerializer;


public class UserModel implements java.io.Serializable {
	private static final long serialVersionUID = 4340870506969503356L;
	
	private String id;       //主键

	private String login_id;		//登录ID及编码
	
	private String login_pwd;       //密码

	private String login_name;		//用户名

	private String phone;			//联系电话

	private String email;			//电子邮箱
	
	private String sex;				//性别
	
	private String org_id;				//哪一个方面的医生（）
	private Date create_time;      //创建时间
	
	private Date modify_time;     //修改时间

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLogin_id() {
		return login_id;
	}

	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}

	public String getLogin_pwd() {
		return login_pwd;
	}

	public void setLogin_pwd(String login_pwd) {
		this.login_pwd = login_pwd;
	}

	public String getLogin_name() {
		return login_name;
	}

	public void setLogin_name(String login_name) {
		this.login_name = login_name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getOrg_id() {
		return org_id;
	}

	public void setOrg_id(String org_id) {
		this.org_id = org_id;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getModify_time() {
		return modify_time;
	}

	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
	}
	
	
}
