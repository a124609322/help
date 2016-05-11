Ext.define("app.chuandu.module.role.ModifyForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.modifyroleform',
    uses:['app.chuandu.module.role.ModifyFieldSet'],
    border:false,
    fileUpload:true,
    trackResetOnLoad:true,
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'modifyroleformfieldset'
        }];
        this.callParent(arguments);
    }
});