package medicine.model;

import java.util.Date;

/**
 * 药品model
 * 
 * @author xyl
 * 
 */
public class MedicineModel implements java.io.Serializable {

	private static final long serialVersionUID = -2592165862841690655L;

	private String id;

	private String medicineName;

	private double price;

	private double quence;

	private String medicineRemarks;

	private String auditorName;

	private Date create_time;

	private Date modify_time;

	private String create_name;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMedicineName() {
		return medicineName;
	}

	public void setMedicineName(String medicineName) {
		this.medicineName = medicineName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getQuence() {
		return quence;
	}

	public void setQuence(double quence) {
		this.quence = quence;
	}

	public String getMedicineRemarks() {
		return medicineRemarks;
	}

	public void setMedicineRemarks(String medicineRemarks) {
		this.medicineRemarks = medicineRemarks;
	}

	public String getAuditorName() {
		return auditorName;
	}

	public void setAuditorName(String auditorName) {
		this.auditorName = auditorName;
	}

	public Date getCreate_time() {
		return create_time;
	}

	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}

	public Date getModify_time() {
		return modify_time;
	}

	public void setModify_time(Date modify_time) {
		this.modify_time = modify_time;
	}

	public String getCreate_name() {
		return create_name;
	}

	public void setCreate_name(String create_name) {
		this.create_name = create_name;
	}

}
