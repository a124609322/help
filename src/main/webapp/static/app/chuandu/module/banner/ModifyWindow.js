Ext.define("app.chuandu.module.banner.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifybannerwin',
    title:'修改Banner信息',
    uses : ['app.chuandu.module.banner.ModifyForm'],
    controller:'bannercontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:320,
    closable:true,
    height:200,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'modifybannerController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifybannerController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifybannerform'
        }];
        this.callParent(arguments);
    }
});