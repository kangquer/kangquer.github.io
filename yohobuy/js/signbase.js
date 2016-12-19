/**
 * Created by Administrator on 2016/11/8.
 */
$("#nav .to_bot").hover(function(){
    $(this).css({"background-color":"#eaeceb","background-image":"url(../img/girl_index/to_top.png)"});
    $(this).children().last().slideDown("fast");
},function(){
    $(this).css({"background-color":"#ffffff","background-image":"url(../img/girl_index/to_bot.png)"});
    $(this).children().last().slideUp("fast");
});
/*  用户名  */
sync();
/*  登陆后同步用户名  */
function sync(){
    if($.cookie("flag")){
        if($.cookie("uName")){
            var getCookie = JSON.parse($.cookie("uName"));
            var arrKey = [];
            var arrValue = [];
            //console.log(getCookie);
            $.each(getCookie,function(key,value){
                if(key != "index"){
                    arrKey.push(key);
                    arrValue.push(value);
                }
            });
            //console.log(arrKey,arrValue);
            var maxIndex = 0;
            //选出最大值得下标
            for(var i = 1;i < arrValue.length;i++){
                if(arrValue[i]>arrValue[maxIndex]){
                    maxIndex = i;
                }
            }
            var $userName = arrKey[maxIndex];
            //console.log($userName);
            $(".sign_box").children().first().css("display","none").next().css({"display":"block"}).children("a").css({"color":"#ff88ae"}).text($userName);
        }else{
            $(".sign_box").children().last().css("display","none").prev().css({"display":"block"});
        }
    }
}
/*  退出登录  */
$(".quit").mousedown(function(){
    $.cookie("flag","true",{expires:-1,path:"/"});
    window.location.reload();
});