Ext.define("app.chuandu.module.manager.EditForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.editmanagerform',
    uses:['app.chuandu.module.manager.EditFieldSet'],
    border:false,
    fileUpload:true,
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'managerformfieldset'
        }];
        this.callParent(arguments);
    }
});