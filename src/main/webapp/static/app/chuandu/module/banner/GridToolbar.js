Ext.define('app.chuandu.module.banner.GridToolbar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.bannergridtooolbar',
    initComponent  : function(){
        this.items = [
            {
            text:'新增',
            glyph: 0xf016,
            handler:'addbannerWindow'
        },'-',{
            text:'修改',
            glyph : 0xf044,
            handler:'modifybannerWindow'
        },'-',{
            text:'删除',
            glyph : 0xf014,
                handler:'deletebannerWindow'
        }]
        this.callParent();
    }
});