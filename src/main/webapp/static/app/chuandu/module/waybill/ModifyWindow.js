Ext.define("app.chuandu.module.waybill.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifywaybillwin',
    title:'修改运单信息',
    uses : ['app.chuandu.module.waybill.ModifyForm'],
    controller:'waybillcontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:680,
    closable:true,
    height:560,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'modifywaybillController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifywaybillController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifywaybillform'
        }];
        this.callParent(arguments);
    }
});