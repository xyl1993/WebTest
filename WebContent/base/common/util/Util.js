/**
 * 工具类
 */
Ext.define('bu.util.Util', {
			uses : ['bu.Const'],
			// 必填项颜色标注
			colorText : function(text, color) {
				return Ext.String.format('<span style="color:{0}">{1}</span>',
						color || 'blue', text);
			},
			// 生成主键
			getRandomNo : function(num) {
				num = num.length > 7 ? num.substring(0, 7) : num;
				var len = 15;
				var $chars = '1234567890';
				var maxPos = $chars.length;
				var randomNo = num;
				for (i = 0; i < len; i++) {
					randomNo += $chars.charAt(Math
							.floor(Math.random() * maxPos));
				}
				return randomNo;
			},
			/**
			 * 获取当前用户
			 * 
			 * @return {}
			 */
			getLoginName : function() {
				var value;
				Ext.Ajax.request({
							url : 'main/doGetSession.do',
							params : {},
							async : false, // 异步
							success : function(response) {
								var ret = Ext.decode(response.responseText);
								if (ret.success) {
									value = ret.data;
								}
							}
						});
				return value;
			},
			/**
			 * 获取当前用户所有信息
			 * 
			 * @return {}
			 */
			getUserInfo : function() {
				var obj;
				Ext.Ajax.request({
							url : 'main/doGetUserInfo.do',
							params : {},
							async : false, // 异步
							success : function(response) {
								var ret = Ext.decode(response.responseText);
								if (ret.success) {
									obj = ret.data;
								}
							}
						});
				return obj
			},
			addTab : function(rolePanel) {
				var me = this;
				var center = me.getApplication()
						.getController('HomeController').getCenter();
				var tabObj = center.getComponent(rolePanel.id);
				if (!tabObj) {
					tabObj = center.add(rolePanel);
					center.doLayout();
				}
				Ext.create('Ext.util.DelayedTask', function() {
							center.setActiveTab(tabObj);
							tabObj.show();
							tabObj.tab.show();
						}).delay(10);
			},
			findContentTab : function(itemId) {
				var tabId = this.getModuleTabId(itemId);
				return this.getContentTab().getComponent(tabId);
			}
		}, function() {
			bu.util = new this();
		});