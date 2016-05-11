var hoverAction = function(){
    $("#List").find("li").hover(function(){
        var _index=$(this).index();
        $(".picArea").hide().eq(_index).show();
        $("#List .icon").hide().eq(_index).show();
    });
}

var iniMessage = function(){
    $.ajax({
        url: "/notice/listAll.json",
        cache: false,
        type: "GET",
        success: function (html) {
            var noticeList = html.noticeList;
            var noticepicArea = "";
            var noticeNone = "";
            for (var i = 0;i< noticeList.length;i++) {
                var current = '';
                if(i==0){
                    current = 'style="display: block"';
                }else{
                    current = 'style="display: none;"';
                }
                noticepicArea += '<div class="picArea one" '+current+'>'+
                                        noticeList[i].intro+
                                        '<div class="button"><a href="/notice/view?id='+noticeList[i].id+'"><img src="image/xq.jpg" alt="" width="118" height="33"/></a></div>'+
                                 '</div>';
                noticeNone += '<li class="None">'+
                    '<span class="icon" '+current+'></span>'+
                    '<p class="listName" title="'+noticeList[i].title+'">'+noticeList[i].title+'</p>'+
                    '</li>'
            }
            $(".p_left").html(noticepicArea);
            $("#List").html(noticeNone);
            hoverAction();
        }
    });
}

$(function(){
    iniMessage();
});