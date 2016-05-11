Ext.define("app.chuandu.data.MainModel",{
    extend:'Ext.app.ViewModel',
    alias:'viewmodel.main',
    constructor : function(){
        var me = this;
        this.callParent(arguments);
        ExtCommon.request({
            url : '/admin/menu.json',
            method : 'GET',
            async : false,
            success : function(data){
                Ext.apply(me.data,data);
            }
        });

    },
    data : {
        title : '泰興物流后台管理系统'
    }
});