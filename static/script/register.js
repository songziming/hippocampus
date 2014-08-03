  
 function registAction() {
		//Ajax登陆function
            var agree = document.getElementById("agree").checked;

            var email = document.getElementById("input-Email1").value;
            var password = document.getElementById("password").value;
            var password2 = document.getElementById("password2").value;
            var username = document.getElementById("username").value;



            if (!isEmail(email)) {
                show_wrong_window("邮件地址不合法！");
                return false;
            }
	
            if (!agree) {
                show_wrong_window("请先阅读用户协议！");
                return false;
            }

            // if (!isLengthLegal(password)) {
            //     return false;
            // };



            if (password != password2) {
                show_wrong_window("密码前后不相等，请重新确认！");
                return false;
            }

            // password = hex_md5(password);
            // password2 = hex_md5(password2);
            var ajax = Ajax();
            var form = new FormData();
            form.append("email", email);
            form.append("password", password);
            form.append("username", username);

            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                         var resText = ajax.responseText;
                        $("#alerttext").html(resText);
                        localStorage.setItem("hpcp_login", email);
                         ajax.open("POST", "do_register", true);
                         ajax.send(form);
                        alert("注册成功\n\n点击确定进入登陆页面");
                        // location.href = "../login/login.html";
                        }
                }

            ajax.open("POST", "do_register", true);
            ajax.send(form);

        }

function listen_email(){
	//验证邮件地址并提示
$("#input-Email1").blur(function () {
            var email = document.getElementById("input-Email1").value;
            isEmail(email);
        });
}
function isEmail(email) {
            //判断邮件地址可用性
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!myreg.test(email)) {
                $("#input-email-remind").html('<img src="../../static/images/wrong.png" class="wrong"/><span style="color:red">请输入有效的Email！</span>');

                return false;
            }
            $("#input-email-remind").html('<img src="../../static/images/ok.png" class="ok"/><span style="color:green;">邮箱可用</span>');
            return true;
        }

        function message(str) {
            document.getElementById("alertText").innerHTML = str;
        }

function listen_username(){
	//判断用户名可用性并提示
	 $("#username").blur(function () {
            var username = document.getElementById("username").value;
            isuserLegal(username);

        });
}

     
function isuserLegal(username) {
		
	//用户名是否可用的验证
            if (username.length > 0) {
                $("#user-remind").html('<img src="../../static/images/ok.png" class="ok"/><span style="color:green;">昵称可用</span>');
            }
            else {
                $("#user-remind").html('<img src="../../static/images/wrong.png" class="wrong"/><span style="color:red">请确保昵称不为空</span>');
            }
        }

function listen_pwd1(){
	//对密码的验证并提示
	$("#password").blur(function () {
            var password = document.getElementById("password").value;
            $("#key-remind").html(password.length.toString());
            if (password.length < 6) {
                $("#key-remind").html('<img src="../../static/images/wrong.png" class="wrong"/><span style="color:red">密码长度为6到16个字符!</span>');
            }
            else if (password.length > 16) {
                $("#key-remind").html('<img src="../../static/images/wrong.png" class="wrong"/><span style="color:red">密码长度为6到16个字符!</span>');
            }
            else {
                $("#key-remind").html('<img src="../../static/images/ok.png" class="ok"/><span class="glyphicon-class" style="color:green;">请再次输入密码</span>');
            }

        });
}

function listen_pwd2(){
	//对重复密码的验证并提示
$("#password2").blur(function () {
                var password = document.getElementById("password").value;
                var password2 = document.getElementById("password2").value;
             if (password2 == password) {
                if (password2.length >= 6 && password2.length <= 16) {
                    $("#key-again-remind").html('<img src="../../static/images/ok.png" class="ok"/>');
                    $("#key-remind").html('<img src="../../static/images/ok.png" class="ok"/>');
                }
                else {
                    $("#key-again-remind").html('<img src="../../static/images/wrong.png" class="wrong"/><span style="color:red;">请输入合法密码</span>');
                }

            }
            else {
                $("#key-again-remind").html('<img src="../../static/images/wrong.png" class="wrong"/><span style="color:red;">密码前后不相等，请重新确认</span>');
            }
        });
}

function listen_close_wrong_window(){
	//关闭错误窗口
	$("#close").click(function () {
	
            $("#wrong-window").fadeOut(300);
        });

}



