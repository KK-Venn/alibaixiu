//查询所有文章
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postTpl', response);
        $('#postBox').html(html);
        var page = template('pageTpl', response)
        $('#page').html(page);
    }
});
//查询文章分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    },
});

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
};
//分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postTpl', response);
            $('#postBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
};

//筛选
$('#filterForm').on('submit', function () {
    var data = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: data,
        success: function (response) {
            console.log(response);
            var html = template('postTpl', response);
            $('#postBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    });
    return false;
});
//文章删除
$('#postBox').on('click', '.delete', function () {
    if (confirm('确定删除此文章？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/posts/" + id,
            success: function (response) {
                location.reload();
            }
        });
    };
});
//评论相关
var id, userId;
$('#postBox').on('click', ".postCom", function () {
    id = $(this).data('id')
    console.log(id, 678);
    userId = JSON.parse(localStorage.getItem('user'))._id
    console.log(userId, 444);
    $('#exampleModal').modal('show')
})

/* 点击发布 */
$('.addCom').on('click', function () {
    var content = $('#message-text').val()
    console.log(content, 1111);
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            author: userId,
            content: content,
            post: id
        },
        success: function (res) {
            console.log(res, 543);
            $('#exampleModal').modal('hide')
        }
    })
})