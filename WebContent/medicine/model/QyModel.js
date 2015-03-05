Ext.define('md.model.QyModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'register',
						type : 'string'
					}, {
						name : 'medicine',
						type:'string'
					}, {
						name:'allPrice',
						type:'float'
					},{
						name : 'medicine_price',
						type : 'float'
					}, {
						name : 'quence', 
						type : 'string'
					},{
						name:'qyRemarks',
						type:'string'
					}]
		})