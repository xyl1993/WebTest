Ext.define('tm.view.MngTreatMentView', {
			extend : 'Ext.panel.Panel',
			title : '就诊中心',
			alias : 'widget.mngTreatMentView',
			layout : 'border',
			id:'treatMent',
			requires : ['Ext.util.Format'],
			closable : true,
			bid : null,
			initComponent : function() {
				var me = this;
				me.gridStore = Ext.create('tm.store.TreatMentStore');
				Ext.apply(me, {
							items : [{
								xtype : 'gridpanel',
								itemId : 'list',
								closable : false,
								region : 'center',
								columnLines : true,
								store : me.gridStore,
								dockedItems : [{
											xtype : 'pagingtoolbar',
											store : me.gridStore, // GridPanel中使用的数据
											dock : 'bottom',
											displayInfo : true
										}],
								tbar : [{
											text : '修改',
											iconCls : 'page_edit_1Icon',
											itemId : 'BTN_EDT'
										}, {
											text : '刷新',
											iconCls : 'page_refreshIcon',
											itemId : 'BTN_REFRESH',
											handler : function(){
												me.gridStore.loadPage(1);
											}
										}],
								columns : [{
									xtype : 'rownumberer',
									header : '序号',
									width : 40,
									align : 'center',
									renderer : function(value, cellmeta,
											record, rowIndex, columnIndex,
											store) {
										return (store.currentPage - 1)
												* store.pageSize + rowIndex + 1;
									}
								}, {
									header : '病人编号',
									dataIndex : 'code',
									align : 'center',
									flex : 1
								}, {
									header : '病人姓名',
									align : 'center',
									dataIndex : 'name',
									flex : 1
								}, {
									header : '性别',
									dataIndex : 'sex',
									align : 'center',
									flex : 1
								}, {
									header : '联系电话',
									align : 'center',
									dataIndex : 'phone',
									flex : 1
								}, {
									header : '主治医师',
									align : 'center',
									dataIndex : 'user',
									flex : 1
								}, {
									header : '创建人',
									align : 'center',
									dataIndex : 'create_name',
									flex : 1
								}, {
									header : '创建时间',
									dataIndex : 'create_time',
									align : 'center',
									renderer : Ext.util.Format
											.dateRenderer('Y-m-d'),
									flex : 1
								}, {
									header : '修改人',
									dataIndex : 'auditorName',
									align : 'center'
								}, {
									header : '修改时间',
									dataIndex : 'modify_time',
									align : 'center',
									renderer : Ext.util.Format
											.dateRenderer('Y-m-d'),
									flex : 1
								}],
								listeners : {}

							}]
						});
				this.callParent(arguments);
			}
		})
