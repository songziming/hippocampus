function change_username_color () {
	$("#user-name .caret").css("color":"#336699");
}
function show_list(){
	$("#user-name>p").mouseover(function(){	$("#user-name>li").show("fast",change_username_color());
	});
}