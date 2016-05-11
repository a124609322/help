Ext.define("app.chuandu.module.waybill.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.waybillModule',
    requires:['app.chuandu.controller.WaybillController'],
    uses:[
       'app.chuandu.module.waybill.Grid' ,'app.chuandu.module.waybill.EditWindow','app.chuandu.module.waybill.ModifyWindow',
        'app.chuandu.module.waybill.ImportWindow'
    ],
    controller:'waybillcontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'waybillgrid',
            region:'center',
            id:'waybill_grid'
         }
        ]
        this.callParent();
    }
});