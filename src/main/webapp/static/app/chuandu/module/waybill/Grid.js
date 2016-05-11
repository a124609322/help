Ext.define('app.chuandu.module.waybill.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.waybillgrid',
    title: '运单管理',
    uses: ['app.chuandu.module.waybill.GridToolbar','app.chuandu.module.waybill.SearchPanel'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: false,///隐藏排序
    viewConfig:{
        enableTextSelection:true
    },
    dockedItems: [{
        xtype: 'waybillgridtooolbar',
        dock: 'top'
    },{
        xtype: 'waybillsearchpanel',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'waybill_pager',
        store: 'waybillModuleStore',
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
        dataIndex: 'expresscompany',
        text: '快递公司编码',
        hidden:true
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
        text: '创建时间'
    }, {
        dataIndex: 'modifydate',
        text: '修改时间',
        hidden: true
    }, {
        dataIndex: 'deleted',
        text: '是否删除',
        hidden: true
    }, {
        dataIndex: 'isEnd',
        text: '是否结束',
        hidden: true
    }, {
        dataIndex: 'endtime',
        text: '结束时间',
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
                var window = Ext.widget("modifywaybillwin",{});
                var form =  window.down('modifywaybillform');
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
                message += '<li>' + rec.get('code') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/waybill/delete.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('waybillModuleStore');
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
        storeId: 'waybillModuleStore',
        autoLoad: false,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: '/admin/waybill/list.json',
            method: 'GET',
            extraParams:{
                deleted:1
            },
            reader: {
                type: 'json',
                rootProperty: 'waybillList',
                totalProperty: 'totalCount'
            }
        },
        listeners:{
            beforeload : function(store, operation, eOpts ){
                var code = Ext.getCmp('waybill_search_code');
                var batchcode = Ext.getCmp('waybill_search_batchcode');
                var name = Ext.getCmp('waybill_search_name');
                var phone = Ext.getCmp('waybill_search_phone');
                var starttime = Ext.getCmp('waybill_search_starttime');
                var endtime = Ext.getCmp('waybill_search_endtime');
                var expresscode = Ext.getCmp('waybill_search_expresscode');
                var sender = Ext.getCmp('waybill_search_sender');
                var problemtrue = Ext.getCmp('waybill_search_problem_true');
                var problemfalse = Ext.getCmp('waybill_search_problem_false');
                var params = new Object();
                if(code && code.getValue()){
                    params.code = code.getValue();
                }
                if(batchcode && batchcode.getValue()){
                    params.batchcode = batchcode.getValue();
                }
                if(name && name.getValue()){
                    params.name = name.getValue();
                }
                if(phone && phone.getValue()){
                    params.phone = phone.getValue();
                }
                if(starttime && starttime.getValue()){
                    if(!endtime || !endtime.getValue()){
                        CommonMsg.error({
                            msg:'必须选择结束时间~！'
                        })
                        return false;
                    }
                    params.starttime = starttime.getValue();
                }
                if(endtime && endtime.getValue()){
                    if(!starttime || !starttime.getValue()){
                        CommonMsg.error({
                            msg:'必须选择结束时间~！'
                        })
                        return false;
                    }
                    params.lasttime = endtime.getValue();
                }
                if(expresscode && expresscode.getValue()){
                    params.expresscode = expresscode.getValue();
                }
                if(sender && sender.getValue()){
                    params.sender = sender.getValue();
                }
                if(problemtrue && problemtrue.getValue()){
                    params.problemtrue = problemtrue.getValue();
                }
                if(problemfalse && problemfalse.getValue()){
                    params.problemfalse = problemfalse.getValue();
                }
                params.deleted = 1;
                store.proxy.extraParams=params;
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});