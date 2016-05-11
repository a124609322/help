Ext.define("app.chuandu.module.logistics.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editlogisticswin',
    title:'增加运单',
    uses : ['app.chuandu.module.logistics.EditForm'],
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
            handler:'addlogisticsController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editlogisticsform'
        }];
        this.callParent(arguments);
    }
});