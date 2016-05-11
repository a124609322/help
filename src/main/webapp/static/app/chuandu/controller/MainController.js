Ext.define("app.chuandu.controller.MainController",{
    extend:'Ext.app.ViewController',
    alias:'controller.main',
    onMainMenuClick : function(menuitem){
        var me = this;
        var tab = this.getView().down('maincenter');
        if(menuitem.text == '主页'){
            var tabPanel = tab.down("homepage");
            this.setTabPanel({
                tab : tab,
                tabPanel : tabPanel,
                xtype : "homepage",
                glyph:menuitem.glyph,
                title:menuitem.text,
                closeAction:'destroy'
            });
        }else{
            Ext.Ajax.request({
                url:'/admin/menu.json',
                method:'POST',
                params:{menuname:Ext.String.trim(menuitem.text)},
                success:function(response){
                    var result = Ext.decode(response.responseText);
                    var menu = result.menu;
                    if(menu){
                        me.setTabPanel({
                            tab : tab,
                            tabPanel : tab.down(menu.url),
                            xtype : menu.url,
                            glyph:parseInt(menu.pic),
                            url:'ssss',
                            title:menu.menuname,
                            closeAction:'destroy'
                        });
                    }else{
                        CommonMsg.error({
                            msg:result?(result.msg?result.msg:null):null
                        });
                    }
                },
                failure:function(response){
                    var text = response.responseText;
                    var result = Ext.decode(text,true);
                    Ext.Msg.show({
                        title:'错误',
                        message: result.msg?result.msg:'出错了，请重试',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            });
        }
    },
    closeWindow :function(){
        var win =  this.getView();
        win.close();
    },
    setTabPanel:function(config){
        var tabPanel = config.tabPanel;
        var tab = config.tab;
        if(tabPanel) {
            tab.setActiveTab(tabPanel);
        }else{
            tab.setActiveTab(tab.add({
                xtype:config.xtype,
                title:config.title,
                glyph:config.glyph,
                closable:true,
                closeAction : 'destroy',
                autoDestroy : true
            }));
        }
    },
    logout:function(){
        window.location.href ="/admin/logout";
    },
    resetPassword:function(){
        var window = Ext.widget("modifypasswordwin",{});
        window.show();
    },
    resetPasswordController:function(){
        var view = this.getView();
        var form = view.down("form");
        if(form.getForm().isValid()){
            form.getForm().submit({
                url: '/admin/manager/resetPassword.json',
                method:'POST',
                waitTitle:'正在提交',
                waitMsg:'正在提交数据，请稍后……',
                success: function(form, action) {
                    CommonMsg.info({
                        title:'成功',
                        msg : action.result.msg,
                        fn : function(){
                            window.location.href ="/admin/logout";
                        }
                    })
                },
                failure: function(form, action) {
                    CommonMsg.error({
                        msg:action.result?(action.result.msg?action.result.msg:null):null
                    });
                }
            });
        }
    },
});