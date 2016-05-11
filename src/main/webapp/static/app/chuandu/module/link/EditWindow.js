Ext.define("app.chuandu.module.link.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editlinkwin',
    title:'增加友情链接',
    uses : ['app.chuandu.module.link.EditForm'],
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
            handler:'addlinkController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editlinkform'
        }];
        this.callParent(arguments);
    }
});