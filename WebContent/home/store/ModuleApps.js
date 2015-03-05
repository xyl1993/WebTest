Ext.define('keyi.store.ModuleApps', {
			extend : 'Ext.data.Store',
			model : 'keyi.model.ModuleApp',
			proxy : {
				extraParams : {
					usePaging : false,
					power : 'admin'
				},
				type : 'ajax',
				actionMethods : 'post',
				url : 'menu/getNode.do',
				reader : {
					type : 'json',
					root : 'children'
				},
				writer : {
					type : 'json',
					root : 'children',
					encode : true,
					allowSingle : false
				}
			},
			root : {
				expanded : false
			},//
			autoLoad : false
		});