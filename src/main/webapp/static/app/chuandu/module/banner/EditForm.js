Ext.define("app.chuandu.module.banner.EditForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.editbannerform',
    border:false,
    fileUpload:true,
    layout:'fit',
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'fieldset',
            title:'信息',
            items:[{
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
                allowBlank:false
            }]
        }];
        this.callParent(arguments);
    }
});
