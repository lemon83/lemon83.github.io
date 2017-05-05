/*
* 自己写试试看
*
* 这个爬虫的目的:
*   从《知乎网》获取前端开发话题的精华内容
*   获取精华内容的讨论问题
*   答题人和他的回答所获得的赞数
*
* */

var eventproxy = require('eventproxy');
var cheerio = require('cheerio');
var superagent = require('superagent');

var url = require('url');

//前端开发话题精华内容
var zhihu = 'https://www.zhihu.com/';
var zhihu_fe = 'https://www.zhihu.com/topic/19550901/top-answers';

superagent.get(zhihu_fe).end(function(err,res){
    if(err){
        return console.error(err)
    }
    //获取页面内容
    var $ = cheerio.load(res.text);

    var zh_urls = [];

    $('.content .question_link').each(function(i,e){
        var $e = $(e);
        //var q_title = $e.text().trim();//提问
        var q_link = $('.question_link').eq(i).attr('href');
        if(i<5){
            var q_full_link = url.resolve(zhihu,q_link);//问题地址
            //var a_name = $('.zm-item-answer-author-info .author-link').eq(i).text().trim();//最高票回答者

            //把问题地址保存起来,等会要通过这些地址获取点赞数
            zh_urls.push(q_full_link);
        }
    })
    // console.log(zh_urls);
    var ep = new eventproxy();
    ep.after('zh',zh_urls.length,function(zh_url){
        zh_url = zh_url.map(function(zhs){
            var zh_html = zhs[0];
            var zan = zhs[1];
            var $ = cheerio.load(zh_html);
            return({
                '提问':$('.QuestionHeader-title').text(),
                '答题人':$('.AuthorInfo .AuthorInfo-name').find('a').eq(0).text(),
                '点赞数':zan

            })
        })
        console.log(zh_url)
    })

    zh_urls.forEach(function(zh_url){

        //获取点赞数
        superagent.get(zh_url).end(function(err,res){
            if(err){
                return console.error(err)
            }
            var $ = cheerio.load(res.text);
            var zan = $('.Voters .Button').eq(0).text().trim().replace(/[^0-9]/ig,'');
            ep.emit('zh',[res.text,zan])

        })
    })

})

