Ext.define('app.chuandu.module.waybill.SearchPanel',{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.waybillsearchpanel',
    requires:['app.ux.DateTime'],
    layout:'column',
        initComponent  : function(){
        this.items = [
            {
            xtype:'textfield',
            fieldLabel:'单号',
            labelWidth:50,
                id:'waybill_search_code',
                margin: '5 0 5 10',
        },{
            xtype:'textfield',
            fieldLabel:'批次号',
            labelWidth:50,
            id:'waybill_search_batchcode',
                margin: '5 0 5 10',
        },{
            xtype:'textfield',
            fieldLabel:'姓名',
            labelWidth:50,
            id:'waybill_search_name',
                margin: '5 0 5 10',
        },{
            xtype:'textfield',
            fieldLabel:'电话',
            labelWidth:50,
            id:'waybill_search_phone',
                margin: '5 0 5 10',
        },{
            xtype:'datetimefield',
            labelWidth :50,
            editable:false,
            fieldLabel: '时间',
            format: 'Y-m-d H:i:s ',
            id:'waybill_search_starttime',
                margin: '5 0 5 10',
        },{
            xtype:'label',
            text:'-',
                margin: '5 0 5 0',
        },{
            xtype:'datetimefield',
            editable:false,
            format: 'Y-m-d H:i:s ',
            id:'waybill_search_endtime',
                margin: '5 0 5 0',
        },{
            xtype:'textfield',
            labelWidth :60,
            fieldLabel: '转运单号',
            id:'waybill_search_expresscode',
            margin: '5 0 5 10'
        },{
            xtype:'textfield',
            labelWidth :50,
            fieldLabel: '寄件方',
            id:'waybill_search_sender',
            margin: '5 0 5 10'
        },{
            xtype:'textfield',
            labelWidth :50,
            fieldLabel: '寄件方',
            id:'waybill_search_sender',
            margin: '5 0 5 10'
        },{
                xtype      : 'fieldcontainer',
                fieldLabel : '是否问题单',
                defaultType: 'radiofield',
                labelWidth:70,
                margin: '5 0 5 10',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {
                        boxLabel  : '是',
                        value: '0',
                        id        : 'waybill_search_problem_true',
                        name:'problem',
                        margin: '0 5 0 5'
                    }, {
                        boxLabel  : '否',
                        value: 'l',
                        name:'problem',
                        id        : 'waybill_search_problem_false',
                        margin: '0 5 0 5'
                    }
                ]
            },{
                xtype:'button',
                text:'搜索',
                glyph: 0xf002,
                margin: '5 0 5 10',
                handler:'reloadGrid'
            },{
                xtype:'button',
                text:'重置',
                glyph: 0xf002,
                margin: '5 0 5 10',
                handler:'resetSearchGrid'
            }
        ]
        this.callParent();
    }
});