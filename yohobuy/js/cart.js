/**
 * Created by Administrator on 2016/11/14.
 */
$("#footer_wrap").load("../load/footer.html");
$("#back_top_wrap").load("../load/backtop.html");


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

var cartData = null;
/*  获取后台商品信息  */
var itemUrl = "http://10.17.158.13:8010/Product/GetProductById_get";
//$("#user_name").text()因为ajax异步加载获取不到
$.ajax(itemUrl,{
    dataType:"jsonp",
    data:{
        id:$("#user_name").text(),
        type:"typeCart"
    },
    success:function(itemData){
        //console.log(itemData);
        if(itemData){
            var arrData = JSON.parse(itemData.Data);
            cartData = arrData;
            var oData = {
                Data:arrData
            };
            console.log(oData);
            var cartHtml = template("get_cart",oData);
            $(".pdt_list").html(cartHtml);
        }else{
            alert("请先登录");
            location.href = "signin.html?cart";
        }
    },
    complete:function(){
        //购物车操作
        cartGo();
        //总价
        checkOut();
        //全选
        allSelect();
    }
});
//定义总价
var totalPrice = 0;
/*  购物车操作  */
function cartGo(){
    //num  sum
    $(".num_count").children("input").click(function(){
        var pdtNum = $(this).siblings("span").text();
        var $thisIndex = $(this).index();
        var $price = $(this).parent().prev().children("span").text();
        if($thisIndex == 2){
            pdtNum++;
            //总价同步
            if($(this).parent().parent().children().first().children().first().prop("checked") == true){
                totalPrice += parseInt($price);
            }
        }else{
            pdtNum--;
            if($(this).parent().parent().children().first().children().first().prop("checked") == true){
                if(pdtNum>=1){
                    totalPrice -= parseInt($price);
                }
            }
            if(pdtNum <1){
                pdtNum =1;
            }
        }
        $(this).siblings("span").text(pdtNum);
        var $num =  $(this).siblings("span").text();
        var sumPrice = parseFloat($price)*parseFloat($num);
        $(this).parent().next().children("span").text(sumPrice.toFixed(2));
        $(".check_rt").children("span").text(totalPrice.toFixed(2));
    });
    del();
    //collect   ？？？
    var iscollect = false;
    $(".collect").click(function(){
        if(!iscollect){
            $(this).css({background:"#ff88ae",color:"#ffffff",border:"2px solid #ff88ae"}).val("已收藏");
        }else{
            $(this).css({background:"#ffffff",color:"#000000",border:"2px solid #999999"}).val("移入收藏");
        }
        iscollect = !iscollect;
    });
}

/*
 通过相同的class取他们子元素的下标，是在总的子元素数量里取的
 var $sum = $(".pdt_box li").eq(8).children("span");
 var $price = $(".pdt_box li").eq(6).children("span").text();
 var $num = $(".pdt_box li").eq(7).children("span").text();
 var sumPrice = parseFloat($price)*parseFloat($num);
 $sum.text(sumPrice);
 */

/*  delete  */
function del(){
    $(".delete").click(function(){
        var pdtList = $(this).parent().parent().parent();
        var listIndex = pdtList.index();
        var Confirm = confirm("确定删除？");
        if(Confirm){
            $(this).parent().parent().parent().remove();
            //console.log(cartData);
            cartData.splice(listIndex,1);
            //console.log(cartData);
            var newItemUrl = "../../Product/CreateUpdateProduct_post";
            $.ajax(newItemUrl,{
                // dataType:"jsonp",
                type:"post",
                data:{
                    id:$("#user_name").text(),
                    datajson:JSON.stringify(cartData),
                    type:"typeCart"
                },
                success:function(){
                }
            });
        }
    });
}
//结算  总价
function checkOut(){
    $(".ready_to_check").click(function(){
        var thisPrice = $(this).parent().parent().children().eq(3).children("span").text();
        if($(this).prop("checked") == true){
            totalPrice += parseInt(thisPrice);
        }else{
            totalPrice -= parseInt(thisPrice);
        }
        $(".check_rt").children("span").text(totalPrice.toFixed(2))
    });
}
//全选
/*function allSelect(){
    $(".all_select").click(function(){
        if($(this).prop("checked") == true){
            $(".ready_to_check").prop("checked",true);
            totalPrice = 0;
            for(var i =0;i<$(".ready_to_check").length;i++){
                var pdtSumPrice = $(".ready_to_check").eq(i).parent().parent().children().eq(3).children("span").text();
                totalPrice += parseFloat(pdtSumPrice);
            }
        }else{
            $(".ready_to_check").prop("checked",false);
            totalPrice = 0;
        }
        $(".check_rt").children("span").text(totalPrice.toFixed(2));


        /!*$(".ready_to_check").each(function(index){
            var allPrice = 0;
            allPrice +=parseFloat($(this).parent().parent().children().eq(3).children("span").text()).toFixed(2);
            $(".check_rt").children("span").text(allPrice);
        });*!/

    });
}*/
function allSelect(){
    $(".all_select").click(function() {
        if ($(this).prop("checked") == true) {
            $(".ready_to_check").prop("checked", true);
            totalPrice = 0;
            $(".pdt_sum").each(function () {
                totalPrice += parseFloat($(this).text());
            })
        } else {
            $(".ready_to_check").prop("checked", false);
            totalPrice = 0;
        }
        $(".check_rt").children("span").text(totalPrice.toFixed(2));
    });
}


