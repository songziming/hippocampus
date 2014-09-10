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
    this.category=(category||"默认");
    this.color=(color||"color0");
    this.setCategory=function(category){
        this.category=category;
    };
    this.setColor=function(colorclass){
        this.color=colorclass;
    }
    return this;
}

function bindlistener(){
    $("#header-plus").attr("onclick","addcard(\"新卡片\",\"请填写你的内容\")");
    $(".menu").attr("onblur","show_menu(this.parentNode)");
    $(".card-action").attr("onclick","show_menu(this)");
    $(".colors").attr("onclick","show_color_board(this)");
    $(".edit").attr("onclick","create_edit_control(this)");
    $(".color-block").attr("onclick","set_card_color(this)");
    $(".set-class").attr("onclick","show_card_class_input(this)");
    $(".change-class-yes").attr("onclick","change_class_name(this)");
    $(".change-class-no").attr("onclick","cancel_change_class_name(this)");
    $(".archive").attr("onclick","archive(this)");
    $(".delete").attr("onclick","remove_card(this)");
}
function addcard(title,content){

    var cardnum=$("#container-main").children().length;
    var id=set_card_id();
    var color="color"+(cardnum%9).toString();
    var card_o;
    if(window.recent_group<=1){
            card_o=new my_card(id,title,content,window.allcards.length,color,null);
            
    }
    else{
        var target_category=window.group_arr[window.recent_group];
        card_o=new my_card(id,title,content,window.allcards.length,color,target_category);
    }
    console.log(card_o);
    $("#container-main").append('<div  id=\"'+id+'\" onMouseDown=\"mouseDown(this,event)\" onMouseUp=\"up(event)\"> <div class=\"title\"><span class=\"card-name\">'+title+'</span><span class=\"card-action fa-bars fa\"></span></div><div class=\"content\" ><div class=\"card-content-p\"><p></p></div></div></div>');
    var cards=$("#"+id.toString());

    cards.attr("class","card "+color);
    card_o.setColor(color);
    window.cards_arr.push(card_o);
    window.allcards.push(card_o);

    if(cardnum>=window.col_num){
         


            var lowest=find_lowest_colum();
            var card_left=window.container_left_edge+(lowest)*window.card_width;
            var card_top=window.col_height_arr[lowest];
            if((typeof(card_top)=="undefined")){
                card_top=80;
            }
            cards.animate({opacity:'show',left:card_left.toString()+"px",top:card_top.toString()+"px"},200,"linear");
            window.rows_arr[lowest]++;
            var card_height=parseInt(cards.outerHeight());
            window.col_height_arr[lowest]+=card_height+10;
            window.my_map[lowest][(window.rows_arr[lowest])]=cards.attr("id");
   
    }
    else{
            var lowest=cardnum;
            var card_left=window.container_left_edge+(lowest)*window.card_width;
            var card_top=window.col_height_arr[lowest];
            if((typeof(card_top)=="undefined")){
            card_top=80;
            }
            cards.animate({opacity:'show',left:card_left.toString()+"px",top:card_top.toString()+"px"},200,"linear");
             var card_height=cards.outerHeight();
            window.rows_arr[lowest]=0;
            var card_height=parseInt(cards.outerHeight());
            window.col_height_arr[lowest]+=card_height+10;
            window.my_map[lowest][0]=cards.attr("id");
    }
 if(($("#"+id.toString()+" .menu")).length<=0){
        $("#"+id.toString()+" .card-content-p p").text(content);
        cards.append("<div class=\"menu\"><div class=\"card-menu-icon set-class\"><img src=\"../../static/images/class.png\" title=\"设置卡片组\" alt=\"\"/></div><div class=\"card-menu-icon edit\" title=\"编辑卡片\"><img src=\"../../static/images/edit.png\" alt=\"\"/></div><div class=\"card-menu-icon archive\" title=\"归档\"><img src=\"../../static/images/Archive.png\" alt=\"\"/></div><div class=\"card-menu-icon delete\" title=\"删除\"><img src=\"../../static/images/delete.png\" alt=\"\"/></div><div class=\"card-menu-icon colors\" title=\"选择颜色\"><img src=\"../../static/images/colors.png\" alt=\"\" /></div><span class=\"top-arrow\"></span> <div class=\"color-menu\"><span class=\"top-arrow\"></span><div class=\"color-block color0\"></div><div class=\"color-block color1\"></div><div class=\"color-block color2\"></div><div class=\"color-block color3\"></div><div class=\"color-block color4\"></div><div class=\"color-block color5\"></div><div class=\"color-block color6\"></div><div class=\"color-block color7\"></div><div class=\"color-block color8\"></div></div></div>");

        $("#"+id.toString()+" .title").append('<input'+' id=\"title-input\" placeholder=\"请输入标题\">');

        $("#"+id.toString()+" .content").append('<textarea'+' id=\"content-input\"><\/textarea>');

        $("#"+id.toString()+" .content").append('<div class=\"cancel\">取消</div><div class=\"change\">保存</div>');

        $("#"+id.toString()).append('<div class=\"class-input-block\"><input type=\"text\"  class=\"card-class-name-input\" ><div class=\"change-class-no\">取消</div><div class=\"change-class-yes\">确定</div></div>');
    }

    $("#"+id.toString()+" .card-action").attr("onclick","show_menu(this)");
    $("#"+id.toString()+" .colors").attr("onclick","show_color_board(this)");
    $("#"+id.toString()+" .edit").attr("onclick","create_edit_control(this)");
    $("#"+id.toString()+" .archive").attr("onclick","archive(this)");
    $("#"+id.toString()+" .color-block").attr("onclick","set_card_color(this)");
    $("#"+id.toString()+" .set-class").attr("onclick","show_card_class_input(this)");
    $("#"+id.toString()+" .change-class-yes").attr("onclick","change_class_name(this)");
    $("#"+id.toString()+".change-class-no").attr("onclick","cancel_change_class_name(this)");
    $("#"+id.toString()+".delete").attr("onclick","remove_card(this)");
    set_float_card_in_colum_position(cards);
    fresh_height_arr();
    //add_missing_cards();
    show_map();
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
    var x=search_arr_by_id(card.id);
    if(x!=false){
        x.setColor(color_class);
    }
    //show_id();
    show_menu(obj.parentNode);
}

