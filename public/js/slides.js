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
        data:data,
        success: function (response) {
            location.reload();
        },
    });
    return false;
});