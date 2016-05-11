Ext.define("app.chuandu.module.link.ModifyForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.modifylinkform',
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
                fieldLabel:'logo',
                name:'file',
                xtype:'filefield'
            },{
                fieldLabel:'名称',
                name:'linkname',
                xtype:'textfield',
                allowBlank:false,
                maxLength:20,
                maxLengthText:'最大长度是20位字符',
                minLength:2,
                minLengthText:'最小长度是2位字符'
            },{
                fieldLabel:'网址',
                name:'link',
                xtype:'textfield',
                allowBlank:false,
                vtype:'url',
                maxLength:50,
                maxLengthText:'最大长度是50位字符',
                minLength:2,
                minLengthText:'最小长度是2位字符'
            }]
        }];
        this.callParent(arguments);
    }
});