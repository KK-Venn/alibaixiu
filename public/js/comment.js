//获取评论列表
$.ajax({
    type: "get",
    url: "/comments",
    success: function (response) {
        var html = template('commentTpl', response);
        $('#commentsList').html(html);
        var page = template('pageTpl', response)
        $('#pageBox').html(page);
    }
});

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data:{
            page:page,
        },
        success: function (response) {
            var html = template('commentTpl', response);
            $('#commentsList').html(html);
            var page = template('pageTpl', response)
            $('#pageBox').html(page);
        }
    });
}