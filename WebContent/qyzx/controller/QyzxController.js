Ext.define('qy.controller.QyzxController', {
	extend : 'Ext.app.Controller',
	uses : ['gp.def.Util', 'bu.Const', 'bu.util.Util', 'gp.def.Const'],
	requires : ['qy.store.QyzxStore'],
	views : ['MngQyzxView', 'EditQyzxView'],
	refs : [{
				ref : 'MngQyzxView',
				selector : 'mngQyzxView'
			}, {
				ref : 'QyzxGrid',
				selector : 'mngQyzxView #list'
			}],
	init : function(app) {
		if (this.isInited)
			return;
		this.control({
					'mngQyzxView' : {
						afterrender : function(cmp) {
							this.gridStore = this.getQyzxGrid().getStore();
							this.gridStore.load();
						}
					},
					'mngQyzxView #list' : {
						itemdblclick : this.onModeldbClicked
					},
					'mngQyzxView button' : {
						click : this.onMngButtonClick
					},
					'editQyzxView button' : {
						click : this.onEditButtonClick
					}
				})
		this.isInited = true;
	},
	onMngButtonClick : function(btn) {
		var me = this;
		switch (btn.itemId) {
			case 'BTN_EDT' :
				// 打开编辑页面
				this.doEdit();
				break;
		}
	},
	onEditButtonClick : function(btn) {
		var me = this;
		// 获取form
		var edtForm = btn.up('panel').down('form');
		switch (btn.itemId) {
			case 'BTN_SAVE' :
				// 客户端验证
				if (edtForm.getForm().isValid()) {
					// 返回上次被加载的Ext.data.Model实例
					var oldrec = edtForm.getRecord();
					var id = edtForm.down('#id').getValue();
					// 获取form表单里面的数据信息
					var record = edtForm.getValues();
					// 验证数据编号是否相同
					// Ajax请求,保存新增数据
					Ext.Ajax.request({
								url : 'qy/doSave.do',
								params : record,
								method : 'POST',
								success : function(resp, opts) {
									var msg = Ext.JSON
											.decode(resp.responseText);
									if (msg.success) {
										gp.Util.showMsg('保存成功');
										// 刷新数据
										if (me.gridStore == undefined
												|| me.gridStore == null) {
											me.gridStore = Ext
													.create('qy.store.QyzxStore');
										}
										me.gridStore.loadPage(1);
										me.c_store = Ext
												.create('qy.store.QyzxStore');
										me.c_store.load(
												// 根据id从Store中获取刚才修改的数据
												function() {
											edtForm.loadRecord(me.c_store
													.getById(id));
										});
									} else {
										alert(msg.message);
									}
								}

							})

				}
		}
	},
	doDel : function() {
		var me = this;
		me.selModel = this.getMngQyzxView().down('#list').getSelectionModel();
		if (!me.selModel.hasSelection()) {
			Ext.Msg.alert('操作提示', '请选择一条数据');
			return;
		}
		me.ids = [];
		me.recs = me.selModel.getSelection();
		for (var i = 0; i < me.recs.length; i++) {
			me.ids.push(me.recs[i].get('id'));
		}
		// 删除前提示
		Ext.Msg.confirm('操作提示', '确认删除么？', function fn(id) {
					if (id == Ext.Msg.buttonIds[1]) {
						// 删除请求
						Ext.Ajax.request({
									url : 'register/doDelRegister.do?ids='
											+ me.ids,
									method : 'POST',
									success : function(response, opts) {
										me.gridStore.load();
									}
								});
					}
				});
	},
	onModeldbClicked : function() {
		var me = this;
		me.selModel = this.getMngQyzxView().down('#list').getSelectionModel();
		var rec = me.selModel.getSelection()[0];
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editQyzxView', {
					title : '取药中心_查看',
					id : 'qy_look',
					isView : true,
					gridStore : me.gridStore
				});
		addTab.down('button').setDisabled(true);
		var form = addTab.down('form');
		if (form) {
			if (!Ext.isEmpty(rec)) {
				form.loadRecord(rec);
			}
		}
		if (addTab) {
			if (center.getComponent('qy_look')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('qy_look');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);
		}

	},
	doEdit : function() {
		var me = this;
		me.selModel = this.getMngQyzxView().down('#list').getSelectionModel();
		if (!me.selModel.hasSelection()) {
			Ext.Msg.alert('操作提示', '请选择一条数据');
			return;
		}
		var rec = me.selModel.getSelection()[0];
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editQyzxView', {
					title : '取药中心_修改',
					id : 'qy_edit',
					isView : false, // 页面可编辑
					gridStore : me.gridStore
				});
		var form = addTab.down('form');
		if (form) {
			if (!Ext.isEmpty(rec)) {
				form.loadRecord(rec);
			}
		}
		if (addTab) {
			if (center.getComponent('qy_edit')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('qy_edit');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);
		}

	}

});