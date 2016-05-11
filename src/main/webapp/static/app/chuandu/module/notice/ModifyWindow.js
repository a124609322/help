Ext.define("app.chuandu.module.notice.ModifyWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.modifynoticewin',
    title:'修改运单信息',
    uses : ['app.chuandu.module.notice.ModifyForm'],
    controller:'noticecontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
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
            handler:'modifynoticeController'
        },{
            text : '重置',
            itemId : 'reset',
            glyph : 0xf0c7,
            handler:'resetModifynoticeController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
            xtype:'modifynoticeform'
        }];
        this.callParent(arguments);
    }
});