var ExtCommon = new function(){
    this.request = function(config){
        Ext.Ajax.request({
            url:config.url?config.url:'',
            method:config.method?config.method:'POST',
            params:config.params?config.params:'',
            async:config.async===false?false:true,
            success:function(response){
                var text = response.responseText;
                var result = Ext.decode(text,true);
                if(result.success == true){
                    config.success(result);
                }else{
                    Ext.Msg.show({
                        title:'错误',
                        message: result.msg?result.msg:'出错了，请重试',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            },
            failure:function(response){
                var text = response.responseText;
                var result = Ext.decode(text,true);
                Ext.Msg.show({
                    title:'错误',
                    message: result.msg?result.msg:'出错了，请重试',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    }
}