/**
 * 用户信息model
 */
Ext.define('user.model.UserModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'login_id',
						type : 'string'
					}, {
						name : 'login_name',
						type : 'string'
					}, {
						name : 'org_id',
						type : 'string'
					}, {
						name : 'sex',
						type : 'string'
					}, {
						name : 'phone',
						type : 'string'
					}, {
						name : 'email',
						type : 'string'
					}, {
						name : 'modify_time'
					}, {
						name : 'create_time'
					}, {
						name : 'login_pwd',
						type : 'string'
					}]
		});