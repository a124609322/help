Ext.define("app.chuandu.model.Notice", {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'title', type: 'string'},
        {name: 'intro', type: 'string'},
        {name: 'pic', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'managerid', type: 'string'},
        {name: 'managerid', type: 'string'},
        {name: 'isRoll', type: 'int'},
        {name: 'types', type: 'string'},
        {name: 'top', type: 'string'},
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
        {nama:'manager'}
    ]
});