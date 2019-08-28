var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();
function queryRandomTags(request,response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true:false;
        })
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryRandomTags",queryRandomTags);

function queryByTag(request,response){
    var params = url.parse(request.url,true).query;
    tagsDao.queryTag(params.tag,function (result) {
        if(result == null||result.length == 0){
            console.log("000");
            response.writeHead(200);
            response.write(respUtil.writeResult("success","查询成功",result));
            response.end();
        }else{
            tagBlogMappingDao.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize),function () {
                var blogList = [];
                for(var i = 0;i < result.length;i ++){
                    console.log(result[i].blog_id);
                    blogDao.queryBlogById(result[i].blog_id,function (result) {
                        console.log(result);
                        blogList.push(result[0]);
                    })
                }
                getResult(blogList,result.length);
                // console.log(blogList.length);
                // while (true){
                //     if(blogList.length == result.length){
                //         break;
                //     }
                //     console.log(blogList);
                // }
            });
        }
    });

}
path.set("/queryByTag",queryByTag);

function getResult(blogList,len){
    if(blogList.length < len){
        setTimeout(function (){getResult(blogList,len)},1000);
    }else{
        console.log("==============");
        console.log(blogList);
    }
}

module.exports.path = path;
