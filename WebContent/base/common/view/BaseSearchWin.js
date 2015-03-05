/**
 * 通用弹出查询窗口
 * 
 */
Ext.define('bu.view.BaseSearchWin',{
	extend:'Ext.window.Window',
	alias : 'widget.buBaseSearchWin',
	closable:true,
	width:550,
	title:'通用查询',
	resizable:false,
	constrain:true,
	modal:true,
	searParams:null,
	usePaging:null,//可以自定义
	gridStore:null,//对应的grid的store
	bodyStyle:{
		background:'white'
	},
	itemArray:null,//传进来的页面元素数组
	initComponent: function() {
		var me=this;
		var map=[];
		var contanArray=[];
		me.labelWidth = 0;
		Ext.each(me.itemArray, function(item){
			if(item.type != 'box' && item.type != 'hidden' && item.type != 'hiddenfield'){
				if(item.fieldLabel.length > me.labelWidth){
					me.labelWidth = item.fieldLabel.length;
				}
			}
		});
		me.labelWidth = me.labelWidth * 14;
		
		//初始化页面元素
		if(me.itemArray){	
			for(var i=0;i<me.itemArray.length;i++){
				if(me.itemArray[i].code){
					var field={xtype:me.itemArray[i].type,forceSelection:true,name:me.itemArray[i].name,flex:1,code:me.itemArray[i].code,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
						listeners: {
			                specialkey:function(field, e){
						        if (e.getKey() == e.ENTER) {
						            me.loadRecord();
						        }
						    }
			            }
					};
					map.push(field);
				}else if(me.itemArray[i].type=='datefield'){
					var field={xtype:me.itemArray[i].type,value:me.itemArray[i].value,format:'Y-m-d',name:me.itemArray[i].name,flex:1,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
						listeners: {
			                specialkey:function(field, e){
						        if (e.getKey() == e.ENTER) {
						            me.loadRecord();
						        }
						    }
			            }
					};
					map.push(field);
				}else if(me.itemArray[i].type=='datetimefield'){
					var field={xtype:me.itemArray[i].type,value:me.itemArray[i].value,format:'Y-m-d H:i:s',name:me.itemArray[i].name,flex:1,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
						listeners: {
			                specialkey:function(field, e){
						        if (e.getKey() == e.ENTER) {
						            me.loadRecord();
						        }
						    }
			            }
					};
					map.push(field);
				}else if(me.itemArray[i].type=='combobox'){
					var field={xtype:me.itemArray[i].type,value:me.itemArray[i].value,store:me.itemArray[i].store,flex:1,displayField :me.itemArray[i].displayField,queryMode :'local',valueField :me.itemArray[i].valueField,forceSelection : true,name:me.itemArray[i].name,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
						listeners: {
			                specialkey:function(field, e){
						        if (e.getKey() == e.ENTER) {
						            me.loadRecord();
						        }
						    }
			            }
					};
					map.push(field);
				}else if(me.itemArray[i].type=='box' || me.itemArray[i].type=='hidden' || me.itemArray[i].type=='hiddenfield'){
					var field={xtype:me.itemArray[i].type,value:me.itemArray[i].value,name:me.itemArray[i].name,flex:1,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left'};
						map.push(field);
				}else if(me.itemArray[i].type=='twotextfield'){
					var field={xtype:'textfield',name:me.itemArray[i].name,flex:2,margin:'0 10 10 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
						listeners: {
			                specialkey:function(field, e){
						        if (e.getKey() == e.ENTER) {
						            me.loadRecord();
						        }
						    }
			            }
					};
					map.push(field);
				}else if(me.itemArray[i].type=='datetimefield'){
					// ADD BY KWJ（日期+时间）
					var field={xtype:me.itemArray[i].type,value:me.itemArray[i].value,format:'Y-m-d H:i:s',name:me.itemArray[i].name,flex:1,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
							listeners: {
				                specialkey:function(field, e){
							        if (e.getKey() == e.ENTER) {
							            me.loadRecord();
							        }
							    }
				            }
						};
						map.push(field);
				} else {
					var field={xtype:me.itemArray[i].type,readOnly:me.itemArray[i].readOnly,value:me.itemArray[i].value,name:me.itemArray[i].name,flex:1,margin:'0 10 0 0',fieldLabel:me.itemArray[i].fieldLabel,labelWidth: me.labelWidth, labelAlign: 'left',
						listeners: {
			                specialkey:function(field, e){
						        if (e.getKey() == e.ENTER) {
						            me.loadRecord();
						        }
						    }
			            }
					};
					map.push(field);
				}				
			};
			for(var j=0;j<map.length;j=j+2){
				var container={xtype:'container',layout:{type: 'hbox'},flex:1,margin:'0 0 10 0',items:[map[j],map[j+1]]};
				if(map[j].flex==2){
					container=map[j];
				}
				contanArray.push(container);
			}
		}
		Ext.applyIf(me, {
			items:[{
				xtype:'form',
				margin:'10 10 0 10',
				border:false,
				layout:{type: 'vbox',align: 'stretch'},
				items:contanArray
			}],
			buttons:[
		 		{
		 		    text: '搜索',
		 		    align:'center',
		 		    action: 'ACT_QUERY',
		 		    handler:function(btn){
		 		    	me.loadRecord();
		 		    }
		 		},
		 		{
		 		    text: '重置',
				    action:'ACT_CLEAR',
				     align:'center',
				    handler:function(btn){
				    	var form=btn.up('window').down('form');
				    	form.getForm().reset();
				    }
		 		}
			]
		});
		me.callParent(arguments);
	},
	loadRecord:function(){
		var me = this;
    	var parames=me.down('form').getValues();
    	for(var s in parames){
    		parames[s]=Ext.String.trim(parames[s]);
    	}
    	if(parames && parames.s_use && parames.e_use){
    		if(parames.s_use>parames.e_use){
    			Ext.Msg.alert(bu.Const.MSG_CONFIRM_PROMPT,bu.Const.MSG_ALERT_ENDDATESTARTDATE);
    			return 
    		}
    	}
    	me.gridStore.proxy.extraParams=parames;
    	//判断是否存在分页控件参数
    	if(me.usePaging==null){
    	 me.gridStore.proxy.setExtraParam('usePaging',true);
    	}else{
    	  me.gridStore.proxy.setExtraParam('usePaging',me.usePaging);
    	}
    	me.searParams=parames;
    	me.gridStore.loadPage(1);
    	me.close();
	}
	
});