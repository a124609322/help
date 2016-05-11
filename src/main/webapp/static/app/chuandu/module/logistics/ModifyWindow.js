Ext.define("app.chuandu.module.logistics.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifylogisticswin',
    title:'修改运单信息',
    uses : ['app.chuandu.module.logistics.ModifyForm'],
    controller:'logisticscontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:680,
    closable:true,
    height:180,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'modifylogisticsController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifylogisticsController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifylogisticsform'
        }];
        this.callParent(arguments);
    }
});