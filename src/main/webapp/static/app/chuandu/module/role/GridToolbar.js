Ext.define('app.chuandu.module.role.GridToolbar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.rolegridtooolbar',
    initComponent  : function(){
        this.items = [
            {
            text:'新增',
            glyph: 0xf016,
            handler:'addroleWindow'
        },'-',{
            text:'修改',
            glyph : 0xf044,
            handler:'modifyroleWindow'
        },'-',{
            text:'删除',
            glyph : 0xf014,
                handler:'deleteroleWindow'
        }]
        this.callParent();
    }
});