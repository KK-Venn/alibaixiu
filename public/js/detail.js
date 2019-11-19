var id = getUrl().id;
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