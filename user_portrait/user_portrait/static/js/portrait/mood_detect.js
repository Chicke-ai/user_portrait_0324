function user_detect_timepicker(str){
    //var date_time = str.split(' ');
    var dates = str.split('/');
    var yy = parseInt(dates[0]);
    var mm = parseInt(dates[1]) - 1;
    var dd = parseInt(dates[2]);
    //var times = date_time[1].split(':');
    //var hh = parseInt(times[0]);
    //var minute = parseInt(times[1]);
    var final_date = new Date();
    final_date.setFullYear(yy,mm,dd);
    final_date.setHours(0,0);
    final_date = Math.floor(final_date.getTime()/1000); 
    console.log(final_date);
    return final_date;
}
function call_sync_ajax_request(url, callback){
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      async: false,
      success:callback
    });
}

// function detect_task_status (data) {
// 	$('#detect_task_status').empty();
// 	var html = '';
// 	html += '<table class="table table-striped" style="margin-left:30px;width:900px;">';
// 	for(var i=0;i<data.length;i++){
// 		html += '<tr>';
// 		html += '<td style="width:200px;text-align:center;">'+data[i][0]+'</td>';
// 		html += '<td>'+data[i][1]+'</td>';
// 		html += '</tr>';
// 	}
// 	html += '</table>';
// 	$('#detect_task_status').append(html);
// }
function detect_task_status (data) {
    var data = data.data;
    console.log(data);
    if (data.length == 0){
        var html = '<div style="text-align: center;background-color: #cccccc;">暂无任务</div>'
        $('#detect_task_status').append(html);
    }else{
        var sort_scope = data.sort_scope;
        $('#detect_task_status').empty();

        var html = '';
        html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" style="margin-left:30px;width:900px;">';
        html += '<thead>';
        html += '<th style="width:100px;text-align:center;">关键词</th>';
        html += '<th style="width:100px;text-align:center;">排序范围</th>';
        html += '<th style="width:200px;text-align:center;">时间范围</th>';
        html += '<th style="width:100px;text-align:center;">排序指标</th>';
        html += '<th style="width:100px;text-align:center;">任务状态</th>';
        html += '<th style="width:30px;text-align:center;">操作</th>';
        html += '</thead>';
        for(var i=0;i<data.length;i++){
            sort_scope = scope_dict[data[i].sort_scope];
            sort_norm = norm_dict[data[i].sort_norm];
            var delete_this = '<span style="display:none;">'+data[i].search_id+'</span><span class="delete_this"><b><u class="delete_key_result" style="cursor:pointer;">删除</u></b></span>';
            if(data[i].status == 0){
                var status = '正在计算';
            }else{
                var status = '<span><b><u class="show_key_result" style="cursor:pointer;">计算完成</u></b></span>';
            }
            html += '<tr>';
            html += '<td style="text-align:center;">'+data[i].keyword+'</td>';
            html += '<td style="text-align:center;">'+sort_scope+'</td>';
            html += '<td style="text-align:center;">'+data[i].start_time+' 至 '+data[i].end_time+'</td>';
            html += '<td style="text-align:center;">'+sort_norm+'</td>';
            html += '<td style="text-align:center;"><span style="display:none;">'+data[i].search_id+'</span>'+'<span style="display:none;">'+data[i].sort_scope+'</span>'+status+'</td>';
            html += '<td style="text-align:center;">'+delete_this+'</td>';
            html += '</tr>';
        }
        html += '</table>';
        $('#detect_task_status').append(html);
    }
}

//入库用户列表
function draw_user_in_table(data){
    //var data = [];
    $('#mood_in_user').empty();
    if(data.length == 0){
        $('#mood_in_user').append('<h4 style="text-align:center;">暂无数据</h4>');
    }else{
        if(data.length > 5){
            show_more_inuser(data);
            data = data.slice(0,5);
        }else{
            $('#showmore_inuser').css('display', 'none');
        }
        var html = '';
        html += '<table  class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
        html += '<thead><th style="text-align:center;">用户ID</th>';
        html += '<th style="text-align:center;">昵称</th>';
        html += '<th style="text-align:center;">影响力</th>';
        html += '<th style="text-align:center;">身份敏感度</th>';
        html += '<th style="text-align:center;">活跃度</th>';
        html += '<th style="text-align:center;">敏感度</th></thead>';
        for(var i=0;i<data.length;i++){
            html += '<tr>';
            html += '<td style="text-align:center;">'+data[i][0]+'</td>';
            html += '<td style="text-align:center;">'+data[i][1]+'</td>';
            html += '<td style="text-align:center;">'+data[i][2]+'</td>';
            html += '<td style="text-align:center;">'+data[i][3]+'</td>';
            html += '<td style="text-align:center;">'+data[i][4]+'</td>';
            html += '<td style="text-align:center;">'+data[i][5]+'</td>';
            html += '</tr>';
        }
        html += '</table>';
        $('#mood_in_user').append(html);

    }
}

