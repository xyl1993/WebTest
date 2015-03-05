/*
 * ext初始化入口
 */
Ext.Loader.setConfig({
	enabled : true,
	paths : {
		'bu' : 'base/common',
		'user' : 'user',
		'register' : 'register',
		'gp' : 'app/gplus',
		'tm' : 'treatment',
		'md' : 'medicine',
		'sf' : 'sfzx',
		'qy' : 'qyzx',
		'report' : 'report'
	}
		// 指定命名空间的实际目录,要和上面的name、appFolder对应
	});
Ext.application({
			requires : ['Ext.container.Viewport'],
			name : 'keyi',
			autoCreateViewport : true,
			appFolder : 'home',
			launch : function() {
				Ext.tip.QuickTipManager.init();
			},
			controllers : ['HomeController', 
					'user.controller.UserController',
					'register.controller.RegisterController',
					'tm.controller.TreatMentController',
					'sf.controller.SfzxController',
					'qy.controller.QyzxController',
					'report.controller.ReportController']
		});