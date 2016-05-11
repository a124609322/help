Ext.define('app.chuandu.module.link.GridToolbar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.linkgridtooolbar',
    initComponent  : function(){
        this.items = [
            {
            text:'新增',
            glyph: 0xf016,
            handler:'addlinkWindow'
        },'-',{
            text:'修改',
            glyph : 0xf044,
            handler:'modifylinkWindow'
        },'-',{
            text:'删除',
            glyph : 0xf014,
                handler:'deletelinkWindow'
        }]
        this.callParent();
    }
});