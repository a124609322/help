Ext.define("app.chuandu.model.Waybill", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'expresscode', type: 'string'},
        {name: 'expresscompany', type: 'string'},
        {name: 'batchcode', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'phone', type: 'string'},
        {name: 'address', type: 'string'},
        {name: 'goods1', type: 'string'},
        {name: 'amount1', type: 'int'},
        {name: 'price1', type: 'auto'},
        {name: 'goods2', type: 'string'},
        {name: 'amount2', type: 'int'},
        {name: 'price2', type: 'auto'},
        {name: 'goods3', type: 'string'},
        {name: 'amount3', type: 'int'},
        {name: 'price3', type: 'auto'},
        {name: 'worth', type: 'auto'},
        {name: 'weight', type: 'auto'},
        {name: 'insurance', type: 'auto'},
        {name: 'sender', type: 'string'},
        {name: 'managerid', type: 'string'},
        {name: 'problem', type: 'int'},
        {name: 'problemreason', type: 'string'},
        {name: 'channel', type: 'string'},
        {name: 'isautoupdate', type: 'int'},
        {name: 'robotid', type: 'string'},
        {name: 'isEnd', type: 'int'},
        {name: 'endtime', type: 'string', convert: function (value) {
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
        }
    ]
});