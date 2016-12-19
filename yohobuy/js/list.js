/**
 * Created by Administrator on 2016/11/10.
 */
$("#load").load("../load/header.html");
$("#footer_wrap").load("../load/footer.html");
$("#back_top_wrap").load("../load/backtop.html");
//获取JSON
getData(0);
//定义全局变量，用于购物车
var that;
var flag = true;
$("#main_lt li .dropdown").mousedown(function(){
    //alert($(this).next().text());
    if(flag){
        $(this).next().next().slideDown("normal");
        $(this).html(" <svg class='icon_black' aria-hidden='true'><use xlink:href='#icon-sanjiao'></use> </svg>");
    }else{
        $(this).next().next().slideUp("normal");
        $(this).html(" <svg class='icon_black' aria-hidden='true'><use xlink:href='#icon-right'></use> </svg>");
    }
    flag = !flag;
});

/* 小小的正则匹配  */
$("#range input[type='text']").bind('input',function(){
    var priceREG = /^[1-9]\d*$/;
    var isMin = priceREG.test($(this).val());
    if(!isMin){
        $(this).val("");
    }
}).focus(function(){
    $(".btn").css("display","inline-block")
});
/*  more choice  */
$(".more_choice li").hover(
    function(){
        $(this).children("span").children("a").css("font-weight","600");
        $(this).children().last().css("display","block");
    },
    function(){
        $(this).children("span").children("a").css("font-weight","100");
        $(this).children().last().css("display","none");
    });
/*  ajax获取数据  */

/* 简写
$(function() {
    $.get("../jsondata/monster1.json", function (data) {
        //console.log(data);
        var html = template("monster", data);
        //console.log(html);
        $(".ajaxget").html(html);
    });
});*/

/* 因为ajax异步所以下面功能不会实现  要放在回调函数里去
 $(".list_box").click(function(){
 alert(1);
 });*/
function getData(page){
    var url ="../jsondata/monster1.json";
    var setting = {
        success:function(data){
            var html = template("monster", data[page]);
            $(".ajaxget").html(html);
        },
        //因为是ajax获取，所以事件只能在回调函数里写，不然会因为异步加载问题事件无效。
        complete:function () {
            //列表中直接加入购物车
            $(".list_box").hover(function () {
                $(this).children("h6").stop().animate({opacity:0.8},500);
            },function () {
                $(this).children("h6").stop().animate({opacity:0},300);
            });
            $(".to_cart").click(function () {
                that = this;
                //alert($(that).text());
                addToCart();
            });
            //商品在列表中对应详情页
            $(".pdt_img").click(function(){
                var dataId = $(this).attr("data_id");
                $(this).attr("href","item.html?"+dataId);
            });
        }
    };
    $.ajax(url,setting);
}

/******  分页加载  ******/
//单页
$("#nextpage li[class*='certain']").click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
    var $pageIndex = $(this).index();
    getData($pageIndex);
});
//下一页
$("#nextpage li").last().click(function(){
    var $nextIndex = $("#nextpage li[class*='selected']").index()+1;
    $("#nextpage li[class*='certain']").eq($nextIndex).addClass("selected").siblings().removeClass("selected");
    getData($nextIndex);
});
//


/******  加入购物车  ******/
function addToCart() {
    var listName = "listCookie";
    var name = $(that).next().next().children("em").text();
    var imgSrc = $(that).next().children("img").attr("src");
    var price =  $(that).parent().children().last().children("span").text();
    var count = 1;
    var pdtData = {
        name:name,
        imgSrc:imgSrc,
        price:price,
        count:count
    };
    var cookieData = $.cookie(listName);
    if(cookieData){
        var isExist = false;
        var oldValue = JSON.parse(cookieData);
        for(var i = 0;i < oldValue.length;i++){
            if(oldValue[i].name == pdtData.name){
                isExist = true;
                oldValue[i].count += pdtData.count;
                var newValue = JSON.stringify(oldValue);
                //setCookie 必须在if里面添加！！！
                $.cookie(listName,newValue,{expires:14,path:"/"});
            }
        }
        if(!isExist){
            oldValue.push(pdtData);
            var newCookie = JSON.stringify(oldValue);
            $.cookie(listName,newCookie,{expires:14,path:"/"});
        }
    }else{
        var arr =[];
        arr.push(pdtData);
        var newListCookie = JSON.stringify(arr);
        $.cookie(listName,newListCookie,{expires:14,path:"/"});
    }
}
console.log($.cookie("listCookie"));





