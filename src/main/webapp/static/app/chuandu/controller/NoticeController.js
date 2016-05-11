Ext.define("app.chuandu.controller.NoticeController",{
    extend:'Ext.app.ViewController',
    alias:'controller.noticecontroller',
    addnoticeWindow:function(){
        var window = Ext.widget("editnoticewin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addnoticeController:function(){
        var view = this.getView();
        var form = view.down("editnoticeform");
        var editor = form.down("myUeditor");
        if (form.getForm().isValid()) {
            var content = editor.getContent();
            form.getForm().submit({
                url: '/admin/notice/add.json',
                method: 'POST',
                params:{content:content},
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                        CommonMsg.info({
                            title: '成功',
                            msg: action.result.msg,
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('noticeModuleStore');
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
    },
    reloadGrid : function(){
        var store = Ext.data.StoreManager.lookup('noticeModuleStore');
        store.reload({
            params:{}
        });
    },
    deletenoticeWindow:function() {
        var grid = this.getView().down('noticegrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length == 0){
            CommonMsg.warinning({
                msg: "请至少选择一条数据进行操作！"
            })
            return;
        }
        var message = "确定删除要删除 <strong>公告</strong> 中的";
        var idArray = [];
        message += '以下 ' + selections.length + ' 条记录吗?';
        message += '<ol>';
        Ext.Array.each(selections, function(record) {
            message += '<li>' + record.get('title') + '</li>';
            idArray.push(record.get('id'));
        });
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
    },
    modifynoticeWindow:function(){
        var grid = this.getView().down('noticegrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
        var window = Ext.widget("modifynoticewin",{});
        window.show();
        var form =  window.down('modifynoticeform');
        form.getForm().loadRecord(selections[0]);
        var editor = form.down("myUeditor");
        var task = new Ext.util.DelayedTask(function(){
            editor.setContent(selections[0].get('content'))
        });
        task.delay(100);
    },
    resetModifynoticeController:function(){
        var view = this.getView();
        var form = view.down("modifynoticeform");
        form.getForm().reset();
        var textfield = form.down('textfield');
        var editor = form.down("myUeditor");
        editor.setContent(textfield.getValue());
    },
    modifynoticeController:function(){
        var view = this.getView();
        var form = view.down("modifynoticeform");
        var editor = form.down("myUeditor");
        if (form.getForm().isValid()) {
            var content = editor.getContent();
            form.getForm().submit({
                url: '/admin/notice/modify.json',
                method: 'POST',
                params:{contentData:content},
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('noticeModuleStore');
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
                    url:'/admin/notice/deleted.json',
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
});