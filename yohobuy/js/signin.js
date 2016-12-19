/**
 * Created by Administrator on 2016/11/9.
 */
$("#nav_wrap").load("../load/signhead.html");
$("#footer_wrap").load("../load/footer.html");
/*  切换登录方式  */
var flag = true;
$("#sign_method").mousedown(function(){
    if(flag){
        $(this).css("background","url(../img/bg_icon.png) no-repeat -311px -90px");
        $(this).next().css("display","none").next().css("display","block");
    }else{
        $(this).css("background","url(../img/bg_icon.png) no-repeat -351px -90px");
        $(this).next().css("display","block").next().css("display","none");
    }
    flag = !flag;
});
/*  验证  */
$("#uname").blur(function(){
    var regPhone = /^1[3458]{1}[0-9]{9}$/;
    var regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    var isPhone = regPhone.test($(this).val());
    var isEmail = regEmail.test($(this).val());
    if($(this).val().length>0){
        if(!isPhone&&!isEmail){
            $(this).next().css("display","block").children("em").text("格式不正确，请重新输入");
        }else{
            $(this).next().css("display","none");
        }
    }else{
        $(this).next().css("display","block").children("em").text("请输入账号");
    }

});
$("#uPwd").blur(function(){
    if($(this).val().length>0){
        if($(this).val().length<6){
            $(this).next().css("display","block").children("em").text("请输入长度为6-20字符的密码");
        }else{
            $(this).next().css("display","none");
        }
    }else{
        $(this).next().css("display","block").children("em").text("请输入密码");
    }
});
$("#sign_bt").css("cursor","pointer").mousedown(function(){
    var $uName = $("#uname").val();
    var url="../../Product/GetProductById_get";
    $.ajax({
        url:url,
        dataType:"jsonp",
        data:{
            "id":$uName,
            "type":"typeSign"
        },
        success:function(signData){
            console.log(signData);
            if(signData == null){
                $("#uname").next().css("display","block").children("em").text("账号不存在，请重新输入");
            }else{
                var getData = JSON.parse(signData.Data);        //注意signData.Data!!!
                //console.log(getData.uPwd);
                //console.log(getData.uName);
                var $uPwd = $("#uPwd").val();
                //高老师说尽量不要要用 $uName $uPwd？？？
                if(getData.uName == $("#uname").val()&&getData.uPwd ==$("#uPwd").val()){
                    alert("登录成功");
                    $.cookie("flag","true",{expires:21,path:"/"});
                    //将登录成功后的用户名传到cookie
                    /*if($.cookie("uName")){
                        var uCookie = JSON.parse($.cookie("uName"));
                    }else{
                        var uCookie = {};
                    }*/
                    var uCookie = $.cookie("uName")?JSON.parse($.cookie("uName")):{};
                    var uIndex = uCookie.index?uCookie.index:0;
                    uCookie.index = ++uIndex;
                    uCookie[$uName] = uIndex;
                    var newCookie = JSON.stringify(uCookie);
                    if($("#reserve").prop("checked")){
                        $.cookie("uName",newCookie,{expires:14,path:"/"});
                    }else{
                        $.cookie("uName",newCookie,{path:"/"});
                    }
                    console.log(JSON.parse($.cookie("uName")));
                    //跳到主页
                    var address = null;
                    address = (location.href).split("?")[1];
                    if(address){
                        window.location.href="../html/"+address+".html";
                    }else{
                        window.location.href="../index.html";
                    }
                }else{
                    $("#uPwd").next().css("display","block").children("em").text("您输入的密码及账户名不匹配");
                }
            }
        }
    })
});
console.log($.cookie("flag"));
console.log($.cookie("uName"));
