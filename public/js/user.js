$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function (response) {
            location.reload();
        },
        error:function(){
            alert('用户添加失败');
        },
    });
    return false;
});
$('#avatar').on('change',function(){
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData:false,//告诉请求不要解析属性
        contentType:false,//告诉请求不要设置请求对象内容格式
        success: function (response) {
            $('#preview').attr('src',response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});
$.ajax({
    type: "get",
    url: "/users",
    success: function (response) {
        var html = template('tpl',{data:response});
        $('#userbox').html(html);
    }
});
$('#userbox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: `/user/${id}`,
        success: function (response) {
            var html = template('',{});

        }
    });
});