Ext.define("app.chuandu.controller.LogisticsController",{
    extend:'Ext.app.ViewController',
    alias:'controller.logisticscontroller',
    addlogisticsWindow:function(){
        var window = Ext.widget("editlogisticswin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addlogisticsController:function(){
        var view = this.getView();
        var form = view.down("editlogisticsform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/logistics/add.json',
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
                                var store = Ext.data.StoreManager.lookup('logisticsModuleStore');
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
    reloadGrid : function(){
        var store = Ext.data.StoreManager.lookup('logisticsModuleStore');
        store.loadPage(1);
    },
    deletelogisticsWindow:function() {
        var grid = this.getView().down('logisticsgrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length == 0){
            CommonMsg.warinning({
                msg: "请至少选择一条数据进行操作！"
            })
            return;
        }
        var message = "确定删除要删除 <strong>运单号记录</strong> 中的";
        var idArray = [];
        message += '以下 ' + selections.length + ' 条记录吗?';
        message += '<ol>';
        Ext.Array.each(selections, function(record) {
            message += '<li>' + record.get('datetime') + '</li>';
            idArray.push(record.get('id'));
        });
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
    },
    modifylogisticsWindow:function(){
        var grid = this.getView().down('logisticsgrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
        var window = Ext.widget("modifylogisticswin",{});
        window.show();
        var form =  window.down('modifylogisticsform');
        form.getForm().loadRecord(selections[0]);
        var datetime = form.down('datetimefield');
        var textfield = form.down('textfield');
        datetime.setRawValue(textfield.getValue());
        datetime.setValidation(true);
    },
    resetModifylogisticsController:function(){
        var view = this.getView();
        var form = view.down("modifylogisticsform");
        form.getForm().reset();
        var datetime = form.down('datetimefield');
        var textfield = form.down('textfield');
        datetime.setRawValue(textfield.getValue());
    },
    modifylogisticsController:function(){
        var view = this.getView();
        var form = view.down("modifylogisticsform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/logistics/modify.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('logisticsModuleStore');
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
    },
    clearbillWindow:function() {
        var grid = this.getView().down('recyclebingrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length == 0){
            CommonMsg.warinning({
                msg: "请至少选择一条数据进行操作！"
            })
            return;
        }
        var message = "确定删除要删除 <strong>运单号记录</strong> 中的";
        var idArray = [];
        message += '以下 ' + selections.length + ' 条记录吗?';
        message += '<ol>';
        Ext.Array.each(selections, function(record) {
            message += '<li>' + record.get('code') + '</li>';
            idArray.push(record.get('id'));
        });
        message += '</ol>';
        CommonMsg.question({
            title:'确定删除',
            msg : message,
            fn : function(){
                ExtCommon.request({
                    url:'/admin/logistics/deleted.json',
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
    },
    batchupdateWindow : function(){
        var window = Ext.widget("importlogisticswin",{
            title:'批量更新',
        });
        window.show();
    },
    batchupdateController:function(){
        var view = this.getView();
        var form = view.down("form");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: "/admin/logistics/batchupdate.json",
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    CommonMsg.info({
                        title: '成功',
                        msg: action.result.msg,
                        fn: function () {
                            var store = Ext.data.StoreManager.lookup('logisticsModuleStore');
                            store.reload({
                                params: {}
                            });
                            view.close();
                        }
                    })
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