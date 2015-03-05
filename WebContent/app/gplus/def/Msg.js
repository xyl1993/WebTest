/**
 * 自动消失的提示框
 */
Ext.define('gp.def.Msg', {
	
	msgCt: null,
	
	/**
	 * 消息提示框
	 * @param config
	 */
    msg : function(config){
    	var me = this;
    	config = config || {};
        if(!me.msgCt){
            me.msgCt = Ext.DomHelper.insertFirst(Ext.getBody(), {id:'gymsg-div'}, true);
        }
        
        var m = Ext.DomHelper.append(me.msgCt, '<div class="gymsg"><h3>' + config.title + '</h3><p>' + config.text + '</p></div>', true);
        m.hide();
        if(config.WH){
            m.setWidth(config.WH[0]);
            m.setHeight(config.WH[1]);
        }
        if(config.XY){
        	m.setXY(config.XY);
        }
        m.slideIn(config.anchor || 'b').ghost(config.anchor || 'b', { delay: config.delay || 3000, remove: true});
    },
    
    /**
     * 单行输入框
     * @param config
     */
    prompt : function(config){
    	var me = this;
    	config = config || {};
        if(!me.msgCt){
            me.msgCt = Ext.DomHelper.insertFirst(Ext.getBody(), {id:'gymsg-div'}, true);
        }
        
        var m = Ext.DomHelper.append(me.msgCt, '<div class="gymsg"/>', true);
        
        if(config.title){
        	Ext.DomHelper.append(m, '<h3>' + config.title + '</h3>', true);
        }
        var input = Ext.DomHelper.append(m, '<input class="gyinput" value="' + config.text + '"/>', true);
        //设置回调函数       
        me.userCallback = Ext.Function.bind(config.callback || config.fn || Ext.emptyFn, config.scope || Ext.global);
        
        m.hide();
        if(config.XY){
        	m.setXY(config.XY);
        }
        //按回车后退出
        var nav = new Ext.util.KeyNav(input, {            
            'enter' : function(e){
            	me.userCallback(input.dom.value);
            	m.ghost(config.anchor || 'b', { delay: config.delay || 0, remove: true});        	
            }
        });
        //失去焦点后退出
        input.on('blur', function(){
        	me.userCallback(input.dom.value);
        	m.ghost(config.anchor || 'b', { delay: config.delay || 0, remove: true});        	
        });
        //设置是否立即出现
        if(config.slideIn){
        	m.slideIn(config.anchor || 'b');
        }else{
        	m.show();
        	input.dom.focus();
        }
    }
}, 
	/**
	 * 设置为单例模式
	 */
	function() {
	Ext.GyMsg = new this();
});