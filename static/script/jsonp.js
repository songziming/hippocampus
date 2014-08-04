function(url){ 
$.ajax({ 
type : "get", 
async:false, 
url : url, //http://p.3.cn/prices/mgets?skuIds=J_954086&type=1
dataType : "jsonp", 
jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback) 
jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名 
success : function(json){ 
	//alert(json); 
	$("#p").append("id"+json[0].id+"<br>"); 
	$("#p").append("p"+json[0].p+"<br>"); 
	$("#p").append("m"+json[0].m+"<br>"); 
	
	},
error:function(){ 
alert('fail'); 
} 
}); 

}