//模态框入库用户
function show_more_inuser(data){
    $('#inuser_WordList').empty();
    var html = '';
    html += '<table id="more_inuser_table" class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
    html += '<thead><th style="text-align:center;">用户ID</th>';
    html += '<th style="text-align:center;">昵称</th>';
    html += '<th style="text-align:center;">影响力</th>';
    html += '<th style="text-align:center;">身份敏感度</th>';
    html += '<th style="text-align:center;">活跃度</th>';
    html += '<th style="text-align:center;">敏感度</th></thead>';
    for(var i=0;i<data.length;i++){
        html += '<tr>';
        html += '<td style="text-align:center;">'+data[i][0]+'</td>';
        html += '<td style="text-align:center;">'+data[i][1]+'</td>';
        html += '<td style="text-align:center;">'+data[i][2]+'</td>';
        html += '<td style="text-align:center;">'+data[i][3]+'</td>';
        html += '<td style="text-align:center;">'+data[i][4]+'</td>';
        html += '<td style="text-align:center;">'+data[i][5]+'</td>';
        html += '</tr>';
    }
    html += '</table>';
    $('#inuser_WordList').append(html);
    $('#more_inuser_table').dataTable({
    "sDom": "<'row'<'col-md-6'l ><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
    "sPaginationType": "bootstrap",
    //"aoColumnDefs":[ {"bSortable": false, "aTargets":[1]}],
    "oLanguage": {
        "sLengthMenu": "每页 _MENU_ 条 ",
    }
    });
}

//出库用户列表
function draw_user_out_table(data){
    //console.log(data);
    $('#out_user_title').css('display', 'block');
    $('#mood_out_user').empty();
    if(data.length == 0){
        $('#mood_out_user').append('<h4 style="text-align:center;">暂无数据</h4>');
    }else{
        if(data.length > 5){
            show_more_outuser(data);
            data = data.slice(0,5);
        }else{
            $('#showmore_outuser').css('display', 'none');
        }
        var html = '';
        html += '<table class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
        html += '<thead><th style="text-align:center;">用户ID</th>';
        html += '<th style="text-align:center;">昵称</th>';
        html += '<th style="text-align:center;">微博数</th>';
        html += '<th style="text-align:center;">粉丝数</th>';
        html += '<th style="text-align:center;">关注数</th></thead>';
        for(var i=0;i<data.length;i++){
            html += '<tr>';
            html += '<td style="text-align:center;">'+data[i][0]+'</td>';
            html += '<td style="text-align:center;">'+data[i][1]+'</td>';
            html += '<td style="text-align:center;">'+data[i][2]+'</td>';
            html += '<td style="text-align:center;">'+data[i][3]+'</td>';
            html += '<td style="text-align:center;">'+data[i][4]+'</td>';
            html += '</tr>';
        }
        html += '</table>';
        $('#mood_out_user').append(html);
    }
}

//模态框出库用户
function show_more_outuser(data){
    $('#outuser_WordList').empty();
    var html = '';
    html += '<table id="more_outuser_table" class="table table-striped table-bordered bootstrap-datatable datatable responsive">';
    html += '<thead><th style="text-align:center;">用户ID</th>';
    html += '<th style="text-align:center;">昵称</th>';
    html += '<th style="text-align:center;">微博数</th>';
    html += '<th style="text-align:center;">粉丝数</th>';
    html += '<th style="text-align:center;">关注数</th></thead>';
    for(var i=0;i<data.length;i++){
        html += '<tr>';
        html += '<td style="text-align:center;">'+data[i][0]+'</td>';
        html += '<td style="text-align:center;">'+data[i][1]+'</td>';
        html += '<td style="text-align:center;">'+data[i][2]+'</td>';
        html += '<td style="text-align:center;">'+data[i][3]+'</td>';
        html += '<td style="text-align:center;">'+data[i][4]+'</td>';
        html += '</tr>';
    }
    html += '</table>';
    $('#outuser_WordList').append(html);
    $('#more_outuser_table').dataTable({
    "sDom": "<'row'<'col-md-6'l ><'col-md-6'f>r>t<'row'<'col-md-12'i><'col-md-12 center-block'p>>",
    "sPaginationType": "bootstrap",
    //"aoColumnDefs":[ {"bSortable": false, "aTargets":[1]}],
    "oLanguage": {
        "sLengthMenu": "每页 _MENU_ 条 ",
        }
    });
}

