/**
 * Created by wung on 14-9-23.
 */
function searcher(word){
    var arr=new Array();
    var flag=false;
    for(var i=0;i<window.allcards.length;i++){
        if(window.allcards[i].title.indexOf(word)>0){
            flag=true;
        }
        if(window.allcards[i].content.indexOf(word)>0){
            flag=true;
        }
        if(flag){
            arr.push(window.allcards[i]);
        }
    }
    return arr;
}



function load_search_res(arr){
    if(arr.length==0){

    }
}

function bind_search_linstener(){
    var search_word= $("#search-input").val();
    if(window.search_word_length!=search_word.length){
        load_search_res(searcher(search_word));
    }

}