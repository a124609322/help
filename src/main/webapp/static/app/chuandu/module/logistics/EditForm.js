Ext.define("app.chuandu.module.logistics.EditForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.editlogisticsform',
    border:false,
    fileUpload:true,
    layout:'form',
    requires:['app.ux.DateTime'],
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'fieldset',
            title:'信息',
            items:[{
                layout: 'column',
                border: false,
                defaults: {
                    width: 300
                },
                items: [{
                    fieldLabel:'单号/批次号',
                    name:'waybill.code',
                    xtype:'textfield',
                    labelWidth:80,
                    allowBlank:false,
                    maxLength:20,
                    maxLengthText:'最大长度是20位字符',
                    minLength:2,
                    minLengthText:'最小长度是2位字符'
                },{
                    xtype:'datetimefield',
                    width : 300,
                    labelWidth :60,
                    editable:false,
                    fieldLabel: '更新时间',
                    format: 'Y-m-d H:i:s ',
                    name:'datetime',
                    margin: '0 0 0 20',
                    allowBlank:false
                }]
            },{
                layout: 'column',
                border: false,
                defaults: {
                    width: 620
                },
                items: [{
                    fieldLabel:'状态',
                    name:'info',
                    xtype:'textfield',
                    labelWidth:80,
                    allowBlank:false
                }]
            }]
        }];
        this.callParent(arguments);
    }
});
