Ext.define('app.chuandu.module.banner.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bannergrid',
    title: 'Banner管理',
    uses: ['app.chuandu.module.banner.GridToolbar'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: false,///隐藏排序
    dockedItems: [{
        xtype: 'bannergridtooolbar',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'banner_pager',
        store: 'bannerModuleStore',
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
        dataIndex: 'url',
        text: '图片',
        renderer:function(value){
            return '<img src="/tx/'+value+'" class="banner" />';
        }
    }, {
        dataIndex: 'name',
        text: 'Banner名称'
    }, {
        dataIndex: 'managerid',
        text: '管理员id',
        hidden: true
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
        dataIndex: 'src',
        text: '链接地址'
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
                var window = Ext.widget("modifybannerwin",{});
                var form =  window.down('modifybannerform');
                window.show();
                form.getForm().loadRecord(rec);
            }
        },'' ,{
            icon:'/image/iconfont-shanchu.png',
            tooltip:'删除',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "确定要删除 <strong>运单号记录</strong> 中的";
                var idArray = [];
                message += '以下记录吗?';
                message += '<ol>';
                message += '<li>' + rec.get('name') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/banner/delete.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('bannerModuleStore');
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
    }],
    store: new Ext.data.JsonStore({
        model: 'app.chuandu.model.Banner',
        storeId: 'bannerModuleStore',
        autoLoad: false,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: '/admin/banner/list.json',
            method: 'GET',
            extraParams:{
                deleted:1
            },
            reader: {
                type: 'json',
                rootProperty: 'bannerList',
                totalProperty: 'totalCount'
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});