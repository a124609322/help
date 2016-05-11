Ext.define('app.chuandu.module.notice.GridToolbar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.noticegridtooolbar',
    initComponent  : function(){
        this.items = [
        {
            text:'新增',
            glyph: 0xf016,
            handler:'addnoticeWindow'
        },'-',{
            text:'修改',
            glyph : 0xf044,
            handler:'modifynoticeWindow'
        },'-',{
            text:'删除',
            glyph : 0xf014,
                handler:'deletenoticeWindow'
        }]
        this.callParent();
    }
});