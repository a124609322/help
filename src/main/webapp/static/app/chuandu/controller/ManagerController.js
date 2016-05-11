Ext.define("app.chuandu.controller.ManagerController",{
    extend:'Ext.app.ViewController',
    alias:'controller.managercontroller',
    addmanagerWindow:function(){
        var window = Ext.widget("editmanagerwin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addmanagerController:function(){
        var view = this.getView();
        var form = view.down("editmanagerform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/manager/add.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
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
                                var store = Ext.data.StoreManager.lookup('managerModuleStore');
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
    reloadmanagerGrid : function(){
   /*     var store = Ext.data.StoreManager.lookup('hotelModuleStore');
        store.reload({
            params:{}
        });*/
    },
    deletemanagerWindow:function() {
        var grid = this.getView().down('managergrid');
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
            message += '<li>' + record.get('nickname') + '</li>';
            idArray.push(record.get('id'));
        });
        message += '</ol>';
        CommonMsg.question({
            title:'确定删除',
            msg : message,
            fn : function(){
                ExtCommon.request({
                    url:'/admin/manager/delete.json',
                    method:'POST',
                    params:{idList:idArray},
                    success:function(){
                        CommonMsg.info({
                            msg:'删除成功！',
                            fn:function(){
                                var store = Ext.data.StoreManager.lookup('managerModuleStore');
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
    modifymanagerWindow:function(){
        var grid = this.getView().down('managergrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
        var window = Ext.widget("modifymanagerwin",{});
        window.show();
        var form =  window.down('modifymanagerform');
        form.getForm().loadRecord(selections[0]);
    },
    resetModifymanagerController:function(button,e){
        var view = this.getView();
        var form = view.down("modifymanagerform");
        form.getForm().reset();
    },
    modifymanagerController:function(){
        var view = this.getView();
        var form = view.down("modifymanagerform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/manager/modify.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('managerModuleStore');
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