//展示微博
function Draw_get_top_weibo(data, div_name){
  var html = '';
  $('#' + div_name).empty();
  console.log(div_name);
    if(data[0][3] == ''){
        html += "<div style='margin-left:10px;width:100%;height:100px;'>用户在昨天未发布任何微博</div>";
    }else{
      html += '<div id="weibo_list" class="weibo_list weibo_list_height scrolls tang-scrollpanel" style="margin:0;">';
      html += '<div id="content_control_height" class="tang-scrollpanel-wrapper" style="margin:0;">';
      html += '<div class="tang-scrollpanel-content" style="margin:0;">';
      html += '<ul>';
      for(var i=0;i<data.length;i++){
        s = (i+1).toString();
        var weibo = data[i]
        var mid = weibo[0];
        var uid = weibo[9];
        var name = weibo[10];
        var date = weibo[5];
        var text = weibo[3];
        var geo = weibo[4];
        var reposts_count = weibo[1];
        var comments_count = weibo[2];
        var weibo_link = weibo[7];
        var user_link = weibo[8];
        var profile_image_url = 'http://tp2.sinaimg.cn/1878376757/50/0/1';
        var repost_tree_link = '/show_graph/' + mid;
        if (geo==''){
           geo = '未知';
        }
        var user_link = 'http://weibo.com/u/' + uid;
        html += '<li class="item">';
        html += '<div class="weibo_detail" style="width:100%">';
        html += '<p style="text-align:left;margin-bottom:0;">' +s + '、昵称:<a class="undlin" target="_blank" href="' + user_link  + '">' + name + '</a>(' + geo + ')&nbsp;&nbsp;发布内容：&nbsp;&nbsp;' + text + '</p>';
        html += '<div class="weibo_info"style="width:100%">';
        html += '<div class="weibo_pz">';
        html += '<div id="topweibo_mid" class="hidden">'+mid+'</div>';
        html += '<span class="retweet_count">转发数(' + reposts_count + ')</span>&nbsp;&nbsp;|&nbsp;&nbsp;';
        html += '<span class="comment_count">评论数(' + comments_count + ')</span></div>';
        html += '<div class="m">';
        html += '<u>' + date + '</u>&nbsp;-&nbsp;';
        html += '<a target="_blank" href="' + weibo_link + '">微博</a>&nbsp;-&nbsp;';
        html += '<a target="_blank" href="' + user_link + '">用户</a>';
        html += '<a target="_blank" href="' + repost_tree_link + '">&nbsp;-&nbsp;转发树</a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</li>';
      }
                                    
    html += '<div id="TANGRAM_54__slider" class="tang-ui tang-slider tang-slider-vtl" style="height: 100%;">';
    html += '<div id="TANGRAM_56__view" class="tang-view" style="width: 6px;">';
    html += '<div class="tang-content"><div id="TANGRAM_56__inner" class="tang-inner"><div id="TANGRAM_56__process" class="tang-process tang-process-undefined" style="height: 0px;"></div></div></div>';
    html += '<a id="TANGRAM_56__knob" href="javascript:;" class="tang-knob" style="top: 0%; left: 0px;"></a></div>';
    html += '<div class="tang-corner tang-start" id="TANGRAM_54__arrowTop"></div><div class="tang-corner tang-last" id="TANGRAM_54__arrowBottom"></div></div>';

    html += '</ul>';
    html += '</div>';
    html += '</div>';
    html += '</div>';   
    }
      $('#'+div_name).append(html);
}

