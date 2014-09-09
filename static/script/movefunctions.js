/**
 * Created by WunG on 2014/9/4.
 */
function init_window_val(){
    //验证是否按下鼠标左键的变量
    window.down=false;
//分别为鼠标x轴y轴，div层坐标x轴y轴
    window.mX;
    window.mY;
    window.dX;
    window.dY;
    window.target;
//当鼠标左键点指定div时触发
    window.old_left;
    window.old_top;
    window.container_top=80 ;
    // window.card_width=$(".card").width()+10;
    window.card_width=250;
    window.allcards=new Array();

    window.cards_arr=new Array();
//var window.container_left_edge=Math.floor($("#container-main").offset().left);
    window.container_left_edge=50;
//alert(window.container_left_edge);
    window.container_width=Math.floor($("#container-main").width());
    //window.concatainer_width=250;
    window.col_num=Math.floor(window.container_width/window.card_width);
    window.col_height_arr=new Array([80]);
    window.heightest_length=0;
    window.group_arr=new Array(["默认","全部","已归档"]);
    window.recent_group=1;


    window.map_x=16;//每页最多有多少列
    window.map_y=100;//每页最多有多少行
    window.my_map=new Array(window.map_x);//保存卡片位置的二维数组：
    window.my_top_map=new Array(window.map_x);//记录cardtop的二维数组！
    window.rows_arr=new Array([0]);


}
function mouseDown(obj,event)
{
    fresh_height_arr();
    var event=event||window.event;
    window.target=obj;
    //window.old_left=obj.attr("left");
    //window.old_top=obj.attr("top");
    var id=obj.id;
    var target_jq=$("#"+id);
    var position=get_col_row(target_jq);
    var position_col=position[0];
    var position_row=position[1];
    window.old_top=excute_top(position_col,position_row);

    window.old_left=window.container_left_edge+window.card_width*position_col;

    //$("#card0 .card-name").text(window.old_left+"  "+window.old_top);
    window.down=true;//鼠标左键在点住期间，window.down值为true
    window.mX=event.clientX;//获得鼠标坐标，并记录当前坐标给变量
    window.mY=event.clientY;//获得鼠标坐标，并记录当前坐标给变量，以便后面计算
    //$("#card3 .card-content-p").text("x"+window.mX.toString()+" y"+mY.toString());
    window.dX=parseInt($(obj).offset().left);//获得div1（这是层的Id值）的坐标，因为本来是px的字符串，所以要取其中的整数值
    window.dY=parseInt($(obj).offset().top);//parseInt()就是用来截取整数值的方
    //$("#card3 .card-name").text("down!");
    //move();
}
//鼠标左键松开时触发up事件
function up(event)
{
    var event=event||window.event;
    //$("#card3 .card-name").text("up!");
    //如果down为true时，因为鼠标左键不按状态下都属于up事件，所以要加上验证
    if(window.down)
    {
        window.down=false;//设置down为false，表示左键没有点住
        //alert("")
        set_float_card_in_colum_position($("#"+window.target.id.toString()),event.pageX,event.pageY);

        //add_missing_cards();
    }

}
//鼠标在指定区域移动时会触发此事件
function move(event)
{
    //必先判断鼠标左键已被在指定区域按下
    var event=event||window.event;
    if(window.down){
        //设置该层坐标等于原坐标加上鼠标移动的坐标
        $(window.target).css({left:(window.dX+event.clientX-window.mX).toString()+"px",top:(window.dY+event.clientY-window.mY).toString()+"px"});

        var target_jq=$("#"+window.target.id.toString());
        var recent_card_left=target_jq.offset().left;
        var recent_col_No=Math.floor((event.clientX-window.container_left_edge)/window.card_width);

        if(recent_col_No<0){
            recent_col_No=0;
        }
        else if(recent_col_No>=window.col_num){
            recent_col_No=window.col_num-1;
        }


        if((event.pageY)>=(window.old_top+target_jq.outerHeight())){
            var pos=get_col_row(target_jq);
            var col=pos[0];
            var row=pos[1];

            if(col==-1 || row==-1){
                set_float_card_in_colum_position(target_jq,event.pageX,event.pageY);
            }
            else{
                window.old_top=window.my_top_map[col][row];
            }

            var downside_col_No=get_Row_No(window.target,recent_col_No);

            if(downside_col_No==window.rows_arr[recent_col_No]){
                //alert("1!!");
            }
            else{
                exchange_down();
            }
        }

        //鼠标向上越界，交换
        if((event.pageY)<=(window.old_top-10)){
            var pos=get_col_row(target_jq);
            var col=pos[0];
            var row=pos[1];

            if(col==-1 || row==-1){
                set_float_card_in_colum_position(target_jq,event.pageX,event.pageY);
            }
            else{
                window.old_top=window.my_top_map[col][row];
            }

            var upside_col_No=get_Row_No(window.target,recent_col_No);

            if(upside_col_No==0){
                //continue;
            }
            else{
                exchange_up();
            }
        }

        //鼠标向左越界，交换
        if(event.pageX<(window.old_left-10)){
            if(recent_col_No>=0 && recent_col_No<window.col_num){
                exchange_left(recent_col_No,event.pageY);
            }
            else{
                //do nothing
            }

        }

        //鼠标向右越界，交换
        if(event.pageX>(window.old_left+window.card_width)){
            if((recent_col_No>0) && (recent_col_No<window.col_num)){

                exchange_right(recent_col_No,event.pageY);
            }
            else{
                //do nothing
            }

        }

    }
}
//初始化位置信息
function init_map(){
    for(var counter_x=0;counter_x<window.map_x;counter_x++){
        window.my_map[counter_x]=new Array(window.map_y);
        window.my_top_map[counter_x]=new Array(window.map_y);
        for(var counter_y=0;counter_y<window.map_y;counter_y++){
            window.my_map[counter_x][counter_y]="";
            window.my_top_map[counter_x][counter_y]=0;
        }
    }
}

