function set_active() {		
	$(".nav li").click(function(){
		$(".nav li").attr("class","");
		$(this).attr("class","active");
		if($(this).attr("id")=="firstli"){
			$("#password_div").css({"display":"none"});
			$("#resource_div").css({"display":"block"});
		}
		else{
			$("#resource_div").css({"display":"none"});
			$("#password_div").css({"display":"block"});
		}
	});
}

/*
//向后台发送，用来判断输入的原密码是否正确
checkoriginalpwd=true;
function checkOriginalPwd(success_function,fail_function)
{
	var testOriginalPwd=$("#InputOldPassword").val();
	$.ajax({
		url:,
		type:"POST",
		dataType:"json",
		data:{"OriginalPwd":testOriginalPwd},
		success:function(data){
			if()
			{
				$("#oripwd").html("<div style='color:green'>correct</div>");
				success_function();
			}
			else
			{
				$("#oripwd").html("<div style='color:red'>Input the correct original password</div>");
				fail_function();
			}
		}
	});
	return checkoriginalpwd;
}

//通过传入函数来解决ajax的返回值操作问题
function success_function()
{
	checkoriginalpwd=true;
}

function fail_function()
{
	checkoriginalpwd=false;
}

//处理修改密码面板的提交
function submitPwd()
{
	$("#submitPwd").click(function(){

	});
}

*/

//检查原密码和新密码是否相等
function checkPwdIsChanged()
{
	var testOriginalPwd=$("#InputOldPassword").val();
	var testNewPwd1=$("#InputNewPassword").val();
	if(testNewPwd1==testOriginalPwd)
	{
		$("#newpwd").html("<div style='color:red'>You haven't changed the password</div>");
		return false;
	}
	else
	{
		$("#newpwd").html("");
	}
	return true;
}

//判断两次输入的新密码是否一致
function checkNewPwdIsSame()
{
	var testNewPwd1=$("#InputNewPassword").val();
	var testNewPwd2=$("#InputNewPassword2").val();
	if(testNewPwd1!=testNewPwd2)
	{
		$("#newpwd2").html("<div style='color:red'>Input same password</div>");
		return false;
	}
	else
	{
		$("#newpwd2").html("");
		return true;
	}	
}

//检查新密码是否已经输入及是否一致
function checkNewPwdIsExist()
{
	$("#InputNewPassword").blur(function(){
		if(checkIsExist($("#InputNewPassword")) && !checkIsExist($("#InputNewPassword2")))//只输入了密码1
		{
			$("#newpwd2").html("<div style='color:red'>Input resure password</div>");
			return false;
		}
		else//两次新密码全部输入或者全部为空
		{
			$("#newpwd2").html("");		
		}
	});
	$("#InputNewPassword2").blur(function(){
		if(!checkIsExist($("#InputNewPassword")) && checkIsExist($("#InputNewPassword2")))//只输入了密码2
		{
			$("#newpwd").html("<div style='color:red'>Input the password</div>");
			return false;
		}
		else
		{
			$("#newpwd").html("");
			checkNewPwdIsSame();
		}	
	});
	if(checkNewPwdIsSame())//判断两次输入的密码是否一致，全部为空也算一致
	{
		return true;
	}
	else
	{
		return false;
	}	
}

//检查所有的密码面板的相关信息
function CheckAllPwd()
{
	checkNewPwdIsExist();//先进行用户输入信息提示
	$("#submitPwd").click(function(){
		if(true)//旧密码输入正确
		{
			if(checkNewPwdIsExist())
			{
				alert("correct");
			}
			else
			{
				alert("wrong");
			}
		}
	});	
}


//判断输入框是否为空
function checkIsExist(id)
{
	if(id.val()=="")
	{
		return false;
	}
	return true;
}


//检查用户资料提交表单是否有空的信息
function ChecksubmitResource()
{
	if(!checkIsExist($("#nickname")))
	{
		$("#ResInfo").html('<span style="color:red;">Input the nickname</span>');
		setTimeout("ClearResInfo()",4000);
		$("#nickname").focus();
		return false;
	}

	if(!checkIsExist($("#exampleInputEmail")))
	{
		$("#ResInfo").html('<span style="color:red;">Input the email</span>');
		setTimeout("ClearResInfo()",4000);
		$("exampleInputEmail").focus();
		return false;
	}
	else
	{
		if(!CheckEmailPatten($("#exampleInputEmail").val()))
		{
			$("#ResInfo").html('<span style="color:red;">Wrong email address pattern</span>');
			setTimeout("ClearResInfo()",4000);
			$("#exampleInputEmail").val("");
			$("#exampleInputEmail").focus();
			return false;
		}	
	}
	return true;
}

//检查邮箱地址格式是否正确
function CheckEmailPatten(email)
{
	if(!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)){		
		return false;
	}
	return true;
}

//清除用户资料面板提示的错误信息
function ClearResInfo()
{
	$("#ResInfo").html('');
}


function submitRes()
{
	$("#submitResource").click(function()
	{
		if(ChecksubmitResource())
		{
			/*
			var nickname=$("#nickname").val();
			var email=$("#exampleInputEmail").val();
			var sex=$("input[name='sex']:checked").val();
			$.ajax({
				url:,
				type:"POST",
				dataType:"json",
				data:{"nickname":nickname,"email":email,"sex":sex},
				success:function(data){
					if()
					{
						
					}
					else
					{
						
					}
				}
			});
			*/
			alert("correct");


		}
	});
}





