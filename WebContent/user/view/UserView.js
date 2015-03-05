Ext.define('user.view.UserView', {
			extend : 'Ext.panel.Panel',
			title : '用户中心',
			id : 'user',
			alias : 'widget.userView',
			layout : 'border',
			requires : ['Ext.util.Format'],
			closable : true,
			bid : null,
			initComponent : function() {
				var me = this;
				me.gridStore = Ext.create('user.store.UserStore');
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
											text : '新增',
											iconCls : 'page_addIcon',
											itemId : 'BTN_ADD'
										}, {
											text : '修改',
											iconCls : 'page_edit_1Icon',
											itemId : 'BTN_EDT'
										}, {
											text : '删除',
											iconCls : 'page_delIcon',
											itemId : 'BTN_DEL'
										}, {
											text : '刷新',
											handler : function() {
												me.gridStore.loadPage(1);
											},
											iconCls : 'page_refreshIcon',
											itemId : 'BTN_REFRESH'
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
									header : '用户编号',
									dataIndex : 'login_id',
									align : 'center',
									flex : 1
								}, {
									header : '用户姓名',
									align : 'center',
									dataIndex : 'login_name',
									flex : 1
								}, {
									header : '职称',
									dataIndex : 'org_id',
									align : 'center',
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
									header : '电子邮箱',
									align : 'center',
									dataIndex : 'email',
									flex : 1
								}, {
									header : '创建时间',
									dataIndex : 'create_time',
									align : 'center',
									renderer : Ext.util.Format
											.dateRenderer('Y-m-d'),
									flex : 1
								}],
								listeners : {
							// itemdblclick : function() {
								// me.browse();
								// }
								// afterrender : function() {
								// me.gridStore.load();
								// }
								}

							}]
						});
				this.callParent(arguments);
			}
		})