function init_card_position(){
        $("container-main").children(".card").remove();
    //var card_num=$("#container-main").children(".card").length;
    var card_num=window.cards_arr.length;
    //alert(card_num);
    //var cards=$("#container-main").children(".card").first();
    //初始化第一行

    if(window.col_num>=card_num){

        window.col_height_arr=new Array(card_num);
        window.rows_arr=new Array(window.col_num);


        for(var i=0;i<card_num;i++){
            var cards=window.cards_arr[i];
            var card_left=window.container_left_edge+i*window.card_width;
            var id=cards.id;
           

            window.my_map[i][0]=cards.id;
            window.rows_arr[i]=0;

            
            $("#container-main").append('<div  id=\"'+id+'\" onMouseDown=\"mouseDown(this,event)\" onMouseUp=\"up(event)\" class=\"card '+cards.color+'\"> <div class=\"title\"><span class=\"card-name\">'+cards.title+'</span><span class=\"card-action fa-bars fa\"></span></div><div class=\"content\" ><div class=\"card-content-p\"><p>'+ cards.content +'</p></div></div></div>');
            cards=$("#"+id);
            window.col_height_arr[i]=cards.outerHeight();
            
             cards.animate({opacity:'show',left:card_left.toString()+"px"},200,"linear");
            //var card_o=new my_card(id);
            //window.cards_arr.push(card_o);

            if(($("#"+id.toString()+" .menu")).length<=0){

                cards.append("<div class=\"menu\"><div class=\"card-menu-icon set-class\"><img src=\"../../static/images/class.png\" title=\"设置卡片组\" alt=\"\"/></div><div class=\"card-menu-icon edit\" title=\"编辑卡片\"><img src=\"../../static/images/edit.png\" alt=\"\"/></div><div class=\"card-menu-icon archive\" title=\"归档\"><img src=\"../../static/images/Archive.png\" alt=\"\"/></div><div class=\"card-menu-icon delete\" title=\"删除\"><img src=\"../../static/images/delete.png\" alt=\"\"/></div><div class=\"card-menu-icon colors\" title=\"选择颜色\"><img src=\"../../static/images/colors.png\" alt=\"\" /></div><span class=\"top-arrow\"></span> <div class=\"color-menu\"><span class=\"top-arrow\"></span><div class=\"color-block color0\"></div><div class=\"color-block color1\"></div><div class=\"color-block color2\"></div><div class=\"color-block color3\"></div><div class=\"color-block color4\"></div><div class=\"color-block color5\"></div><div class=\"color-block color6\"></div><div class=\"color-block color7\"></div><div class=\"color-block color8\"></div></div></div>");

                $("#"+id.toString()+" .title").append('<input'+' id=\"title-input\" placeholder=\"请输入标题\">');

                $("#"+id.toString()+" .content").append('<textarea'+' id=\"content-input\"><\/textarea>');

                $("#"+id.toString()+" .content").append('<div class=\"cancel\">取消</div><div class=\"change\">保存</div>');

                $("#"+id.toString()).append('<div class=\"class-input-block\"><input type=\"text\"  class=\"card-class-name-input\" ><div class=\"change-class-no\">取消</div><div class=\"change-class-yes\">确定</div></div>');
            }

        }
        set_container_height();
        show_map();


    }

    else{

        window.col_height_arr=new Array(window.col_num);
        window.rows_arr=new Array(window.col_num);
        //初始化第一行
        for(var i=0;i<window.col_num;i++){
            var cards=window.cards_arr[i];
            var card_left=window.container_left_edge+i*window.card_width;
            var id=cards.id;
           

            window.my_map[i][0]=cards.id;
            window.rows_arr[i]=0;

            
            $("#container-main").append('<div  id=\"'+id+'\" onMouseDown=\"mouseDown(this,event)\" onMouseUp=\"up(event)\" class=\"card '+cards.color+'\"> <div class=\"title\"><span class=\"card-name\">'+cards.title+'</span><span class=\"card-action fa-bars fa\"></span></div><div class=\"content\" ><div class=\"card-content-p\"><p>'+ cards.content +'</p></div></div></div>');
            cards=$("#"+id);
            window.col_height_arr[i]=cards.outerHeight();
            
             cards.animate({opacity:'show',left:card_left.toString()+"px"},200,"linear");
            //var card_o=new my_card(id);
            //window.cards_arr.push(card_o);

            if(($("#"+id.toString()+" .menu")).length<=0){

                cards.append("<div class=\"menu\"><div class=\"card-menu-icon set-class\"><img src=\"../../static/images/class.png\" title=\"设置卡片组\" alt=\"\"/></div><div class=\"card-menu-icon edit\" title=\"编辑卡片\"><img src=\"../../static/images/edit.png\" alt=\"\"/></div><div class=\"card-menu-icon archive\" title=\"归档\"><img src=\"../../static/images/Archive.png\" alt=\"\"/></div><div class=\"card-menu-icon delete\" title=\"删除\"><img src=\"../../static/images/delete.png\" alt=\"\"/></div><div class=\"card-menu-icon colors\" title=\"选择颜色\"><img src=\"../../static/images/colors.png\" alt=\"\" /></div><span class=\"top-arrow\"></span> <div class=\"color-menu\"><span class=\"top-arrow\"></span><div class=\"color-block color0\"></div><div class=\"color-block color1\"></div><div class=\"color-block color2\"></div><div class=\"color-block color3\"></div><div class=\"color-block color4\"></div><div class=\"color-block color5\"></div><div class=\"color-block color6\"></div><div class=\"color-block color7\"></div><div class=\"color-block color8\"></div></div></div>");

                $("#"+id.toString()+" .title").append('<input'+' id=\"title-input\" placeholder=\"请输入标题\">');

                $("#"+id.toString()+" .content").append('<textarea'+' id=\"content-input\"><\/textarea>');

                $("#"+id.toString()+" .content").append('<div class=\"cancel\">取消</div><div class=\"change\">保存</div>');

                $("#"+id.toString()).append('<div class=\"class-input-block\"><input type=\"text\"  class=\"card-class-name-input\" ><div class=\"change-class-no\">取消</div><div class=\"change-class-yes\">确定</div></div>');
            }
            set_container_height();
        }

        //初始化高度数组
        for(var j=0;j<window.col_num;j++){
            window.col_height_arr[j]=parseInt(cards.offset().top)+parseInt(cards.outerHeight());


            cards=cards.next(".card");
        }
        //循环添加
        for(var k=window.col_num;k<card_num;k++){
            var cards=window.cards_arr[k];
            var lowest=find_lowest_colum();
            var card_left=window.container_left_edge+(lowest)*window.card_width;
            var card_top=window.col_height_arr[lowest];
            var id=cards.id;

             $("#container-main").append('<div  id=\"'+id+'\" onMouseDown=\"mouseDown(this,event)\" onMouseUp=\"up(event)\" class=\"card '+cards.color+'\"> <div class=\"title\"><span class=\"card-name\">'+cards.title+'</span><span class=\"card-action fa-bars fa\"></span></div><div class=\"content\" ><div class=\"card-content-p\"><p>'+ cards.content +'</p></div></div></div>');
            cards=$("#"+id);

            cards.animate({opacity:'show',left:card_left.toString()+"px",top:card_top.toString()+"px"},200,"linear");
            var card_height=parseInt(cards.outerHeight());
            window.col_height_arr[lowest]+=card_height+10;
            var col_No=Math.floor((card_left-window.container_left_edge)/window.card_width);
            window.rows_arr[col_No]++;
            window.my_map[col_No][(window.rows_arr[col_No])]=id;

            if(($("#"+id.toString()+" .menu")).length<=0){

                cards.append("<div class=\"menu\"><div class=\"card-menu-icon set-class\"><img src=\"../../static/images/class.png\" title=\"设置卡片组\" alt=\"\"/></div><div class=\"card-menu-icon edit\" title=\"编辑卡片\"><img src=\"../../static/images/edit.png\" alt=\"\"/></div><div class=\"card-menu-icon archive\" title=\"归档\"><img src=\"../../static/images/Archive.png\" alt=\"\"/></div><div class=\"card-menu-icon delete\" title=\"删除\"><img src=\"../../static/images/delete.png\" alt=\"\"/></div><div class=\"card-menu-icon colors\" title=\"选择颜色\"><img src=\"../../static/images/colors.png\" alt=\"\" /></div><span class=\"top-arrow\"></span> <div class=\"color-menu\"><span class=\"top-arrow\"></span><div class=\"color-block color0\"></div><div class=\"color-block color1\"></div><div class=\"color-block color2\"></div><div class=\"color-block color3\"></div><div class=\"color-block color4\"></div><div class=\"color-block color5\"></div><div class=\"color-block color6\"></div><div class=\"color-block color7\"></div><div class=\"color-block color8\"></div></div></div>");

                $("#"+id.toString()+" .title").append('<input'+' id=\"title-input\" placeholder=\"请输入标题\">');

                $("#"+id.toString()+" .content").append('<textarea'+' id=\"content-input\"><\/textarea>');

                $("#"+id.toString()+" .content").append('<div class=\"cancel\">取消</div><div class=\"change\">保存</div>');

                $("#"+id.toString()).append('<div class=\"class-input-block\"><input type=\"text\"  class=\"card-class-name-input\" ><div class=\"change-class-no\">取消</div><div class=\"change-class-yes\">确定</div></div>');

            }
            
            set_container_height();
        }
        //根据高度自动填充剩余card

    }

}
function colum_num_listener(){
    if($(window).width()<=780){
        window.container_left_edge=Math.floor($(window).width()/20);
        var new_col_num=Math.floor($("#container-main").width()/window.card_width);
        window.card_width=$(".card").width()+10;
        if(new_col_num<window.col_num){
            window.col_num=new_col_num;
            init_card_position();
            bindlistener();
        }
        else if(new_col_num>window.col_num){
            window.col_num=new_col_num;
            //列数变多需要重新定位置
            var card_num=$("#container-main").children(".card").length;
            cards=$("#container-main").children(".card").first();

            for(var i=0;i<card_num;i++){

                cards.css({left:"60px",top:"80px"});
                cards.hide(20);

                cards=cards.next(".card");
            }

            init_card_position();
            window.heightest_length=0;
            bindlistener();
        }
        init_card_position();
        window.heightest_length=0;
        bindlistener();
    }
    else{
        var new_col_num=Math.floor($("#container-main").width()/window.card_width);
        window.card_width=$(".card").width()+10;
        if(new_col_num<window.col_num){
            window.col_num=new_col_num;
            init_card_position();
            bindlistener();
        }
        else if(new_col_num>window.col_num){
            window.col_num=new_col_num;
            //列数变多需要重新定位置
            var card_num=$("#container-main").children(".card").length;
            cards=$("#container-main").children(".card").first();

            for(var i=0;i<card_num;i++){

                cards.css({left:"60px",top:"80px"});
                cards.hide(20);

                cards=cards.next(".card");
            }

            init_card_position();
            window.heightest_length=0;
            bindlistener();
        }
    }

}
function find_lowest_colum(){
    var lowest_no=0;

    for(var i=0;i<window.col_num;i++){

        if(window.col_height_arr[i]<window.col_height_arr[lowest_no]){
            lowest_no=i;
        }
        if(window.col_height_arr[i]>window.heightest_length){
            window.heightest_length=window.col_height_arr[i];
            $("#container-main").css({"height":(window.heightest_length+100).toString()+"px"});
        }
    }
    return lowest_no;
}
function set_container_height(){
    var heightest_length=window.container_top;
    for(var i=0;i<window.col_num;i++){
        if(window.col_height_arr[i]>heightest_length){
            heightest_length=window.col_height_arr[i];
        }
    }
    $("#container-main").css({"height":(heightest_length+100).toString()+"px"});

}



