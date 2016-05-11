Ext.define("app.chuandu.controller.WaybillController",{
    extend:'Ext.app.ViewController',
    alias:'controller.waybillcontroller',
    addwaybillWindow:function(){
        var window = Ext.widget("editwaybillwin",{
        });
        window.show();
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    addwaybillController:function(){
        var view = this.getView();
        var form = view.down("editwaybillform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/waybill/add.json',
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
                                var store = Ext.data.StoreManager.lookup('waybillModuleStore');
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
        var store = Ext.data.StoreManager.lookup('waybillModuleStore');
        store.loadPage(1);
    },
    resetSearchGrid : function(){
        var panel = this.getView().down("waybillsearchpanel");
        var items = panel.items.items;
        for(var i in items){
            var item = items[i];
            if(item.xtype =="textfield" || item.xtype =="datetimefield"){
                item.reset();
            }
            if(item.xtype == "fieldcontainer"){
                item.items.items[0].reset();
                item.items.items[1].reset();
            }
        }
    },
    deletewaybillWindow:function() {
        var grid = this.getView().down('waybillgrid');
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
    },
    modifywaybillWindow:function(){
        var grid = this.getView().down('waybillgrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length != 1){
            CommonMsg.warinning({
                msg : '请选择一条数据进行操作！'
            });
            return;
        }
        var window = Ext.widget("modifywaybillwin",{});
        window.show();
        var form =  window.down('modifywaybillform');
        form.getForm().loadRecord(selections[0]);
    },
    resetModifywaybillController:function(){
        var view = this.getView();
        var form = view.down("modifywaybillform");
        form.getForm().reset();
    },
    modifywaybillController:function(){
        var view = this.getView();
        var form = view.down("modifywaybillform");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: '/admin/waybill/modify.json',
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                    if (action.result.success == true) {
                        CommonMsg.info({
                            title: '成功',
                            msg: '修改成功！',
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('waybillModuleStore');
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
                    url:'/admin/waybill/deleted.json',
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
    clearupWindow:function() {
        CommonMsg.question({
            title:'确定清空',
            msg : "是否确定清空回收站，清空后数据无法找回？",
            fn : function(){
                ExtCommon.request({
                    url:'/admin/waybill/clearup.json',
                    method:'POST',
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
    restoreWindow:function() {
        var grid = this.getView().down('recyclebingrid');
        var selections = grid.getSelectionModel().getSelection();
        if(selections.length == 0){
            CommonMsg.warinning({
                msg: "请至少选择一条数据进行操作！"
            })
            return;
        }
        var message = "确定要还原 <strong>运单号记录</strong> 中的";
        var idArray = [];
        message += '以下 ' + selections.length + ' 条记录吗?';
        message += '<ol>';
        Ext.Array.each(selections, function(record) {
            message += '<li>' + record.get('code') + '</li>';
            idArray.push(record.get('id'));
        });
        message += '</ol>';
        CommonMsg.question({
            title:'确定还原',
            msg : message,
            fn : function(){
                ExtCommon.request({
                    url:'/admin/waybill/restore.json',
                    method:'POST',
                    params:{idList:idArray},
                    success:function(){
                        CommonMsg.info({
                            msg:'还原成功！',
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
    importwaybillWindow : function(){
        var window = Ext.widget("importwaybillwin",{
            name:'importwaybillwin',
            title:'批量导入运单',
        });
        window.show();
    },
    importinfoWindow : function(){
        var window = Ext.widget("importwaybillwin",{
            name:'importinfowin',
            title:'信息补充导入',
        });
        window.show();
    },
    importproblemWindow : function(){
        var window = Ext.widget("importwaybillwin",{
            name:'importproblemmwin',
            title:'问题单导入',
        });
        window.show();
    },
    exportwaybillWindow : function(){
        CommonMsg.question({
            title:'导出Excel？',
            msg : '确定将搜索条件下的数据全部导出到Excel？',
            fn : function(){
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
                var params = "?datetime="+new Date().getTime();
                if(code && code.getValue()){
                    params += "&code="+code.getValue();
                }
                if(batchcode && batchcode.getValue()){
                    params += "&batchcode="+batchcode.getValue();
                }
                if(name && name.getValue()){
                    params  += "&name="+name.getValue();
                }
                if(phone && phone.getValue()){
                    params += "&phone="+phone.getValue();
                }
                if(starttime && starttime.getValue()){
                    if(!endtime || !endtime.getValue()){
                        CommonMsg.error({
                            msg:'必须选择结束时间~！'
                        })
                        return false;
                    }
                    params += "&starttime="+starttime.getValue();
                }
                if(endtime && endtime.getValue()){
                    if(!starttime || !starttime.getValue()){
                        CommonMsg.error({
                            msg:'必须选择结束时间~！'
                        })
                        return false;
                    }
                    params += "&endtime="+endtime.getValue();
                }
                if(expresscode && expresscode.getValue()){
                    params += "&expresscode="+expresscode.getValue();
                }
                if(sender && sender.getValue()){
                    params += "&sender="+sender.getValue();
                }
                if(problemtrue && problemtrue.getValue()){
                    params += "&problemtrue="+problemtrue.getValue();
                }
                if(problemfalse && problemfalse.getValue()){
                    params += "&problemfalse="+problemfalse.getValue();
                }
                params  += "&deleted=1";
                window.open("/admin/waybill/exportExcel"+params);
            }
        })
    },
    importwaybillController:function(){
        var view = this.getView();
        var url ="";
        if(view.name == 'importwaybillwin'){
            url = "/admin/waybill/importwaybill.json";
        }
        if(view.name == 'importinfowin'){
            url = "/admin/waybill/importinfo.json";
        }
        if(view.name == 'importproblemmwin'){
            url = "/admin/waybill/importproblem.json";
        }
        var form = view.down("form");
        if (form.getForm().isValid()) {
            form.getForm().submit({
                url: url,
                method: 'POST',
                waitTitle: '正在提交',
                waitMsg: '正在提交数据，请稍后……',
                success: function (form, action) {
                        CommonMsg.info({
                            title: '成功',
                            msg: action.result.msg,
                            fn: function () {
                                var store = Ext.data.StoreManager.lookup('waybillModuleStore');
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