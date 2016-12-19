/**
 * Created by Administrator on 2016/11/1.
 */
//kk的title
//$("title").append("<img src='../img/avatar.png'><span>新用户注册</span>");
var isPhone = false;
var isImgCode = false;
var isMes = false;
var isPwd = false;
var isChecked = false;
var ran = 0;


$(".sign_up").change(function(){
    $(".sign_up option:selected").each(function(){
        //area-code match to  area
        var a = $(this).attr("name");
        $(".phone_pre").text(a);
    });
});
//实时监听input内容变化  propertychange兼容IE9
$("input[type='text']").bind('input propertychange',function(){
    //判断前三个
    if($(this).attr("id")=="phone_num"){
        if($(this).val().length>0){
            $("#sign .reg_check").css({display:"block",top:142,left:143});
            var regPhone = /^1[3458]{1}[0-9]{9}$/;
            var isEx = regPhone.test($(this).val());
            if(!isEx){
                $("#sign .reg_check .content").text("手机号码格式不正确,请重新输入");
                $("#sign .phone_num").css("border-color","#ff0000");
                isPhone = false;
            }else{
                $("#sign .reg_check").css({display:"none"});
                $("#sign .phone_num").css("border-color","#dbdbdb");
                isPhone = true;
            }
        }else{
            $("#sign .reg_check .content").text("请输入手机号码");
        }
    }else if($(this).attr("id")=="code"){
        if(isPhone){
            if($(this).val().length>0){
                $("#sign .reg_check").css({display:"block",top:212,left:84});
                var con = $(this).val();
                if(con != 6666){
                    $("#sign .reg_check .content").text("图形验证码错误");
                    $("#sign .code").css("border-color","#ff0000");
                    isImgCode = false;
                }else{
                    $("#sign .reg_check").css({display:"none"});
                    $("#sign .code").css("border-color","#dbdbdb");
                    $("#sign .get_message").css({"background-color":"#ff1901","cursor":"pointer"}).removeAttr("disabled");
                    isImgCode = true;
                }
            }else{
                $("#sign .reg_check .content").text("请输入验证码");
            }
        }else{
            $("#sign .code").css("border-color","#ff0000");
        }
    }else if($(this).attr("id")=="check_message"){
        if(isPhone&&isImgCode){
            if($(this).val().length>0){
                $("#sign .reg_check").css({display:"block",top:282,left:84});
                var con2 = $(this).val();
                if(con2 != ran){
                    $("#sign .reg_check .content").text("短信验证码错误");
                    $("#sign .check_message").css("border-color","#ff0000");
                    isMes = false;
                }else{
                    $("#sign .reg_check").css({display:"none"});
                    $("#sign .check_message").css("border-color","#dbdbdb");
                    isMes = true;
                }
            }else{
                $("#sign .reg_check .content").text("请输入短信验证码");
            }
        }else{
            $("#sign .check_message").css("border-color","#ff0000");
        }
    }else if($(this).attr("id")=="set_pwd"){
       if($(this).val().length>0){
           $("#sign .reg_check").css({display:"block",top:352,left:84});
           var regPwd = /^[a-zA-Z]\w{5,19}$/;      // 6-20 字符、数字和下划线
           var isPwdEx = regPwd.test($(this).val());
           var $pwdL = $(this).val().length;
           if(!isPwdEx){
               $("#sign .reg_check .content").text("密码格式错误");
               $("#sign .set_pass").css("border-color","#ff0000");
               isPwd = false;
           }else {
               $("#sign .reg_check").css({display: "none"});
               $("#sign .set_pass").css("border-color", "#dbdbdb");
               isPwd = true;
           }
           if($pwdL>=6&&$pwdL<=11){
               $(".yes p").first().css("color","#babbbb").children().css("background","url(../img/bg_icon.png) no-repeat -507px -30px");
               $("span.pwd_length").css("color","#ffffff").eq(2).css("background","#e8e8e8").siblings().css("background","#ffff00");
           }else if($pwdL>11){
               $(".yes p").first().css("color","#babbbb").children().css("background","url(../img/bg_icon.png) no-repeat -507px -30px");
               $("span.pwd_length").css({"background":"#3ee392","color":"#ffffff"});
           }else{
               $(".yes p").first().css("color","#ff0000").children().css("background","url(../img/bg_icon.png) no-repeat -523px -30px");
               $("span.pwd_length").css("color","#ffffff").eq(0).css("background","#ff0000").siblings().css("background","#e8e8e8");
               $("#sign .reg_check .content").text("密码只支持6-20位字符");
           }
       }else{
           $("#sign .reg_check .content").text("请输入密码");
       }
    }
});
/*  检测是否勾选协议  */
$(".sign_obey").change(function(){
    if($(this).prop("checked")){
        isChecked = true;
    }else{
        isChecked = false;
    }
    if(isPhone&&isImgCode&&isMes&&isPwd&&isChecked){
        $(".register-btn").removeAttr("disabled");
        $(".register-btn").css({"background":"#ff1901","cursor":"pointer"});
    }
});
//获取验证码
$("#sign .get_message").mousedown(function(){
    ran = 1000 + Math.floor(Math.random()*9000);
    alert(ran);
    var that = this;
    var timer = null;
    var count = 60;
    clearInterval(timer);
    var send_mes = count + "秒可重新发送";
    //$(this).val(send_mes);
    $(this).css("background-color","#555555").attr("disabled","true").data("state",0);
    timer = setInterval(function(){
        count--;
        $("#sign .get_message").val(count+"秒可重新发送");        //that can not work???
        if(count<=0){
            clearInterval(timer);
            $("#sign .get_message").removeAttr("disabled").css("background-color","#ff1901").val("获取短信验证码").data("state",1);;
        }
    },1000);
});
/*  密码格式提示框  */
$(".set_pass").focus(function(){
    $(this).siblings().last().css("display","block");
});
$(".set_pass").blur(function(){
    $(this).siblings().last().css("display","none");
});

/*  上传  */
$(".register-btn").mousedown(function(){
    var $uName = $("#phone_num").val();
    var $uPwd = $("#set_pwd").val();
    var uData = {
        uName:$uName,
        uPwd:$uPwd
    }
    /*  注册时先检测手机号是否已经注册  */
    var urlDownload="../../Product/GetProductById_get";
    $.ajax({
        url:urlDownload,
        dataType:"jsonp",
        data:{
            "id":$uName,
            "type":"typeSign"
        },
        success:function(signData){
            console.log(signData);
            if(signData){
                //alert(1);
                $("#sign .reg_check").css({display:"block",top:142,left:143});
                $("#sign .reg_check .content").text("手机号已注册");
                isPhone = false;
            }else{
                //上传
                var urlUpload="../../Product/CreateUpdateProduct_get";
                $.ajax({
                    "url":urlUpload,
                    dataType:"jsonp",
                    data:{
                        "id":uData.uName,
                        "datajson":JSON.stringify(uData),
                        "type":"typeSign"
                    },
                    success:function(){
                        alert("注册成功");
                    },
                    error:function(){
                        alert("注册失败");
                    },
                    complete:function(){
                        window.location.href="signin.html";
                    }
                });
            }
        }
    })


});

