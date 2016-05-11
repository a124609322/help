Ext.define('app.chuandu.module.recyclebin.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.recyclebingrid',
    title: '运单回收站管理',
    uses: ['app.chuandu.module.recyclebin.GridToolbar'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: false,///隐藏排序
    dockedItems: [{
        xtype: 'recyclebingridtooolbar',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'recyclebin_pager',
        store: 'recyclebinModuleStore',
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
        dataIndex: 'code',
        text: '单号'
    }, {
        dataIndex: 'batchcode',
        text: '批次号'
    }, {
        dataIndex: 'expresscode',
        text: '运单号'
    }, {
        dataIndex: 'name',
        text: '收件人'
    }, {
        dataIndex: 'phone',
        text: '电话'
    }, {
        dataIndex: 'address',
        text: '地址',
        hidden: true
    }, {
        dataIndex: 'goods1',
        text: '物品1',
        hidden: true
    }, {
        dataIndex: 'amount1',
        text: '数量1',
        hidden: true
    }, {
        dataIndex: 'price1',
        text: '价格1',
        hidden: true
    }, {
        dataIndex: 'goods2',
        text: '物品2',
        hidden: true
    }, {
        dataIndex: 'amount2',
        text: '数量2',
        hidden: true
    }, {
        dataIndex: 'price2',
        text: '价格2',
        hidden: true
    }, {
        dataIndex: 'goods3',
        text: '物品3',
        hidden: true
    }, {
        dataIndex: 'amount3',
        text: '数量3',
        hidden: true
    }, {
        dataIndex: 'price3',
        text: '价格3',
        hidden: true
    }, {
        dataIndex: 'worth',
        text: '价值',
        hidden: true
    }, {
        dataIndex: 'weight',
        text: '重量',
        hidden: true
    }, {
        dataIndex: 'insurance',
        text: '保险',
        hidden: true
    }, {
        dataIndex: 'sender',
        text: '寄件方'
    }, {
        dataIndex: 'managerid',
        text: '操作者id',
        hidden: true
    }, {
        dataIndex: 'problem',
        text: '是否问题单',
        hidden: true
    }, {
        dataIndex: 'problemreason',
        text: '问题原因',
        hidden: true
    }, {
        dataIndex: 'channel',
        text: '渠道'
    }, {
        dataIndex: 'isautoupdate',
        text: '是否自动更新',
        hidden: true
    }, {
        dataIndex: 'robotid',
        text: '机器人id',
        hidden: true
    }, {
        dataIndex: 'createdate',
        text: '创建时间',
        hidden: true
    }, {
        dataIndex: 'modifydate',
        text: '修改时间',
        hidden: true
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
            icon:'/image/iconfont-shanchu.png',
            tooltip:'删除',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "确定要删除 <strong>运单号记录</strong> 中的";
                var idArray = [];
                message += '以下记录吗?';
                message += '<ol>';
                message += '<li>' + rec.get('code') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/waybill/deleted.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('recyclebinModuleStore');
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
        model: 'app.chuandu.model.Waybill',
        storeId: 'recyclebinModuleStore',
        autoLoad: false,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: '/admin/waybill/list.json',
            method: 'GET',
            extraParams:{
                deleted:0
            },
            reader: {
                type: 'json',
                rootProperty: 'waybillList',
                totalProperty: 'totalCount'
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});