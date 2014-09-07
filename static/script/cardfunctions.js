/**
 * Created by WunG on 2014/9/4.
 */
function loadcards(){

}

function my_card(id,title,content,index,color,category){
    this.id=(id||set_card_id());
    this.title=(title||"请添加标题");
    this.content=(content||"请添加新内容");
    this.index=index;
    this.category=(category||"default");
    this.corlor=color;
    this.set_category=function(category){
        this.category=category;
    };
    this.set_color=function(colorclass){
        this.color=colorclass;
    }
    return this;
}

function bindlistener(){
    $("#header-plus").attr("onclick","addcard(\"新卡片\",\"请填写你的内容\")");

    $(".card-action").attr("onclick","show_menu(this)");
    $(".colors").attr("onclick","show_color_board(this)");
    $(".edit").attr("onclick","create_edit_control(this)");
    $(".color-block").attr("onclick","set_card_color(this)");
    $(".set-class").attr("onclick","show_card_class_input(this)");
    $(".change-class-yes").attr("onclick","change_class_name(this)");
}
function addcard(title,content){


    var cardnum=$("#container-main").children().length;



//    var id="card"+(cardnum).toString();
    var id=set_card_id();
    var card_o=new my_card(id,title,content);
    window.cards_arr.push(card_o);
    var color="color"+(cardnum%10).toString();
    $("#container-main").append('<div  id=\"'+id+'\" onMouseDown=\"mouseDown(this,event)\" onMouseUp=\"up(event)\"> <div class=\"title\"><span class=\"card-name\">'+title+'</span><span class=\"card-action fa-ellipsis-v fa\"></span></div><div class=\"content\" ><div class=\"card-content-p\"><p></p></div></div></div>');
    var cards=$("#"+id.toString());

    cards.attr("class","card "+color);

    var lowest=find_lowest_colum();
    var card_left=window.container_left_edge+(lowest)*window.card_width;
    var card_top=window.col_height_arr[lowest];
    cards.animate({opacity:'show',left:card_left.toString()+"px",top:card_top.toString()+"px"},200,"linear");
    var card_height=cards.outerHeight();

    window.rows_arr[lowest]++;

    window.my_map[lowest][(window.rows_arr[lowest])]=cards.attr("id");
    if(($("#"+id.toString()+" .menu")).length<=0){
        $("#"+id.toString()+" .card-content-p p").text(content);
        cards.append("<div class=\"menu\"><div class=\"card-menu-icon set-class\"><img src=\"../../static/images/class.png\" alt=\"\"/></div><div class=\"card-menu-icon edit\"><img src=\"../../static/images/edit.png\" alt=\"\"/></div><div class=\"card-menu-icon archive\"><img src=\"../../static/images/Archive.png\" alt=\"\"/></div><div class=\"card-menu-icon delete\"><img src=\"../../static/images/delete.png\" alt=\"\"/></div><div class=\"card-menu-icon colors\"><img src=\"../../static/images/colors.png\" alt=\"\" /></div><span class=\"top-arrow\"></span> <div class=\"color-menu\"><span class=\"top-arrow\"></span><div class=\"color-block color0\"></div><div class=\"color-block color1\"></div><div class=\"color-block color2\"></div><div class=\"color-block color3\"></div><div class=\"color-block color4\"></div><div class=\"color-block color5\"></div><div class=\"color-block color6\"></div><div class=\"color-block color7\"></div><div class=\"color-block color8\"></div></div></div>");

        $("#"+id.toString()+" .title").append('<input'+' id=\"title-input\" placeholder=\"请输入标题\">');

        $("#"+id.toString()+" .content").append('<textarea'+' id=\"content-input\"><\/textarea>');

        $("#"+id.toString()+" .content").append('<div class=\"cancel\">取消</div><div class=\"change\">保存</div>');

        $("#"+id.toString()).append('<div class=\"class-input-block\"><input type=\"text\"  class=\"card-class-name-input\" ><div class=\"change-class-no\">取消</div><div class=\"change-class-yes\">确定</div></div>');
    }

    $("#"+id.toString()+" .card-action").attr("onclick","show_menu(this)");
    $("#"+id.toString()+" .colors").attr("onclick","show_color_board(this)");
    $("#"+id.toString()+" .edit").attr("onclick","create_edit_control(this)");
    $("#"+id.toString()+" .color-block").attr("onclick","set_card_color(this)");
    $("#"+id.toString()+" .set-class").attr("onclick","show_card_class_input(this)");
    $("#"+id.toString()+" .change-class-yes").attr("onclick","change_class_name(this)");
    set_float_card_in_colum_position(cards);
    fresh_height_arr();
    //add_missing_cards();
    //show_map();

}
function add_missing_cards(){
    var cardnum=$("#container-main").children().length;
    var miss_cards=new Array(cardnum-1);
    for(var x=0;x<=cardnum;x++){

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
            move_cards_to_new_place(k);
        }
    }
}

function show_menu(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    var menu_obj=$("#"+card.id+" .menu");
    var color_menu_obj=$("#"+card.id+" .menu .color-menu");
    if(menu_obj.css("display")=="none"){
        menu_obj.show();
        card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
        card_jq.attr("onmousedown","");
        card_jq.attr("onMouseUp","");
    }else if(menu_obj.css("display")=="block"){
        menu_obj.hide();
        color_menu_obj.css({"display":"none"});
        card_jq.css({"-webkit-user-select":"auto","-ms-user-select":"auto"});
        card_jq.attr("onMouseDown","mouseDown(this,event)");
        card_jq.attr("onMouseUp","up(event)");
    }
}

