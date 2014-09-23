function strach_header_search() {
    if($(document).width()>1080){
        $('#header-search-div').css("background-color","#fff");
        $('#header-search-div').animate({
            width:"302px"
        },200);
        $('#search-input').animate({
            width:"232px"
        },150);
        $('.icon-search').hide();
        $('.icon-new-window').show();
        $('.icon-close').show();
    }
    else if($(document).width()>768){
        $('#header-search-div').css("background-color","#fff");
        $("#search-input").css("width","102px");
        $('.icon-search').hide();
        $('.icon-new-window').show();
        $('.icon-close').show();
    }
    else{
        return;
    }
    $("#search-res-list").css({"display":"block"});
    window.timer=setInterval("search_linstener()",100);
}

function zip_header_search() {
    window.timer=clearInterval(timer);
    $("#search-input").val("");
    $("#search-res-list #search-status").html("暂无搜索结果");
    $("#search-res-list .res-list").html("");
    $("#search-res-list").css({"display":"none"});
    if ($(document).width() > 1080) {
        $('#header-search-div').css("background-color", "#3b5998");
        $('#header-search-div').animate({
            width: "172px",
            backgroundColor: "#fff"
        }, 200);
        $('#search-input').animate({
            width: "142px"
        }, 150);
        $('.icon-new-window').hide();
        $('.icon-close').hide();
        $('.icon-search').show();
    }
    else if ($(document).width() > 768) {
        $('#header-search-div').css("background-color", "#3b5998");
        $("#search-input").css("width", "142px");
        $('.icon-new-window').hide();
        $('.icon-close').hide();
        $('.icon-search').show();
    }
    else {
        return;
    }
}

function Ajax()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
    else
      {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
      }
    return xmlhttp;
}