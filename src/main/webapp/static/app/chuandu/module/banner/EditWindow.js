Ext.define("app.chuandu.module.banner.EditWindow",{
    extend : 'Ext.window.Window',
    alias:'widget.editbannerwin',
    title:'增加Banner',
    uses : ['app.chuandu.module.banner.EditForm'],
    controller:'bannercontroller',
    layout:'fit',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:320,
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
            handler:'addbannerController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        this.items = [{
           xtype:'editbannerform'
        }];
        this.callParent(arguments);
    }
});