//显示所有的相关微博
function show_all_related_weibo(url) {
    $('#weibo_sort').empty();
    //$('#related_weibo').empty();
    var html = '';
    //html += '<div style="border-bottom: 3px solid #dddddd;height: 40px;line-height:40px;">';
    html += '<span style="color:#983333;margin-left: 20px;"><b>排序指标</b></span>';
    html += '<input type="radio" name="sort_radio_weibo" id="sort_by_time" value = "time" checked="checked" style="margin-left: 30px;"> 时间';
    html += '<input type="radio" name="sort_radio_weibo" value = "retweet" style="margin-left: 30px;"> 转发数';
    html += '<input type="radio" name="sort_radio_weibo" value = "comment" style="margin-left: 30px;"> 评论数';
    //html += '<div id="related_weibo_text0" style="width:100%;max-height: 300px;">'; 
    //html += '</div>';
    $('#weibo_sort').append(html);
    
    var sub_html = '<div id="related_weibo_text0" class="shadow_weibo" style="width:100%;"></div>'; 
    $('#sub_related_weibo').append(sub_html);

    var data2 = [['12','10','12','根本实现不了两会代表委员们应该提案:汽车分公母[笑cry]，男的开母车，母车限速；女的开公车，公车不要油门。','中国 北京 北京','2013-09-07 00:10:90','fgeeeesf','sfagvfd','sfagvfd','1234567890','昵称昵称'],
                 ['12','10','12','根本实现不了两会代表委员们应该提案:汽车分公母[笑cry]，男的开母车，母车限速；女的开公车，公车不要油门。','中国 北京 北京','2013-09-07 00:10:90','fgeeeesf','sfagvfd','sfagvfd','1234567890','昵称昵称'],
                 ['12','10','12','根本实现不了两会代表委员们应该提案:汽车分公母[笑cry]，男的开母车，母车限速；女的开公车，公车不要油门。','中国 北京 北京','2013-09-07 00:10:90','fgeeeesf','sfagvfd','sfagvfd','1234567890','昵称昵称']]

    var sort_type = $('input[name="sort_radio_weibo"]:checked').val();
    //console.log(sort_type);
    Draw_get_top_weibo(data2, "related_weibo_text0");

    $('input[name="sort_radio_weibo"]').off('click').click(function(){
        var sort_type = $('input[name="sort_radio_weibo"]:checked').val();
        console.log(sort_type);
        if(sort_type == "time"){
            alert('mmm1')
            //Draw_get_top_weibo(data2, panel_name);
        };
        if(sort_type == "retweet"){
            console.log('retweet1');
        }
        if(sort_type == "comment"){
            console.log('comment1');
        }
    });
}


//选择相应的微博,获取点击的按钮的id，控制对应面板显示。
function choose_related_weibo(url, index){
    $('.portrait_button_choose').die('click').live("click", function (){
    var data2 = [['12','10','12','根本实现不了两会代表委员们应该提案:汽车分公母[笑cry]，男的开母车，母车限速；女的开公车，公车不要油门。','中国 北京 北京','2013-09-07 00:10:90','fgeeeesf','sfagvfd','sfagvfd','1234567890','昵称昵称'],
                 ['12','10','12','根本实现不了两会代表委员们应该提案:汽车分公母[笑cry]，男的开母车，母车限速；女的开公车，公车不要油门。','中国 北京 北京','2013-09-07 00:10:90','fgeeeesf','sfagvfd','sfagvfd','1234567890','昵称昵称'],
                 ['12','10','12','根本实现不了两会代表委员们应该提案:汽车分公母[笑cry]，男的开母车，母车限速；女的开公车，公车不要油门。','中国 北京 北京','2013-09-07 00:10:90','fgeeeesf','sfagvfd','sfagvfd','1234567890','昵称昵称']]

        $('#sort_by_time').attr("checked",true);
        click_id = $(this).attr('id');
        click_id = click_id.split('choose');
        var panel_name = 'related_weibo_text' + click_id[1];
        console.log(panel_name);
        $('.shadow_weibo').css('display', 'none');
        $('#'+panel_name).css('display', 'block');

        $('input[name="sort_radio_weibo"]').off('click').click(function(){
            var sort_type = $('input[name="sort_radio_weibo"]:checked').val();
            console.log(sort_type);
            if(sort_type == "time"){
                alert('mmm')
                //Draw_get_top_weibo(data2, panel_name);
            };
            if(sort_type == "retweet"){
                console.log('retweet');
            }
            if(sort_type == "comment"){
                console.log('comment');
            }
        });

        //console.log(sort_type);

    })
}


