/**
 * Created by Administrator on 2016/11/2.
 */
/*  用户名  */
sync();
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




/******  banner轮播  ******/
var $index = 0;
var timer = null;
$("#banner .scrollimg").children("img").eq($index).siblings().css("display","none");
auto();
$("#banner .bt").hover(function(){
        clearInterval(timer);
        $("#banner .bt span").mouseover(
            function(){
                clearInterval(timer);
                $index = $(this).index();
                select();
            }
        );
    },
    function(){
        auto();
    });
$("#banner a.pre").mousedown(function(){
    $index--;
    if($index == -1){
        $index =7;
    }
    select();
    clearInterval(timer);
    auto();
});
$("#banner a.next").mousedown(function(){
    $index++;
    if($index == 8){
        $index =0;
    }
    select() ;
    clearInterval(timer);
    auto();
});
function auto(){
    clearInterval(timer);
    timer = setInterval(function(){
        $index++;
        if($index ==8){
            $index = 0;
        }
        select();
    },3200);
}
function select(){
    $("#banner .scrollimg").children("img").eq($index).stop(true,false).fadeIn(600).siblings().stop(true,false).fadeOut(600);
    $("#banner .bt span").eq($index).addClass("hover").siblings().removeAttr("class","hover");
}
/*  logo——brand轮播  */
var $logoIndex = 0;
$("#logo_brand ul").eq($logoIndex).siblings().css("display","none");
$("#logo_brand a.go_pre").click(function(){
    $logoIndex--;
    if($logoIndex ==-1){
        $logoIndex=2;
    }
    $("#logo_brand ul").eq($logoIndex).fadeIn(1000).siblings().fadeOut(1000);
});
$("#logo_brand a.go_next").click(function(){
    $logoIndex++;
    if($logoIndex ==3){
        $logoIndex=0;
    }
    $("#logo_brand ul").eq($logoIndex).fadeIn(1000).siblings().fadeOut(1000);
});
/*  sub_banner轮播  */
var clearTime = null;
var $carIndex = 0;
var $qiandex = 0;
$("#sub_banner .img_wrap").eq($carIndex).css("left",0);
autoPlay();
$("#sub_banner .move_next").click(function() {
    $carIndex++;
    if ($carIndex > 2) {
        $carIndex = 0;
    }
    scrollPlay();
    $qiandex = $carIndex;
    clearInterval(clearTime);
    autoPlay();
});
$("#sub_banner .move_prev").click(function() {
    $carIndex--;
    if ($carIndex < 0) {
        $carIndex = 2;
    }
    scrollPlay();
    $qiandex = $carIndex;
    clearInterval(clearTime);
    autoPlay();
});
function autoPlay() {
    clearTime = setInterval(function() {
        $carIndex++;
        if ($carIndex > 2) {
            $carIndex = 0;
        }
        scrollPlay();
        $qiandex = $carIndex;
    }, 4000);
}
function scrollPlay() {
    if ($carIndex == 0 && $qiandex == 2) {
        $("#sub_banner .img_wrap").eq($qiandex).stop(true, true).animate({
            "left": "-980px"
        });
        $("#sub_banner .img_wrap").eq($carIndex).css("left", "980px").stop(true, true).animate({
            "left": "0"
        });
    } else if ($carIndex == 2 && $qiandex == 0) {
        $("#sub_banner .img_wrap").eq($qiandex).stop(true, true).animate({
            "left": "980px"
        });
        $("#sub_banner .img_wrap").eq($carIndex).css("left", "-980px").stop(true, true).animate({
            "left": "0"
        });
    } else if ($carIndex > $qiandex) { //左移
        $("#sub_banner .img_wrap").eq($qiandex).stop(true, true).animate({
            "left": "-980px"
        });
        $("#sub_banner .img_wrap").eq($carIndex).css("left","980px").stop(true, true).animate({
            "left": "0"
        });
    } else if ($carIndex < $qiandex) { //右移
        $("#sub_banner .img_wrap").eq($qiandex).stop(true, true).animate({
            "left": "980px"
        });
        $("#sub_banner .img_wrap").eq($carIndex).css("left", "-980px").stop(true, true).animate({
            "left": "0"
        });
    }
}
/*  手风琴效果  */
$("#new_brand a.accordion").hover(function(){
    $(this).stop().animate({width:"645px"},400).siblings().stop().animate({width:"120px"},400);
});

