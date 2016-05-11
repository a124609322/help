Ext.define("app.chuandu.module.manager.ModifyForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.modifymanagerform',
    uses:['app.chuandu.module.manager.ModifyFieldSet'],
    border:false,
    fileUpload:true,
    trackResetOnLoad:true,
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'modifymanagerformfieldset'
        }];
        this.callParent(arguments);
    }
});