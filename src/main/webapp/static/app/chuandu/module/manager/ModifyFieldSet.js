Ext.define("app.chuandu.module.manager.ModifyFieldSet",{
    extend : 'Ext.form.FieldSet',
    alias:'widget.modifymanagerformfieldset',
    defaultType:'textfield',
    layout:'anchor',
    title:'信息',
    initComponent:function(){
        this.items = [{
            name:'id',
            xtype:'textfield',
            hidden:true
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
                autoLoad:true,
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
        }];
        this.callParent(arguments);
    }
});