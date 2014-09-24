/**
 * Created by WunG on 2014/9/4.
 */
function Map() {
this.keys = new Array();
this.data = new Array();
//添加键值对
this.set = function (key, value) {
if (this.data[key] == null) {//如键不存在则身【键】数组添加键名
this.keys.push(value);
}
this.data[key] = value;//给键赋值
};
//获取键对应的值
this.get = function (key) {
return this.data[key];
};
//去除键值，(去除键数据中的键名及对应的值)
this.remove = function (key) {
this.keys.remove(key);
this.data[key] = null;
};
//判断键值元素是否为空
this.isEmpty = function () {
return this.keys.length == 0;
};
//获取键值元素大小
this.size = function () {
return this.keys.length;
};
}

//页面布局对象
function category_layout(category,indexs){
    this.category=category;
    this.indexs=indexs;
    return this;
}

function pairs(id,index){
    this.id=id;
    this.index=index;
    return this;
}

function BuildDictionary() {
    dic = new Object();
    dic.Keys = new Array();      //键数组
    dic.Values = new Array();   //值数组
    return dic;
}

/*添加 key,value*/
function AddItem(key, value, dic) {
    var keyCount = dic.Keys.length;
    if (keyCount > 0) {
        var flag = true;
        for (var i = 0; i < keyCount; i++) {
            if (dic.Keys[i] == key) {
                flag = false;
                break; //如果存在则不添加
            }
        }
        if (flag) {
            dic.Keys.push(key)
            dic.Values.push(value);
        }
    }
    else {
        dic.Keys.push(key)
        dic.Values.push(value);
    }
    return dic;
}
/*更改key,value*/
function UpdateItem(key, value, dic) {
    var keyCount = dic.Keys.length;
    if (keyCount > 0) {
        var flag = -1;
        for (var i = 0; i < keyCount; i++) {
            if (dic.Keys[i] == key) {
                flag = i;
                break; //查找相应的index
            }
        }
        if (flag > -1) {
            dic.Keys[flag] = key;
            dic.Values[flag] = value;
        }
        return dic;
    }
    else {
        return dic;
    }
}
/*移除key value*/
function DeleteItem(key, dic) {
    var keyCount = dic.Keys.length;
    if (keyCount > 0) {
        var flag = -1;
        for (var i = 0; i < keyCount; i++) {
            if (dic.Keys[i] == key) {
                flag = i;
                break; //查找相应的index
            }
        }
        if (flag > -1) {
            dic.Keys.splice(flag,1); //移除
            dic.Values.splice(flag, 1);  //移除
        }
        return dic;
    }
    else {
        return dic;
    }
}

/*获取Key字符串,用符号拼接*/
function  GetKeyStr(separator,dic)
{
  var keyCount=dic.Keys.length;
  if(keyCount>0)
  {
  return dic.Keys.join(separator);
  }
  else
  {
  return '';
  }
}
/*获取Value字符串,用符号拼接*/
function  GetValueStr(separator,dic)
{
  var keyCount=dic.Keys.length;
  if(keyCount>0)
  {
  return dic.Values.join(separator);
  }
  else
  {
  return '';
  }
}



function lastView(category,indexarr){
    this.category=category;
    this.indexarr=indexarr.concat();
    return this;
}

function my_card(id,title,content,index,color,category){
    this.id=(id||"");
    this.title=(title||"请添加标题");
    this.content=(content||"请添加新内容");
    this.index=index;
    this.category=(category||"默认");
    this.color=(color||"color0");
    this.setId=function(id){
        this.id=id;
    };
    this.setCategory=function(category){
        this.category=category;
    };
    this.setColor=function(colorclass){
        this.color=colorclass;
    };
    this.setIndex=function(){
        this.index=index;
    }
    this.setTitle=function(title){
        this.title=title;
    }
    this.setContent=function(content){
        this.content=content;
    }
    return this;
}

