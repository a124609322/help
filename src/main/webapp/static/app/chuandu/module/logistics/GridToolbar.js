Ext.define('app.chuandu.module.logistics.GridToolbar',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.logisticsgridtooolbar',
    initComponent  : function(){
        this.items = [
        {   xtype:'textfield',
            fieldLabel:'单号',
            labelWidth:40,
            id:'logistics_search_code'
        },{
            text:'搜索',
            glyph: 0xf002,
            handler:'reloadGrid'
        },'-',{
            text:'新增',
            glyph: 0xf016,
            handler:'addlogisticsWindow'
        },'-',{
            text:'修改',
            glyph : 0xf044,
            handler:'modifylogisticsWindow'
        },'-',{
            text:'删除',
            glyph : 0xf014,
                handler:'deletelogisticsWindow'
        },'-',{
                text:'状态更新',
                glyph : 0xf1b8,
                handler:'batchupdateWindow'
            }]
        this.callParent();
    }
});