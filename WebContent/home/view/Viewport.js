/**
 * 视图入口
 */
Ext.define('keyi.view.Viewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.configViewport',
    layout:'border',
    items:[{xtype:'center'},{xtype:'west'}],
    initComponent: function() {
        this.callParent();
    }
})