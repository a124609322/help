Ext.define("app.chuandu.region.Top",{
    extend:'Ext.toolbar.Toolbar',
    alias:'widget.maintop',
    items:[{
        xtype:'label',
        bind:{
            text:'{title}'
        },
        style: {
            'font-weight':'bold'
        }
    },'->',{
        text:"",
        glyph : 0xf007
    },{
        xtype : 'label',
        bind:{
            text : '欢迎：{manager.nickname}'
        }
    },{
        text:"主页",
        glyph : 0xf015,
        handler :'onMainMenuClick'
    },{
        text:'注销',
        glyph : 0xf011,
        handler:'logout'

    },{
        text:'修改密码',
        glyph : 0xf06a,
        handler:'resetPassword'
}]
});