Ext.define("app.chuandu.module.role.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.roleModule',
    requires:['app.chuandu.controller.RoleController'],
    uses:[
       'app.chuandu.module.role.Grid' ,'app.chuandu.module.role.EditWindow','app.chuandu.module.role.ModifyWindow'
    ],
    controller:'rolecontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'rolegrid',
            region:'center',
            id:'role_grid'
         }
        ]
        this.callParent();
    }
});