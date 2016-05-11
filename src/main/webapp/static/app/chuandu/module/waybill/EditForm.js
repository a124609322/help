Ext.define("app.chuandu.module.waybill.EditForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.editwaybillform',
    border:false,
    fileUpload:true,
    layout:'form',
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'fieldset',
            title:'订单信息',
            items:[{
                layout:'column',
                border:false,
                defaults:{
                    width:300
                },
                items:[{
                    fieldLabel:'单号',
                    name:'code',
                    xtype:'textfield',
                    labelWidth:60,
                    allowBlank:false,
                    maxLength:20,
                    maxLengthText:'最大长度是20位字符',
                    minLength:2,
                    minLengthText:'最小长度是2位字符'
                },{
                    fieldLabel:'批次号',
                    name:'batchcode',
                    xtype:'textfield',
                    labelWidth:60,
                    allowBlank:false,
                    margin: '0 0 0 20',
                    maxLength:20,
                    maxLengthText:'最大长度是20位字符',
                    minLength:2,
                    minLengthText:'最小长度是2位字符',
                    vtype:'batchCode'
                }]
            },{
                layout:'column',
                border:false,
                defaults:{
                    width:300
                },
                items:[{
                    fieldLabel:'转运单号',
                    name:'expresscode',
                    labelWidth:60,
                    xtype:'textfield',
                    allowBlank:true,
                    maxLength:20,
                    maxLengthText:'转运单号的最大长度是20位字符',
                    minLength:2,
                    minLengthText:'转运单号的最小长度是2位字符'
                },{
                    fieldLabel: '快递公司',
                    name: 'expresscompany',
                    xtype: 'combobox',
                    editable:false,
                    labelWidth:60,
                    queryMode: 'local',
                    displayField: 'text',
                    valueField: 'value',
                    allowBlank:true,
                    margin: '0 0 0 20',
                    store: Ext.create("Ext.data.Store", {
                        fields: ['value', 'text'],
                        data: [
                            {"value": "EMS", "text": "EMS"},
                            {"value": "SFEXPRESS", "text": "顺丰快递"},
                            {"value": "ZTO", "text": "中通速递"},
                            {"value": "YTO", "text": "圆通速递"},
                            {"value": "YUNDA", "text": "韵达快运"},
                            {"value": "HTKY", "text": "百世汇通"},
                            {"value": "STO", "text": "申通快递"}
                        ]
                    })
                }]
            },{
                layout:'column',
                border:false,
                defaults:{
                    width:300
                },
                items:[{
                    fieldLabel:'姓名',
                    name:'name',
                    xtype:'textfield',
                    labelWidth:60,
                    allowBlank:true,
                    maxLength:10,
                    maxLengthText:'转运单号的最大长度是10位字符',
                    minLength:2,
                    minLengthText:'转运单号的最小长度是2位字符'
                },{
                    fieldLabel:'电话',
                    name:'phone',
                    labelWidth:60,
                    xtype:'textfield',
                    allowBlank:true,
                    margin: '0 0 0 20',
                    vtype:'mobilephone'
                }]
            },{
                layout:'column',
                border:false,
                defaults:{
                    width:300
                },
                items:[{
                    fieldLabel:'价值',
                    name:'worth',
                    xtype:'numberfield',
                    labelWidth:60,
                    allowBlank:true,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    maxLength:10,
                    maxLengthText:'价值的最大长度是10位字符',
                    minLength:1,
                    minLengthText:'价值的最小长度是1位字符'
                }]
            },{
                layout:'column',
                border:false,
                defaults:{
                    width:620
                },
                items:[{
                    fieldLabel: '地址',
                    name: 'address',
                    labelWidth:60,
                    xtype: 'textfield',
                    allowBlank: true
                }]
            },{
                layout:'column',
                border:false,
                defaults:{
                    width:300
                },
                items:[{
                    fieldLabel:'重量',
                    name:'weight',
                    labelWidth:60,
                    xtype:'numberfield',
                    allowBlank:true,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    maxLength:10,
                    maxLengthText:'重量的最大长度是10位字符',
                    minLength:1,
                    minLengthText:'重量的最小长度是1位字符'
                },{
                    fieldLabel:'保险',
                    name:'insurance',
                    xtype:'numberfield',
                    labelWidth:60,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    maxLength:10,
                    maxLengthText:'保险的最大长度是10位字符',
                    minLength:1,
                    minLengthText:'保险的最小长度是1位字符'
                }]
            },{
                layout:'column',
                border:false,
                defaults:{
                    width:300
                },
                items:[{
                    fieldLabel:'寄件方',
                    name:'sender',
                    labelWidth:60,
                    xtype:'textfield',
                    allowBlank:true,
                    maxLength:20,
                    maxLengthText:'寄件方的最大长度是20位字符',
                    minLength:1,
                    minLengthText:'寄件方的最小长度是1位字符'
                },{
                    fieldLabel:'渠道',
                    name:'channel',
                    xtype:'textfield',
                    labelWidth:60,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    maxLength:20,
                    maxLengthText:'渠道的最大长度是20位字符',
                    minLength:1,
                    minLengthText:'渠道的最小长度是1位字符'
                }]
            }]
        },{
            xtype:'fieldset',
            title:'商品信息',
            items:[{
                layout:'column',
                border:false,
                items:[{
                    fieldLabel:'商品1',
                    name:'goods1',
                    labelWidth:40,
                    xtype:'textfield',
                    allowBlank:true,
                    width:300,
                    maxLength:50,
                    maxLengthText:'最大长度是50位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                },{
                    fieldLabel:'数量1',
                    name:'amount1',
                    xtype:'numberfield',
                    labelWidth:40,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    width:120,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    vtype:'integer',
                    maxLength:7,
                    maxLengthText:'最大长度是7位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                },{
                    fieldLabel:'单价1',
                    name:'price1',
                    xtype:'numberfield',
                    labelWidth:40,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    width:160,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    maxLength:10,
                    maxLengthText:'最大长度是10位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    fieldLabel:'商品2',
                    name:'goods2',
                    labelWidth:40,
                    xtype:'textfield',
                    allowBlank:true,
                    width:300,
                    maxLength:50,
                    maxLengthText:'最大长度是50位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                },{
                    fieldLabel:'数量2',
                    name:'amount2',
                    xtype:'numberfield',
                    labelWidth:40,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    width:120,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    vtype:'integer',
                    maxLength:7,
                    maxLengthText:'最大长度是7位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                },{
                    fieldLabel:'单价2',
                    name:'price2',
                    xtype:'numberfield',
                    labelWidth:40,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    width:160,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    maxLength:10,
                    maxLengthText:'最大长度是10位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                }]
            },{
                layout:'column',
                border:false,
                items:[{
                    fieldLabel:'商品3',
                    name:'goods3',
                    labelWidth:40,
                    xtype:'textfield',
                    allowBlank:true,
                    width:300,
                    maxLength:50,
                    maxLengthText:'最大长度是50位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                },{
                    fieldLabel:'数量3',
                    name:'amount3',
                    xtype:'numberfield',
                    labelWidth:40,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    width:120,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    vtype:'integer',
                    maxLength:7,
                    maxLengthText:'最大长度是7位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                },{
                    fieldLabel:'单价3',
                    name:'price3',
                    xtype:'numberfield',
                    labelWidth:40,
                    allowBlank:true,
                    margin: '0 0 0 20',
                    width:160,
                    hideTrigger: false,
                    keyNavEnabled: true,
                    mouseWheelEnabled: true,
                    maxLength:20,
                    maxLengthText:'最大长度是20位字符',
                    minLength:1,
                    minLengthText:'最小长度是1位字符'
                }]
            }]
        }];
        this.callParent(arguments);
    }
});
