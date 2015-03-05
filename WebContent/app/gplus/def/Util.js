Ext.define('gp.def.Util', {
			requires : ['gp.def.Msg'],
			init : function(callbackFn) {
				var me = this;

			},
			showMsg : function(message) {
				var wh = [200, 80];
				Ext.GyMsg.msg({
							title : '提示',
							text : '<center><font color=blue>' + message
									+ '</font></br></center>',
							WH : wh,
							XY : [document.body.offsetWidth - wh[0] - 20,
									document.body.offsetHeight - wh[1] - 32]
						});
			}
		}, function() {
			gp.Util = gp.def.Util = new this();
		});
