var dbUtil = require("./DBUtil");

function insertTagBlogMapping(tagId,blogId,ctime,utime,success) {
    var insertSql = "insert into tag_blog_mapping(tag_id,blog_id,ctime,utime) values(?,?,?,?)";

    var params = [tagId,blogId,ctime,utime];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryByTag(tagId,page,pageSize,success) {
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?,?";

    var params = [tagId,page * pageSize,pageSize];

    var connection = dbUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

module.exports.queryByTag = queryByTag;
module.exports.insertTagBlogMapping = insertTagBlogMapping;