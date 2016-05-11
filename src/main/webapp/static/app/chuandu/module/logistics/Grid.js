Ext.define('app.chuandu.module.logistics.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.logisticsgrid',
    title: '物流信息管理',
    uses: ['app.chuandu.module.logistics.GridToolbar','app.chuandu.module.logistics.ImportWindow'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: false,///隐藏排序
    dockedItems: [{
        xtype: 'logisticsgridtooolbar',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'logistics_pager',
        store: 'logisticsModuleStore',
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
        dataIndex:'logo',
        text:'logo',
        renderer:function(value){
            if(value == "manual"){
                return "<img src='/image/pic_02.png'height='16' width='16'>";
            }else if(value == "auto"){
                return "<img src='/image/pic_01.png'height='16' width='16'>";
            }else if(value == "sign"){
                return "<img src='/image/pic_04.png'height='16' width='16'>";
            }
        }
    },{
        dataIndex:'来源',
        text:'origin',
        hidden:true
    },{
        dataIndex: 'code',
        text: '单号'
    }, {
        dataIndex: 'waybill',
        text: '批次号',
        renderer:function(value){
            return value?(value.batchcode):'无';
        }
    }, {
        dataIndex: 'waybill',
        text: '运单号',
        renderer:function(value){
            return value?(value.expresscode):'无';
        }
    }, {
        dataIndex: 'info',
        text: '包裹状态'
    }, {
        dataIndex: 'datetime',
        text: '更新时间'
    }, {
        dataIndex: 'createdate',
        text: '创建时间',
        hidden: true
    }, {
        dataIndex: 'modifydate',
        text: '修改时间'
    }, {
        dataIndex: 'manager',
        text: '操作人',
        renderer:function(value){
            return value?(value.nickname):"无";
        }
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
                var window = Ext.widget("modifylogisticswin",{});
                var form =  window.down('modifylogisticsform');
                window.show();
                form.getForm().loadRecord(rec);
                var datetime = form.down('datetimefield');
                var textfield = form.down('textfield');
                datetime.setRawValue(textfield.getValue());
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
                message += '<li>' + rec.get('datetime') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/logistics/delete.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('logisticsModuleStore');
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
        model: 'app.chuandu.model.Logistics',
        storeId: 'logisticsModuleStore',
        autoLoad: false,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: '/admin/logistics/list.json',
            method: 'GET',
            extraParams:{
                deleted:1
            },
            reader: {
                type: 'json',
                rootProperty: 'logisticsList',
                totalProperty: 'totalCount'
            }
        },
        listeners:{
            beforeload : function(store, operation, eOpts ){
                var code = Ext.getCmp('logistics_search_code');
                if(code){
                    store.proxy.extraParams = {'code':code.getValue()};
                }
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});