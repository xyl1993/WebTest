/**
 * 入口控制层，控制页面动态加载
 */
Ext.define('keyi.controller.HomeController', {
			extend : 'Ext.app.Controller',
			uses : ['gp.def.Util', 'bu.Const', 'bu.util.Util', 'gp.def.Const'],
			views : ['Center', 'West'],
			refs : [{
						ref : 'center',
						selector : 'center'
					}, {
						ref : 'viewport',
						selector : 'viewport'
					}, {
						ref : 'west',
						selector : 'west'
					}

			],
			init : function(app) {
				this.control({
							'west treepanel' : {// 双击信息列表时，打开序列发生器信息维护窗口
								itemdblclick : this.onModTreedbClicked
							}
						});
			},
			onModTreedbClicked : function(view, rec, item, idx, e, eOpts) {
				var me = this;
				// 根据系统参数决定鼠标点击打开模式，默认是双击打开
				this.onModTreeSelect(view, rec, item, idx, e, eOpts);
				Ext.create('Ext.util.DelayedTask', function() {
							me.isclicked = false;
						}).delay(500);

			},
			onModTreeSelect : function(view, rec, item, idx, e, eOpts) {
				var me = this;
				// 在点击模块菜单节点时动态加载相应模块
				var leaf = rec.get('leaf');
				var center = me.getApplication()
						.getController('HomeController').getCenter();
				// 控制简单任务菜单 相同时，出同一界面
				if (rec.data.id == 'user' || rec.data.id == 'user') {
					var rolePanel = Ext.widget('userView'); // 用户列表界面
					if (rolePanel) {
						if (center.getComponent('user')) {
							// 如果存在，查找到该窗口
							// // 调用show()
							var oldTab = center.getComponent('user');
							oldTab.up('tabpanel').remove(oldTab);
						}
						center.add(rolePanel);
						center.setActiveTab(rolePanel);

					}

				} else if (rec.data.id == 'gh' || rec.data.id == 'gh') {
					var rolePanel = Ext.widget('mngRegisterView'); // 挂号列表界面
					if (rolePanel) {
						if (center.getComponent('register')) {
							// 如果存在，查找到该窗口
							// 调用show()
							var oldTab = center.getComponent('register');
							oldTab.up('tabpanel').remove(oldTab);

						} else {
							// var tabObj = center.getComponent(rolePanel.id);
							// if (!tabObj) {
							// tabObj = center.add(rolePanel);
							// center.doLayout();
							// }
							// Ext.create('Ext.util.DelayedTask', function() {
							// center.setActiveTab(tabObj);
							// tabObj.show();
							// tabObj.tab.show();
							// }).delay(10);
							// center.add(rolePanel);
							// center.setActiveTab(rolePanel);
						}
						center.add(rolePanel);
						center.setActiveTab(rolePanel);
					}
				} else if (rec.data.id == 'jz' || rec.data.id == 'jz') {
					var rolePanel = Ext.widget('mngTreatMentView'); // 就诊列表界面
					if (rolePanel) {
						if (center.getComponent('treatMent')) {
							// 如果存在，查找到该窗口
							// 调用show()
							var oldTab = center.getComponent('treatMent');
							oldTab.up('tabpanel').remove(oldTab);
						}
						center.add(rolePanel);
						center.setActiveTab(rolePanel);

					}
				} else if (rec.data.id == 'sf' || rec.data.id == 'sf') {
					var rolePanel = Ext.widget('mngSfzxView'); // 收费列表界面
					if (rolePanel) {
						if (center.getComponent('sfzx')) {
							// 如果存在，查找到该窗口
							// 调用show()
							var oldTab = center.getComponent('sfzx');
							oldTab.up('tabpanel').remove(oldTab);
						}
						center.add(rolePanel);
						center.setActiveTab(rolePanel);
					}
				} else if (rec.data.id == 'qy' || rec.data.id == 'qy') {
					var rolePanel = Ext.widget('mngQyzxView'); // 收费列表界面
					if (rolePanel) {
						if (center.getComponent('qyzx')) {
							// 如果存在，查找到该窗口
							// 调用show()
							var oldTab = center.getComponent('qyzx');
							oldTab.up('tabpanel').remove(oldTab);
						}
						center.add(rolePanel);
						center.setActiveTab(rolePanel);
					}
				} else if (rec.data.id == 'hz' || rec.data.id == 'hz') {
					var rolePanel = Ext.widget('reportView'); // 收费列表界面
					if (rolePanel) {
						if (center.getComponent('report')) {
							// 如果存在，查找到该窗口
							// 调用show()
							var oldTab = center.getComponent('report');
							oldTab.up('tabpanel').remove(oldTab);
						}
						center.add(rolePanel);
						center.setActiveTab(rolePanel);

					}
				}
			}
		}, function() {
			var me = this;
			keyi.HomeController = keyi.controller.HomeController;
		});