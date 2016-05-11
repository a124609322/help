var focusBanner = function () {
    var $focusBanner = $(".focus-banner"),
        $bannerList = $(".focus-banner-list li"),
        $focusHandle = $(".focus-handle"),
        $bannerImg = $(".focus-banner-img"),
        $nextBnt = $(".next-img"),
        $prevBnt = $(".prev-img"),
        $focusBubble = $(".focus-bubble"),
        bannerLength = $bannerList.length,
        _index = 0,
        _timer = "";

    for (var i = 0; i < bannerLength; i++) {
        $bannerList.eq(i).css("zIndex", bannerLength - i);
        $focusBubble.append("<li></li>");
    }
    $focusBubble.find("li").eq(0).addClass("current");
    var bubbleLength = $focusBubble.find("li").length;
    $focusBubble.css({
        "width": bubbleLength * 22,
        "marginLeft": -bubbleLength * 11
    });//初始化

    $focusBubble.on("click", "li", function () {
        $(this).addClass("current").siblings().removeClass("current");
        _index = $(this).index();
        changeImg(_index);
    });//点击轮换

    $nextBnt.on("click", function () {
        _index++
        if (_index > bannerLength - 1) {
            _index = 0;
        }
        changeImg(_index);
    });//下一张

    $prevBnt.on("click", function () {
        _index--
        if (_index < 0) {
            _index = bannerLength - 1;
        }
        changeImg(_index);
    });//上一张

    function changeImg(_index) {
        $bannerList.eq(_index).fadeIn(250);
        $bannerList.eq(_index).siblings().fadeOut(200);
        $focusBubble.find("li").removeClass("current");
        $focusBubble.find("li").eq(_index).addClass("current");
        clearInterval(_timer);
        _timer = setInterval(function () {
            $nextBnt.click()
        }, 5000)
    }//切换主函数
    _timer = setInterval(function () {
        $nextBnt.click()
    }, 5000)
}


var iniBanner = function () {
    $.ajax({
        url: "/banner/list.json",
        cache: false,
        type: "GET",
        success: function (html) {
            var bannerList = html.bannerList;
            var bannerHtml = "";
            for (var i in bannerList) {
                bannerHtml +=
                    '<li>' +
                    '<a href="'+bannerList[i].src+'"  class="focus-banner-img" target="_blank">' +
                    '<img src="' + '/tx/' + bannerList[i].url + '" width="1920" height="548"/>' +
                    '</a>' +
                    '</li>'
            }
            $(".focus-banner-list").html(bannerHtml);
            focusBanner();
        }
    });
}

var iniLink = function () {
    $.ajax({
        url: "/link/list.json",
        cache: false,
        type: "GET",
        success: function (html) {
            var linkList = html.linkList;
            var linkHtml = "";
            for (var i in linkList) {
                linkHtml +=
                    '<li>' +
                    '<a href="' + linkList[i].link + '" target="_blank">' +
                    '<img src="/tx/' + linkList[i].logo + '" alt="" width="103" height="109" />' +
                    '<p>' + linkList[i].linkname + '</p>' +
                    '</a>' +
                    '</li>'
            }
            $(".jiekou").find("ul").html(linkHtml);
        }
    });
}



$(function () {
    iniBanner();
    iniLink();
    $(".side ul li").hover(function () {
        $(this).find(".sidebox").stop().animate({"width": "140px"}, 200).css({
            "opacity": "1",
            "filter": "Alpha(opacity=100)",
            "background": "#ae1c1c"
        })
    }, function () {
        $(this).find(".sidebox").stop().animate({"width": "54px"}, 200).css({
            "opacity": "0.8",
            "filter": "Alpha(opacity=80)",
            "background": "rgba(219, 219, 219, 0.36)"
        })
    });
});