/******  ajax自动加载下一页  ******/
var page = 1;
create(24);
function create(num){
    /!*  动态生成排布的div  ajax获取*!/
    for( var i = 0;i < num;i++){
        var div = document.createElement("div");
        var a1 = document.createElement("a");
        var a2 = document.createElement("a");
        var img = document.createElement("img");
        $(img).addClass("img_top");
        $(div).css({width:"280px",height:"450px",float:"left","margin-left":"10px","position":"relative"}).addClass("ajax_arrival"+page);
        $(a1).css({"display":"block","text-align":"center","font-size":"12px",color:"#000000","width":"100%","height":"40px","line-height":"40px"}).addClass("arrival_name");
        $(a2).css({"display":"block","text-align":"center","font-size":"12px",color:"#000000","width":"100%","height":"40px","line-height":"40px"}).addClass("arrival_price");
        $(div).append(img).append(a1).append(a2);
        $("#new_arrivals .new_main").append(div);

    }
    $(".ajax_arrival"+page+"").each(function(index) {
        if (index % 4 == 0) {
            $(this).css({"margin-left": 0})
        }
    });
}
//ajax获取data
$.ajax({
    //路径一定要相对于调用js的页面（操作页面） .load里的路径也是   ！！！
    "url":"jsondata/arrivals"+page+".json",
    "dataType":"json",
    "success":function(data){
        console.log(data);
        for(var i = 0;i< data.length;i++){
            $(".new_main .ajax_arrival"+page+"").eq(i).children().first().attr("src",data[i].src);
            $(".new_main .ajax_arrival"+page+"").eq(i).children("a[class='arrival_name']").html(data[i].name).attr({"href":"http://kkstrive.com","target":"_blank"});
            $(".new_main .ajax_arrival"+page+"").eq(i).children("a[class='arrival_price']").html(data[i].price).attr({"href":"http://kkstrive.com","target":"_blank"});
        }
    },
    error:function(){
        alert("ajax加载失败");
    }
});
//jquery scroll
/*    hover 引出二级菜单    */
$("#stairs li").not(".last_storey").hover(function() {
    $(this).addClass("s_hover");
    $(this).children("h5").css({display:"block",opacity:0,left:"200%"}).animate({left:"120%",opacity:1},600);
}, function() {
    $(this).removeClass("s_hover");
    //有点问题？？？
    /*$(this).children("h5").stop().animate({left:"200%",opacity:0},300,function(){
        $(this).css({display:"none"});
    });*/
    $(this).children("h5").css({left:"200%",display:"none"});
});
/*  点击跳到相应楼层  */
var mark = 1;
$("#stairs li").not(".last_storey").mousedown(function(){
    mark = 2;
    var $storeyIndex = $(this).index();
    var $itsTop = $(".storey").eq($storeyIndex).offset().top;
    $("body,html").animate(
        {
            scrollTop: $itsTop
        }, 600,"easeOutExpo", function() {
        mark = 1;
    });
});
/*  scroll事件  */
$(document).scroll(function(){      //window document都可以
    if(mark == 1){
        var $top = $(this).scrollTop();
        $("title").text($top);
        //console.log($("#fashion").offset().top);
        if ($top > $("#fashion").offset().top&&$top<=12100) {    //大于fashion的offsetTop时出现
            $("#stairs").fadeIn(600); //淡入 导航慢慢显示出来
        }else{
            $("#stairs").fadeOut(300); //淡出 导航慢慢消失
        }
        //ajax 自动加载下一页   if一定要和上面的if平行
        if($top >= 8300){
            page++;
            $.ajax({
                "url":"jsondata/arrivals"+page+".json",
                "dataType":"json",
                "success":function(data){
                    create(28);
                    for(var i = 0;i< data.length;i++){
                        $(".new_main .ajax_arrival"+page+"").eq(i).children().first().attr("src",data[i].src);
                        $(".new_main .ajax_arrival"+page+"").eq(i).children("a[class='arrival_name']").html(data[i].name).attr({"href":"http://kkstrive.com","target":"_blank"});
                        $(".new_main .ajax_arrival"+page+"").eq(i).children("a[class='arrival_price']").html(data[i].price).attr({"href":"http://kkstrive.com","target":"_blank"});
                    }
                }
            });
        }
        var myStairs = $(".storey");
        $(".storey").each(function(index){
           var $height = myStairs.eq(index).offset().top+$(this).height()/2;
             if ($top < $height) {
             $("#stairs li").not(".last_storey").removeClass("s_hover");
             $("#stairs li").not(".last_storey").eq(index).addClass("s_hover");
             return false;
             }
        });
    }

});

/*  back top*/
$("#stairs li.last_storey").click(function() {
    $("body,html").stop(true,false).animate({
        scrollTop: 0
    }, 600,"easeOutExpo",function() {
        mark = 1;
    });
});

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