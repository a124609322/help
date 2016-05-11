var CommonMsg = new function(){
    var me = this;
    this.error = function(config){
        if(!config){
            config = {};
        }
        Ext.Msg.show({
            title:config.title?config.title:'错误',
            message: config.msg?config.msg:'出错了，请重试',
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR,
            fn:function(){
                if(config.fn){
                    config.fn();
                }
            }
        });
    },
        this.info = function(config){
            if(!config){
                config = {};
            }
            Ext.Msg.show({
                title:config.title?config.title:'信息',
                message: config.msg?config.msg:'提示消息',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO,
                fn:function(){
                    if(config.fn){
                        config.fn();
                    }
                }
            });
        },
        this.question = function(config){
            if(!config){
                config = {};
            }
            Ext.Msg.show({
                title:config.title?config.title:'提示',
                message: config.msg?config.msg:'提示消息',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn:function(btn){
                    if(btn == 'yes' && config.fn){
                        config.fn();
                    }
                }
            });
        },
        this.warinning = function(config){
            if(!config){
                config = {};
            }
            Ext.Msg.show({
                title:config.title?config.title:'警告',
                message: config.msg?config.msg:'提示消息',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        },
        this.ask = function(config){
            if(!config){
                config = {};
            }
            Ext.Msg.show({
                title:config.title?config.title:'警告',
                message: config.msg?config.msg:'提示消息',
                buttons: Ext.Msg.YESNOCANCEL,
                icon: Ext.Msg.WARNING,
                fn:function(btn){
                    if(btn == 'yes' && config.fnYES){
                        config.fnYES();
                    }else if(btn == 'no' && config.fnNO){
                        config.fnNO();
                    }
                }
            });
        }

}
