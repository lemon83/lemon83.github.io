/*
 首页Js
 author: ayguo
 */

var oIndex = window.oIndex || {};


// 初始化
oIndex.init = function(){
    oIndex.toggleCase();
    oIndex.link();
    oIndex.cooperation();
}

// 合作留言
oIndex.cooperation = function(){

    $('.submit a').on('click', function(){
        fnSubmit();
    });

    function fnError(obj, msg){
        obj.closest('.fwrap').find('.error').html(msg);
    }

    $('input[name="name"], input[name="link"], textarea[name="description"]').on('focus', function(){
        fnError($(this), '');
    });

    function fnSubmit(){

        var args = {
                name: $('input[name="name"]').val(),
                tel: $('input[name="link"]').val(),
                descript: $('textarea[name="description"]').val()
            },
            url = 'http://origin.weikejia.net/api/open/front-message/submit-msg.htm';


        if(!args.name){
            fnError($('input[name="name"]'), '姓名不能为空');
            return false;
        }

        if(!args.tel){
            fnError($('input[name="link"]'), '联系方式不能为空');
            return false;
        }

        if(!args.descript){
            fnError($('textarea[name="description"]'), '需求描述不能为空');
            return false;
        }


        $.post(url, args, function(res){
            if(res.success){
                alert('留言成功');
                $('input[name="name"], input[name="link"], textarea[name="description"]').val('');
            }
        }, 'json');

    }



}



// 切换不同案例
oIndex.toggleCase = function(){

    var tab = $('#case .tab');

    tab.find('a').each(function(){
        var target = $(this),
            id = target.attr('data-id');

        target.on('click', function(){
            if(target.hasClass('active')) return;

            tab.find('a').removeClass('active');
            target.addClass('active');

            oIndex.getCaseList(id);
        });

    });
}

// 获取案例列表
oIndex.getCaseList = function(id){

    var infos = $('#case .infos'),
        reqUrl = 'http://origin.weikejia.net/api/open/cases-manager/sub-category-list.htm';

    $.post(reqUrl, {parseId: id}, function(res){

        if(res.success){
            var result = res.data;
            var html = '';
            var sClass = '';

            for(var i = 0, len = result.length; i < len; i++){
                sClass = i%4===0 ? 'info no-ml' : 'info';

                html += '<div class="'+sClass+'"><a href="/case?id='+result[i].id+'&parseId='+id+'" target="_blank"><img src="'+result[i].imgUrl+'" alt=""></a></div>';
            }

            infos.animate({
                marginLeft: '-200px',
                opacity: 0
            }, 400, function(){
                infos.html(html).css('marginLeft', '100px').animate({
                    marginLeft: 0,
                    opacity: 1
                }, 500);
            });

        }

    }, 'json');

}



// 点击平滑移动
oIndex.link = function(){
    $('a[role="pos"]').on('click', function(){
        var id = $(this).attr('data-pos');
        $('html, body').animate({
            scrollTop: $('#'+id).offset().top
        }, 1000);
    });
}