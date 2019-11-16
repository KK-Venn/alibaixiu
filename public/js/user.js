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
//删除单个用户
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
//删除多个用户
$('#deleteMany').on('click', function () {
    var ids = [];
    var checkUser = $('#userbox').find('input').filter(':checked');
    checkUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('您确定要进行批量删除操作吗？')) {
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload();
            },
            error:function(){
                alert('批量删除失败');
                location.reload();
            }
        });
    } else {
        return false;
    }
});
//从全部复选框同步到以下单选框
$('#selectAll').on('change', function () {
    var status = $(this).prop('checked');
    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
    //获取所有用户并同步全选框状态
    $('#userbox').find("input").prop('checked', status);
});
//从用户前复选框状态同步到全选框
$('#userbox').on('change', '.userStatus', function () {
    //判断选中的用户数量是否与用户总数一致，一致则将全选框选中，否则将全选框放开
    if ($('.userStatus').length == $('.userStatus:checked').length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    };
    //显示批量删除按钮
    if ($('.userStatus:checked').length) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});