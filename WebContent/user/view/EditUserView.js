Ext.define('user.view.EditUserView', {
			extend : 'Ext.panel.Panel',
			uses : ['bu.util.Util'],
			requires : ['Ext.form.Panel', 'Ext.form.field.Hidden',
					'user.model.UserModel'],
			alias : 'widget.edit_user',
			title : '用户_修改',
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
				me.positionStore = Ext.create('bu.store.PositionStore');// 职位下拉框store
				me.positionStore.getProxy().extraParams = {
					'type_code' : 'position_code'
				}
				me.sexStore = Ext.create('bu.store.PositionStore');
				me.sexStore.getProxy().extraParams = {
					'type_code' : 'sex_code'
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
												name : 'login_id',
												itemId : 'login_id',
												align : 'center',
												fieldLabel : bu.util
														.colorText('用户编号'),
												maxLength : 30
											}, {
												xtype : 'textfield',
												name : 'login_name',
												itemId : 'login_name',
												fieldLabel : bu.util
														.colorText('用户姓名'),
												maxLength : 30
											}, {
												xtype : 'combo',
												name : 'org_id',
												itemId : 'org_id',
												displayField : 'name',
												valueField : 'code',
												store : me.positionStore,
												allowBlank : true,
												fieldLabel : bu.util
														.colorText('职位')
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
												xtype : 'textfield',
												name : 'email',
												itemId : 'email',
												fieldLabel : '电子邮箱',
												allowBlank : true,
												maxLength : 30
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
												xtype : 'textfield',
												name : 'login_pwd',
												itemId : 'login_pwd',
												fieldLabel : bu.util
														.colorText('密码')
											}, {
												xtype : 'box'
											}, {
												xtype : 'box'
											}]
								}]
							}]

						});
				me.callParent(arguments);
			}
		})