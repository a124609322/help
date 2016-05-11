Ext.define('app.chuandu.module.role.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rolegrid',
    title: '角色管理',
    uses: ['app.chuandu.module.role.GridToolbar'],
    forceFit: true,
    enableColumnHide: false,///隐藏列
    multiSelect: true,
    sortableColumns: true,///隐藏排序
    dockedItems: [{
        xtype: 'rolegridtooolbar',
        dock: 'top'
    }, {
        xtype: 'pagingtoolbar',
        itemId: 'role_pager',
        store: 'roleModuleStore',
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
        dataIndex: 'rolename',
        text: '角色名称'
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
                var window = Ext.widget("modifyrolewin",{});
                window.show();
                var form =  window.down('modifyroleform');
                var tree = form.down('treepanel');
                var store = Ext.create('Ext.data.TreeStore', {
                    nodeParam : 'id',
                    proxy: {
                        type: 'ajax',
                        url: '/admin/menu/listTreeAll.json',
                        actionMethods: 'get',
                        reader: {
                            type: 'json',
                            root: 'treeList'
                        },
                        extraParams:{
                            roleId:rec.get('id')
                        }
                    },
                    root:{
                        text:'根节点',
                        id:'-1',
                        expanded:true
                    }
                });
                tree.setStore(store);
                form.getForm().loadRecord(rec);
            }
        },'' ,{
            icon:'/image/iconfont-shanchu.png',
            tooltip:'删除',
            handler: function (grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                var message = "确定要删除 <strong>角色</strong> 中的";
                var idArray = [];
                message += '以下记录吗?';
                message += '<ol>';
                message += '<li>' + rec.get('rolename') + '</li>';
                idArray.push(rec.get('id'));
                message += '</ol>';
                CommonMsg.question({
                    title:'确定删除',
                    msg : message,
                    fn : function(){
                        ExtCommon.request({
                            url:'/admin/role/delete.json',
                            method:'POST',
                            params:{idList:idArray},
                            success:function(){
                                CommonMsg.info({
                                    msg:'删除成功！',
                                    fn:function(){
                                        var store = Ext.data.StoreManager.lookup('roleModuleStore');
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
        model: 'app.chuandu.model.Role',
        storeId: 'roleModuleStore',
        autoLoad: false,
        pageSize: 25,
        proxy: {
            type: 'ajax',
            url: '/admin/role/list.json',
            method: 'GET',
            reader: {
                type: 'json',
                rootProperty: 'roleList',
                totalProperty: 'totalCount'
            }
        }
    }),
    initComponent: function () {
        this.getStore().reload();
        this.callParent(arguments);
    }
});