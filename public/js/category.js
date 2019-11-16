//获取分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryListTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    },
});
//添加分类
$('#addCategory').on('submit', function () {
    var data = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: data,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});
//获取要修改的分类数据
$('#categoryBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: `/categories/${id}`,
        success: function (response) {
            var html = template('categoryModifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
});
//修改分类数据
$('#modifyBox').on('submit', '#ModifyCategory', function () {
    var data = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: data,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});