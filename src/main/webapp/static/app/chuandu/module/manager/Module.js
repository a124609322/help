Ext.define("app.chuandu.module.manager.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.managerModule',
    requires:['app.chuandu.controller.ManagerController'],
    uses:[
       'app.chuandu.module.manager.Grid' ,'app.chuandu.module.manager.EditWindow','app.chuandu.module.manager.ModifyWindow'
    ],
    controller:'managercontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'managergrid',
            region:'center',
            id:'manager_grid'
         }
        ]
        this.callParent();
    }
});