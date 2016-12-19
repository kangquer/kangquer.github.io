/**
 * Created by Administrator on 2016/11/11.
 */
$("#load").load("../load/header.html");
$("#footer_wrap").load("../load/footer.html");
$("#back_top_wrap").load("../load/backtop.html");


/*  商品信息切换  */
$(".description").click(function(){
    $(this).css({"border-color":"#000000","color":"#000000"});
    $(".materials").css({"border-color":"#eaeceb","color":"#9a9999"});
    $(".pdt_des").slideDown("fast");
    $(".pdt_mts").slideUp("fast");
});
$(".materials").click(function(){
    $(this).css({"border-color":"#000000","color":"#000000"});
    $(".description").css({"border-color":"#eaeceb","color":"#9a9999"});
    $(".pdt_des").slideUp("fast");
    $(".pdt_mts").slideDown("fast");
});



/*  咨询评论切换  */
$(".customer").click(function(){
    $(this).css({"border-color":"#000000","color":"#000000"});
    $(".evaluate").css({"border-color":"#eaeceb","color":"#9a9999"});
    $(".ask").slideDown("normal");
    $(".reply").slideUp("normal");
});
$(".evaluate").click(function(){
    $(this).css({"border-color":"#000000","color":"#000000"});
    $(".customer").css({"border-color":"#eaeceb","color":"#9a9999"});
    $(".ask").slideUp("normal");
    $(".reply").slideDown("normal");
});


/*  template获取咨询  */
$.ajax("../jsondata/item.json",{
    success:function(data){
        var getData = data.Monster;
        //console.log(getData);
        var html = template("pdt_consult",getData[1]);
        $(".ask").html(html);
    },
    complete:function(){
        var askLength = $(".ask li").length;
        for(var i=3;i<askLength;i++){
            $(".ask li").eq(i).css("display","none");
        }
        $(".ask h4").click(function(){
            $(".ask li").css("display","list-item");
            $(this).css("display","none");
        });
    }
});

/*  template获取评论  */
$.ajax("../jsondata/item.json",{
    success:function(data){
        var getData = data.Monster;
        //console.log(getData);
        var html = template("pdt_reply",getData[0]);
        $(".reply").html(html);
    },
    complete:function(){
        var askLength = $(".reply li").length;
        for(var i=3;i<askLength;i++){
            $(".reply li").eq(i).css("display","none");
        }
        $(".reply h4").click(function(){
            $(".reply li").css("display","list-item");
            $(this).css("display","none");
        });
    }
});

/*  售后  */
var flagService = true;
$("#after_saled h3").click(function(){
    if(flagService){
        $("#after_ser").attr("href","#icon-sanjiao-copy-copy");
        $(".after_service").slideDown("normal");
    }else{
        $("#after_ser").attr("href","#icon-sanjiao");
        $(".after_service").slideUp("normal");
    }
    flagService = !flagService;
});

//console.log($("#color_pdt").attr("color"));  //验证自定义的属性，值为中文是否可行  可行

/******    ******    ******    ******    ******    ******/
/******  ******  ******  最酷炫部分  ******  ******  ******/
/******    ******    ******    ******    ******    ******/
dataId();
var List = null;
/******  商品在列表中对应详情页  ******/
function dataId(){
    var $href = location.href;
    var $data_id = ($href.split("?"))[1];
    var dataUrl = "../jsondata/all_items.json";
    var dataSetting ={
        success:function(Data){
            var toEach = Data[0].list;
            $.each(toEach,function(index){
               // console.log($(this));
                if(this.id == $data_id){
                    //通过id获取到对应的obj
                    List = (Data[0].list)[index];
                    getAllItems(List);
                }
            })
        },
        complete:function(){
            love();
            changeImg($data_id);
            Clearer();
            num();
            ruler();
            cart();
        }
    };
    $.ajax(dataUrl,dataSetting);
}
//自动获取每种商品的json并生成详情页
function  getAllItems(obj){
    // console.log(obj);
    var itemHtml = template("pdt_items",obj);
    $(".dls_main").html(itemHtml);
    var imgHtml = template("pdt_imgs",obj);
    $("#details_main").html(imgHtml);
}

/*  切换放大镜图片  */
function changeImg(index){
    $(".dls_main_lt dd li").mouseenter(function(){
        var $imgIndex = $(this).index()+1;
        $(".dls_main_lt .dls_img").attr("src","../img/item/id"+index+"_show_big"+$imgIndex+".jpg");
        $(".dls_main_lt .bigimg").attr("src","../img/item/id"+index+"_show_big"+$imgIndex+".jpg");
    });
}
/*  放大镜  */
function Clearer(){
    $("#details .opa").hover(function(){
        $("#details .mark").css("display","block");
        $("#details .showbox").css("display","block");
        $("#details .opa").mousemove(function(){
            var mLeft = event.offsetX - $("#details .mark").width()/2;
            var mTop = event.offsetY - $("#details .mark").height()/2;
            mLeft = Math.max(0,Math.min(mLeft,$("#details .opa").width()-$("#details .mark").width()));
            mTop = Math.max(0,Math.min(mTop,$("#details .opa").height()-$("#details .mark").height()));
            $("#details .mark").css({left:mLeft,top:mTop});

            var percentX = mLeft / ($("#details .opa").width() - $("#details .mark").width());
            var percentY = mTop / ($("#details .opa").height() - $("#details .mark").height());

            var Img_left = -percentX * ($("#details .bigimg").width() -$("#details .showbox").width());
            var Img_top = -percentY * ($("#details .bigimg").height() -$("#details .showbox").height());

            $("#details .bigimg").css({left:Img_left,top:Img_top});
        });
    },function(){
        $("#details .mark").css("display","none");
        $("#details .showbox").css("display","none");
    });
}

