Ext.onReady(function() {
	var cm = Ext.ClassManager, exists = Ext.Function.bind(cm.get, cm);
	// 可以自己做汉化处理等
	
	if(exists('Ext.util.Format')){
		Ext.util.Format.dateFormat = 'Y年m月d日';
	}
	Ext.define("Ext.locale.zh_CN.picker.Date", {
		override: "Ext.picker.Date",
		todayText: "今天",
		minText: "日期必须大于最小允许日期",
		// update
		maxText: "日期必须小于最大允许日期",
		// update
		disabledDaysText: "",
		disabledDatesText: "",
		monthNames: Ext.Date.monthNames,
		dayNames: Ext.Date.dayNames,
		nextText: '下个月 (Ctrl+Right)',
		prevText: '上个月 (Ctrl+Left)',
//		monthYearText: '选择一个月 (Control+Up/Down 来改变年份)',2014-04-23 zhouhf Del
		// update
		todayTip: "{0} (空格键选择)",
		format: "Y年m月d日",
		ariaTitle: '{0}',
		ariaTitleDateFormat: 'Y\u5e74m\u6708d\u65e5',
		longDayFormat: 'Y\u5e74m\u6708d\u65e5',
		monthYearFormat: 'Y\u5e74m\u6708',
		getDayInitial: function(value) {
			// Grab the last character
			return value.substr(value.length - 1);
		}
	});
	Ext.define("Ext.locale.zh_CN.form.field.Date", {
		override: "Ext.form.field.Date",
		disabledDaysText: "禁用",
		disabledDatesText: "禁用",
		minText: "该输入项的日期必须在 {0} 之后",
		maxText: "该输入项的日期必须在 {0} 之前",
		invalidText: "{0} 是无效的日期 - 必须符合格式： {1}",
		format: "Y年m月d日"
	});
	Ext.define("Ext.locale.zh_CN.grid.PropertyColumnModel", {
		override: "Ext.grid.PropertyColumnModel",
		nameText: "名称",
		valueText: "值",
		dateFormat: "Y年m月d日"
	});

	// 关于日期的修改涉及几个步骤
	// 1. 所有显示的dataFormat都修改为 Y年 即4位长度的年,操作步骤为替换ext-lan-zh_CN.js
	// 2. java服务端默认使用 的日期格式为'yyyy-mm-dd hh:mm:ss',这个由服务端统一处理
	// 3. js客户端数据的默认日期格式与服务端相同 defaultDateFormat:'Y-m-d
	// H:i:s',这个需要修改Ext.data.Field.dateFormat
	// 4. js客户端提交数据的默认日期格式与服务端相同 defaultDateFormat:'Y-m-d H:i:s',这个需要重写
	// Ext.JSON.encodeDate

	// 修改默认日期格式为defaultDateFormat:'Y-m-d H:i:s'
	var defaultDateFormat = 'Y-m-d H:i:s';
	if(Ext.data.Field){
		Ext.apply(Ext.data.Field.prototype, {
			dateFormat: defaultDateFormat
		});
	}
	// The default return format is "yyyy-mm-ddThh:mm:ss".
	// To override this:
	// 重写encodeDate,使得JSON的日期格式符合要求
	Ext.JSON.encodeDate = function(d) {
		return Ext.Date.format(d, '"Y-m-d H:i:s"');
	};
	if(Ext.grid.RowEditor){
		Ext.apply(Ext.grid.RowEditor.prototype, {
			saveBtnText: '保存',
			cancelBtnText: '取消',
			errorsText: '错误信息',
			dirtyText: '已修改,你需要提交或取消变更'
		});
	}
	/*Ext.define(null, {
		override: 'Ext.grid.CellEditor.prototype',
		completeEdit: function(remainVisible) {
			var me = this, field = me.field, value;

			if(!me.editing){
				return;
			}

			// Assert combo values first
			if(field.assertValue){
				field.assertValue();
			}
			*//**
			 * 当field的winOpen属性为true时，将visible属性置为true，这样就不会将
			 *//*
			if(field.winOpen){
				remainVisible = true;
			}
			if(!field.editor){
				field.editor = me;
			}
			value = me.getValue();
			
			 * if (!field.isValid()) { if (me.revertInvalid !== false){
			 * //为了保持所有field的事件不被停止 value = me.getValue();
			 * field.suspendEvents(); field.resumeEvents();
			 * me.hideEdit(remainVisible); field.focus(false, 10); } return; }
			 
			if(!field.isValid()){
				if(me.revertInvalid !== false){
					me.cancelEdit(remainVisible);
				}
				return;
			}

			if(String(value) === String(me.startValue) && me.ignoreNoChange){
				me.hideEdit(remainVisible);
				return;
			}

			if(me.fireEvent('beforecomplete', me, value, me.startValue) !== false){
				// Grab the value again, may have changed in beforecomplete
				value = me.getValue();
				if(me.updateEl && me.boundEl){
					me.boundEl.update(value);
				}

				if(field.xtype == "testhelp"){
					field.collapse();
				}
				me.hideEdit(remainVisible);
				me.fireEvent('complete', me, value, me.startValue);
			}
		},
		onFieldBlur: function(field, e) {
			var me = this;
			me.field.editor = me;

			// !!!!!!!!只有blindBtn被点中时弹出窗口,而不是收回下拉!!!!!!!!!
			if(e){
				var btnDom = e.getTarget();
				
				 * if((btnDom.type=='button' &&
				 * btnDom.itemTagId=="blindBtn")||btnDom.parentElement.type=='button'&&btnDom.parentElement.itemTagId=="blindBtn"){
				 * return; }
				 
				if(btnDom.parentElement.itemTagId == "blindBtn"){
					return;
				}
			}

			// !!!!!!!!只有blindBtn被点中时弹出窗口,而不是收回下拉!!!!!!!!!
			if(me.field.winOpen){
				return;
			}
			var target;

			// selectSameEditor flag allows the same editor to be started
			// without onFieldBlur firing on itself
			if(me.allowBlur === true && me.editing && me.selectSameEditor !== true){
				me.completeEdit();
			}

			// If the target of the event was focusable, prevent reacquisition
			// of focus by editor owner
			if(e && Ext.fly(target = e.getTarget()).focusable()){
				target.focus();
			}
		}
	});*/
	// 对于params和extraparams里面的日期无法作特殊处理，所以需要重写该方法
	// 修改默认日期格式为defaultDateFormat:'Y-m-d H:i:s'
	if(Ext.Object)
		Ext.apply(Ext.Object, {
			toQueryObjects: function(name, value, recursive) {
				var self = Ext.Object.toQueryObjects, objects = [], i, ln;

				if(Ext.isArray(value)){
					for(i = 0, ln = value.length; i < ln; i++){
						if(recursive){
							objects = objects.concat(self(name + '[' + i + ']', value[i], true));
						}else{
							// 这样就能把查询参数里的日期作处理
							if(Ext.isDate(value))
								value = Ext.Date.format(value, defaultDateFormat);
							objects.push({
								name: name,
								value: value[i]
							});
						}
					}
				}else if(Ext.isObject(value)){
					for(i in value){
						if(value.hasOwnProperty(i)){
							if(recursive){
								objects = objects.concat(self(name + '[' + i + ']', value[i], true));
							}else{
								// 这样就能把查询参数里的日期作处理
								if(Ext.isDate(value))
									value = Ext.Date.format(value, defaultDateFormat);
								objects.push({
									name: name,
									value: value[i]
								});
							}
						}
					}
				}else{
					// 这样就能把查询参数里的日期作处理
					if(Ext.isDate(value))
						value = Ext.Date.format(value, defaultDateFormat);
					objects.push({
						name: name,
						value: value
					});
				}
				return objects;
			}
		});

	// 设置自定义密码输入校验
	// added by mmc at 2013-06-04
	Ext.apply(Ext.form.field.VTypes, {
		// 两次密码输入校验
		// 需要设置前次密码输入字段id initialPassField:'passId'
		password: function(val, field) {
			if(field.initialPassField){
				var pwd = field.up('form').down('#' + field.initialPassField);
				return (val == pwd.getValue());
			}
			return true;
		},
		passwordText: '两次密码输入不相符'
	});
	
    //纠正ExtJS4.2.1里面的一个bug,在grid刷新后selectionModel里面的数据不会更新的问题
	//2014.01.15 mmc
    if(Ext.selection.Model){
    	Ext.override(Ext.selection.Model,{
    		onStoreLoad:function(store,records){
    			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    			//这个方法源码中是个空函数,导致store reload后seletionModel没有变化
    			this.refresh();
    			this.callParent(arguments);
    			//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    		},
    		refresh: function() {
		        var me = this,
		            store = me.store,
		            rec,
		            toBeSelected = [],
		            toBeReAdded = [],
		            oldSelections = me.getSelection(),
		            len = oldSelections.length,
		            selection,
		            change,
		            i = 0,
		            lastFocused = me.getLastFocused();
		
		        // Not been bound yet.
		        if (!store) {
		            return;
		        }
		
		        // Add currently records to the toBeSelected list if present in the Store
		        // If they are not present, and pruneRemoved is false, we must still retain the record
		        for (; i < len; i++) {
		            selection = oldSelections[i];
		            if (store.indexOf(selection) !== -1) {
		                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		            	//这句导致store和selectionModel不能同步数据
		            	//toBeSelected.push(selection);
		            	toBeSelected.push(store.getAt(store.indexOf(selection)));
		            	//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		            }
		
		            // Selected records no longer represented in Store must be retained
		            else if (!me.pruneRemoved) {
		                // See if a record by the same ID exists. If so, select it
		                rec = store.getById(selection.getId());
		                if (rec) {
		                    toBeSelected.push(rec);
		                }
		                // If it does not exist, we have to re-add it to the selection
		                else {
		                    toBeReAdded.push(selection)
		                }
		            }
		
		            // In single select mode, only one record may be selected
		            if (me.mode === 'SINGLE' && toBeReAdded.length) {
		                break;
		            }
		        }
		
		        // there was a change from the old selected and
		        // the new selection
		        if (me.selected.getCount() != (toBeSelected.length + toBeReAdded.length)) {
		            change = true;
		        }
		
		        me.clearSelections();
		
		        if (store.indexOf(lastFocused) !== -1) {
		            // restore the last focus but supress restoring focus
		            me.setLastFocused(lastFocused, true);
		        }
		
		        if (toBeSelected.length) {
		            // perform the selection again
		            me.doSelect(toBeSelected, false, true);
		        }
		
		        // If some of the selections were not present in the Store, but pruneRemoved is false, we must add them back
		        if (toBeReAdded.length) {
		            me.selected.addAll(toBeReAdded);
		
		            // No records reselected.
		            if (!me.lastSelected) {
		                me.lastSelected = toBeReAdded[toBeReAdded.length - 1];
		            }
		        }
		
		        me.maybeFireSelectionChange(change);
		    }
    	});
    }
	// 修改CheckColumn的默认事件传递
	// 在beforecheckchange,checkchange事件中增加record参数
	// 因为要在这两个事件中取得当前行的数据太困难了
	if(Ext.grid.column.CheckColumn){
		Ext.override(Ext.grid.column.CheckColumn, {
			processEvent: function(type, view, cell, recordIndex, cellIndex, e, record, row) {
				var me = this, key = type === 'keydown' && e.getKey(), mousedown = type == 'mousedown';
				
				if(!me.disabled && (mousedown || (key == e.ENTER || key == e.SPACE))){
					var dataIndex = me.dataIndex, checked = !record.get(dataIndex);
					
					// Allow apps to hook beforecheckchange
					
		            //！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
					//如果不把record传进去，在事件里面重新取得这个record是比较麻烦的一件事
					//if (me.fireEvent('beforecheckchange', me, recordIndex, checked) !== false) {
		            //    record.set(dataIndex, checked);
		            //    me.fireEvent('checkchange', me, recordIndex, checked);
					if(me.fireEvent('beforecheckchange', me, recordIndex, checked, record) !== false){
						record.set(dataIndex, checked);
						me.fireEvent('checkchange', me, recordIndex, checked, record);
                    //！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
						
						// Mousedown on the now nonexistent cell causes the view
						// to blur, so stop it continuing.
						if(mousedown){
							e.stopEvent();
						}

						// Selection will not proceed after this because of the
						// DOM update caused by the record modification
						// Invoke the SelectionModel unless configured not to do
						// so
						if(!me.stopSelection){
							view.selModel.selectByPosition({
								row: recordIndex,
								column: cellIndex
							});
						}

						// Prevent the view from propagating the event to the
						// selection model - we have done that job.
						return false;
					}else{
						// Prevent the view from propagating the event to the
						// selection model if configured to do so.
						return !me.stopSelection;
					}
				}else{
					return me.callParent(arguments);
				}
			}
		});
	}
	/*
	 * if(Ext.grid.plugin.Editing){
	 * Ext.apply(Ext.grid.plugin.Editing.prototype,{
	 * //这里的rowIdx已经存在了，居然还要getEditingContext再取一遍 startEditByClick:
	 * function(view, cell, colIdx, record, row, rowIdx, e) { //借助record传递一下
	 * record.rowIdx =rowIdx; this.startEdit(record,
	 * view.getHeaderAtIndex(colIdx)); }, getEditingContext: function(record,
	 * columnHeader) { var me = this, grid = me.grid, store = grid.store,
	 * rowIdx, colIdx, view = grid.getView(), value; // If they'd passed numeric
	 * row, column indices, look them up. if (Ext.isNumber(record)) { //暂时改一下
	 * //rowIdx = record; rowIdx = record.rowIdx?record.rowIdx:record;
	 * 
	 * record = store.getAt(rowIdx); } else { //暂时改一下 //rowIdx =
	 * store.indexOf(record); rowIdx =
	 * record.rowIdx?record.rowIdx:store.indexOf(record); } if
	 * (Ext.isNumber(columnHeader)) { colIdx = columnHeader; columnHeader =
	 * grid.headerCt.getHeaderAtIndex(colIdx); } else { colIdx =
	 * columnHeader.getIndex(); }
	 * 
	 * value = record.get(columnHeader.dataIndex); return { grid: grid, record:
	 * record, field: columnHeader.dataIndex, value: value, row:
	 * view.getNode(rowIdx), column: columnHeader, rowIdx: rowIdx, colIdx:
	 * colIdx }; } }); }
	 */
	/*
	 * if(Ext.grid.plugin.CellEditing){
	 * Ext.apply(Ext.grid.plugin.CellEditing.prototype,{ //这个方法有点bug,只能修正一下
	 * startEdit: function(record, columnHeader) { var me = this, value =
	 * record.get(columnHeader.dataIndex), context =
	 * me.getEditingContext(record, columnHeader), ed;
	 * 
	 * record = context.record; columnHeader = context.column; // Complete the
	 * edit now, before getting the editor's target // cell DOM element.
	 * Completing the edit causes a view refresh. me.completeEdit();
	 * 
	 * context.originalValue = context.value = value; if (me.beforeEdit(context)
	 * === false || me.fireEvent('beforeedit', context) === false ||
	 * context.cancel) { return false; } // See if the field is editable for the
	 * requested record if (columnHeader && !columnHeader.getEditor(record)) {
	 * return false; }
	 * 
	 * ed = me.getEditor(record, columnHeader); if (ed) { me.context = context;
	 * me.setActiveEditor(ed); me.setActiveRecord(record);
	 * me.setActiveColumn(columnHeader); // Defer, so we have some time between
	 * view scroll to sync up the editor //me.editTask.delay(15, ed.startEdit,
	 * ed, [me.getCell(record, columnHeader), value]);
	 * //这个值给得不对，应该用最新的value,2012.05.15 mmc me.editTask.delay(15, ed.startEdit,
	 * ed, [me.getCell(record, columnHeader), context.value]); } else { //
	 * BrowserBug: WebKit & IE refuse to focus the element, rather // it will
	 * focus it and then immediately focus the body. This // temporary hack
	 * works for Webkit and IE6. IE7 and 8 are still // broken
	 * me.grid.getView().getEl(columnHeader).focus((Ext.isWebKit || Ext.isIE) ?
	 * 10 : false); } }
	 * 
	 * }); }
	 */

	// 对浏览器行为的一些处理
	// 1.禁用退格键
	// 禁止退格键 作用于Firefox、Opera
	document.onkeypress = banBackSpace;
	// 禁止退格键 作用于IE、Chrome
	document.onkeydown = banBackSpace;

	// 2.禁用鼠标右键
	if(document.layers){
		document.captureEvents(Event.MOUSEDOWN);
	}
	document.onmousedown = mouseclick;
	document.oncontextmenu = new Function("return false;")

	// 3.处理页面关闭
	window.onbeforeunload = beforePageUnload;
	window.onunload = pageUnload;

});

var gy_titile_about = '关于';

// ===========================================增加几个字符串的常用函数
// 判断字符串是否以指定的字符串开始
String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};
// 判断字符串是否以指定的字符串结束
String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
};
// 去左右空白字符
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, "");
};
// 去掉字符左端的的空白字符
String.prototype.trimLeft = function() {
	return this.replace(/(^[\\s]*)/g, "");
};
// 去掉字符右端的空白字符
String.prototype.trimRight = function() {
	return this.replace(/([\\s]*$)/g, "");
};
// 返回字符的长度，一个中文算2个
String.prototype.chnLength = function() {
	return this.replace(/[^\x00-\xff]/g, "**").length;
};
// ===========================================增加几个字符串的常用函数

