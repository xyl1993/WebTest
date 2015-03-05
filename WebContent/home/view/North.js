/**
 * 可以直接在顶部设置div
 */
Ext.define('keyi.view.North', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.north',
    region:'north',
//    height:68,
   // html:'<div class="wrap"><div class="logo"><a href="#"></a></div><div class="nav"><div class="system"></div><div class="quit"><a href="${rc.contextPath}/loginOut"></a><span>退出</span></div> </div></div></div>',
//    html:'<div style = "height:68px; background:#505050;"><img src = "image/logo.gif"/></div>',
    initComponent: function() {
        this.callParent();
    }
});