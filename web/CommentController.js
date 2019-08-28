var commentDao = require("../dao/CommentDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map();

function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    // console.log(params);
    commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName,params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    });
}
path.set("/addComment", addComment);

function queryNewComment(request, response) {
    // var params = url.parse(request.url, true).query;
    // console.log(params);
    commentDao.queryNewComment(5,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryNewComment", queryNewComment);

function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    // console.log(img);
    response.writeHead(200);

    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end();
}
path.set("/queryRandomCode", queryRandomCode);

function queryCommentsByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    // console.log(params);
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId);


function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    // console.log(params);
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function (result) {
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end();
    });
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

module.exports.path = path;