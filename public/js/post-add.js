//获取文章分类分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', {data: response});
        $('#category').html(html);
    }
});