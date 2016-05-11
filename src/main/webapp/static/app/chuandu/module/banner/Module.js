Ext.define("app.chuandu.module.banner.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.bannerModule',
    requires:['app.chuandu.controller.BannerController'],
    uses:[
       'app.chuandu.module.banner.Grid' ,'app.chuandu.module.banner.EditWindow','app.chuandu.module.banner.ModifyWindow'
    ],
    controller:'bannercontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'bannergrid',
            region:'center',
            id:'banner_grid'
         }
        ];
        this.callParent();
    }
});