Ext.define("app.chuandu.region.Main",{
    extend:"Ext.container.Viewport",
    xtype:'app_main',
    alias:'ChuanduViewPort',
    layout : 'border',
    requires:['app.chuandu.model.Manager','app.chuandu.model.Role',"app.chuandu.model.Waybill","app.chuandu.model.Banner","app.chuandu.model.Link",
        "app.chuandu.model.Logistics","app.chuandu.model.Notice"],
    uses:['app.chuandu.region.Top','app.chuandu.data.MainModel','app.chuandu.controller.MainController','app.chuandu.region.West', 'app.ux.ButtonTransparent'
        ,'app.chuandu.region.Center','app.chuandu.container.modifyPassword', 'app.chuandu.module.manager.Module','app.chuandu.module.role.Module',
        "app.chuandu.module.waybill.Module",'app.chuandu.module.notice.Module'
        ,'app.chuandu.module.link.Module','app.chuandu.module.recyclebin.Module','app.chuandu.module.banner.Module','app.chuandu.module.logistics.Module'
    ],
   controller:'main',
    viewModel:{
        type:'main'
    },
    items : [{
        xtype:'maintop',
        region : 'north'
    }, {
        region : 'west',
        collapsible : true,
        title : '导航栏',
        width : 150,
        xtype:'mainmenuaccordion'
    },{
        region : 'south',
        html : "<div align='center'>Copyright 2015 </div>",
        border:false,
        height : 30
    },
    {
        region : 'center',
        xtype : 'maincenter'
    }],
    initComponent: function () {
        //启用fontAwesome
        Ext.setGlyphFontFamily('FontAwesome');
        Ext.Loader.setConfig({
            enabled:true,
            paths:{
                'app.chuandu.model':'app/chuandu/model'//设置目录映射'App.ux'命名空间的将去resources/ux下寻找
            }
        });
        this.callParent();
    }

});