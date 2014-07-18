function load_li() {
			$("#user-name li").css({visibility:"visible"});
		
			$("#up").css({background:"#338822",color:"#fff"});
			
		}
function remove_li(){
			$("#user-name li").css({visibility:"hidden"});
			$("#up").css({color:"#eee"});
			$("#up").css({background:"#339933"});
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