function bindlistener(){
    $("#header-plus").attr("onclick","send_add_cards()");
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
    $("#header-save").attr("onclick","send_indexs()");
    $(".icon-new-window").attr("onclick","search_linstener()");
    $("#header-username").attr("onclick","show_user_block()");

    $("#logout").attr("onclick","logout()");

}
function addcard(id,title,content,color){

    var cardnum=$("#container-main").children().length;
    var category;
//    var color="color"+(cardnum%9).toString();
    var color=color;
    if(window.recent_group<=1){
        //card_o=new my_card(id,title,content,window.allcards.length,color,null);
        category="默认";

    }
    else{
        category=window.group_arr[window.recent_group];
        //card_o=new my_card(id,title,content,window.allcards.length,color,category);
    }

    var card_o;
    card_o=new my_card(id,title,content,window.allcards.length,color,category);
    
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
        cards.append("<div class=\"menu\"><div class=\"card-menu-icon set-bell\"><img src=\"../../static/images/bell.png\" title=\"设置提醒\" alt=\"\"/></div><div class=\"card-menu-icon set-class\"><img src=\"../../static/images/class.png\" title=\"设置卡片组\" alt=\"\"/></div><div class=\"card-menu-icon edit\" title=\"编辑卡片\"><img src=\"../../static/images/edit.png\" alt=\"\"/></div><div class=\"card-menu-icon archive\" title=\"归档\"><img src=\"../../static/images/Archive.png\" alt=\"\"/></div><div class=\"card-menu-icon delete\" title=\"删除\"><img src=\"../../static/images/delete.png\" alt=\"\"/></div><div class=\"card-menu-icon colors\" title=\"选择颜色\"><img src=\"../../static/images/colors.png\" alt=\"\" /></div><span class=\"top-arrow\"></span> <div class=\"color-menu\"><span class=\"top-arrow\"></span><div class=\"color-block color0\"></div><div class=\"color-block color1\"></div><div class=\"color-block color2\"></div><div class=\"color-block color3\"></div><div class=\"color-block color4\"></div><div class=\"color-block color5\"></div><div class=\"color-block color6\"></div><div class=\"color-block color7\"></div><div class=\"color-block color8\"></div></div></div>");

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
    send_edit_change(card.id,card_name,card_content);
    var x=search_arr_by_id(card.id);
    x.setTitle(card_name);
    x.setContent(card_content);
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
        send_edit_change(card.id,null,null,color_class);
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
        send_edit_change(card.id,null,null,null,card_class);
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

function search_all_cards_by_val(yourid){
    var flag=false;
    for(var x =0;x<window.allcards.length;x++){
        if(window.allcards[x]==yourid){

            flag=true;
            return x;
        }
    }
    if(!flag){
        return false;
    }
}

function search_all_cards_by_id(yourid){
    var flag=false;
    for(var x =0;x<window.allcards.length;x++){
        if(window.allcards[x].id==yourid){

            flag=true;
            return window.allcards[x];
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
        send_edit_change(card.id,null,null,null,"已归档");
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
    var card_my=search_arr_by_id(card.id);
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
        init_card_position();
    }
    if(isDelete==null){
            window.allcards.remove(card.id);
            window.allcards.reset_index();

        window.cards_arr.remove(card.id);
        window.cards_arr=remove_null_elemt(window.cards_arr);
        window.cards_arr.reset_index();
        $("#"+card.id).animate({left:50,top:120,zoom:0.01,opacity:0},300);
        setTimeout(function(){$("#"+card.id).remove();},500);

        fresh_height_arr();
        reset_col_top(col,0);
        show_map();
        set_container_height();
           // window.allcards=remove_null_elemt(window.allcards);
            //window.cards_arr=remove_null_elemt(window.cards_arr);
        send_delete(card.id);
        remove_null_elemt(window.cards_arr);
        //arr.reset_index();
        window.cards_arr.removeUseless();
        init_card_position();
    }
    else{
        window.cards_arr.remove(card.id);
        window.cards_arr=remove_null_elemt(window.cards_arr);
        window.cards_arr.reset_index();
        $("#"+card.id).animate({left:50,top:120,zoom:0.01,opacity:0},300);
        setTimeout(function(){$("#"+card.id).remove();},500);

        fresh_height_arr();
        reset_col_top(col,0);
        show_map();
        set_container_height();
        remove_null_elemt(window.cards_arr);
        //arr.reset_index();
        window.cards_arr.removeUseless();
        init_card_position();
    }

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

function set_bell(obj){
    var card=obj.parentNode.parentNode;
}

function get_times() {
    var d = new Date();
    var vYear = d.getFullYear();
    var vMon = d.getMonth() + 1;
    var vDay = d.getDate();
    var h = d.getHours(); 
    var m = d.getMinutes(); 
    var se = d.getSeconds();
    //alert(d.toLocaleDateString());

    var mytime=d.toLocaleTimeString();
    //alert(d.toLocaleString());
}

Array.prototype.removeUseless=function(){
    var last_useful_index=-1;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == NaN ||typeof(this[i]) == "undefined"){

        }
        else{
            if(last_useful_index==i-1){
                last_useful_index++;
            }
            else{
                last_useful_index++;
                this[last_useful_index]=this[i];
                this[i]=NaN;
            }
        }
    }
    this.splice(last_useful_index,this.length-last_useful_index-1);
    this.reset_index();
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
Array.prototype.reset_index = function() {
    for(var x=0;x<this.length;x++){
        this[x].index=x;
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
                var temp_Arr1=new Array();
                var temp_Arr2=new Array();
                for(var i=0;i<window.card_num;i++){
                    if(window.allcards.length!=0){
                        var card=new my_card(notes[i].id,notes[i].title,notes[i].content,search_all_cards_by_val(notes[i].id),notes[i].color,notes[i].category);
                    }
                    else{
                        var card=new my_card(notes[i].id,notes[i].title,notes[i].content,notes[i].index,notes[i].color,notes[i].category);
                    }
                    window.cards_arr[card.index]=card;
                    if (find_category(notes[i].category)==-1) {
                            create_new_category(notes[i].category);
                    };

                   //temp_Arr2[notes[i].index]=card;

                    console.log(card);

                };
                    //show_id();
             //window.allcards.removeUseless();
             window.cards_arr.removeUseless();
             window.cards_arr.reset_index();
              //window.allcards=remove_null_elemt(temp_Arr1);
             //window.cards_arr=remove_null_elemt(window.cards_arr);
             window.allcards=cards_arr.concat();
                    //change_group_view();
                    //convert_obj();
             load_last_view();
                }          
         }); 
}
function remove_null_elemt(arr){
    var temp=new Array();
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]==NaN || typeof (arr[i])=="undefined"){

        }else{
            temp.push(arr[i]);
        }
    };
    return temp;
}

