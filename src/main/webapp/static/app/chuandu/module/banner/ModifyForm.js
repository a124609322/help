Ext.define("app.chuandu.module.banner.ModifyForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.modifybannerform',
    border:false,
    fileUpload:true,
    trackResetOnLoad:true,
    layout:'form',
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'fieldset',
            title:'信息',
            items:[{
                name:'id',
                xtype:'textfield',
                hidden:true
            },{
                fieldLabel:'Banner名称',
                name:'name',
                xtype:'textfield',
                allowBlank:false,
                maxLength:20,
                maxLengthText:'最大长度是20位字符',
                minLength:2,
                minLengthText:'最小长度是2位字符'
            },{
                fieldLabel:'链接地址',
                name:'src',
                xtype:'textfield',
                allowBlank:false
            },{
                fieldLabel:'图片',
                name:'file',
                xtype:'filefield',
                allowBlank:true
            }]
        }];
        this.callParent(arguments);
    }
});