Ext.define("app.chuandu.module.waybill.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editwaybillwin',
    title:'增加运单',
    uses : ['app.chuandu.module.waybill.EditForm'],
    controller:'waybillcontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:680,
    closable:true,
    height:480,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'addwaybillController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editwaybillform'
        }];
        this.callParent(arguments);
    }
});