Ext.define("app.chuandu.module.manager.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editmanagerwin',
    title:'增加管理员',
    uses : ['app.chuandu.module.manager.EditForm'],
    controller:'managercontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:310,
    closable:true,
    height:240,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'addmanagerController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editmanagerform'
        }];
        this.callParent(arguments);
    }
});