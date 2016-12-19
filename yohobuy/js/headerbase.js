/**
 * Created by Administrator on 2016/11/10.
 */

/******  sorts group  ******/
$("#tool .group").mouseenter(function(){
    $(this).css({"background-color":"#dcdcdc"});
    $(this).children().last().css("display","block");
    $("#tool li").hover(function(){
        $(this).children().css("color","#000000");
        $("#tool li a").hover(function(){
            $(this).text($(this).attr("name"));
        },function(){
            $(this).text($(this).attr("content"));
        });
    },function(){
        $(this).children().css("color","#9196a0");
    });
});
$("#tool .group").mouseleave(function(){
    $(this).css({"background-color":"#f4f4f4"});
    $(this).children().last().css("display","none");
});


/******  二维码  ******/
$(".phone_yoho").mouseenter(function(){
    $(this).css("background-color","#dcdcdc");
    $(this).children().last().css("display","block");
});
$(".phone_yoho").mouseleave(function(){
        $(this).css("background-color","#f4f4f4");
        $(this).children().last().css("display","none");
    }
);
/*  购物车  */
$("#head .go_cart").hover(function(){
    $(this).css("cursor","pointer").children().last().css("display","block");
},function(){
    $(this).children().last().css("display","none");
});
/******  二级导航  ******/
$("#nav li.has_hover").hover(function(){
    //var $liIndex = $(this).index()-2;
    //alert($liIndex);
    $(this).children(".subnav_main").css("display","block");
},function () {
    $(this).children(".subnav_main").css("display","none");
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
            console.log(getCookie);
            $.each(getCookie,function(key,value){
                if(key != "index"){
                    arrKey.push(key);
                    arrValue.push(value);
                }
            });
            console.log(arrKey,arrValue);
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
//console.log($.cookie("uName"));

/*  mini 购物车  */
var list_num = 0;
var itemUrl = "../../Product/GetProductById_get";
//console.log($("#user_name").text());  ???????
$.ajax(itemUrl,{
    dataType:"jsonp",
    data:{
        id:"kkstrive",
        type:"typeCart"
    },
    success:function(itemData){
        console.log(itemData);
        var arrData = JSON.parse(itemData.Data);
        var oData = {
            Data:arrData
        };
        var cartHtml = template("mini_cart_list",oData);
        $(".cart_top").html(cartHtml);
        list_num = arrData.length;
        console.log(list_num)
        pdtNum();
    },
    complete:function(){
        // cartGo();
    }
});
/*  购物车数量  */
function pdtNum(){
    $(".cart_num").text(list_num);
}