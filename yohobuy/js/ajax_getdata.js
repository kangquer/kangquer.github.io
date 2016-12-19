/**
 * Created by Kk on 2016/11/4.
 */
/*  动态生成排布的div  ajax获取*/
for( var i = 0;i < 12;i++){
    var div = document.createElement("div");
    var a1 = document.createElement("a");
    var a2 = document.createElement("a");
    var img = document.createElement("img");
    $(img).addClass("img_top");
    $(div).css({width:"280px",height:"450px",float:"left","margin-left":"10px","position":"relative"}).addClass("ajax_get");
    $(a1).css({"display":"block","text-align":"center","font-size":"12px",color:"#000000","width":"100%","height":"40px","line-height":"40px"}).addClass("product_name");
    $(a2).css({"display":"block","text-align":"center","font-size":"12px",color:"#000000","width":"100%","height":"40px","line-height":"40px"}).addClass("product_price");
    $(div).append(img).append(a1).append(a2);
    $("#hot .hot_main").append(div);

}
/*  方法一*/
$(".ajax_get").each(function(index) {
    if (index % 4 == 0) {
        $(this).css({"margin-left": 0})
    }
});
//ajax获取data
//var url = "../jasondata/hot.json";
$.ajax({
    //路径一定要相对于调用js的页面（操作页面） .load里的路径也是   ！！！
    "url":"jsondata/products.json",
    "dataType":"json",
    "success":function(data){
        console.log(data);
        for(var i = 0;i< data.length;i++){
            $(".hot_main .ajax_get").eq(i).children().first().attr("src",data[i].src);
            $(".hot_main .ajax_get").eq(i).children("a[class='product_name']").html(data[i].name).attr({"href":"http://kkstrive.com","target":"_blank"});
            $(".hot_main .ajax_get").eq(i).children("a[class='product_price']").html(data[i].price).attr({"href":"http://kkstrive.com","target":"_blank"});
        }
    },
    error:function(){
        alert("ajax加载失败");
    }
});
for(var k = 1;k < 4;k++){
    var topIndex = k-1;
    var src = "url(img/girl_index/top"+k+".png)";
    $(".hot_main .ajax_get").eq(topIndex).append("<span></span>");
    $(".ajax_get").eq(topIndex).children("span").css({display:"block",width:"60px",height:"60px",position:"absolute",top:10,right:10,background:src});
}


//??????????
/*for(var k = 1;k < 4;k++){
    var topIndex = k-1;
    var top = document.createElement("p");
    var src = "url(img/girl_index/top"+k+".png)";
    $(top).css({display:"block",width:"60px",height:"60px",position:"absolute",top:10,right:10,background:src});
    console.log(top)
    $(".hot_main .ajax_get").eq(topIndex).append(top);
    $(".hot_main .ajax_get").eq(topIndex).append("<p></p>");

}*/

/*  方法二*/
/*$(".ajax_get").each(function(){
    var $index = $(this).index();
    if($index%4==0){
        $(this).css({"margin-left":0})
    }
});*/
/*  方法三*/
/*for(var j = 0;j < 12;j++){
    if(j%4==0){
        $("#hot .ajax_get").eq(j).css({"margin-left":0});
    }
}*/

/*
function getcolor(){
    var a = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    var c = Math.floor(Math.random()*255);
    return "rgb("+a+","+b+","+c+")";
}*/
