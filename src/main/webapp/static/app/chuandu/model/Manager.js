Ext.define("app.chuandu.model.Manager", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'nickname', type: 'string'},
        {name: 'loginname', type: 'string'},
        {name: 'roleid', type: 'string'},
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
        {name:'role'}
    ]
});