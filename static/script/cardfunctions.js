/**
 * Created by WunG on 2014/9/4.
 */
function bindlistener(){
    $("#header-plus").click(function(){
        addcard("卡片","请填写你的内容");
    });
    $(".card-action").click(function(){
        create_edit_control(this);
    });
}
function addcard(title,content){

    var cardnum=$("#container-main").children().length;
    var id="card"+(cardnum).toString();

    var color="color"+(cardnum%10).toString();
    $("#container-main").append('<div  id=\"'+id+'\" onMouseDown=\"mouseDown(this,event)\" onMouseUp=\"up(event)\"> <div class=\"title\"><span class=\"card-name\">'+title+'</span><span class=\"card-action fa-ellipsis-h fa\"></span></div><div class=\"content\" ><div class=\"card-content-p\"><p></p></div></div></div>');
    var cards=$("#"+id.toString());
    cards.attr("class","card "+color);

    var lowest=find_lowest_colum();
    var card_left=window.container_left_edge+(lowest)*window.card_width;
    var card_top=window.col_height_arr[lowest];
    console.log(card_top);
    cards.animate({opacity:'show',left:card_left.toString()+"px",top:card_top.toString()+"px"},200,"linear");
    var card_height=cards.outerHeight();
    //window.col_height_arr[lowest]+=card_height+10;
    window.rows_arr[lowest]++;
    console.log(window.rows_arr[lowest]);
    window.my_map[lowest][(window.rows_arr[lowest])]=cards.attr("id");

    //reset_col_top(lowest,0);



    //window.col_height_arr[lowest]+=card_height+10;
    $("#"+id.toString()+" .card-content-p p").text(content);

    // window.my_top_map[lowest][(window.rows_arr[lowest])]=card_top;

    //show_map();
    $(".card-action").attr("onClick","create_edit_control(this)");

    set_float_card_in_colum_position(cards);
    fresh_height_arr();
    add_missing_cards();
}
function add_missing_cards(){
    var cardnum=$("#container-main").children().length;
    var miss_cards=new Array(cardnum-1);
    for(var x=0;x<=cardnum;x++){
        miss_cards[x]=false;
    }
    for(var i=0;i<window.col_num;i++){
        for(var j=0;j<=window.rows_arr[i];j++){
            if(window.my_map[i][j]==""||typeof(window.my_map[i][j])=="undefined"){
                if(j!=window.rows_arr[i]){
                    for(var y=j;y<rows_arr[i];y++){
                        window.my_map[i][y]=window.my_map[i][y+1];

                    }

                }
                else{
                    window.rows_arr[i]--;
                }
            }
            else{
                var num_length=window.my_map[i][j].length;
                var num=parseInt(window.my_map[i][j].slice(4,num_length));
                miss_cards[num]=true;
            }

        }
    }
    for(var k=0;k<cardnum;k++){
        if(miss_cards[k]!=true){
            var ress=$("#card"+k.toString());
            console.log("k "+k);
            move_cards_to_new_place(k);
        }
    }
}
function move_cards_to_new_place(cardsnum){
    var cards=$("#card"+cardsnum.toString());
    console.log("#card"+cardsnum.toString());
    var lowest=find_lowest_colum();
    var card_left=window.container_left_edge+(lowest)*window.card_width;
    var card_top=window.col_height_arr[lowest];
    if(card_top<=window.container_top+10){
        card_top=window.container_top;
    }

    var card_height=cards.outerHeight();
    window.col_height_arr[lowest]+=card_height+10;
    cards.animate({opacity:'show',left:card_left.toString()+"px",top:card_top.toString()+"px"},200,"linear");
    window.rows_arr[lowest]++;
    window.my_map[lowest][(window.rows_arr[lowest])]=cards.attr("id");
    //fresh_height_arr();

    //reset_col_top(lowest,0);
}

function create_edit_control(obj){
    if($("#"+obj.parentNode.parentNode.id +" .title").children().length==3){
        return;
    }
    else{
        var card=obj.parentNode.parentNode;
        var card_jq=$("#"+card.id.toString());
        card_jq.attr("onmousedown","function(){}");
        card_jq.css({"-webkit-user-select":"auto","-ms-user-select":"auto"});
        var this_title=$("#"+card.id +" .title");
        var card_name_obj=$("#"+card.id +" .title .card-name");
        var this_content=$("#"+card.id+" .content .card-content-p");
        var content=this_content.text();
        var title=card_name_obj.html();

        this_title.append('<input'+' id=\"title-input\" placeholder=\"请输入标题\">');

        var title_input=$("#"+card.id +" .title #title-input");

        card_name_obj.css({"display":"none"});
        title_input.css({"display":"block"});
        title_input.attr("value",title);

        $("#"+card.id+" .content").append('<textarea'+' id=\"content-input\"><\/textarea>');
        var content_input=$("#"+card.id+" .content #content-input");
        this_content.css({"display":"none"});
        $("#"+card.id+" .content").css({"background-color":"transparent"});
        $("#"+card.id+" .content").append('<div class=\"cancel\">取消</div><div class=\"change\">保存</div>')
        content_input.css({"display":"block"});
        content_input.attr("value",content);
        content_input.text(content);

        var pos=get_col_row(card_jq);
        var col=pos[0];
        var row=pos[1];
        if(row<rows_arr[col]){
            var prev=$("#"+window.my_map[col][row+1]);
            set_float_card_in_colum_position(prev);
        }
        else{
            return;
        }
        fresh_height_arr();
        reset_col_top(col,0);
        add_missing_cards();
        set_container_height();

    }




}