Ext.apply(Ext.form.VTypes,
    {
        repassword: function(val, field)
        {
            if (field.initialPassField)
            {
                var pwd = Ext.getCmp(field.initialPassField.targetCmpId);
                return (val == pwd.getValue());
            }
            return true;
        },
        repasswordText: '两次输入的密码不一致！',

        chinese:function(val,field)
        {
            var reg = /^[\u4e00-\u9fa5]+$/i;
            if(!reg.test(val))
            {
                return false;
            }
            return true;
        },
        chineseText:'请输入中文',

        age:function(val,field)
        {
            try
            {
                if(parseInt(val) >= 18 && parseInt(val) <= 100)
                    return true;
                return false;
            }
            catch(err)
            {
                return false;
            }
        },
        ageText:'年龄输入有误',

        alphanum:function(val,field)
        {
            try
            {
                if(!/\W/.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        alphanumText:'请输入英文字母或是数字,其它字符是不允许的.',

        urlCheck:function(val,field)
        {
            try
            {
                if(/^(http|https|ftp):\\\\(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\\?/i.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        urlCheckText:'请输入有效的URL地址.',

        datecn:function(val,field)
        {
            try
            {
                var regex = /^(\d{4})-(\d{2})-(\d{2})$/;
                if(!regex.test(val)) return false;
                var d = new Date(val.replace(regex, '$1/$2/$3'));
                return (parseInt(RegExp.$2, 10) == (1+d.getMonth())) && (parseInt(RegExp.$3, 10) == d.getDate())&&(parseInt(RegExp.$1, 10) == d.getFullYear());
            }
            catch(e)
            {
                return false;
            }
        },
        datecnText:'请使用这样的日期格式: yyyy-mm-dd. 例如:2008-06-20.',

        integer:function(val,field)
        {
            try
            {
                if(/^[-+]?[\d]+$/.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        integerText:'请输入正确的整数',

        ip:function(val,field)
        {
            try
            {
                if((/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val)))
                return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        ipText:'请输入正确的IP地址',

        phone:function(val,field)
        {
            try
            {
                if(/^((0[1-9]{3})?(0[12][0-9])?[-])?\d{6,8}$/.test(val))
                return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        phoneText:'请输入正确的电话号码,如:0920-29392929',

        batchCode:function(val,field)
        {
            try
            {
                if(/^T\d+$/.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        batchCodeText:'请输入正确的批次号,如:T0001',

        price:function(val,field)
        {
            try
            {
                if(/^\d*$/.test(val)){
                    return true;
                }
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        priceText:'只能输入存数字！',

        mobilephone:function(val,field)
        {
            try
            {
                if(/(^1\d{10}$)/.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        mobilephoneText:'请输入正确的手机号码',

        alpha:function(val,field)
        {
            try
            {
                if( /^[a-zA-Z]+$/.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        alphaText:'请输入英文字母',

        loginname:function(val,field)
        {
            try
            {
                if( /^[-_.a-zA-Z0-9]+$/.test(val))
                    return true;
                return false;
            }
            catch(e)
            {
                return false;
            }
        },
        loginnameText:'登录名只能使用字母数字下划线！'
    });
/*Ext.form.VTypes["hostnameVal1"] = /^[a-zA-Z][-.a-zA-Z0-9]{0,254}$/;
Ext.form.VTypes["hostnameVal2"] = /^[a-zA-Z]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9]){0,1}([.][a-zA-Z]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9]){0,1}){0,}$/;
Ext.form.VTypes["ipVal"] = /^([1-9][0-9]{0,1}|1[013-9][0-9]|12[0-689]|2[01][0-9]|22[0-3])([.]([1-9]{0,1}[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2}[.]([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-4])$/;
Ext.form.VTypes["netmaskVal"] = /^(128|192|224|24[08]|25[245].0.0.0)|(255.(0|128|192|224|24[08]|25[245]).0.0)|(255.255.(0|128|192|224|24[08]|25[245]).0)|(255.255.255.(0|128|192|224|24[08]|252))$/;
Ext.form.VTypes["portVal"] = /^(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
Ext.form.VTypes["multicastVal"] = /^((22[5-9]|23[0-9])([.](0|[1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])){3})|(224[.]([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])([.](0|[1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])){2})|(224[.]0[.]([1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])([.](0|[1-9][0-9]{0,1}|1[0-9]{2}|2[0-4][0-9]|25[0-5])))$/;
Ext.form.VTypes["usernameVal"] = /^[a-zA-Z][-_.a-zA-Z0-9]{0,30}$/;
Ext.form.VTypes["passwordVal1"] = /^.{6,31}$/;
Ext.form.VTypes["passwordVal2"] = /[^a-zA-Z].*[^a-zA-Z]/;
Ext.form.VTypes["hostname"]=function(v){
    if(!Ext.form.VTypes["hostnameVal1"].test(v)){
        Ext.form.VTypes["hostnameText"]="Must begin with a letter and not exceed 255 characters"
        return false;
    }
    Ext.form.VTypes["hostnameText"]="L[.L][.L][.L][...] where L begins with a letter, ends with a letter or number, and does not exceed 63 characters";
    return Ext.form.VTypes["hostnameVal2"].test(v);
}
Ext.form.VTypes["hostnameText"]="Invalid Hostname"
Ext.form.VTypes["hostnameMask"]=/[-.a-zA-Z0-9]/;
Ext.form.VTypes["ip"]=function(v){
    return Ext.form.VTypes["ipVal"].test(v);
}
Ext.form.VTypes["ipText"]="1.0.0.1 - 223.255.255.254 excluding 127.x.x.x"
Ext.form.VTypes["ipMask"]=/[.0-9]/;
Ext.form.VTypes["netmask"]=function(v){
    return Ext.form.VTypes["netmaskVal"].test(v);
}
Ext.form.VTypes["netmaskText"]="128.0.0.0 - 255.255.255.252"
Ext.form.VTypes["netmaskMask"]=/[.0-9]/;
Ext.form.VTypes["port"]=function(v){
    return Ext.form.VTypes["portVal"].test(v);
}
Ext.form.VTypes["portText"]="0 - 65535"
Ext.form.VTypes["portMask"]=/[0-9]/;
Ext.form.VTypes["multicast"]=function(v){
    return Ext.form.VTypes["multicastVal"].test(v);
}
Ext.form.VTypes["multicastText"]="224.0.1.0 - 239.255.255.255";
Ext.form.VTypes["multicastMask"]=/[.0-9]/;
Ext.form.VTypes["username"]=function(v){
    return Ext.form.VTypes["usernameVal"].test(v);
}
Ext.form.VTypes["usernameText"]="登录名只能使用字母数字下划线！";
Ext.form.VTypes["usernameMask"]=/[-_.a-zA-Z0-9]/;
Ext.form.VTypes["password"]=function(v){
    if(!Ext.form.VTypes["passwordVal1"].test(v)){
        Ext.form.VTypes["passwordText"]="Password length must be 6 to 31 characters long";
        return false;
    }
    Ext.form.VTypes["passwordText"]="Password must include atleast 2 numbers or symbols";
    return Ext.form.VTypes["passwordVal2"].test(v);
}
Ext.form.VTypes["passwordText"]="Invalid Password"
Ext.form.VTypes["passwordMask"]=/./;*/