function set_float_card_in_colum_position(cards,mX,mY){

    var my_card=cards;
    var card_position=get_col_row(my_card);
    var recent_col=card_position[0];
    var recent_row=card_position[1];
    if(recent_col>-1 && recent_row>-1){
        var target_top=window.my_top_map[recent_col][recent_row];
        if(target_top<=window.container_top+10){
            target_top=window.container_top;
        }

        var target_left=window.container_left_edge+window.card_width*recent_col;
        my_card.css({left:target_left.toString()+"px",top:target_top.toString()+"px"});
    }
    set_container_height();

}
function find_null_map_value() {
    for(var i=0;i<window.col_num;i++){
        for(var j=0;j<=window.rows_arr[i];j++){
            if((window.my_map[i][j])==""){
                old_col=i;
                old_row=j;
                return[i,j];
                break;
            }
        }
    }
}
function fresh_height_arr() {
    for(var i=0;i<window.col_num;i++){
        window.col_height_arr[i]=window.container_top ;
        window.my_top_map[i][0]=window.container_top ;
        for(var j=0;j<=window.rows_arr[i];j++){
            window.col_height_arr[i]+=$("#"+window.my_map[i][j]).outerHeight()+10;

            if(window.rows_arr[i]>0 && j>0){
                if(typeof (window.my_map[i][j-1])=="undefined") {
                    window.my_map[i][j-1]=window.my_map[i][j];
                    window.my_top_map[i][j-1]=window.my_top_map[i][j];
                }
                else{
                    window.my_top_map[i][j] = window.my_top_map[i][j - 1] + $("#" + window.my_map[i][j - 1].toString()).outerHeight() + 10;
                }

            }


        }
        //console.log(i+"  "+j+"  "+ window.col_height_arr[i]);

    }
}
//向上移动
function exchange_up(){

    var target_jq=$("#"+window.target.id.toString());
    var target_Col_No=Math.floor((window.old_left-window.container_left_edge)/window.card_width);
    var row_No=get_Row_No(window.target,target_Col_No);
    //向上移动

    var up_id=window.my_map[target_Col_No][(row_No-1)];
    var target_up_obj=$("#"+up_id.toString());
    var temp=window.old_top-target_up_obj.outerHeight()+10;


    if(temp<=90){
        temp=80;
    }
//

    var target_up_obj_new_top=window.old_top+target_jq.outerHeight()-target_up_obj.outerHeight()-10;

    if(target_up_obj_new_top<=window.container_top +20){
        target_up_obj_new_top=window.container_top ;
    }
    target_up_obj.css({top:(target_up_obj_new_top).toString()+"px"},1000);

    window.my_map[target_Col_No][row_No]=up_id;
    window.my_map[target_Col_No][(row_No-1)]=window.target.id;
    fresh_height_arr();



    window.old_top=temp;

    set_float_card_in_colum_position(target_up_obj);

}
//向下移动
function exchange_down(){
    var target_jq=$("#"+window.target.id.toString());
    var target_Col_No=Math.floor((window.old_left-window.container_left_edge)/window.card_width);
    var row_No=get_Row_No(window.target,target_Col_No);

    var down_id=window.my_map[target_Col_No][(row_No+1)];
    var target_down_obj=$("#"+down_id.toString());
    var temp=window.old_top+target_down_obj.outerHeight();





    var target_down_obj_new_top=window.old_top;

    if(target_down_obj_new_top<=90){
        target_down_obj_new_top=80;
    }

    target_down_obj.css({top:(target_down_obj_new_top).toString()+"px"});

    window.my_map[target_Col_No][row_No]=down_id;
    window.my_map[target_Col_No][(row_No+1)]=window.target.id;

    fresh_height_arr();


    window.old_top=temp;

    set_float_card_in_colum_position(target_down_obj);

}
//向左移动
function exchange_left(col,mouse_y) {
    var target_jq=$("#"+window.target.id.toString());
    var left_Col_No=col;
    var row_No=get_Row_No(window.target,col+1);


    for(var i=0;i<=window.rows_arr[left_Col_No];i++){
        var obj=$("#"+window.my_map[left_Col_No][i]);
        if((obj.offset().top)<=mouse_y && (obj.offset().top+obj.outerHeight())>=mouse_y){
            obj.css({left:window.old_left+"px",top:window.old_top+"px"},200);
            window.my_map[col+1][row_No]=window.my_map[left_Col_No][i];
            window.my_map[left_Col_No][i]=window.target.id;
            window.old_left=col*window.card_width+window.container_left_edge;
            window.old_top=obj.offset().top;
            fresh_height_arr();

            window.old_top=window.my_top_map[col+1][row_No];

            reset_col_top(col+1,row_No);
            reset_col_top(col,i);
            set_float_card_in_colum_position(obj);
            break;
        }
    }

}
//向右移动
function exchange_right(col,mouse_y) {
    var target_jq=$("#"+window.target.id.toString());
    var right_Col_No=col;
    var row_No=get_Row_No(window.target,col-1);


    for(var i=0;i<=window.rows_arr[right_Col_No];i++){
        var obj=$("#"+window.my_map[right_Col_No][i]);
        if((obj.offset().top)<=mouse_y && (obj.offset().top+obj.outerHeight())>=mouse_y){
            obj.css({left:window.old_left+"px",top:window.old_top+"px"},200);
            window.my_map[col-1][row_No]=window.my_map[right_Col_No][i];
            window.my_map[right_Col_No][i]=window.target.id;
            window.old_left=col*window.card_width+window.container_left_edge;
            window.old_top=obj.offset().top;
            fresh_height_arr();

            window.old_top=window.my_top_map[col-1][row_No];

            reset_col_top(col-1,row_No);
            reset_col_top(col,i);
            set_float_card_in_colum_position(obj);
            break;
        }
    }

}
//刷新列元素高度
function reset_col_top(col,start_row) {

    for(var i=0;i<=window.rows_arr[col];i++){
        var obj=$("#"+window.my_map[col][i]);
        obj.css({top:window.my_top_map[col][i].toString()+"px"},200);
        //set_float_card_in_colum_position(obj);
    }
}
//获取已知id元素的行号
function get_Row_No(target,target_col_No){
    var x=-1;

    for(var i=0;i<=window.rows_arr[target_col_No];i++){
        if(window.my_map[target_col_No][i]==target.id){
            x=i;
            return x;
            break;
        }
        else{
            continue;
        }
    }
    return x;
}
//获取已知id元素的行列号
function get_col_row(cards){
    var col=-1,row=-1;

    for(var i=0;i<window.col_num;i++){
        for(var j=0;j<=window.rows_arr[i];j++){
            if(cards.attr("id")==window.my_map[i][j]){
                col=i;
                row=j;
                break;

            }
        }
    }

    return [col,row];
}
//调试用，输出位置信息
function show_map() {
    console.log("列数："+window.col_num);
    for(var i=0;i<window.col_num;i++){
        console.log("第"+i+"列行数："+window.rows_arr[i]);
        for(var j=0;j<=window.rows_arr[i];j++){
            console.log(i+" "+j+" "+window.my_map[i][j]);
            console.log(i+" "+j+" "+window.my_top_map[i][j]);
        }
    }
    console.log("\n\n");
}
//计算top用
function excute_top(col,row){
    if(row==0){
        return window.container_top ;
    }
    else{
        var res=window.container_top ;
        for(var i=0;i<row;i++){
            res+=$("#"+window.my_map[col][i]).outerHeight()+10;
        }
    }
    return res;
}

function excute_top_new(col,row){
    if(row==0){
        return window.container_top ;
    }
    else{
        var res=window.heightest_length[col];
        for(var i=window.rows_arr[col];i>row;i--){
            res-=$("#"+window.my_map[col][i]).outerHeight()+10;
        }
        res-=$("#"+window.my_map[col][row]).outerHeight();
    }
    return res;
}

