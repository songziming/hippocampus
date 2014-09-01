function strach_header_search() {
    if($(document).width()>1080){
        $('#header-search-div').css("background-color","#fff");
        $('#header-search-div').animate({
            width:"302px",
        },200);
        $('#search-input').animate({
            width:"232px",
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

}

function zip_header_search() {
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

