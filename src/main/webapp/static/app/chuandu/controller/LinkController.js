Ext.define("app.chuandu.controller.LinkController",{
    extend:'Ext.app.ViewController',
    alias:'controller.linkcontroller',
    addlinkWindow:function(){
        var window = Ext.widget("editlinkwin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addlinkController:function(){
        var view = this.getView();
        var form = view.down("editlinkform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/link/add.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if(!action.result.success){
                        CommonMsg.warinning({
                            msg : action.result.msg
                        })
                    }else{
                        CommonMsg.info({
                            title: '成功',
                            msg: action.result.msg,
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('linkModuleStore');
                                store.reload({
                                    params: {}
                                });
                                view.close();
                            }
                        })
                    }
                },
                failure: function (form, action) {
                    msg:(action.result.msg?action.result.msg:null)
                }
            });
        }
    },
    deletelinkWindow:function() {
        var grid = this.getView().down('linkgrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length == 0){
            CommonMsg.warinning({
                msg: "请至少选择一条数据进行操作！"
            })
            return;
        }
        var message = "确定删除要删除 <strong>友情链接</strong> 中的";
        var idArray = [];
        message += '以下 ' + selections.length + ' 条记录吗?';
        message += '<ol>';
        Ext.Array.each(selections, function(record) {
            message += '<li>' + record.get('linkname') + '</li>';
            idArray.push(record.get('id'));
        });
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
    },
    modifylinkWindow:function(){
        var grid = this.getView().down('linkgrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
        var window = Ext.widget("modifylinkwin",{});
        window.show();
        var form =  window.down('modifylinkform');
        form.getForm().loadRecord(selections[0]);
    },
    resetModifylinkController:function(button,e){
        var view = this.getView();
        var form = view.down("modifylinkform");
        form.getForm().reset();
    },
    modifylinkController:function(){
        var view = this.getView();
        var form = view.down("modifylinkform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/link/modify.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('linkModuleStore');
                                store.reload({
                                    params: {}
                                });
                                view.close();
                            }
                        })
                    } else {
                        CommonMsg.warinning({
                            msg : action.result.msg
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
    }
});