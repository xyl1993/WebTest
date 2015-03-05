Ext.define('register.controller.RegisterController', {
	extend : 'Ext.app.Controller',
	uses : ['gp.def.Util', 'bu.Const', 'bu.util.Util', 'gp.def.Const'],
	requires : ['register.store.RegisterStore'],
	views : ['MngRegisterView', 'EditRegisterView'],
	refs : [{
				ref : 'MngRegisterView',
				selector : 'mngRegisterView'
			}, {
				ref : 'RegisterGrid',
				selector : 'mngRegisterView #list'
			}],
	init : function(app) {
		// if (this.isInited)
		// return;
		this.control({
					'mngRegisterView' : {
						afterrender : function(cmp) {
							this.gridStore = this.getRegisterGrid().getStore();
							this.gridStore.load();
						}
					},
					'mngRegisterView #list' : {
						itemdblclick : this.onModeldbClicked
					},
					'mngRegisterView button' : {
						click : this.onMngButtonClick
					},
					'editRegisterView button' : {
						click : this.onEditButtonClick
					}
				})
		// this.isInited = true;
	},
	onMngButtonClick : function(btn) {
		var me = this;
		switch (btn.itemId) {
			case 'BTN_ADD' :
				// 打开新增页面
				this.doAdd();
				break;
			case 'BTN_EDT' :
				// 打开编辑页面
				this.doEdit();
				break;
			case 'BTN_DEL' :
				// 进行删除操作
				this.doDel();
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
					// 获取修改时间
					// 获取form表单里面的数据信息
					var record = edtForm.getValues();
					// 验证数据编号是否相同
					// Ajax请求,保存新增数据
					Ext.Ajax.request({
						url : 'register/doSave.do',
						params : record,
						method : 'POST',
						success : function(resp, opts) {
							var msg = Ext.JSON.decode(resp.responseText);
							if (msg.success) {
								gp.Util.showMsg('保存成功');
								// 刷新数据
								if (me.gridStore == undefined
										|| me.gridStore == null) {
									me.gridStore = Ext
											.create('register.store.RegisterStore');
								}
								me.gridStore.loadPage(1);
								me.c_store = Ext
										.create('register.store.RegisterStore');
								me.c_store.load(
										// 根据id从Store中获取刚才修改的数据
										function() {
									edtForm.loadRecord(me.c_store.getById(id));
								});
							} else {
								alert(msg.message);
							}
						}

					})

				}

		}
	},
	doAdd : function() {
		var me = this;
		// 生成主键
		me.randomNo = bu.util.getRandomNo('register');
		me.rec = Ext.create('register.model.RegisterModel', {
					id : me.randomNo,
					code : me.randomNo
				})// 数据模型
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editRegisterView', {
					title : '挂号中心_新增',
					id : 're_add',
					bid : me.randomNo,
					gridStore : me.gridStore
				});
		var form = addTab.down('form');
		if (form) {
			if (!Ext.isEmpty(me.rec)) {
				form.loadRecord(me.rec);
			}
		}
		if (addTab) {
			if (center.getComponent('re_add')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('re_add');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);
		}
	},
	doDel : function() {
		var me = this;
		me.selModel = this.getMngRegisterView().down('#list')
				.getSelectionModel();
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
		me.selModel = this.getMngRegisterView().down('#list')
				.getSelectionModel();
		var rec = me.selModel.getSelection()[0];
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editRegisterView', {
					title : '挂号中心_查看',
					id : 're_look',
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
			if (center.getComponent('re_look')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('re_look');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);
		}

	},
	doEdit : function() {
		var me = this;
		me.selModel = this.getMngRegisterView().down('#list')
				.getSelectionModel();
		if (!me.selModel.hasSelection()) {
			Ext.Msg.alert('操作提示', '请选择一条数据');
			return;
		}
		var rec = me.selModel.getSelection()[0];
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editRegisterView', {
					title : '挂号中心_修改',
					id : 're_edit',
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
			if (center.getComponent('re_edit')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('re_edit');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);

		}

	}

}, function() {
	var me = this;
	register.RegisterController = register.controller.RegisterController;
});