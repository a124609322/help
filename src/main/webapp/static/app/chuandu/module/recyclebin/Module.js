Ext.define("app.chuandu.module.recyclebin.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.recyclebinModule',
    requires:['app.chuandu.controller.WaybillController'],
    uses:['app.chuandu.module.recyclebin.Grid'],
    controller:'waybillcontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'recyclebingrid',
            region:'center',
            id:'recyclebin_grid'
         }
        ]
        this.callParent();
    }
});