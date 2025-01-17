/**
 * model
 */
Ext.define('sf.model.SfzxModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					},{
						name:'code',                //编号
						type:'string'
					},{
						name:'name',				//病人姓名
						type:'string'
					},{
						name:'sex',				//性别id
						type:'string'
					},{
						name:'user',				//性别id
						type:'string'
					},{
						name:'remarks'
					},{
						name:'phone',
						type:'string'
					},{
						name:'sf_state',				//
						type:'string'
					}]
		})