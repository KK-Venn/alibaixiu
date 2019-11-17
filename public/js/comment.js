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
//更改评论状态
$('#commentsList').on('click', '.status', function () {
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: status == 0 ? 1 : 0,
        },
        success: function (response) {
            location.reload();
        }
    });
})
//删除评论
$('#commentsList').on('click', '.delete', function () {
    if (confirm('确定删除此评论？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }else{
        return false;
    }
});

function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page,
        },
        success: function (response) {
            var html = template('commentTpl', response);
            $('#commentsList').html(html);
            var page = template('pageTpl', response)
            $('#pageBox').html(page);
        }
    });
}