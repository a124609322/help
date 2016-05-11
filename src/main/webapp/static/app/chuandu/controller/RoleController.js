Ext.define("app.chuandu.controller.RoleController",{
    extend:'Ext.app.ViewController',
    alias:'controller.rolecontroller',
    addroleWindow:function(){
        var window = Ext.widget("editrolewin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addroleController:function(){
        var view = this.getView();
        var form = view.down("editroleform");
        var tree = form.down("treepanel");
        var treeModels = tree.getChecked();
        var menuList = new Array();
        for(var i in treeModels){
            if(treeModels[i].get('id') != -1){
                menuList.push(treeModels[i].get('id'));
            }
        }
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/role/add.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                params:{menuIdList:menuList},
                success: function (form, action) {
                    if(action.result.isRepeat){
                        CommonMsg.warinning({
                            msg : action.result.msg
                        })
                    }else{
                        CommonMsg.info({
                            title: '成功',
                            msg: action.result.msg,
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('roleModuleStore');
                                store.reload({
                                    params: {}
                                });
                                view.close();
                            }
                        })
                    }
                },
                failure: function (form, action) {
                    CommonMsg.error({
                        msg:action.result?(action.result.msg?action.result.msg:null):null
                    });
                }
            });
        }
    },
    reloadroleGrid : function(){
   /*     var store = Ext.data.StoreManager.lookup('hotelModuleStore');
        store.reload({
            params:{}
        });*/
    },
    deleteroleWindow:function() {
        var grid = this.getView().down('rolegrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length == 0){
            CommonMsg.warinning({
                msg: "请至少选择一条数据进行操作！"
            })
            return;
        }
        var message = "确定删除要删除 <strong>管理员</strong> 中的";
        var idArray = [];
        message += '以下 ' + selections.length + ' 条记录吗?';
        message += '<ol>';
        Ext.Array.each(selections, function(record) {
            message += '<li>' + record.get('rolename') + '</li>';
            idArray.push(record.get('id'));
        });
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
    },
    modifyroleWindow:function(){
        var grid = this.getView().down('rolegrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
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
                    roleId:selections[0].get('id')
                }
            },
            root:{
                text:'根节点',
                id:'-1',
                expanded:true
            }
        });
        tree.setStore(store);
        form.getForm().loadRecord(selections[0]);
    },
    resetModifyroleController:function(){
        var view = this.getView();
        var form = view.down("modifyroleform");
        form.getForm().reset();
        var tree = form.down('treepanel');
        var store = tree.getStore();
        store.setRoot({
            text:'根节点',
            id:'-1',
            expanded:true
        });
    },
    modifyroleController:function(){
        var view = this.getView();
        var form = view.down("modifyroleform");
        var tree = form.down("treepanel");
        var treeModels = tree.getChecked();
        var menuList = new Array();
        for(var i in treeModels){
            if(treeModels[i].get('id') != -1){
                menuList.push(treeModels[i].get('id'));
            }
        }
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/role/modify.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                params:{menuIdList:menuList},
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('roleModuleStore');
                                store.reload({
                                    params: {}
                                });
                                view.close();
                            }
                        })
                    } else {
                        CommonMsg.error({
                            msg:action.result?(action.result.msg?action.result.msg:null):null
                        });
                    }

                },
                failure: function (form, action) {
                    CommonMsg.error({
                        msg:action.result?(action.result.msg?action.result.msg:null):null
                    });
                }
            });
        }
    }
});