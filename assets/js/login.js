$(function(){
    // $("#link_reg").on("click",function(){
    //     $(".login-box").hide().siblings(".reg-box").show();
    // })
    // $("#link_login").on("click",function(){
    //     $(".login-box").show().siblings(".reg-box").hide();
    // })

    $("#link_reg,#link_login").on("click",function(){
        $(this).parents(".form").hide().siblings().show()
    })

    layui.form.verify({
        pwd:[/^\S{6,12}$/,"密码不能有空格,且必须是6-12位"],
        repwd:function(value){
            var pwd = $("#reg_form [name='password']").val();
            if(pwd != value) return "两次输入的密码不一致"
        }
    })
    //注册
    var layer = layui.layer
    $("#reg_form").on("submit",function(e){
        e.preventDefault();
        var username = $("#reg_form [name='username']").val()
        var password = $("#reg_form [name='password']").val()
        $.post("/api/reguser",{username,password},function(res){
            if(res.status != 0) return layer.msg(res.message)
            layer.msg(res.message)
            $("#link_login").click();
        })
    })

    // 登陆
    $("#login_form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/login',
            data:$("#login_form").serialize(),
            success:function(res){
                if(res.status != 0) return layer.msg(res.message);
                localStorage.setItem("token",res.token);
                location.href = "./index.html"

            }
        })
    })
})