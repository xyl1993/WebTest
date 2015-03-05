Ext.define('tm.controller.TreatMentController', {
	extend : 'Ext.app.Controller',
	uses : ['gp.def.Util', 'bu.Const', 'bu.util.Util', 'gp.def.Const'],
	requires : ['tm.store.TreatMentStore'],
	views : ['MngTreatMentView', 'EditTreatMentView'],
	refs : [{
				ref : 'MngTreatMentView',
				selector : 'mngTreatMentView'
			}, {
				ref : 'TreatMentViewGrid',
				selector : 'mngTreatMentView #list'
			}, {
				ref : 'EditGridView',
				selector : 'editTreatMentView #list'
			}],
	init : function(app) {
		if (this.isInited)
			return;
		this.control({
					'mngTreatMentView' : {
						afterrender : function(cmp) {
							this.gridStore = this.getTreatMentViewGrid()
									.getStore();
							this.gridStore.getProxy().setExtraParam(
									'login_name', bu.util.getLoginName());
							this.gridStore.load();
						}
					},
					'mngTreatMentView #list' : {
						itemdblclick : this.onModeldbClicked
					},
					'mngTreatMentView button' : {
						click : this.onMngButtonClick
					},
					'editTreatMentView button' : {
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
			// case 'BTN_DEL' :
			// // 进行删除操作
			// this.doDel();
			// break;
		}
	},
	onEditButtonClick : function(btn) {
		var me = this;
		// 获取form
		var edtForm = btn.up('panel').down('form');
		switch (btn.itemId) {
			case 'BTN_SAVE' : // 保存
				// 客户端验证
				if (edtForm.getForm().isValid()) {
					// 返回上次被加载的Ext.data.Model实例
					var oldrec = edtForm.getRecord();
					var id = edtForm.down('#id').getValue();
					// 获取修改时间
					var modifyTime = oldrec.get('modify_time');
					// 判断修改还是新增

					// 获取form表单里面的数据信息
					var record = edtForm.getValues();
					// 验证数据编号是否相同
					// Ajax请求,保存新增数据 保存主表数据
					Ext.Ajax.request({
						url : 'tm/doSave.do',
						params : record,
						method : 'POST',
						success : function(resp, opts) {
							var msg = Ext.JSON.decode(resp.responseText);
							if (msg.success) {
								if (me.doSaveList(btn)) {
									gp.Util.showMsg('保存成功');
									// 刷新数据
									if (me.gridStore == undefined
											|| me.gridStore == null) {
										me.gridStore = Ext
												.create('tm.store.TreatMentStore');
									}
									me.gridStore.loadPage(1);
									me.c_store = Ext
											.create('tm.store.TreatMentStore');
									me.c_store.load(
											// 根据id从Store中获取刚才修改的数据
											function() {
										edtForm.loadRecord(me.c_store
												.getById(id));
									});
								}

							} else {
								alert(msg.message);
							}
						}

					})

				}
				break;
			case 'FUNC_ITEMID_BTN_DEL' : { // 删行操作
				var me = this;
				me.selModel = this.getEditGridView().getSelectionModel();
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
											url : 'tm/doDelList.do?ids='
													+ me.ids,
											method : 'POST',
											success : function(response, opts) {
												me.getEditGridView().getStore()
														.load();
											}
										});
							}
						});
			}

		}
	},
	// 保存从表数据
	doSaveList : function(btn) {
		var me = this;
		var newRecords = [];
		var flag = false;
		var infoGridStore = btn.up('panel').down('grid').getStore();
		var updatedList = infoGridStore.getUpdatedRecords();
		var insertedList = infoGridStore.getNewRecords();
		// 判断是否有新增数据
		if (null != insertedList && insertedList.length > 0) {
			for (var i = 0; i < insertedList.length; i++) {
				// 判断是否输入单位
				insertedList[i].data.id = bu.util.getRandomNo('Qy');
				newRecords.push(insertedList[i].data);

			}
		}
		// 判断是否有修改数据
		if (null != updatedList && updatedList.length > 0) {
			for (var i = 0; i < updatedList.length; i++) {
				// 判断是否输入单位
				newRecords.push(updatedList[i].data);

			}
		}
		Ext.Ajax.request({
					url : 'tm/doSaveList.do',
					params : {
						bdis : Ext.encode(newRecords)
					},
					method : 'POST',
					async : false, // 异步
					success : function(resp, opts) {
						var msg = Ext.JSON.decode(resp.responseText);
						if (msg.success) {
							me.getEditGridView().getStore().load();
							newRecords = [];
							flag = true;
						} else {
							alert(msg.message);
						}
					}
				})
		return flag
	},
	doDel : function() {
		var me = this;
		me.selModel = this.getMngTreatMentView().down('#list')
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
		me.selModel = this.getMngTreatMentView().down('#list')
				.getSelectionModel();
		var rec = me.selModel.getSelection()[0];
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editTreatMentView', {
					title : '就诊中心_查看',
					id : 'tm_look',
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
			if (center.getComponent('tm_look')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('tm_look');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);

		}

	},
	doEdit : function() {
		var me = this;
		me.selModel = this.getMngTreatMentView().down('#list')
				.getSelectionModel();
		if (!me.selModel.hasSelection()) {
			Ext.Msg.alert('操作提示', '请选择一条数据');
			return;
		}
		var rec = me.selModel.getSelection()[0];
		var center = me.getApplication().getController('HomeController')
				.getCenter();
		var addTab = Ext.widget('editTreatMentView', {
					title : '就诊中心_修改',
					id : 'tm_edit',
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
			if (center.getComponent('tm_edit')) {
				// 如果存在，查找到该窗口
				// 调用show()
				var oldTab = center.getComponent('tm_edit');
				oldTab.up('tabpanel').remove(oldTab);
			}
			center.add(addTab);
			center.setActiveTab(addTab);
		}

	}

});