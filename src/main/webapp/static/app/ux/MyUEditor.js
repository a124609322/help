Ext.define('app.ux.MyUEditor', {
    extend: 'Ext.panel.Panel',
    layout:'form',
    alias: ['widget.myUeditor'],
    ueditorConfig: {},
    border:false,
    initComponent: function () {
        var me = this;
        var name = me.name?("name='"+me.name+"'"):"";
        me.html="<script type='text/plain' id='"+me.id+"_ueditor' "+name+"></script>";
        me.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        if (!me.ue) {
            me.ue = UE.getEditor(me.id+"_ueditor", Ext.apply(me.ueditorConfig, {
                initialFrameHeight: me.editorHeight || '200px',
                initialFrameWidth: me.editorWidth || '100%',
                //启用自动保存
                enableAutoSave: false,
                //自动保存间隔时间， 单位ms
                saveInterval: 0
            }));
            me.ue.ready(function () {
                me.UEditorIsReady = true;
            });

            //这块 组件的父容器关闭的时候 需要销毁编辑器 否则第二次渲染的时候会出问题 可根据具体布局调整
            var win = me.up('window');
            if (win && win.closeAction == "hide") {
                win.on('beforehide', function () {
                    me.onDestroy();
                });
            } else {
                var panel = me.up('panel');
                if (panel && panel.closeAction == "hide") {
                    panel.on('beforehide', function () {
                        me.onDestroy();
                    });
                }
            }
        } else {
            me.ue.setContent(me.getValue());
        }
    },
    setContent: function (value) {
        var me = this;
        UE.getEditor(me.id+"_ueditor").setContent(value);
    },
    getContent: function () {
        var me = this;
        return UE.getEditor(me.id+"_ueditor").getContent();
    },
    destroyUEditor: function () {
        var me = this;
        if (me.rendered) {
            try {
                me.ue.destroy();
                var dom = document.getElementById(me.id);
                if (dom) {
                    dom.parentNode.removeChild(dom);
                }
                me.ue = null;
            } catch (e) { }
        }
    },
    onDestroy: function () {
        var me = this;
        me.callParent();
        me.destroyUEditor();
    }
});