function send_add_cards(){
	var cardnum=window.card_num;
	if(isNaN(cardnum)){
		cardnum=0;	
	}
    var color="color"+((cardnum)%9).toString();
    $.ajax({
        type: "POST",
        url: "/do_create_note/",
        data: {title:"请输入标题",content:"请输入内容内容",category:function(){
            if(window.recent_group<=1){
                //card_o=new my_card(id,title,content,window.allcards.length,color,null);
               return "默认";

            }
            else{
                return window.group_arr[window.recent_group];
                //card_o=new my_card(id,title,content,window.allcards.length,color,category);
            }
        },color:color,index:cardnum},
        dataType: "json",
        success: function(resText){

            if(resText.status==0){
                window.card_num++;
                var id=resText.id;
                addcard(id,"请输入标题","请输入内容",color);
                send_indexs();
                show_map();
                //save_layout();
            }

        }
    });

}
function send_edit_change(id,card_name,card_content,color,category){
    if(card_name!=null){
        $.ajax({
            type: "POST",
            url: "/do_update_note/",
            data: {id:id,title:card_name,content:card_content},
            dataType: "json",
            success: function(resText){
                if(resText.status==0){
                    alert("成功保存！");
                }

            }
        });
    }
    else if(color!=null){
        $.ajax({
            type: "POST",
            url: "/do_update_note/",
            data: {id:id,color:color},
            dataType: "json",
            success: function(resText){
                if(resText.status==0){
                }
            }
        });
    }
    else if(category!=null){
        $.ajax({
            type: "POST",
            url: "/do_update_note/",
            data: {id:id,category:category},
            dataType: "json",
            success: function(resText){
                if(resText.status==0){
                    //alert("成功应用更改！");
                }
            }
        });
        //save_layout();
        send_indexs();
    }
}

