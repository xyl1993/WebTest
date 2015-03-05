package medicine.model;
/**
 * 病人取药model
 *
 */
public class QyModel implements java.io.Serializable{

	private static final long serialVersionUID = 6075419503810018053L;
	
	private String id;
	
	private String register;
	
	private String medicine;   //药品
	
	private double medicine_price;
	
	private double quence;
	
	private String qyRemarks="";

	private double allPrice;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRegister() {
		return register;
	}

	public void setRegister(String register) {
		this.register = register;
	}

	public String getMedicine() {
		return medicine;
	}

	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}

	public Double getMedicine_price() {
		return medicine_price;
	}

	public double getQuence() {
		return quence;
	}

	public void setQuence(double quence) {
		this.quence = quence;
	}

	public String getQyRemarks() {
		return qyRemarks;
	}

	public void setQyRemarks(String qyRemarks) {
		this.qyRemarks = qyRemarks;
	}

	public double getAllPrice() {
		return allPrice;
	}

	public void setAllPrice(double allPrice) {
		this.allPrice = allPrice;
	}

	public void setMedicine_price(double medicine_price) {
		this.medicine_price = medicine_price;
	}

}
