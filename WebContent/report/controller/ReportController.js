Ext.define('report.controller.ReportController', {
    extend: 'Ext.app.Controller',
    stores : ['report.store.ReportStore'],
    models : ['report.model.ReportModel'],
    views:['ReportView'],
    init: function() {
    	if(this.isInited) return ;
        this.control({
            
        });
        this.isInited = true;
    }
});