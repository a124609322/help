var noticeBanner = function (amount) {
    var currentCode = 1 ;
    var $bannerList = $(".focus-banner-lists li"),
        $nextBnt = $(".next-imgs"),
        $prevBnt = $(".prev-imgs"),
        $math = $("#math");
    bannerLength = $bannerList.length,
        _index = 0,
        _timer = "";

    $nextBnt.on("click", function () {
        _index++
        if (_index > bannerLength - 1) {
            _index = 0;
        }
        changeImg(_index);
        changeBntText(true);
    });//下一张

    $prevBnt.on("click", function () {
        _index--
        if (_index < 0) {
            _index = bannerLength - 1;
        }
        changeImg(_index);
        changeBntText(false);
    });//上一张

    function changeBntText(flag){
        if(flag){
            if(currentCode>=amount){
                currentCode = 1;
            }else{
                currentCode ++;
            }
        }else{
            if(currentCode<=1){
                currentCode = amount;
            }else{
                currentCode --;
            }
        }
        $math.html('0'+currentCode+'/0'+amount);
    }

    function changeImg(_index) {
        $bannerList.eq(_index).fadeIn(250);
        $bannerList.eq(_index).siblings().fadeOut(200);
        clearInterval(_timer);
        _timer = setInterval(function () {
            $nextBnt.click()
        }, 5000)
    }//切换主函数
    _timer = setInterval(function () {
        $nextBnt.click()
    }, 5000)
}
var iniNotice = function () {
    $.ajax({
        url: "/notice/list.json",
        cache: false,
        type: "GET",
        data: "limit=5&start=0&isRoll=1",
        success: function (html) {
            var noticeList = html.noticeList;
            var noticeHtml = "";
            for (var i = 0,j=noticeList.length;i< noticeList.length;i++,j--) {
                var current = '';
                if(i==0){
                    current = 'style="z-index:'+j+'; display: list-item;"';
                }else{
                    current = 'style="z-index:'+j+'; display: none;"';
                }
                noticeHtml += '<li '+current+'>' +
                    '<p>0'+(i+1)+' '+noticeList[i].title+' <a href="/notice/view?id='+noticeList[i].id+'">了解详情</a></p>' +
                    '</li>'
            }
            $(".focus-banner-lists").html(noticeHtml);
            $("#math").html('01/0'+noticeList.length);
            noticeBanner(noticeList.length);
        }
    });
}
$(function () {
    iniNotice();
});
