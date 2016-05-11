Ext.define("app.chuandu.model.Logistics", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'waybillid', type: 'string'},
        {name: 'info', type: 'string'},
        {name: 'managerid', type: 'string'},
        {name: 'logo', type: 'string'},
        {name: 'origin', type: 'string'},
        {name:'code',mapping:function(data){
            return data.waybill.code;
        }},
        {
            name: 'datetime', type: 'string', convert: function (value) {
            if (value) {
                var createTime = Ext.Date.format(new Date(value), "Y-m-d H:i:s");
                return createTime;
            }
            return "";
        }
        },
        {
            name: 'createdate', type: 'string', convert: function (value) {
            if (value) {
                var createTime = Ext.Date.format(new Date(value), "Y-m-d H:i:s");
                return createTime;
            }
            return "";
        }
        },
        {name: 'deleted', type: 'int'},
        {
            name: 'modifydate', type: 'string', convert: function (value) {
            if (value) {
                var createTime = Ext.Date.format(new Date(value), "Y-m-d H:i:s");
                return createTime;
            }
            return "";
        }
        },
        {name:'waybill'},
        {nama:'manager'}
    ]
});