//相关主题
function show_related_topic(data){
    $('#topic_key').empty();
    $('input[name="sub_topic"]').attr("checked",false);
    $('#sub_related_weibo_button').empty();
    $('#sub_related_weibo').empty();

    //话题表格
    var html = '';
    html += '<table id="more_topic_table" class="table table-striped">';
    html += '<tr><th style="text-align:center;width:200px;border-right:1px solid #CCCCCC">全部</th>';
    html += '<th style="text-align:center;">';
    for(var i=0;i<data.length;i++){
        html += '<span style="margin-right:20px;">'+data[i][0]+'</span>';
    };
    html += '</th></tr>';
    html += '</table>';
    $('#topic_key').append(html);

    //进一步计算子话题
    var call_flag = 0;
    var topic_count = 0;
    $("input[name='sub_topic']").off('click').click(function(){
        if($("input[name='sub_topic']:checked")){
            //console.log(call_flag);
            if(call_flag == 0){
                //call_ajax();
                //有子话题的话请求数据，flag保证请求一次，同时在表格上加上子话题，加上按钮。写出各个按钮的url
                var data2 = [['省道','而非','该时段'], ['算法'], ['上午','前往']];
                topic_count = data2.length;
                var html = '';
                for(var j=0; j<data2.length; j++){
                    html = '<tr><th style="text-align:center;width:200px;border-right:1px solid #CCCCCC">话题'+(j+1)+'</th>';
                    html += '<th style="text-align:center;">' ;
                    for(var s=0; s<data2[j].length;s++){
                        html += '<span style="margin-right:20px;">'+data2[j][s]+'</span>';
                    };
                    html += '</th></tr>';
                    $('#more_topic_table').append(html);


                };
            }
 
        }
        if(call_flag == 0){
            for(var j=0;j<topic_count;j++){
                var button_html = '<span id="portrait_button_choose'+(j+1)+'" class="portrait_button_choose" style="height:30px;cursor:pointer;margin-right:20px;text-align: center;line-height:30px;">话题' +(j+1)+ '</span>';
                $('#sub_related_weibo_button').append(button_html);

                var tab_html = '<div id="related_weibo_text'+(j+1)+'" class="shadow_weibo" style="display:none;width:900px;">'+(j+1)+'</div>';
                $('#sub_related_weibo').append(tab_html);
            }
            call_flag += 1;  
        }

    });


    //显示所有微博,请求数据
    var call_all_url;

    show_all_related_weibo(call_all_url);

    //点击事件选择微博，传有几个子话题
    var call_url;
    choose_related_weibo(call_url, topic_count);

}

function show_detail(flag, time, sentiment){
    //var data = [['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56']]
    var data = [['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56'],['1234567890','这是昵称','23.33','32.43','24.674','33.56']]
    $('#result_detect_detail').css('display','block');
    $('#click_time').empty();
    $('#click_sentiment').empty();
    $('#click_time').append(time);
    $('#click_sentiment').append(sentiment);
    console.log(flag);
    if(flag == 0){
        draw_user_in_table(data);
        $('#mood_out_all').empty();
        $('#mood_in_all').css('width', '900px');
    }else{
        $('#mood_in_all').css('width', '440px');
        draw_user_in_table(data);
        draw_user_out_table(data);

    }
    //相关话题表格及微博详情
    show_related_topic(data);

}
function Draw_detect_all_charts(data){
    var flag = 'all';
    Draw_detect_charts(flag, data);
}
function Draw_in_all_detect_charts(data){
    var flag = 'in-all';
    Draw_detect_charts(flag, data);
}
function Draw_in_domain_detect_charts(data){
    var flag = 'in-domain';
    Draw_detect_charts(flag, data);
}
function Draw_in_topic_detect_charts(data){
    var flag = 'in-topic';
    Draw_detect_charts(flag, data);
}
function Draw_all_keyword_detect_charts(data){
    var flag = 'all-keywords';
    Draw_detect_charts(flag, data);
}