function send_delete(id){
    $.ajax({
        type: "POST",
        url: "/do_delete_note/",
        data: {id:id},
        dataType: "json",
        success: function(resText){
            if(resText.status==0){
                send_indexs();
                //save_layout();
            }
        }
    });
    //remove_card(obj,)

}
function send_indexs(){
    remove_null_elemt(window.allcards);
    window.allcards.reset_index();
    var layout_arr=new Array();
    //var flag=false;
    //    for(var i=0;i<window.category_layouts.length;i++){
//        if(window.category_layouts[i].category==current_category){
//            window.category_layouts[i]=x;
//            flag=true;
//            break;
//        }
//    }
//    if(!flag){
//        layouts_arr.push(window.category_layouts);
//    }
    //判断是否有当前分组的序列
    if(window.recent_group==1){
        var arr=excute_index();

        var layout=new category_layout(window.group_arr[window.recent_group],arr);
        layout_arr.push(layout);
        layout_arr=JSON.stringify(layout_arr);
    }
    else{
        //先处理全局;
        var arr=new Array();
        for(var i=0;i<window.allcards.length;i++){
            var temp=window.allcards[i];
            var pair=new pairs(temp.id,temp.index);
            arr.push(pair);
        }
        remove_null_elemt(arr);
        arr.removeUseless();
        var layout=new category_layout("全部",arr);
        layout_arr.push(layout);
        //再处理当前分类

        var last_category=window.group_arr[window.recent_group];
        arr=excute_index();
        var layout=new category_layout(last_category,arr);
        layout_arr.push(layout);
        layout_arr=JSON.stringify(layout_arr);
    }


    $.ajax({
        type: "POST",
        url: "/do_update_notes_order/",
        data: {notesorder:layout_arr},
        dataType: "json",
        success: function(resText){
            if(resText.status==0){
                update_index();
            }
        }
    });
}

function get_indexs(){

    $.ajax({
        type: "GET",
        url: "/do_get_notes_order/",
        data: {},
        dataType: "json",
        success: function(resText){
            if(resText.status==0) {
                window.category_layouts=JSON.parse(resText.notesorder.concat());
                //alert(typeof (window.category_layouts));
                console.log(window.category_layouts);
                console.log(resText.notesorder);
                if(window.category_layouts.length==1){
                    var index_arr=new Array();
                    index_arr=window.category_layouts[0].indexs;
                    for(var j=0;j<index_arr.length;j++){
                        window.allcards[(index_arr[j].index)] = index_arr[j].id;
                    }
                    window.lastView=new lastView("全部",index_arr);
                }
                else{
                    var index_arr=new Array();
                    index_arr=window.category_layouts[0].indexs;
                    for(var j=0;j<index_arr.length;j++){
                        window.allcards[(index_arr[j].index)] = index_arr[j].id;
                    }

                    index_arr=window.category_layouts[1].indexs;
                    var last_category=window.category_layouts[1].category;
                    if (find_category(last_category)==-1) {
                        create_new_category(last_category);
                    }
                    window.lastView=new lastView(last_category,index_arr);
                    window.recent_group=find_category(last_category);
                }
                /*
                for (var i = 0; i < window.category_layouts.length; i++) {
                    if(window.category_layouts[i].category=="全部"){
                        var index_arr=new Array();

                        index_arr=window.category_layouts[i].indexs;
                        for(var j=0;j<index_arr.length;j++){

                            window.allcards[(index_arr[j].index)] = index_arr[j].id;

                        }
                    }
                    else{
                        if (find_category(window.category_layouts[i].category)==-1) {
                            create_new_category(window.category_layouts[i].category);
                        }
                        else{
                            var index_arr=new Array();
                            window.lastView=window.category_layouts[i].category;
                            index_arr=window.category_layouts[i].indexs;
                            for(var j=0;j<index_arr.length;j++){

                                window.allcards[(index_arr[j].index)] = index_arr[j].id;

                            }
                        }
                    }
                }
                */
                load_cards();
            }
        }
    });
}

