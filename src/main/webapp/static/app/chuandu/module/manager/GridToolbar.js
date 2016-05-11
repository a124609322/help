Ext.define('app.chuandu.module.manager.GridToolbar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.managergridtooolbar',
    initComponent  : function(){
        this.items = [
            {
            text:'新增',
            glyph: 0xf016,
            handler:'addmanagerWindow'
        },'-',{
            text:'修改',
            glyph : 0xf044,
            handler:'modifymanagerWindow'
        },'-',{
            text:'删除',
            glyph : 0xf014,
                handler:'deletemanagerWindow'
        }]
        this.callParent();
    }
});