Ext.define("app.chuandu.module.logistics.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.logisticsModule',
    requires:['app.chuandu.controller.LogisticsController'],
    uses:[
       'app.chuandu.module.logistics.Grid' ,'app.chuandu.module.logistics.EditWindow','app.chuandu.module.logistics.ModifyWindow'
    ],
    controller:'logisticscontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'logisticsgrid',
            region:'center',
            id:'logistics_grid'
         }
        ];
        this.callParent();
    }
});