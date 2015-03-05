Ext.define('register.view.EditRegisterView', {
			extend : 'Ext.panel.Panel',
			uses : ['bu.util.Util'],
			requires : ['Ext.form.Panel', 'Ext.form.field.Hidden',
					'register.model.RegisterModel'],
			alias : 'widget.editRegisterView',
			title : '挂号_修改',
			id:null,
			closable : true,
			autoScroll : true,
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
				Ext.apply(me, {
							tbar : [{
								text : '保存',
								iconCls : 'page_saveIcon',
								hidden : me.firstP,
								itemId : 'BTN_SAVE'

							}		// 加上这个FF下才不会hide后被销毁
							],
							items : [{
								xtype : 'form',
								//表达只读
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
												align:'center',
												fieldLabel : bu.util
														.colorText('用户编号'),
												readOnly : true
											}, {
												xtype : 'textfield',
												name : 'name',
												itemId : 'name',
												fieldLabel : bu.util
														.colorText('用户姓名'),
												maxLength : 30
											}, {
												xtype : 'combo',
												name : 'user',
												itemId : 'user',
												displayField : 'login_name',
												valueField : 'id',
												store : me.positionStore,
												allowBlank : true,
												fieldLabel : bu.util
														.colorText('就诊医生')
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
												fieldLabel : bu.util
														.colorText('性别'),
												allowBlank : true
											}, {
												xtype : 'textfield',
												name : 'phone',
												itemId : 'phone',
												fieldLabel : bu.util
														.colorText('联系电话'),
												allowBlank : false,
												maxLength : 30
											}, {
												xtype : 'combo',
												name : 'state',
												itemId : 'state',
												displayField : 'name',
												valueField : 'code',
												emptyText : '未就诊',
												store : me.stateStore,
												fieldLabel : bu.util
														.colorText('是否就诊'),
												allowBlank : true,
												readOnly:true
											}]
								}]
							}]

						});
				me.callParent(arguments);
			}
		})