Ext.define("app.chuandu.controller.BannerController",{
    extend:'Ext.app.ViewController',
    alias:'controller.bannercontroller',
    addbannerWindow:function(){
        var window = Ext.widget("editbannerwin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addbannerController:function(){
        var view = this.getView();
        var form = view.down("editbannerform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/banner/add.json',
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
                                var store = Ext.data.StoreManager.lookup('bannerModuleStore');
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
    reloadbannerGrid : function(){
   /*     var store = Ext.data.StoreManager.lookup('hotelModuleStore');
        store.reload({
            params:{}
        });*/
    },
    deletebannerWindow:function() {
        var grid = this.getView().down('bannergrid');
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
            message += '<li>' + record.get('name') + '</li>';
            idArray.push(record.get('id'));
        });
        message += '</ol>';
        CommonMsg.question({
            title:'确定删除',
            msg : message,
            fn : function(){
                ExtCommon.request({
                    url:'/admin/banner/delete.json',
                    method:'POST',
                    params:{idList:idArray},
                    success:function(){
                        CommonMsg.info({
                            msg:'删除成功！',
                            fn:function(){
                                var store = Ext.data.StoreManager.lookup('bannerModuleStore');
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
    modifybannerWindow:function(){
        var grid = this.getView().down('bannergrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
        var window = Ext.widget("modifybannerwin",{});
        window.show();
        var form =  window.down('modifybannerform');
        form.getForm().loadRecord(selections[0]);
    },
    resetModifybannerController:function(){
        var view = this.getView();
        var form = view.down("modifybannerform");
        form.getForm().reset();
        var tree = form.down('treepanel');
        var store = tree.getStore();
        store.setRoot({
            text:'根节点',
            id:'-1',
            expanded:true
        });
    },
    modifybannerController:function(){
        var view = this.getView();
        var form = view.down("modifybannerform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/banner/modify.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('bannerModuleStore');
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
                    url:'/admin/banner/deleted.json',
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