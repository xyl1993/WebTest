Ext.define('report.store.ReportStore', {
			extend : 'Ext.data.Store',
			model : 'report.model.ReportModel',
			pageSize:25,
			proxy : {
				extraParams : {
					usePaging : true
				},
				type : 'ajax',
				actionMethods : 'post',
				url : 'report/getHzReport.do',
				reader : {
					type : 'json',
					root : 'data',
					totalProperty: 'total'
				},
				writer : {
					type : 'json',
					root : 'data', // 提交数据可以用{data:[xxx]}的形式包装
					encode : true, // 数据经过encode后提交,形式为post_data=XXXXX
					// 后台需要用post_data为参数名提取后再解释为JSON
					allowSingle : false
					/* 即使单行也包装成数组形式，这样后台服务就无需对单行和多行分开解释了 */
				}
			}
		});