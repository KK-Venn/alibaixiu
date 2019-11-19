//获取搜索结果
var keys = getUrl().key;
$.ajax({
    type: "get",
    url: "/posts/search/"+ keys,
    success: function (response) {
        var html = template('postTpl',{data:response});
        $('#postBox').html(html);
    }
});