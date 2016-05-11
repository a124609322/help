Ext.define("app.chuandu.module.manager.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifymanagerwin',
    title:'修改管理员信息',
    uses : ['app.chuandu.module.manager.ModifyForm'],
    controller:'managercontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:310,
    closable:true,
    height:160,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'modifymanagerController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifymanagerController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifymanagerform'
        }];
        this.callParent(arguments);
    }
});