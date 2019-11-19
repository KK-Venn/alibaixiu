var id = getUrl().id;
var review = '';
$.ajax({
    type: "get",
    url: "/posts/" + id,
    success: function (response) {
        var html = template('postTpl', response);
        $('#postBox').html(html);
    }
});
//点赞功能
$('#postBox').on('click', '#click', function () {
    $.ajax({
        type: "post",
        url: "/posts/fabulous/" + id,
        success: function () {
            alert('点赞成功，感谢您的支持');
            location.reload();
        }
    });
});
//获取网站设置状态
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        if (response.comment) {
            var html = template('commentTpl', response)
            review = response.review;
            $('#commentBox').html(html);
        }
    }
});
//添加评论
$('#commentBox').on('submit', '#comment', function () {
    var content = $(this).find('textarea').val();
    var state = '';
    if (review) {
        state = 0;
    } else {
        state = 1;
    }
    $.ajax({
        type: "post",
        url: "/comments",
        data: {
            content: content,
            state: state,
            post: id,
            author: JSON.parse(localStorage.getItem('user'))._id,
        },
        success: function (response) {
            alert('评论成功');
            location.reload();
        },
    });
    return false;
});