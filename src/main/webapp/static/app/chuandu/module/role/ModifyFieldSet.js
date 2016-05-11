Ext.define("app.chuandu.module.role.ModifyFieldSet",{
    extend : 'Ext.form.FieldSet',
    alias:'widget.modifyroleformfieldset',
    defaultType:'textfield',
    layout:'anchor',
    title:'信息',
    initComponent:function(){

        this.items = [{
            name:'id',
            xtype:'textfield',
            hidden:true
        },{
            fieldLabel:'角色名称',
            name:'rolename',
            xtype:'textfield',
            allowBlank:false,
            maxLength:16,
            maxLengthText:'角色名称的最大长度是16位字符',
            minLength:2,
            minLengthText:'角色名称的最小长度是2位字符'
        },Ext.create('Ext.tree.Panel', {
            width: 280,
            height: 250,
            rootVisible: false,
            viewConfig:{
                onCheckboxChange: function(e, t) {
                    var item = e.getTarget(this.getItemSelector(), this.getTargetEl()), record;
                    if (item) {
                        record = this.getRecord(item);
                        var check = !record.get('checked');
                        record.set('checked', check);
                        if (check) {
                            record.bubble(function(parentNode) {
                                parentNode.set('checked', true);
                            });
                            record.cascadeBy(function(node) {
                                node.set('checked', true);
                            });
                            record.expand();
                            record.expandChildren();
                        } else {
                            record.collapse();
                            record.collapseChildren();
                            record.cascadeBy(function(node) {
                                node.set('checked', false);
                            });
                            record.bubble(function(parentNode) {
                                var childHasChecked=false;
                                var childNodes = parentNode.childNodes;
                                if(childNodes || childNodes.length>0){
                                    for(var i=0;i<childNodes.length;i++){
                                        if(childNodes[i].data.checked){
                                            childHasChecked= true;
                                            break;
                                        }
                                    }
                                }
                                if(!childHasChecked){
                                    parentNode.set('checked', false);
                                }
                            });
                        }
                    }
                }
            }
        })];
        this.callParent(arguments);
    }
});