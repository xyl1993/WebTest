Ext.define('tm.view.EditTreatMentView', {
	extend : 'Ext.panel.Panel',
	uses : ['bu.util.Util'],
	requires : ['Ext.form.Panel', 'Ext.form.field.Hidden',
			'tm.model.TreatMentModel', 'md.model.MedicineModel',
			'md.model.QyModel'],
	alias : 'widget.editTreatMentView',
	title : '就诊中心_修改',
	closable : true,
	autoScroll : true,
	id:null,
	temp : null,
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	isView : false,// 用于查看时将表单置为 只读
	initComponent : function() {
		var me = this;
		me.positionStore = Ext.create('user.store.UserStore');// 职位下拉框store
		me.positionStore.getProxy().extraParams = {
			'usePaging' : false
		};// 过滤
		// 药物名称下拉框store
		me.medicineStore = Ext.create('md.store.MedicineStore');
		me.medicineStore.load();
		me.sexStore = Ext.create('bu.store.PositionStore');
		me.sexStore.getProxy().extraParams = {
			'usePaging' : false,
			'type_code' : 'sex_code'
		}
		me.stateStore = Ext.create('bu.store.PositionStore');
		me.stateStore.getProxy().extraParams = {
			'usePaging' : false,
			'type_code' : 'state'
		}
		me.QyInfoGridStore = Ext.create('md.store.QyStore');
		var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit : 1
				});
		Ext.apply(me, {
			tbar : [{
						text : '保存',
						iconCls : 'page_saveIcon',
						hidden : me.firstP,
						itemId : 'BTN_SAVE'
					}, {
						text : '增行',
						iconCls : 'page_addIcon',
						itemId : 'FUNC_ITEMID_BTN_ADD',
						handler : function(btn) {
							var r = Ext.create('md.model.QyModel', {
										register : me.down('#id').getValue(),
										medicine_price : '',
										medicine : '',
										quence : '',
										allPrice : '',
										qyRemarks : ''
									});
							var count = btn.up('panel').down('grid').getStore()
									.getCount();// 获得当前条目数
							me.QyInfoGridStore.insert(count, r);// 在指定位置新增一行数据
							cellEditing.startEditByPosition({
										row : count,
										column : 0
									});// 在指定位置编辑
						}
					}, {
						text : '删行',
						iconCls : 'page_delIcon',
						hidden : me.firstP,
						itemId : 'FUNC_ITEMID_BTN_DEL'
					}],
			items : [{
				xtype : 'form',
				// 表达只读
				fieldDefaults : {
					readOnly : me.isView
				},
				trackResetOnLoad : true,
				// padding:'0 5 5 5',
				border : false,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},
				items : [{
							xtype : 'container',
							margin : '20 15 0 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								flex : 1,
								labelWidth : 80,
								labelAlign : 'left',
								allowBlank : false,
								margin : '0 0 0 20'
							},
							items : [{
										xtype : 'textfield',
										name : 'code',
										itemId : 'code',
										align : 'center',
										fieldLabel : bu.util.colorText('用户编号'),
										readOnly : true
									}, {
										xtype : 'textfield',
										name : 'name',
										itemId : 'name',
										fieldLabel : bu.util.colorText('就诊姓名'),
										maxLength : 30,
										readOnly : true
									}, {
										xtype : 'combo',
										name : 'user',
										itemId : 'user',
										displayField : 'login_name',
										valueField : 'id',
										store : me.positionStore,
										allowBlank : true,
										readOnly : true,
										fieldLabel : bu.util.colorText('就诊医生')
									}]
						}, {
							xtype : 'container',
							items : [{
										xtype : 'hidden',
										itemId : 'id',
										name : 'id',
										border : false
									}]
						}, {
							xtype : 'container',
							margin : '20 15 0 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								flex : 1,
								labelWidth : 80,
								labelAlign : 'left',
								margin : '0 0 0 20'
							},
							items : [{
										xtype : 'combo',
										name : 'sex',
										itemId : 'sex',
										displayField : 'name',
										valueField : 'code',
										store : me.sexStore,
										readOnly : true,
										fieldLabel : bu.util.colorText('性别'),
										allowBlank : true
									}, {
										xtype : 'textfield',
										name : 'phone',
										itemId : 'phone',
										readOnly : true,
										fieldLabel : bu.util.colorText('联系电话'),
										allowBlank : false
									}, {
										xtype : 'combo',
										name : 'state',
										itemId : 'state',
										displayField : 'name',
										valueField : 'code',
										store : me.stateStore,
										fieldLabel : bu.util.colorText('是否就诊'),
										allowBlank : true
									}]
						}, {
							xtype : 'container',
							margin : '20 15 0 0',
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							defaults : {
								flex : 1,
								labelWidth : 80,
								labelAlign : 'left',
								margin : '0 0 0 20'
							},
							items : [{
										xtype : 'textareafield',
										name : 'remarks',
										itemId : 'remarks',
										fieldLabel : '备注',
										allowBlank : true
									}]
						}, {
							xtype : 'gridpanel',
							margin : '20 15 0 20',
							flex : 1,
							itemId : 'list',
							height : 320,
							multiSelect : true,// 允许多选
							features : [{ // 底部添加总计行
								ftype : 'summary',
								dock : 'bottom'
							}],
							columns : [{
								dataIndex : 'medicine',
								align : 'center',
								width : 210,
								text : '药品名称<font color=red>*</font>',
								renderer : function(v) { // 根据id匹配name
									var rec = me.medicineStore.findRecord('id',
											v, 0, false, false, true);
									if (rec) {
										return rec.get('medicineName');
									} else {
										return v;
									}
								},
								summaryRenderer : function(v, summaryData,
										dataIndex) {
									return '总计:';
								},
								editor : {
									xtype : 'combo',
									displayField : 'medicineName',
									valueField : 'id',
									store : me.medicineStore,
									listeners : {
										'select' : function(combo, record,
												eOpts) {
											me.down('gridpanel')
													.getSelectionModel()
													.getSelection()[0].set(
													'medicine_price',
													record[0].data.price);
										}
									}
								}
							}, {
								dataIndex : 'medicine_price',
								width : 120,
								align : 'center',
								text : '药品价格',
								renderer : function(v) {
									if (v != 0) {
										return Ext.util.Format
												.number(v, '0.00');
									}

								}
							}, {
								dataIndex : 'quence',
								width : 80,
								text : '药品数量',
								align : 'center',
								editor : {
									xtype : 'numberfield',
									maxLength : 9,
									minValue : 0,
									decimalPrecision : 0,
									listeners : {
										blur : function(ept, obj, eOpts) {
											me.down('gridpanel')
													.getSelectionModel()
													.getSelection()[0].set(
													'quence', ept.lastValue);
											me.down('gridpanel')
													.getSelectionModel()
													.getSelection()[0]
													.set(
															'allPrice',
															ept.lastValue
																	* me
																			.down('gridpanel')
																			.getSelectionModel()
																			.getSelection()[0].data.medicine_price);
										}
									}
								},
								renderer : function(v) {
									if (v != 0) {
										return v;
									}
								}
							}, {
								dataIndex : 'allPrice',
								width : 80,
								text : '累计金额',
								align : 'center',
								summaryType: 'sum',                  //求和
								renderer : function(v) {
									if (!isNaN(v)) {
										return Ext.util.Format
												.number(v, '0.00');
									}
								},
								summaryRenderer : function(v, summaryData,
										dataIndex) {
									me.sumJiaMoney = v;
									return Ext.util.Format
											.number(v, '0,000.00');
								}
							}, {
								dataIndex : 'qyRemarks',
								flex : 1,
								text : '备注',
								align : 'center',
								renderer : function(v) {
									if (v) {
										return '<div align=left>' + v
												+ '</div>'
									}
								},
								editor : {
									maxLength : 255
								}
							}],
							listeners : {
								beforeedit : function() {
									if (me.isView) {
										return false
									}
								}
							},
							store : me.QyInfoGridStore,
							columnLines : true,
							plugins : [cellEditing]
						}]
			}],
			listeners : {
				afterrender : function(cmp) {
					var me = this;
					me.QyInfoGridStore.getProxy().extraParams = {
						'register_id' : me.down('#id').getValue()
					}
					me.QyInfoGridStore.load();
				}
			}

		});
		me.callParent(arguments);
	}
})