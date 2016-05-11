/**
 * ϵͳ�����������,��һ��tabpanel,�����ж��tabҳ�棬�������ø���ģ�顣
 */
Ext.define('app.chuandu.region.Center', {
    extend : 'Ext.tab.Panel',
    uses:'app.chuandu.container.HomePage',
    alias : 'widget.maincenter',
    closeAction : 'destroy',
    autoDestroy : true,
    tabPosition : 'top',
    initComponent : function() {
        this.items = [{
            glyph : 0xf015,
            xtype : 'homepage',
            border : true,
            frame:true,
            closable:true,
            reorderable : false
        }]
        this.callParent();
    }

})