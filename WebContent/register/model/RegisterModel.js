/**
 * 病人挂号model
 */
Ext.define('register.model.RegisterModel', {
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
						name:'create_name',				//创建人
						type:'string'
					},{
						name:'auditorName',			//修改人
						type:'string'
					},{
						name:'create_time'
					},{
						name:'modify_time'
					},{
						name:'state',				//状态，是否就诊
						type:'string'
					}]
		})