function show_card_class_input(obj){
    var  card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id);
    var input_block_jq= $("#"+card.id+" .class-input-block");
    show_menu(obj);
    input_block_jq.show();
    card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
    card_jq.attr("onmousedown","");
    card_jq.attr("onMouseUp","");

}

function change_class_name(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    $("#"+card.id+" .class-input-block").hide();
        card_jq.attr("onMouseDown","mouseDown(this,event)");
        card_jq.attr("onMouseUp","up(event)");
        card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
        //show_card_class_input()
        card_jq.attr("onMouseDown","mouseDown(this,event)");
    var card_class=$("#"+card.id.toString()+" .class-input-block .card-class-name-input").val();
    var old_category=search_arr_by_id(card.id).category;
    if(card_class==old_category){
	//类名没变，什么也不做
    }
    else if(card_class==""){
        alert("卡片组名不能为空!");
    }
    else{
        var x=search_arr_by_id(card.id);
        if(x!=false ){
            var find_res=find_category(card_class);
            if(find_res==-1){                       //没有找到这个分类
                create_new_category(card_class);//创建新的分类
            }
		//如果当前分类是全部，那么不做，否则从当前数组和视图中去除这个卡片；
            if(window.recent_group==1){

            }else{
                    remove_card(obj,1);
            }
        }
         x.setCategory(card_class);
    }
}

function cancel_change_class_name(obj){
    var card=obj.parentNode.parentNode;
    var card_jq=$("#"+card.id.toString());
    var card_class=$("#"+card.id.toString()+" .class-input-block .card-class-name-input").val();

    card_jq.attr("onMouseDown","mouseDown(this,event)");
    card_jq.attr("onMouseUp","up(event)");
    card_jq.css({"-webkit-user-select":"none","-ms-user-select":"none"});
    //show_card_class_input();

    $("#"+card.id+" .class-input-block").hide();
    card_jq.attr("onMouseDown","mouseDown(this,event)");

}

