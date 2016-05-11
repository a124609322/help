$(function(){
    $(" .qq-zixun").mouseover(function(){

        $(this).stop();
        $(this).css({background:"#C9112C"},500);
        $(this).animate({width:"205px",height:"52px"},500);
    });
    $(" .qq-zixun").mouseleave(function(){
        $(this).stop();
        $(this).css({background:"#d5d5d5"},500);
        $(this).animate({width:"70px",height:"52px"},500);
    });
    $(".erweima").hover(function(){
        $(".big-erwei").show();
    },function(){
        $(".big-erwei").hide();
    });
});