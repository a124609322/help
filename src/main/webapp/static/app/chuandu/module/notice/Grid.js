Ext.define('app.chuandu.module.notice.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.noticegrid',
    title: '公告信息管理',
    uses: ['app.chuandu.module.notice.GridToolbar'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: false,///隐藏排序
    dockedItems: [{
        xtype: 'noticegridtooolbar',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'notice_pager',
        store: 'noticeModuleStore',
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
    },{
        dataIndex: 'pic',
        text: 'pic',
        hidden: true
    },{
        dataIndex: 'content',
        text: '内容',
        hidden: true
    },{
        dataIndex: 'title',
        text: '标题'
    }, {
        dataIndex: 'intro',
        text: '简介'
    },{
        dataIndex: 'isRoll',
        text: '是否滚动',
        renderer:function(value){
            return value==1?"是":"否";
        }
    },{
        dataIndex: 'types',
        text: '类型',
        renderer:function(value){
            if(value == "abouttaixing"){
                return "关于泰兴";
            }else if(value == "contactus"){
                return "联系我们";
            }else if(value == "embargo"){
                return "禁运物品";
            }else if(value == "settlement"){
                return "理赔标准";
            }else if(value == "other"){
                return "其他";
            }
        }
    },{
        dataIndex: 'top',
        text: '是否置顶',
        hidden:true
    },{
        dataIndex: 'createdate',
        text: '创建时间'
    }, {
        dataIndex: 'modifydate',
        text: '修改时间',
        hidden: true
    }, {
        dataIndex: 'manager',
        text: '创建人',
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
        width: 100,
        align : 'center',
        items: [{
            icon:'/image/iconfont-xiugai.png',
            tooltip:'修改',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var window = Ext.widget("modifynoticewin",{});
                var form =  window.down('modifynoticeform');
                window.show();
                form.getForm().loadRecord(rec);
                var editor = form.down("myUeditor");
                var task = new Ext.util.DelayedTask(function(){
                    editor.setContent(rec.get('content'))
                });
                task.delay(100);
            }
        },'',{
            icon:'/image/iconfont-shanchu.png',
            tooltip:'删除',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "确定要删除 <strong>公告</strong> 中的";
                var idArray = [];
                message += '以下记录吗?';
                message += '<ol>';
                message += '<li>' + rec.get('title') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/notice/delete.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('noticeModuleStore');
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
        },'',{
            icon:'/image/iconfont-top.png',
            tooltip:'置顶',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "设置 <strong>公告</strong> 中的";
                message += '以下记录';
                message += '<ol>';
                message += '<li>' + rec.get('title') + '</li>';
                message += '</ol>';
                CommonMsg.ask({
                    title:'置顶设置',
                    msg : message,
                    fnYES : function(){
                        ExtCommon.request({
                            url:'/admin/notice/top.json',
                            method:'POST',
                            params:{id:rec.get('id')},
                            success:function(){
                                CommonMsg.info({
                                    msg:'设置成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('noticeModuleStore');
                                        store.reload({
                                            params:{}
                                        });
                                    }
                                });

                            }
                        });
                    },
                    fnNO : function(){
                        ExtCommon.request({
                            url:'/admin/notice/top.json',
                            method:'POST',
                            params:{id:rec.get('id'),top:'1970-01-01 00:00:00'},
                            success:function(){
                                CommonMsg.info({
                                    msg:'设置成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('noticeModuleStore');
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
        },'',{
            icon:'/image/iconfont-roll.png',
            tooltip:'滚动',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "设置<strong>公告</strong>中的";
                message += '以下记录';
                message += '<ol>';
                message += '<li>' + rec.get('title') + '</li>';
                message += '</ol>';
                CommonMsg.ask({
                    title:'设置滚动',
                    msg : message,
                    fnYES : function(){
                        ExtCommon.request({
                            url:'/admin/notice/roll.json',
                            method:'POST',
                            params:{id:rec.get('id'),isRoll:1},
                            success:function(){
                                CommonMsg.info({
                                    msg:'设置成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('noticeModuleStore');
                                        store.reload({
                                            params:{}
                                        });
                                    }
                                });

                            }
                        });
                    },
                    fnNO : function(){
                        ExtCommon.request({
                            url:'/admin/notice/roll.json',
                            method:'POST',
                            params:{id:rec.get('id'),isRoll:0},
                            success:function(){
                                CommonMsg.info({
                                    msg:'设置成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('noticeModuleStore');
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
        model: 'app.chuandu.model.Notice',
        storeId: 'noticeModuleStore',
        autoLoad: false,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: '/admin/notice/list.json',
            method: 'GET',
            extraParams:{
                deleted:1
            },
            reader: {
                type: 'json',
                rootProperty: 'noticeList',
                totalProperty: 'totalCount'
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});