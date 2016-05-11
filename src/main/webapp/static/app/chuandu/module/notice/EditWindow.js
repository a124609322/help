Ext.define("app.chuandu.module.notice.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editnoticewin',
    title:'增加公告',
    uses : ['app.chuandu.module.notice.EditForm'],
    controller:'noticecontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:950,
    closable:true,
    height:810,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'addnoticeController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editnoticeform'
        }];
        this.callParent(arguments);
    }
});