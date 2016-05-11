Ext.define("app.chuandu.module.role.EditForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.editroleform',
    uses:['app.chuandu.module.role.EditFieldSet'],
    border:false,
    fileUpload:true,
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'roleformfieldset'
        }];
        this.callParent(arguments);
    }
});