function convert_obj() {
    var arr=new Array();
    for(var i=0;i<window.allcards.length;i++){
        var str=window.allcards[i];
        console.log(str);
        str=JSON.stringify(str);
        arr[i]=str;
        console.log(str);
    }
    var res="["+arr.join(",")+"]";
    save_all_cards(res);

}

function load_last_view(){
    if(window.recent_group==1){//判断到当前卡片组是所有卡片（因为所有并不算是一个分组~）
        //load_cards();
        window.cards_arr=window.allcards.concat();//复制所有卡片数组
    }
    else{
        var target_category=window.lastView.category;
        window.cards_arr=[];
        $("#container-main").children(".card").remove();
        var indexs=window.lastView.indexarr;
        for(var i=0;i<indexs.length;i++){
            var card=search_all_cards_by_id(indexs[i].id);
            window.cards_arr[indexs[i].index]=card;
        }
    }

    var x=$("#group").children(".card-group").first();
    for(var i=0;i<$("#group").children(".card-group").length;i++){
        if(i==window.recent_group){
            index=i;
            x.attr("class","card-group active-group");
        }
        else{
            x.attr("class","card-group");
        }
        x= x.next(".card-group");
    }
    init_map();
    init_card_position();
    bindlistener();
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

function save_layout(){

        var layouts_arr=new Array();
        var current_category=group_arr[window.recent_group];
        var current_indexs=excute_index();
        var x=new category_layout(current_category,current_indexs);
        var flag=false;
        for(var i=0;i<window.category_layouts.length;i++){
            if(window.category_layouts[i].category==current_category){
                window.category_layouts[i]=x;
                flag=true;
                break;
            }
        }
        if(!flag){
            layouts_arr.push(window.category_layouts);
        }

    layouts_arr=JSON.stringify(layouts_arr);
    $.ajax({
        type: "POST",
        url: "/do_update_notes_order/",
        data: {notesorder:layouts_arr},
        dataType: "json",
        success: function(resText){
            if(resText.status==0){
                //alert("post");
            }
        }
    });

}

function excute_index(){
    var arr=new Array();
    var max_row=-1;
    for(var x=0;x<window.col_num;x++){
        if(window.rows_arr[x]>=max_row){
            max_row=window.rows_arr[x];
        }
    }

    for (var j = 0; j < window.cards_arr.length; j++) {
        var new_index=0;
        for(var i=0;i<=max_row;i++){
            for(var k=0;k<window.col_num;k++){
                if(window.my_map[k][i]==window.cards_arr[j].id){
                    var pair=new pairs(window.cards_arr[j].id,new_index);
                    break;
                }
                else if(window.my_map[k][i]==NaN || window.my_map[k][i]=="" || typeof (window.my_map[k][i])=="undefined"){

                }
                else{
                    new_index++;
                }
            }
        }

        arr.push(pair);
    }
    //remove_null_elemt(arr);
    //arr.reset_index();
    //arr.removeUseless();
    console.log(window.my_map);
    return arr;

}

function update_index(){
    var arr=new Array();
    for(var i=0;i<window.allcards.length;i++){
        var temp=window.allcards[i];
        //var pair=new pairs(temp.id,temp.index);
        arr.push(temp.id);
        arr.push(temp.index);
    }
    remove_null_elemt(arr);
    arr.removeUseless();
    arr=JSON.stringify(arr);
    $.ajax({
        type: "POST",
        url: "/do_update_indexes/",
        data: {pairs:arr},
        dataType: "json",
        success: function(resText){
            if(resText.status==0){
                alert("post");
            }
        }
    });
}