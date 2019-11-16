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