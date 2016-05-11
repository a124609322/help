Ext.define("app.chuandu.module.waybill.ImportWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.importwaybillwin',
    controller:'waybillcontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:300,
    closable:true,
    height:105,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'importwaybillController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        var form = Ext.create("Ext.form.Panel",{
            border:false,
            fileUpload:true,
            layout:'form',
            items:[{
                fieldLabel:'Excel文件',
                name:'file',
                xtype:'filefield',
                allowBlank:false
            }]
        });
        this.items = [form];
        this.callParent(arguments);
    }
});