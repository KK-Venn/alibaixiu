//获取文章分类分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryTpl', {
            data: response
        });
        $('#category').html(html);
    }
});
//文章封面上传预览功能
$('#feature').on('change', function () {
    var formData = new FormData();
    formData.append('cover', this.files[0]);
    $.ajax({
        type: "POST",
        url: "/upload",
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            $('#thumbnail').val(response[0].cover);
            $("#preview").show();
            $("#preview").attr('src', response[0].cover);
        }
    });
})