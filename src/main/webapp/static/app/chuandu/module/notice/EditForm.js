Ext.define("app.chuandu.module.notice.EditForm", {
    extend: 'Ext.form.Panel',
    alias: 'widget.editnoticeform',
    border: false,
    fileUpload: true,
    requires: ["app.ux.MyUEditor"],
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'fieldset',
            border: false,
            margin: '10 0 0 0',
            items: [{
                fieldLabel: '公告标题',
                name: 'title',
                xtype: 'textfield',
                width: 900,
                allowBlank: false,
                maxLength:20,
                maxLengthText:'最大长度是20位字符',
                minLength:2,
                minLengthText:'最小长度是2位字符'
            }, {
                fieldLabel: '公告类型',
                name: 'types',
                xtype: 'combobox',
                editable:false,
                width: 900,
                queryMode: 'local',
                displayField: 'text',
                valueField: 'value',
                allowBlank:false,
                store: Ext.create("Ext.data.Store", {
                    fields: ['value', 'text'],
                    data: [
                        {"value": "abouttaixing", "text": "关于泰兴"},
                        {"value": "contactus", "text": "联系我们"},
                        {"value": "embargo", "text": "禁运物品"},
                        {"value": "settlement", "text": "理赔标准"},
                        {"value": "other", "text": "其他"}
                    ]
                })
            }, {
                fieldLabel: '公告简介',
                name: 'intro',
                width: 900,
                xtype: 'textareafield',
                allowBlank: true,
                maxLength:250,
                maxLengthText:'最大长度是250位字符',
                minLength:2,
                minLengthText:'最小长度是2位字符'
            }
                ,
                {
                    xtype: 'label',
                    text: '公告内容:'
                }]
        },
            {
                id: 'itemEditContent',
                xtype: 'myUeditor',
                name: 'content',
                editorWidth: 795,
                editorHeight: 450,
                margin: '-20 0 0 110'
            }
        ]
        ;
        this.callParent(arguments);
    }
})
;
