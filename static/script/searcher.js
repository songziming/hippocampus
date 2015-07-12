/**
 * Created by wung on 14-9-23.
 */
function searcher(word){
    var arr=new Array();

    for(var i=0;i<window.allcards.length;i++){
        var flag=false;
        var x=window.allcards[i].content;
        var y=window.allcards[i].title;
        if(window.allcards[i].title.indexOf(word)>=0){
//            alert(window.allcards[i].title);

            flag=true;
        }
        if(window.allcards[i].content.indexOf(word)>=0){
//            alert(window.allcards[i].content);
            flag=true;
        }
        if(flag==true){
            arr.push(window.allcards[i]);
        }
    }
    return arr;
}



function load_search_res(arr){

        $("#search-res-list #search-status").text("已搜索到 "+arr.length+" 条相关条目");
        $("#search-res-list .res-list").html("");
        if(arr.length>0 && arr.length<=10){
            for(var i=0;i<arr.length;i++){
                $("#search-res-list .res-list").append("<div class=\"search-res\">"+arr[i].title+"<br>"+arr[i].content+"</div>");
            }
        }
}

function search_linstener(){
    var search_word= $("#search-input").val();

    if(window.search_word_length!=search_word.length && search_word!=""){
        window.search_word_length=search_word.length;
        load_search_res(searcher(search_word));
    }

}
function hide_res_list(){
    $("#search-res-list").hide();
}