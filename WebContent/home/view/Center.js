Ext.define('keyi.view.Center', {
			extend : 'Ext.tab.Panel',
			uses : ['gp.ux.tabCloseMenuView'], // 引用菜单关闭js页面，重写内部方法
			alias : 'widget.center',
			region : 'center',
			plugins : [{
						ptype : 'tabclosemenu'              //右键panel关闭事件
					}],
			initComponent : function() {
				var me = this;
				Ext.apply(me, {
					items:[{
						title:'首页',
						xtype:'imagecomponent',
						src: 'reserous/images/index_logo.jpg',
						renderTo: Ext.getBody()
					}]
				})
				this.callParent();
			}
		});