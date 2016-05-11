Ext.define('app.chuandu.module.link.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.linkgrid',
    title: '友情链接',
    uses: ['app.chuandu.module.link.GridToolbar'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: false,///隐藏排序
    dockedItems: [{
        xtype: 'linkgridtooolbar',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'link_pager',
        store: 'linkModuleStore',
        dock: 'bottom',
        firstText: "First",
        prevText: "Previous",
        nextText: "Next",
        lastText: "Last",
        page: 1,
        totalPage: 'totalCount',
        displayInfo: true,
        emptyMsg: '没有数据',
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
    }
    ],
    columns: [{
        xtype: "rownumberer",
        text: "序号",
        width: 50
    }, {
        dataIndex: 'id',
        text: 'ID',
        hidden: true
    }, {
        dataIndex: 'logo',
        text: 'logo',
        renderer:function(value){
            return '<img src="/tx/'+value+'" class="banner" />';
        }
    }, {
        dataIndex: 'linkname',
        text: '名称'
    }, {
        dataIndex: 'link',
        text: '网址'
    }, {
        dataIndex: 'createdate',
        text: '创建时间'
    }, {
        dataIndex: 'modifydate',
        text: '修改时间'
    }, {
        dataIndex: 'deleted',
        text: '是否删除',
        hidden: true
    }, {
        xtype: 'actioncolumn',
        header:'操作',
        width: 50,
        align : 'center',
        items: [{
            icon:'/image/iconfont-xiugai.png',
            tooltip:'修改',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var window = Ext.widget("modifylinkwin",{});
                var form =  window.down('modifylinkform');
                window.show();
                form.getForm().loadRecord(rec);
            }
        },'' ,{
            icon:'/image/iconfont-shanchu.png',
            tooltip:'删除',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "确定要删除 <strong>友情链接</strong> 中的";
                var idArray = [];
                message += '以下记录吗?';
                message += '<ol>';
                message += '<li>' + rec.get('linkname') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/link/delete.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('linkModuleStore');
                                        store.reload({
                                            params:{}
                                        });
                                    }
                                });

                            }
                        });
                    }
                })
            }
        }]
    }
    ],
    store: new Ext.data.JsonStore({
        model: 'app.chuandu.model.Link',
        storeId: 'linkModuleStore',
        autoLoad: false,
        pageSize: 10,
        proxy: {
            type: 'ajax',
            url: '/admin/link/list.json',
            method: 'GET',
            reader: {
                type: 'json',
                rootProperty: 'linkList',
                totalProperty: 'totalCount'
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});