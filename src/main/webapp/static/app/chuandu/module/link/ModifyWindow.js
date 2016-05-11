Ext.define("app.chuandu.module.link.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifylinkwin',
    title:'修改友情链接',
    uses : ['app.chuandu.module.link.ModifyForm'],
    controller:'linkcontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:310,
    closable:true,
    height:190,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'modifylinkController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifylinkController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifylinkform'
        }];
        this.callParent(arguments);
    }
});