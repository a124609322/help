Ext.define("app.chuandu.model.Banner", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'src', type: 'string'},
        {name: 'managerid', type: 'string'},
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