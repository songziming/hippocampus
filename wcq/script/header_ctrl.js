function load_li() {
			$("#user-name li").css({visibility:"visible"});
		
			$("#up").css({background:"#338822",color:"#fff"});
			
		}
function remove_li(){
			$("#user-name li").css({visibility:"hidden"});
			$("#up").css({color:"#eee"});
			$("#up").css({background:"#2DBE60"});
			$("#up").css({borderBottom:"none"});
			
		}
function change_icon_color(){

	$("#links").mouseover(function(){
		$("#l-png").attr("src","images/link.active.png");
		//$("#links p").css({color:"#f60"});
	});
	$("#links").mouseout(function(){
		$("#l-png").attr("src","images/link.png");
		//$("#links p").css({color:"#000"});
	});

	$("#msgs").mouseover(function(){
		$("#m-png").attr("src","images/msg.active.png");
		//$("#msgs p").css({color:"#f60"});
	});
	$("#msgs").mouseout(function(){
		$("#m-png").attr("src","images/msg.png");
		//$("#msgs p").css({color:"#000"});
	});

	$("#clocks").mouseover(function(){
		$("#cl-png").attr("src","images/clock.active.png");
		//$("#clocks p").css({color:"#f60"});
	});
	$("#clocks").mouseout(function(){
		$("#cl-png").attr("src","images/clock.png");
		//$("#clocks p").css({color:"#000"});
	});

	$("#custom").mouseover(function(){
		$("#cu-png").attr("src","images/custom.active.png");
		//$("#custom p").css({color:"#f60"});
	});
	$("#custom").mouseout(function(){
		$("#cu-png").attr("src","images/custom.png");
		// $("#custom p").css({color:"#000"});
	});
}
function set_nav_position(){
	
	var h=parseInt($(window).height());
	var h2=Math.floor((h-410)/2)+50;
	$("#main-icons").css({top:h2.toString()+"px"});

	var lefts=parseInt($("#container").offset().left.toString());
	var w=parseInt($("#links-block").width());
	var l=lefts+w+120;
	$("#main-icons").css({left:l.toString()+"px"});
		// alert("w"+w.toString()+"  lefts"+lefts.toString());
	
}
 function set_wrong_window() {
        var h=parseInt($(window).height());
        var w=parseInt($(window).width());
        var top1=Math.floor((h-160)/2);
        var left1=Math.floor((w-300)/2);
        // alert(top1.toString()+" "+left1.toString());
        $("#wrong-window").css({top:top1.toString()+"px"});
        $("#wrong-window").css({left:left1.toString()+"px"});
    }
function show_wrong_window(str) {
	$("#wrong-window").show(300);
	$("#wrong-info").html(str);
}
function set_signin_window() {
        var h=parseInt($(window).height());
        var w=parseInt($(window).width());
        var top1=Math.floor((h-400)/2);
        var left1=Math.floor((w-340)/2);
        // alert(top1.toString()+" "+left1.toString());
        $("#signin-window").css({top:top1.toString()+"px"});
        $("#signin-window").css({left:left1.toString()+"px"});
    }
function set_bg_size(){
	var h=parseInt($(window).height());
	var w = parseInt($(window).width());
	$("#bgpic").attr("height", h.toString());
    set_signin_window();
}
function change_input_style(){
	$("#username-input").focus(function () {
        	$("#username-input").attr("placeholder","");
        	$("#username-input").css({boxShadow:"0px 0px 1px 1px rgba(102,204,255,0.8)",border:"1px solid rgb(102,204,255)"});
        });
        $("#username-input").blur(function () {
        	$("#username-input").attr("placeholder","Your UserName");
        	$("#username-input").css({boxShadow:"none",border:"1px solid #fff"});
        });
        $("#password-input").focus(function () {
        	$("#password-input").attr("placeholder","");
        	$("#password-input").css({boxShadow:"0px 0px 1px 1px rgba(102,204,255,0.8)",border:"1px solid rgb(102,204,255)"});
        });
        $("#password-input").blur(function () {
        	$("#password-input").attr("placeholder","Your password");
        	$("#password-input").css({boxShadow:"none",border:"1px solid #fff"});
        });
        $("#submit-btn").focus(function(){
        	$("#submit-btn").css({boxShadow:"0px 0px 1px 1px rgba(102,204,255,0.8)",border:"1px solid rgb(102,204,255)",backgroundColor:"rgba(102,204,255,0.5)"});
        });
         $("#submit-btn").blur(function(){
        	$("#submit-btn").css({boxShadow:"none",border:"1px solid #fff",backgroundColor:"rgba(153,0,102,0.3)"});
        });
}


function twink(e) {
		if(e==0){
			return false;
		}
		else{
		for(var i=0;i<1;i++){

			$("#welcome-word").animate({
			opacity: 'toggle'
			},800);
			$("#welcome-word").css({textShadow:'0px 0px 10px #fff'},1000);
			$("#welcome-word").animate({
				opacity: 'show'
			},800);
			$("#welcome-word").css({textShadow:'0px 0px 20px #fff'},1000);
		}
	}	
}

function show_signin_window() {
	
}
function show_signin() {
	
	$("#signin-window").fadeToggle(1000);
	$("#welcome-word").css({cursor:"pointer",color:"white"});	
	setTimeout(function() {
		$("#signin-window").css({border:"1px solid rgba(0, 0, 0, 0.4)",
	boxShadow: "rgba(0, 0, 0, 0.6) 0px 0px 2px 2px",
	background: "rgba(0,0,0,0.5)"});
	}, 500);
	setTimeout(function() {
		$("#signin-window").animate({
			height:'340px'
		},1000);
		$("#welcome-form").fadeToggle(1000);
		$("#regist-forget").fadeToggle(1000);
	},1000);
	//$("#signin-window").fadeToggle(1000);
	set_bg_size();
    set_signin_window();
    change_input_style();
}