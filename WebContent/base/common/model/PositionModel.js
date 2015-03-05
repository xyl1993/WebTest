/**
 * 基础数据model
 *
 */
Ext.define('bu.model.PositionModel', {
			extend : 'Ext.data.Model',
			fields : [{
						name : 'id',
						type : 'string'
					}, {
						name : 'type_code',
						type : 'string'
					}, {
						name : 'code',
						type : 'string'
					}, {
						name : 'name',
						type : 'string'
					}]
		});