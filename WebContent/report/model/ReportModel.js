/**
 * 病人挂号model
 */
Ext.define('report.model.ReportModel', {
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
						name:'user',              //主治医生id
						type:'string'
					},{
						name:'sex',				//性别id
						type:'string'
					},{
						name:'phone',				//联系电话
						type:'string'
					},{
						name:'sf_state',				//创建人
						type:'string'
					},{
						name:'qy_state',			//修改人
						type:'string'
					},{
						name:'remarks'
					},{
						name:'state',				//状态，是否就诊
						type:'string'
					}]
		})