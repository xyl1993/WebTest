Ext.define('keyi.view.West', {
			extend : 'Ext.panel.Panel',
			uses:['bu.util.Util'],
			alias : 'widget.west',
			region : 'west',
			extend : 'Ext.panel.Panel',
			split : true,
			width : 200,
			minSize : 175,
			maxSize : 300,
			margins : '0 0 0 0',
			layout : 'accordion',
			title : '某某医疗管理系统',
			collapsible : true,
			layoutConfig : {
				animate : true
			},
			initComponent : function() {
				var me = this;
				me.treeStore = Ext.create('Ext.data.TreeStore', {
							root : {
								expanded : true,
								children : [{
											itemId : 'base',
											text : "基础设置",
											expanded : true,
											children : [{
														text : "用户中心",
														id : 'user',
														leaf : true
													}]
										}, {
											text : "挂号中心",
											expanded : true,
											children : [{
														text : "挂号管理",
														id : 'gh',
														leaf : true
													}]
										},{
											itemId : 'base',
											text : "就诊中心",
											expanded : true,
											children : [{
														text : "就诊管理",
														id : 'jz',
														leaf : true

													},{
														text : "收费管理",
														id : 'sf',
														leaf : true

													},{
														text : "取药",
														id : 'qy',
														leaf : true

													}]
										},{
											itemId : 'report',
											text : "报表中心",
											expanded : true,
											children : [{
														text : "看病情况汇总表",
														id : 'hz',
														leaf : true
													}]
										}]
							}
						});
				Ext.apply(me, {
							items : [{
										xtype : 'treepanel',
										useArrows : true,
										store : me.treeStore,
										columnLines : true,
										rootVisible : false,
										title : '菜单',
										width : 200,
										renderTo : Ext.getBody(),
										listeners : {
											expandnode : function(node) {
												console.log(node);
												// 如果是根节点则不用处理
												if (node.getDepth() == 0)
													return;

												// 得到当前节点父节点下所有子节点（也就是当前节点的同级节点）
												var nodes = node.parentNode.childNodes;

												// 隐藏除当前节点之外其他节点的子节点
												for (var i = 0; i < nodes.length; i++) {
													if (nodes[i] != node) {
														nodes[i].collapse(true);
													}
												}

											}
										}
									}],
							listeners : {
								afterrender : function(cmp) {
									var me = this;
									var obj = bu.util.getUserInfo();
									if(obj[0].org_id=='admin'){    //管理员
										for(var i=0;i<me.treeStore.getRootNode().childNodes.length+1;i++){
											me.treeStore.getRootNode().lastChild.remove();
										}
									}else{//          医生和护士
										me.treeStore.getRootNode().firstChild.remove();
									}
//									console.log(me.treeStore.getRootNode().childNodes[1]);
//									me.treeStore.getRootNode().childNodes[1].remove();
								}
							}
						});
				this.callParent(arguments);
			}

		});