function show_color_board(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    var color_menu_obj=$("#"+card.id+" .menu .color-menu");
    if(color_menu_obj.css("display")=="none"){
        color_menu_obj.show();
    }else if(color_menu_obj.css("display")=="block"){
        color_menu_obj.hide();
    }
}

function move_cards_to_new_place(cardsnum){
    var cards=$("#card"+cardsnum.toString());
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
}

function create_edit_control(obj){
    show_menu(obj);
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());

    card_jq.attr("onmousedown","");
    card_jq.attr("onMouseUp","");

    card_jq.css({"-webkit-user-select":"auto","-ms-user-select":"auto"});
    var this_title=$("#"+card.id +" .title");
    var card_name_obj=$("#"+card.id +" .title .card-name");
    var this_content=$("#"+card.id+" .content .card-content-p");
    var content=this_content.text();
    var title=card_name_obj.html();



    var title_input=$("#"+card.id +" .title #title-input");

    card_name_obj.css({"display":"none"});
    title_input.css({"display":"block"});
    title_input.attr("value",title);

    var content_input=$("#"+card.id+" .content #content-input");
    this_content.css({"display":"none"});
    $("#"+card.id+" .content").css({"background-color":"transparent"});
    content_input.css({"display":"block"});
    content_input.attr("value",content);
    content_input.text(content);

    $("#"+card.id+" .content .cancel").css({"display":"inline-block"});
    $("#"+card.id+" .content .change").css({"display":"inline-block"});

    $("#"+card.id+" .content .cancel").attr("onClick","cancel_edit(this)");
    $("#"+card.id+" .content .change").attr("onClick","save_edit(this)");




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



function cancel_edit(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    card_jq.attr("onMouseDown","mouseDown(this,event)");
    card_jq.attr("onMouseUp","up(event)");
    card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
    $("#"+card.id +" .title #title-input").css({"display":"none"});
    $("#"+card.id+" .content #content-input").css({"display":"none"});
    $("#"+card.id+" .content .cancel").css({"display":"none"});
    $("#"+card.id+" .content .change").css({"display":"none"});
    $("#"+card.id +" .title .card-name").css({"display":"block"});
    $("#"+card.id+" .content .card-content-p").css({"display":"block"});
    $("#"+card.id+" .content").css({"background-color":"rgba(255,255,255,0.5)"});

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


function save_edit(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    card_jq.attr("onMouseDown","mouseDown(this,event)");
    card_jq.attr("onMouseUp","up(event)");

    card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
    var card_name=$("#"+card.id +" .title #title-input").val();
    var card_content=$("#"+card.id+" .content #content-input").val();
    var reg=new RegExp("\n","g");
    card_content= card_content.replace(reg,"<br>");
    $("#"+card.id +" .title .card-name").html(card_name);
    $("#"+card.id+" .content .card-content-p p").html(card_content);
    $("#"+card.id +" .title #title-input").css({"display":"none"});
    $("#"+card.id+" .content #content-input").css({"display":"none"});
    $("#"+card.id+" .content .cancel").css({"display":"none"});
    $("#"+card.id+" .content .change").css({"display":"none"});
    $("#"+card.id +" .title .card-name").css({"display":"block"});
    $("#"+card.id+" .content .card-content-p").css({"display":"block"});
    $("#"+card.id+" .content").css({"background-color":"rgba(255,255,255,0.5)"});

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

function set_card_color(obj){
    var card=obj.parentNode.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    var color_class=obj.className.slice(12,obj.className.length);

    card_jq.attr("class","card "+color_class.toString());
    show_menu(obj.parentNode);
}

function show_card_class_input(obj){
    var  card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id);
    var input_block_jq= $("#"+card.id+" .class-input-block");
//    if(input_block_jq.css("display")=="none"){
//
//        card_jq.attr("onMouseDown","function(){}");
//        card_jq.attr("onMouseUp","function(){}");
//
//        input_block_jq.show();
//        show_menu(obj);
//    }else if(input_block_jq.css("display")=="block"){
//
//        $("#"+card.id.toString()).attr("onMouseDown","mouseDown(this,event)");
//        $("#"+card.id.toString()).attr("onMouseDown","Up(event)");
//        input_block_jq.hide();
//    }
    show_menu(obj);
    input_block_jq.show();
    card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
    card_jq.attr("onmousedown","");
    card_jq.attr("onMouseUp","");

}

function change_class_name(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    var card_class=$("#"+card.id.toString()+" .class-input-block .card-class-name-input").val();
    var x=search_arr_by_id(card.id);
    if(x!=false){
        x.category=card_class;
    }
    card_jq.attr("onMouseDown","mouseDown(this,event)");
    card_jq.attr("onMouseUp","up(event)");
    card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
    //show_card_class_input();
    $("#"+card.id+" .class-input-block").hide();
    card_jq.attr("onMouseDown","mouseDown(this,event)");
    show_id();
}

function set_card_id(){
    //hxstr=$.md5(username+new Date().getTime());
    hxstr=$.md5(new Date().getTime().toString());
    return hxstr;

}
function show_id(){
    for(var x =0;x<window.cards_arr.length;x++){
        alert(window.cards_arr[x].category);
    }

}

function search_arr_by_id(yourid){
    var flag=false;
    for(var x =0;x<window.cards_arr.length;x++){
        if(window.cards_arr[x].id==yourid){

            flag=true;
            return window.cards_arr[x];

        }
    }
    if(!flag){
        return false;
    }
}