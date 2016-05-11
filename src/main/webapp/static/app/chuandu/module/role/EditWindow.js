Ext.define("app.chuandu.module.role.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editrolewin',
    title:'增加角色',
    uses : ['app.chuandu.module.role.EditForm'],
    controller:'rolecontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:310,
    closable:true,
    height:372,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'addroleController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editroleform'
        }];
        this.callParent(arguments);
    }
});