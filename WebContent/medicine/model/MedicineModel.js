/**
 * 药品model
 */
Ext.define('md.model.MedicineModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'medicineName',
						type : 'string'
					}, {
						name : 'price',
						type : 'float'
					}, {
						name : 'quence',
						type : 'float'
					}, {
						name : 'medicineRemarks', 
						type : 'string'
					}]
		})