/*  num  */
function num(){
    $(".buy_num").children("span").click(function(){
        var pdtNum = $(".pdt_num").text();
        var $thisIndex = $(this).index();
        //为什么从1开始？  因为index()是现对于它所有兄弟的下标，即使标签不同
        //alert($thisIndex);
        if($thisIndex == 1){
            pdtNum++;
        }else{
            pdtNum--;
            if(pdtNum <1){
                pdtNum =1;
            }
        }
        $(".pdt_num").text(pdtNum);
    });
}
/*  收藏  */
var isSaved = true;
function love(){
    $("#save").click(function(){
        if(isSaved){
            $("#saved").css("color","#ff0000");
            $("#save span").text("已收藏");
        }else{
            $("#saved").css("color","#666666");
            $("#save span").text("收藏商品");
        }
        isSaved = !isSaved;
    });
//只有在收藏了之后才有hover效果
    $("#save").hover(function(){
        //此处判断为 !isSaved
        if(!isSaved){
            $("#save span").text("取消收藏");
        }
    },function(){
        if(!isSaved) {
            $("#save span").text("已收藏");
        }
    });
}
/*  ruler  */
var isrulerd = null;
function ruler(){
    $("#ruler").children().click(function(){
        isrulerd = true;
        $(this).css({background:"#000000",color:"#ffffff"}).attr("ischecked",true).siblings().css({background:"transparent",color:"#6a6666"}).removeAttr("ischecked");
    });
    $(".color_pdt").click(function () {
        $(this).css("border","2px solid #000000").attr("iscolored",true).siblings().css("border-width",0).removeAttr("iscolored");
    });
}
/*  购物车  */
var buyData = {};
var colorIndex = 0;
var rulerIndex = 0;
function cart(){

    $("#addCart").click(function () {
        if(isrulerd){
            //检测放在购物车的点击事件里，每次加入购物车的时候检测
            $(".color_pdt").each(function (index) {
                if($(this).attr("iscolored")){
                    colorIndex = index;
                    //alert(colorIndex)
                }
            });
            $("#ruler").children().each(function (index) {
                //console.log(this);
                /*  为什么background不可以，自定义的属性可以
                 if($(this).css("background") == "rgb(0,0,0)"){
                 rulerIndex = index;
                 }
                 */
                if($(this).attr("ischecked")){
                    rulerIndex = index;
                }
            });
            //商品信息写进对象
            buyData.id = $("#user_name").text();
            buyData.name = List.name;
            buyData.type = List.type;
            buyData.price = List.price;
            buyData.color_img = (List.color_img)[colorIndex];
            buyData.color = (List.color)[colorIndex];
            buyData.ruler = (List.ruler)[rulerIndex];
            buyData.num = $(".pdt_num").text();
          /*  var sumPrice = parseFloat( buyData.price)*parseFloat( buyData.num);
            buyData.sumPrice = sumPrice.toFixed(2);*/
           //添加购物车
            toCartData();
            imgToCart();
        }else{
         alert("请选择尺码");
        }

    });
}

function toCartData(){
    //先获取后台数据
    var itemUrl = "../../Product/GetProductById_get";
    $.ajax(itemUrl,{
        dataType:"jsonp",
        data:{
            id: "kkstrive",
            type:"typeCart"
        },
        success:function(oldItemData){
            if(oldItemData){
                var itemData = JSON.parse(oldItemData.Data);
                //console.log(itemData);
                var isExist = false;
                for(var i = 0;i<itemData.length;i++){
                    if(itemData[i].name == buyData.name){
                        if(itemData[i].ruler == buyData.ruler&&itemData[i].color == buyData.color){
                            itemData[i].num = parseInt(itemData[i].num)+parseInt(buyData.num);
                            isExist = true;
                            //上传
                            upData(itemData);
                        }
                    }
                }
                if(!isExist){
                    itemData.push(buyData);
                    upData(itemData);
                }
            }else{
                var arrCart = [];
                arrCart.push(buyData);
                upData(arrCart);
            }
        }
    });
}

function upData(dataObj){
    var itemUrl = "../../Product/CreateUpdateProduct_post";
    $.ajax(itemUrl,{
       // dataType:"jsonp",
        type:"post",
        data:{
            id:buyData.id,
            datajson:JSON.stringify(dataObj),
            type:"typeCart"
        },
        success:function(){
        }
    });
}

var list_num = 0;
function imgToCart(){
    var itemUrl = "../../Product/GetProductById_get";
    $.ajax(itemUrl,{
        dataType:"jsonp",
        data:{
            id:"kkstrive",
            type:"typeCart"
        },
        success:function(itemData){
            var arrData = JSON.parse(itemData.Data);
            list_num = arrData.length;
            $(".cart_num").text(list_num);
            //小BUG
            //alert(list_num)
            $(".go_cart").animate({opacity:0},300,function(){
                $(this).animate({opacity:1},300)
            });
        }
    });


   /* var imgCart = $(".color_pdt").eq(colorIndex).clone();
    imgCart.css({"position":"fixed","z-index":999}).appendTo("#imgcart");
    imgCart.animate({
        left:600,
        top:200
    },4000)*/
}
