Ext.define("app.chuandu.module.link.EditForm",{
    extend : 'Ext.form.Panel',
    alias : 'widget.editlinkform',
    uses:['app.chuandu.module.link.EditFieldSet'],
    border:false,
    fileUpload:true,
    initComponent : function(){
        var me = this;
        me.items = [{
            xtype:'linkformfieldset'
        }];
        this.callParent(arguments);
    }
});