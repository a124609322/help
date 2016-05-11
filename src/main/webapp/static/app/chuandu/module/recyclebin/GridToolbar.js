Ext.define('app.chuandu.module.recyclebin.GridToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.recyclebingridtooolbar',
    initComponent: function () {
        this.items = [
            {
                text: '清空',
                glyph: 0xf016,
                handler: 'clearupWindow'
            },
            '-',
            {
                text: '还原',
                glyph: 0xf1da,
                handler: 'restoreWindow'
            },
            '-',
            {
                text: '删除',
                glyph: 0xf014,
                handler: 'clearbillWindow'
            }]
        this.callParent();
    }
});