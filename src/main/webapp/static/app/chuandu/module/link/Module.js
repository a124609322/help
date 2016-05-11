Ext.define("app.chuandu.module.link.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.linkModule',
    requires:['app.chuandu.controller.LinkController'],
    uses:[
        'app.chuandu.module.link.Grid','app.chuandu.module.link.EditWindow','app.chuandu.module.link.ModifyWindow'
    ],
    controller:'linkcontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
                xtype:'linkgrid',
                region:'center',
                id:'link_grid'
            }
        ]
        this.callParent();
    }
});