// 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
// 参考http://www.2016k.com/skillonpage/javascript/07-62.html
function banBackSpace(e) {
	var ev = e || window.event;// 获取event对象
	var obj = ev.target || ev.srcElement;// 获取事件源
	var t = obj.type || obj.getAttribute('type');// 获取事件源类型
	// 获取作为判断条件的事件类型
	var vReadOnly = obj.readOnly;
	var vDisabled = obj.disabled;

	// alert(ev.keyCode);

	// 处理undefined值情况
	vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
	vDisabled = (vDisabled == undefined) ? true : vDisabled;
	// 当敲Backspace键时，事件源类型为密码或单行、多行文本的，
	// 并且readOnly属性为true或disabled属性为true的，则退格键失效
	var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
	// 当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
	var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
	// 判断
	if(flag2 || flag1)
		return false;
};

// 处理鼠标右键,但允许在输入框内的复制粘贴等
function mouseclick(e) {
	e = e || event;
	if(e.button == 2){
		var tag = e.srcElement || e.target;
		if(tag.type == "text" || tag.type == "textarea" || tag.type == "password"){
			document.oncontextmenu = new Function("return true;")
		}else{
			document.oncontextmenu = new Function("return false;")
		}
	}
};
// 页面关闭前，处理页面关闭，当有应用打开时提醒关闭
function beforePageUnload(event) {
	if(gp.Const.mainController){
		var tab_num = gp.Const.mainController.getContentTab().items.getCount();
		if(tab_num > 1){
			var retObj = '您还有' + (tab_num - 1) + '个应用未关闭,可能丢失未保存的数据。';
			return retObj;
		}
	}
};
function pageUnload(e){
	//循环当前打开的tab页，如果有会计科目或总账余额初始页面打开则解除锁表 add by wangxc 2014-09-26
	if(gp.Const.mainController){
		Ext.each(gp.Const.mainController.getContentTab().items.keys,function(d,i){
			if(d == 'module_tabid_1214'){//会计科目页面打开
				Ext.Ajax.request({
					url : 'gfiSubject/delLockTableInfo.do',
					method : 'POST',
					async:false,
					success : function(response, opts) {
					}
				});
			}else if(d == 'module_tabid_1227'){//总账余额初始页面打开
				Ext.Ajax.request({
					url : 'ledgerInitial/delLockTableInfo.do',
					method : 'POST',
					async:false,
					success : function(response, opts) {
					}
				});
			}else if(d == 'module_tabid_10161'){//资产折旧计提打开
					Ext.Ajax.request({
						url : 'assetProvision/delLockTableInfo.do',
						method : 'POST',
						async:false,
						success : function(response, opts) {
						}
					});
				}
		});
	}
    if(gp.Util.leaveMode){
    	//当指定了离开模式时，就不是简单的刷新了，需要调用服务做注销处理。
    	//2014.04.02 mmc
    	//此处有个bug,因为无法得知最后用户按了取消还是确定按钮且 beforeUnload和unload都无法区分出刷新还是关闭或者重定向
    	//所以leaveMode被置以后用户点击了取消，那么下次刷新时可能leaveMode是带值的，那么就会误动作了
        Ext.Ajax.request({
            url: 'main/Users/doLogout.do',
            async: false,
            params: {
                login_id: gp.Util.currentUser.loginId
            },
            method: 'POST'
        });
    }
};



