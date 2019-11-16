$('#userForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function (response) {
            location.reload();
        },
        error: function () {
            alert('用户添加失败');
        },
    });
    return false;
});
$('#modifyBox').on('change', '#avatar', function () {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false, //告诉请求不要解析属性
        contentType: false, //告诉请求不要设置请求对象内容格式
        success: function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
})
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        var html = template('tpl', {
            data: response
        });
        $('#userbox').html(html);
    }
});
$('#userbox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: `/users/${id}`,
        success: function (response) {
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    });
});
$('#modifyBox').on('submit', '#modifyForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: `/users/${id}`,
        data: formData,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});
//删除用户
$('#userbox').on('click', '.delete', function () {
    if (confirm('您真的要删除此用户吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                location.reload();
            }
        });
    };
});