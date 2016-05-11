Ext.define("app.chuandu.module.manager.EditFieldSet",{
    extend : 'Ext.form.FieldSet',
    alias:'widget.managerformfieldset',
    defaultType:'textfield',
    defaults:{},
    layout:'anchor',
    title:'信息',
    config:{},
    initComponent:function(){
        this.items = [{
            fieldLabel:'登录名',
            name:'loginname',
            xtype:'textfield',
            allowBlank:false,
            maxLength:16,
            maxLengthText:'登录名的最大长度是16位字符',
            minLength:5,
            minLengthText:'登录名的最小长度是5位字符',
            vtype:'loginname'
        },{
            fieldLabel:'昵称',
            name:'nickname',
            xtype:'textfield',
            allowBlank:false,
            maxLength:16,
            maxLengthText:'昵称的最大长度是16位字符',
            minLength:2,
            minLengthText:'昵称的最小长度是2位字符'
        },{
            xtype:'combo',
            fieldLabel:'角色',
            name:'roleid',
            hiddenName:'roleid',
            mode:'remote',
            displayField:'rolename',
            valueField:'id',
            triggerAction:'all',
            editable:false,
            allowBlank:false,
            emptyText:'请选择',
            store : Ext.create('Ext.data.JsonStore',{
                proxy: {
                    type: 'ajax',
                    url: '/admin/role/listAll.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'roleList'
                    }
                },
                fields:['rolename','id']
            })
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
        }];
        this.callParent(arguments);
    }
});