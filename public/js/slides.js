//图片上传
$('#file').on('change', function () {
    var file = this.files[0];
    var formdata = new FormData();
    formdata.append('image', file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
            $('#image').val(response[0].image);
        }
    });
});
//轮播图片添加功能
$('#slidesForm').on('submit', function () {
    var data = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: data,
        success: function (response) {
            location.reload();
        },
    });
    return false;
});
//轮播图片展示功能
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        var html = template('slideTpl', {
            data: response
        });
        $('#slidesBox').html(html);
    }
});
//删除功能
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('确定删除此数据吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success: function (response) {
                location.reload();
            }
        });
    }else{
        return false;
    }
});