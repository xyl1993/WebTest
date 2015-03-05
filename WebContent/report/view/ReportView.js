Ext.define('report.view.ReportView', {
	extend : 'Ext.panel.Panel',
	title : '看病情况汇总表',
	uses : ['bu.view.BaseSearchWin'],
	alias : 'widget.reportView',
	layout : 'border',
	requires : ['Ext.util.Format', 'Ext.toolbar.Paging'],
	closable : true,
	id : 'report',
	initComponent : function() {
		var me = this;
		me.gridStore = Ext.create('report.store.ReportStore');
		me.positionStore = Ext.create('user.store.UserStore');// 职位下拉框store
		me.positionStore.load({
					params : {
						'usePaging' : false
					}
				});
		me.stateStore = Ext.create('bu.store.PositionStore');
		me.stateStore.load({
					params : {
						'usePaging' : false,
						'type_code' : 'state'
					}

				});
		me.qy_Store = Ext.create('Ext.data.Store', {
					fields : ['code', 'name'],
					data : [{
								'code' : 'T',
								'name' : '已取药'
							}, {
								'code' : 'N',
								'name' : '未取药'
							}]
				});
		me.sf_Store = Ext.create('Ext.data.Store', {
					fields : ['code', 'name'],
					data : [{
								'code' : 'T',
								'name' : '已收费'
							}, {
								'code' : 'N',
								'name' : '未收费'
							}]
				});
		Ext.apply(me, {
			items : [{
				xtype : 'gridpanel',
				itemId : 'list',
				closable : false,
				region : 'center',
				columnLines : true,
				store : me.gridStore,
				tbar : [{
							text : '刷新',
							iconCls : 'page_refreshIcon',
							handler : function() {
								me.gridStore.getProxy().extraParams = {
									'usePaging' : true
								}
								me.gridStore.loadPage(1);
							},
							itemId : 'BTN_REFRESH'
						},{
							xtype : 'button',
							iconCls : 'queryIcon',
							text : '查询',
							handler : function(btn) {
								var array = [{
											type : 'textfield',
											name : 'name',
											fieldLabel : '病人姓名'
										}, {
											type : 'combobox',
											name : 'userId',
											itemId : 'userId',
											fieldLabel : '就诊医生',
											editable : false,
											store : me.positionStore,
											displayField : 'login_name',
											valueField : 'id'
										}, {
											type : 'combobox',
											name : 'state',
											itemId : 'state',
											fieldLabel : '是否就诊',
											editable : false,
											store : me.stateStore,
											displayField : 'name',
											valueField : 'code'
										}, {
											type : 'combobox',
											name : 'sf_state',
											itemId : 'sf_state',
											fieldLabel : '是否收费',
											editable : false,
											store : me.sf_Store,
											displayField : 'name',
											valueField : 'code'
										}, {
											type : 'combobox',
											name : 'qy_state',
											itemId : 'qy_state',
											fieldLabel : '是否取药',
											editable : false,
											store : me.qy_Store,
											displayField : 'name',
											valueField : 'code'
										}, {
											type : 'box',
											hidden : true
										}]
								me.ownerCt.ownerCt.mask();
								if (!me.searchWin) {
									me.searchWin = Ext.widget(
											'buBaseSearchWin', {
												title : '看病情况汇总表查询',
												renderTo : me.ownerCt.ownerCt.el,
												itemArray : array,// 传给窗口的
												// 页面元素数组(field类型自己定义)
												gridStore : me.gridStore,// 指定该查询窗口
												// store对象(grid)
												listeners : {
													close : function() {
														if (this.searParams) {
															me.schParams = this.searParams;
														}
														me.searchWin = null;
														me.ownerCt.ownerCt
																.unmask();
													}
												}
											});
								}
								me.searchWin.show();
							}

						}],
				columns : [{
					xtype : 'rownumberer',
					header : '序号',
					width : 40,
					align : 'center',
					renderer : function(value, cellmeta, record, rowIndex,
							columnIndex, store) {
						return (store.currentPage - 1) * store.pageSize
								+ rowIndex + 1;
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
					header : '是否就诊',
					align : 'center',
					dataIndex : 'state',
					flex : 1
				}, {
					header : '是否付费',
					align : 'center',
					dataIndex : 'sf_state',
					flex : 1
				}, {
					header : '是否取药',
					align : 'center',
					dataIndex : 'qy_state',
					flex : 1
				}, {
					header : '备注',
					align : 'center',
					dataIndex : 'remarks',
					flex : 1
				}],
				dockedItems : [{
							xtype : 'pagingtoolbar',
							store : me.gridStore, // GridPanel中使用的数据
							dock : 'bottom',
							stateId : 'ReportView',
							displayInfo : true
						}],
				listeners : {
					afterrender : function(grid, opts) {
						me.gridStore.load();
//						var length = grid.dockedItems.keys.length;
//						var refreshStr = "";
//						for (var i = 0; i < length; i++) {
//							if (grid.dockedItems.keys[i].indexOf("pagingbar") !== -1) {
//								refreshStr = grid.dockedItems.keys[i];
//							}
//						}
//						grid.dockedItems.get(refreshStr).child('#refresh')
//								.hide(true);
					}
				}

			}]
		});
		this.callParent(arguments);
	}
})
