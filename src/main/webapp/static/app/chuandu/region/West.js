/**
 * 折叠式(accordion)菜单，样式可以自己用css进行美化
 */

Ext.define('app.chuandu.region.West', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.mainmenuaccordion',
    title : '系统菜单',
    layout : {
        type : 'accordion',
        animate : true
    },
    glyph : 0xf0c9,
    initComponent : function() {
        this.items = [];
        var vm = this.up('app_main').getViewModel();
        var menus = vm.get('menuList');
        for (var i in menus) {
            var menugroup = menus[i];
            if(menugroup.parentid == null){
                var accpanel = {
                    menuAccordion : true,
                    xtype : 'panel',
                    title : menugroup.menuname,
                    bodyStyle : {
                        padding : '10px'
                    },
                    layout : 'fit',
                    dockedItems : [{
                        dock : 'left',
                        xtype : 'toolbar',
                        items : []
                    }],
                    glyph : parseInt(menugroup.pic)
                };
                for (var j in menus) {
                    var menumodule = menus[j];
                    if(menumodule.parentid == menugroup.id){
                        accpanel.dockedItems[0].items.push({
                            xtype : 'buttontransparent',
                            textAlign:'left',
                            text : menumodule.menuname,
                            glyph : parseInt(menumodule.pic),
                            handler : 'onMainMenuClick'
                        });
                    }
                }
                this.items.push(accpanel);
            }
        }
        this.callParent(arguments);
    },
})