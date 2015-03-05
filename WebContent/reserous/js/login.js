onLoginBtn = null;
getNewVCode = null;
onReset = null;
onHrefClick = null;
Ext.Loader.setConfig({
			enabled : true,
			paths : {
				'gp' : 'app/gplus'
			} // 指定命名空间的实际目录,要和上面的name、appFolder对应
		});

Ext.onReady(function() {
			Ext.require(['gp.def.Const']);
			onLoginBtn = function() {
				var loginId = $('#inputloginId').val();
				var pwd = $('#inputPassword').val();
				gp.Const.doLogin(loginId,pwd,'');
//				location.href = "index.jsp";
			};
			onReset = function() {
				$('#inputloginId').val('');
				$('#inputPassword').val('');
			};
			getNewVCode = function() {
				var vcode_img = document.getElementById('vCodeImg');
				if (vcode_img) {
					// vcode_img.src='platform/getVerifyCode.act?_dc='+new
					// Date().getTime();
				}
			};
			onHrefClick = function(){
//				Ext. Msg.alert('ok');
//				Ext.Msg.alert('tishi','we');
			}
		})