function Draw_detect_charts(flag, data){
    console.log(data);
    var data_x_ = [];
    var data_y_1 = [];
    var data_y_0 = [];
    var data_y_7 = [];

    for(var i=0;i<data["1"].length;i++){
        var time_line  = new Date(parseInt(data["1"][i][0])*1000).format("yyyy-MM-dd hh: mm");
        data_x_.push(time_line);
        data_y_1.push(data["1"][i][1]);

    }
    for(var i=0;i<data["7"].length;i++){
        data_y_7.push(data["7"][i][1]);

    }
    for(var i=0;i<data["0"].length;i++){
        data_y_0.push(data["0"][i][1]);

    }

    if(data["1"].length <10){
        var zoom =false;
    }else{
        var zoom = true;
    }

    var myChart = echarts.init(document.getElementById('result_detect_charts')); 
    var option = { 
        title : {
            text  :'微博情绪走势图',
            x: 'center',
            y: 5
        }, 
        tooltip : {
            trigger: 'axis',
            show : true,

        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataZoom: {
            show: zoom,
            start : 80
        },
        legend : {
            data : ['积极','消极','中性'],
            x:'right',
            y: 37
        },
        grid: {
            y2: 70
        },
        xAxis : [
            {
                data :data_x_,
                type : 'category',
                splitNumber:10
            }
        ],
        yAxis : [
            {
                name: '微博总量 (条)',
                type : 'value'
            }
        ],
        series : [
            {
                name: '积极',
                type: 'line',
                showAllSymbol : true,
                symbolSize:2,
                symbol: 'circle',
                clickable: true,              
                data: data_y_1
            },
            {
                name: '消极',
                type: 'line',
                showAllSymbol : true,
                symbolSize:2,
                symbol: 'circle',
                data: data_y_7
            },
            {
                name: '中性',
                type: 'line',
                showAllSymbol : true,
                symbolSize:2,
                symbol: 'circle',
                data: data_y_0
            }
        ]
    };
     require([
            'echarts'
        ],
        function(ec){
            var ecConfig = require('echarts/config');
            function eConsole(param) {
                console.log(param);
                var segment = $('#detect_rank_by').text();
                segment = segment_dict[segment]
                var start_ts = parseInt(new Date(param.name).getTime()/1000);
                task_type= flag;
                sentiment = mood_dict[param.seriesName];
                var detail_url = '/sentiment/sentiment_weibo_keywords_user/?'
                detail_url += 'start_ts=' + start_ts + '&task_type=' + task_type + '&segment=' + segment +'&sentiment='+ sentiment;
                if(flag == 'in-domain' || flag == 'in-topic'){
                    detail_url += '&task_type=' + flag.split('-')[1];
                }
                console.log(detail_url);
                show_detail(flag, param.name, param.seriesName);
            }

        myChart.on(ecConfig.EVENT.CLICK, eConsole);
    });

    // 为echarts对象加载数据 
    myChart.setOption(option);                
}

//排序范围选择
$('#detect_choose').change(function(){
    $('#detect_choose_detail').empty();
    //库内-不限

    //库内-领域
    if($('#detect_choose').val() == 'in_limit_domain') {

        var html = '';
        html += '<select id="detect_choose_detail_2">';
        html += '<option value="homeadmin">境内机构</option>'
        html += '<option value="abroadadmin">境外机构</option>'
        html += '<option value="folkorg">民间组织</option>'
        html += '<option value="abroadmedia">境外媒体</option>'
        html += '<option value="activer">活跃人士</option>'
        html += '<option value="business">商业人士</option>'
        html += '<option value="mediaworker">媒体人士</option>'
        html += '<option value="university">高校</option>'
        html += '<option value="grassroot">草根</option>'
        html += '<option value="homemedia">媒体</option>'
        html += '<option value="lawyer">法律机构及人士</option>'
        html += '<option value="politician">政府机构及人士</option>'
        html += '<option value="other">其他</option>'
        html += '</select>'
    };
    //库内-话题
    if($('#detect_choose').val() == 'in_limit_topic') {

        var html = '';
        html += '<select id="detect_choose_detail_2">';
        html += '<option value="computer">科技类</option>';
        html += '<option value="economic">经济类</option>';
        html += '<option value="education">教育类</option>';
        html += '<option value="military">军事类</option>';
        html += '<option value="medicine">民生类_健康</option>';
        html += '<option value="house">民生类_住房</option>';
        html += '<option value="environment">民生类_环保</option>';
        html += '<option value="employment">民生类_就业</option>';
        html += '<option value="social-security">民生类_社会保障</option>';
        html += '<option value="traffic">民生类_交通</option>';
        html += '<option value="law">民生类_法律</option>';
        html += '<option value="politics">政治类_外交</option>';
        html += '<option value="fear-of-violence">政治类_暴恐</option>';
        html += '<option value="peace">政治类_地区和平</option>';
        html += '<option value="anti-corruption">政治类_反腐</option>';
        html += '<option value="religion">政治类_宗教</option>';
        html += '<option value="art">文体类_娱乐</option>';
        html += '<option value="sports">文体类_体育</option>';
        html += '<option value="life">其他类</option>';
        html += '</select>';
    };

    //全网-关键词
    if($('#detect_choose').val() == 'all_limit_keyword') {
        var html = '';
        html += '<input id="keyword_hashtag" type="text" class="form-control" style="width:275px;height:25px;" placeholder="请输入关键词，多个词用英文逗号分开">';

    };
    $('#detect_choose_detail').append(html);
});

//筛选条件初始化时间
function date_init(){
    var date = choose_time_for_mode();
    date.setHours(0,0,0,0);
    var max_date = date.format('yyyy/MM/dd');
    var current_date = date.format('yyyy/MM/dd');//获取当前日期，改格式
    var from_date_time = Math.floor(date.getTime()/1000) - 60*60*24;
    var min_date_ms = new Date()
    min_date_ms.setTime(from_date_time*1000);
    var from_date = min_date_ms.format('yyyy/MM/dd');
    if(global_test_mode==0){
        $('#detect_time_choose #weibo_from').datetimepicker({value:from_date,step:1440,format:'Y/m/d',timepicker:false});
        $('#detect_time_choose #weibo_to').datetimepicker({value:from_date,step:1440,format:'Y/m/d',timepicker:false});
    }else{
        $('#detect_time_choose #weibo_from').datetimepicker({value:from_date,step:1440,minDate:'-1970/01/30',format:'Y/m/d',timepicker:false,maxDate:'+1970/01/01'});
        $('#detect_time_choose #weibo_to').datetimepicker({value:from_date,step:1440,minDate:'-1970/01/30',format:'Y/m/d',timepicker:false,maxDate:'+1970/01/01'});
    }
}

//提交监控
function submit_detect(){
    var s = [];
    var show_scope = $('#detect_choose option:selected').text();
    var show_arg = $('#detect_choose_detail_2 option:selected').text();
    var show_norm = $('#sort_select_2 option:selected').text();
    var keyword = $('#keyword_hashtag').val();
    var sort_scope = $('#detect_choose option:selected').val();
    var sort_norm = $('#sort_select_2 option:selected').val();
    var arg = $('#detect_choose_detail_2 option:selected').val();

    var time_from =$('#detect_time_choose #weibo_from').val().split('/').join('-');
    var time_to =$('#detect_time_choose #weibo_to').val().split('/').join('-');
    var from_stamp = new Date($('#detect_time_choose #weibo_from').val());
    var end_stamp = new Date($('#detect_time_choose #weibo_to').val());
    if(from_stamp > end_stamp){
    alert('起始时间不得大于终止时间！');
    return false;
    }
    //console.log(keyword);
    if(keyword == ''){  //检查输入词是否为空
        alert('请输入关键词！');
    }else{
        if(keyword == undefined){  //没有输入的时候，更新图表
            var url = 'start_date='+time_from+'&end_date='+time_to+'&segment='+sort_norm;
            console.log(url);
            if(sort_scope == 'all_nolimit'){
                flag = 1;
                var all_url ='';
                all_url += '/sentiment/sentiment_all/?' +url;
                console.log(all_url);
                call_sync_ajax_request(all_url, Draw_detect_all_charts);
            };
            if(sort_scope == 'in_nolimit'){
                var in_url = '';
                in_url += '/sentiment/sentiment_all_portrait/?' +url;
                console.log(in_url);
                call_sync_ajax_request(in_url, Draw_in_all_detect_charts);
            }
            if(sort_scope == 'in_limit_topic'){
                var topic_url = '/sentiment/sentiment_topic/?' + url +'&topic='+arg;
                console.log(topic_url);
                call_sync_ajax_request(topic_url, Draw_in_topic_detect_charts);
            }
            if(sort_scope == 'in_limit_domain'){
                var domain_url = '/sentiment/sentiment_domain/?' + url +'&domain='+arg;
                console.log(domain_url);
                call_sync_ajax_request(domain_url, Draw_in_domain_detect_charts);
            }
            var data = {"flag": true, "data": [{"sort_norm": "bci", "status": 1, "keyword": "hello2", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-04", "search_id": "admin@qq.com1459093215.85"}, {"sort_norm": "bci_change", "status": 1, "keyword": "\u4e2d\u56fd\u4eba\u6c11", "sort_scope": "all_limit_keyword", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "keyword", "end_time": "2013-09-06", "search_id": "admin@qq.com1459093370.92"}, {"sort_norm": "imp", "status": 1, "keyword": "456", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-04", "search_id": "admin@qq.com1459095146.65"}, {"sort_norm": "bci", "status": 1, "keyword": "hello", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-02", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-03", "search_id": "admin@qq.com1459091263.5"}]};
            $('#detect_range').empty();
            $('#detect_detail').empty();
            $('#detect_rank_by').empty();
            $('#detect_time_range').empty();
            $('#detect_range').append(show_scope);
            if(sort_scope == 'in_limit_topic' || sort_scope == 'in_limit_domain' ){  // 参数是可选的时候，加上详细条件
                $('#detect_range').append('-');
                $('#detect_range').append(show_arg);
            }
            $('#detect_rank_by').append(show_norm);
            var time_from_end = time_from + ' 至 ' + time_to;
            $('#detect_time_range').append(time_from_end);                       
            $('#result_detect_detail').css('display','none');
        }else{ //输入参数的时候，更新任务状态表格

            var time_from =$('#detect_time_choose #weibo_from').val().split('/').join('-');
            var time_to =$('#detect_time_choose #time_to').val().split('/').join('-');

            var url = 'time='+time_from+','+time_to+'&sort_norm='+sort_norm+'&sort_scope='+sort_scope+'&arg='+keyword;
            var data = {"flag": true, "data": [{"sort_norm": "bci", "status": 1, "keyword": "11111hello2", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-04", "search_id": "admin@qq.com1459093215.85"}, {"sort_norm": "bci_change", "status": 1, "keyword": "\u4e2d\u56fd\u4eba\u6c11", "sort_scope": "all_limit_keyword", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "keyword", "end_time": "2013-09-06", "search_id": "admin@qq.com1459093370.92"}, {"sort_norm": "imp", "status": 1, "keyword": "456", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-04", "search_id": "admin@qq.com1459095146.65"}, {"sort_norm": "bci", "status": 1, "keyword": "hello", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-02", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-03", "search_id": "admin@qq.com1459091263.5"}]};
            detect_task_status(data);
            console.log(url);
        }
    }
}

//结果分析默认值
var mood_dict ={'积极':'1','消极':'7','中性':'0'}
var segment_dict = {'15分钟':'fifteen','一小时':'hour','一天':'day'};

date_init();
console.log($('#detect_time_choose #weibo_from').val())
var time_from =$('#detect_time_choose #weibo_from').val().split('\/').join('-');
var time_to =$('#detect_time_choose #weibo_to').val().split('\/').join('-');
// console.log(time_from_after);
// console.log(time_to_after);

$('#detect_range').append($('#detect_choose option:selected').text());
$('#detect_rank_by').append($('#sort_select_2 option:selected').text());
var time_from_end = time_from + ' 至 ' + time_to;
$('#detect_time_range').append(time_from_end);
var scope_dict ={'all_limit_keyword':'全网-按关键词','in_limit_keyword':'库内-按关键词','in_limit_hashtag':'库内-按微话题'}
var norm_dict ={'weibo_num': '微博数','fans': '粉丝数','bci': '影响力','bci_change':'突发影响力变动','ses':'言论敏感度','ses_change':'突发敏感度变动','imp':'身份敏感度','imp_change':'突发重要度变动','act':'活跃度','act_change':'突发活跃度变动'}

var data = {"flag": true, "data": [{"sort_norm": "bci", "status": 1, "keyword": "hello2", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-04", "search_id": "admin@qq.com1459093215.85"}, {"sort_norm": "bci_change", "status": 1, "keyword": "\u4e2d\u56fd\u4eba\u6c11", "sort_scope": "all_limit_keyword", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "keyword", "end_time": "2013-09-06", "search_id": "admin@qq.com1459093370.92"}, {"sort_norm": "imp", "status": 1, "keyword": "456", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-03", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-04", "search_id": "admin@qq.com1459095146.65"}, {"sort_norm": "bci", "status": 1, "keyword": "hello", "sort_scope": "in_limit_hashtag", "start_time": "2013-09-02", "submit_user": "admin@qq.com", "search_type": "hashtag", "end_time": "2013-09-03", "search_id": "admin@qq.com1459091263.5"}]};
detect_task_status(data);
var url = '/sentiment/sentiment_all/?start_date=2013-09-07&end_date=2013-09-07&segment=fifteen';
call_sync_ajax_request(url, Draw_detect_all_charts) 
//Draw_detect_charts(1);
