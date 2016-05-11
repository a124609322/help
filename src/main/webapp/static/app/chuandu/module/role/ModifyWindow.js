Ext.define("app.chuandu.module.role.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifyrolewin',
    title:'修改角色信息',
    uses : ['app.chuandu.module.role.ModifyForm'],
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
            handler:'modifyroleController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifyroleController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifyroleform'
        }];
        this.callParent(arguments);
    }
});