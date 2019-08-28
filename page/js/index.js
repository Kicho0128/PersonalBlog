var everyday = new Vue({
    el:"#every_day",
    data:{
        content:"aduaduja"
    },
    computed:{
        getContent:function () {
            return this.content;
        }
    },
    created:function () {
        //请求数据，给content赋值
        axios({
            method:"get",
            url:"/queryEveryDay"
        }).then(function (resp) {
            everyday.content = resp.data.data[0].content;
            // console.log(resp.data.data[0].content);
        }).catch(function (resp) {
            console.log("请求失败");
        })
    }
});

var articleList = new Vue({
    el:"#article_list",
    data: {
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[
            {
                title:"这个是标题",
                content: "2019-4-24更新微信 2.6.7.57防撤回，搜索 偏移量 00252185，数值75改为74 。—————————–此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工...",
                date:"2018-10-10",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            }
        ]
    },
    computed: {
        jumpTo:function(){
            return function (page) {
                this.getPage(page,this.pageSize);
            }
        },
        getPage:function () {
            return function (page,pageSize) {
                var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";

                var tag = "";
                for(var i = 0;i < searchUrlParams.length;i ++){
                    console.log(searchUrlParams[i]);
                    if(searchUrlParams[i].split("=")[0] == "tag"){
                        try{
                            tag = searchUrlParams[i].split("=")[i+1];
                        }catch(e){
                            console.log(e);
                        }
                    }
                }

                if(tag == ""){//不是查询情况
                    console.log(tag);
                    axios({
                        method: "get",
                        url:"/queryBlogByPage?page=" + (page - 1)+ "&pageSize=" + pageSize
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0;i < result.length;i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].date;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios({
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function (resp) {
                        // console.log(resp);
                        articleList.count = resp.data.data[0].count;
                        // console.log(articleList.count);
                        articleList.generatePageTool;
                    });
                }else{
                    axios({
                        method: "get",
                        url:"/queryByTag?page=" + (page - 1)+ "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function (resp) {
                        var result = resp.data.data;
                        var list = [];
                        for(var i = 0;i < result.length;i ++){
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].date;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                }


            }

        },
        generatePageTool:function () {
            // console.log("dawdwadh");
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2,page:nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text:nowPage - 1,page:nowPage - 1});
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage + 1 <= (totalCount + pageSize - 1)/pageSize){
                result.push({text:nowPage + 1,page:nowPage + 1})
            }
            if(nowPage + 2 <= (totalCount + pageSize - 1)/pageSize){
                result.push({text:nowPage + 2,page:nowPage + 2});
            }
            result.push({text:">>",page:parseInt((totalCount + pageSize - 1) /pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created:function() {
        this.getPage(this.page,this.pageSize)
    }


});

