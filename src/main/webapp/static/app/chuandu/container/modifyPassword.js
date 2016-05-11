Ext.define("app.chuandu.container.modifyPassword",{
    extend : 'Ext.window.Window',
    alias:'widget.modifypasswordwin',
    title:'修改密码',
    controller:'main',
    maximizable:false,
    closeAction :'destroy',
    shadowOffset : 30,
    frame:'true',
    modal:true,
    width:310,
    closable:true,
    height:180,
    layout : 'fit',
    buttonAlign :'center',
    initComponent : function(){
        this.buttons = [];
        this.buttons.push({
            text : '保存',
            itemId : 'save',
            glyph : 0xf0c7,
            handler:'resetPasswordController'
        },{
            text : '关闭',
            itemId : 'close',
            glyph :0xf057,
            handler:'closeWindow'
        });
        var form = Ext.create("Ext.form.Panel",{
            border:false,
            margin:'15 0 0 15',
            items:[{
                fieldLabel:'原始密码',
                name:'oldPassword',
                xtype:'textfield',
                inputType:'password',
                allowBlank:false
            },{
                fieldLabel:'输入密码',
                name:'password',
                xtype:'textfield',
                id:'modify_password',
                inputType:'password',
                allowBlank:false,
                maxLength:16,
                maxLengthText:'密码的最大长度是16位字符',
                minLength:6,
                minLengthText:'密码的最小长度是6位字符'
            },{
                fieldLabel:'重输密码',
                name:'rePassword',
                xtype:'textfield',
                inputType:'password',
                allowBlank:false,
                maxLength:16,
                maxLengthText:'密码的最大长度是16位字符',
                minLength:6,
                minLengthText:'密码的最小长度是6位字符',
                vtype:'repassword',
                initialPassField:{targetCmpId:'modify_password'}
            }]

        });
        this.items = [form];
        this.callParent(arguments);
    }

});