function set_card_id(){
    //hxstr=$.md5(username+new Date().getTime());
    hxstr=$.md5($("#header-username").html()+new Date().getTime().toString());
    return hxstr;

}
function show_id(){
    for(var x =0;x<window.cards_arr.length;x++){
        console.log(x.toString()+" --- "+window.cards_arr[x].id);
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

function find_category(category){
    var flag=-1;
    for(var i=0;i<window.group_arr.length;i++){
        if(window.group_arr[i]==category){
            flag=i;
            break;
        }
    }
    return flag;

}

function create_new_category(category){
    //console.log(window.group_arr);
    window.group_arr[(window.group_arr.length)]=category;

    $("#group").append("<div class=\"card-group\" id=\"user-group"+find_category(category).toString()+"\">"+category.toString()+"</div>");
    //alert("已创建分组： "+category);
    set_sidebar_active();
}
function move_card_to_another_category(){

}

function archive(obj){
    var card=obj.parentNode.parentNode;
    var x=search_arr_by_id(card.id);
    if(x!=false){
        x.setCategory("已归档");
        remove_card(obj,1);
    }else{
        alert("对不起，无法归档！请稍后再试~");
    }
    show_menu(obj);
    //show_id();
}

function remove_card(obj,isDelete){
    show_menu(obj);
    
    var card=obj.parentNode.parentNode;

    var pos=get_col_row($("#"+card.id));
    var col=pos[0];
    var row=pos[1];


    if(window.rows_arr[col]>0){
        if(row==window.rows_arr[col]){
            window.my_map[col][row]="";
            window.rows_arr[col]--;
        }
        else{
            for (var i = row; i < window.rows_arr[col]; i++) {
                window.my_map[col][i]=window.my_map[col][i+1];
            }
            window.rows_arr[col]--;
        }
    }
    else{
        window.my_map[col][0]="";
        window.rows_arr[col]=0;
    }
    if(isDelete==null){
            window.allcards.remove(card.id);
    }
    window.cards_arr.remove(card.id);
    $("#"+card.id).animate({left:50,top:120,zoom:0.01,opacity:0},300);
   setTimeout(function(){$("#"+card.id).remove();},500); 

    fresh_height_arr();
    reset_col_top(col,0);
    show_map();
    set_container_height();
    //发送消息
}


function hide_side_bar(){
    if($("#group").css("left")=="0px"){
        $("#group").animate({left:'-110'},500);
        $("#hide-bar span").attr("class","fa-angle-double-right fa");
        $("#hide-bar").animate({right:'-50'},300);

    }
    else{
        $("#group").animate({left:'0px'},500);
        $("#hide-bar span").attr("class","fa-angle-double-left fa");
        $("#hide-bar").animate({right:'0px'},300);

    }
}

function set_sidebar_active(){
    $(".card-group").click(function () {
        var id=this.id;
        var index=-1;
        var x=$("#group").children(".card-group").first();
        for(var i=0;i<$("#group").children(".card-group").length;i++){
            if(x.attr("id")==id){
                index=i;
                x.attr("class","card-group active-group");
                if(window.recent_group!=i){
                    //alert(i);
                    console.log(window.group_arr);
                    window.recent_group=i;
                    change_group_view();
                }
            }
            else{
                x.attr("class","card-group");
            }
            x= x.next(".card-group");
        }

    });
}



//寻找数组中的指定元素下标
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//删除数组中的指定下表元素
Array.prototype.remove = function(val) {
    var index=-1;
    for(var x=0;x<this.length;x++){
        if(this[x].id==val){
            index=x;
        }
    }
    if (index > -1) {
        this.splice(index, 1);
    }
};

function load_cards(){
         $.ajax({
         type: "GET",
         url: "/do_get_notes/",
         data: {},
         dataType: "json",
         success: function(resText){
                console.log(resText);
                var status=resText["status"];
                console.log(status);
                var notes=resText["notes"];
                window.card_num=notes.length;
                for(var i=0;i<window.card_num;i++){
                    var card=new my_card(notes[i].id,notes[i].title,notes[i].content,notes[i].index,null,notes[i].category);
                    if (find_category(notes[i].category)==-1) {
                            create_new_category(notes[i].category);
                    };
                    window.cards_arr[notes[i].index]=card;
                    window.allcards[notes[i].index]=card;
                    console.log(card);

                };
                    show_id();
                    change_group_view();
                }          
         }); 
}

function change_group_view(){
    var new_group_No=window.recent_group;

    if(new_group_No==1){//判断到当前卡片组是所有卡片（因为所有并不算是一个分组~）
        //load_cards();
        window.cards_arr=window.allcards.concat();//复制所有卡片数组
    }
    else{
        var target_category=window.group_arr[new_group_No];
        //alert(target_category);
        window.cards_arr=[];
        $("#container-main").children(".card").remove();
        for(var i=0;i<window.allcards.length;i++){
            if(window.allcards[i].category==target_category){
                cards_arr.push(window.allcards[i]);
            }
        } 
    }
    init_map();
    init_card_position();
    bindlistener();
}
