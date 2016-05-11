Ext.define('app.chuandu.module.waybill.GridToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.waybillgridtooolbar',
    initComponent: function () {
        this.items = [
            {
                text: '新增',
                glyph: 0xf016,
                handler: 'addwaybillWindow'
            }, '-', {
                text: '修改',
                glyph: 0xf044,
                handler: 'modifywaybillWindow'
            }, '-', {
                text: '删除',
                glyph: 0xf014,
                handler: 'deletewaybillWindow'
            }, '-', {
                text: '批量导入运单',
                icon: "/image/excel.png",
                handler: 'importwaybillWindow'
            }, '-', {
                text: '信息补充导入',
                icon: "/image/excel.png",
                handler: 'importinfoWindow'
            }, '-', {
                text: '问题单导入',
                icon: "/image/excel.png",
                handler: 'importproblemWindow'
            }, '-', {
                text: '导出到Excel',
                icon: "/image/export-excel.png",
                handler: 'exportwaybillWindow'
            }]
        this.callParent();
    }
});