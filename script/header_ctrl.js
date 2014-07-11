function load_li() {
			//$("#user-name li").css({visibility:"visible"});
		
			$("#up").css({background:"#338822",color:"#fff"});
			var t=setTimeout(function(){$("#user-center").css({visibility:"visible"});}, 70);
			var t=setTimeout(function(){$("#account-set").css({visibility:"visible"});}, 140);
			var t=setTimeout(function(){$("#logout").css({visibility:"visible"});}, 210);
		}
function remove_li(){
			//$("#user-name li").css({visibility:"hidden"});
			$("#up").css({color:"#eee"});
			$("#up").css({background:"#339933"});
			$("#up").css({borderBottom:"none"});
			var t=setTimeout(function(){$("#user-center").css({visibility:"hidden"});}, 210);
			var t=setTimeout(function(){$("#account-set").css({visibility:"hidden"});}, 140);
			var t=setTimeout(function(){$("#logout").css({visibility:"hidden"});}, 70);
		}
function change_icon_color(){

	$("#links").mouseover(function(){
		$("#l-svg").attr("src","images/link.active.svg");
	});
	$("#links").mouseout(function(){
		$("#l-svg").attr("src","images/link.svg");
	});

	$("#msgs").mouseover(function(){
		$("#m-svg").attr("src","images/msg.active.svg");
	});
	$("#msgs").mouseout(function(){
		$("#m-svg").attr("src","images/msg.svg");
	});

	$("#clocks").mouseover(function(){
		$("#cl-svg").attr("src","images/clock.active.svg");
	});
	$("#clocks").mouseout(function(){
		$("#cl-svg").attr("src","images/clock.svg");
	});

	$("#custom").mouseover(function(){
		$("#cu-svg").attr("src","images/custom.active.svg");
	});
	$("#custom").mouseout(function(){
		$("#cu-svg").attr("src","images/custom.svg");
	});
}