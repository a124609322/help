Ext.define("app.chuandu.module.notice.Module",{
    extend:'Ext.panel.Panel',
    alias : 'widget.noticeModule',
    requires:['app.chuandu.controller.NoticeController'],
    uses:[
       'app.chuandu.module.notice.Grid' ,'app.chuandu.module.notice.EditWindow','app.chuandu.module.notice.ModifyWindow'
    ],
    controller:'noticecontroller',
    layout:'border',
    initComponent : function(){
        this.items = [
            {
            xtype:'noticegrid',
            region:'center',
            id:'notice_grid'
         }
        ];
        this.callParent();
    }
});