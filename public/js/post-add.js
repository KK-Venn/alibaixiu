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
});
//文章上传
$('#postAdd').on('submit', function () {
    var data = $(this).serialize();
    console.log(data);
    $.ajax({
        type: "post",
        url: "/posts",
        data: data,
        success: function (response) {
            location.href = '/admin/posts.html';
        }
    });
    return false;
});
//文章修改
$('#fatherBox').on('submit','#postModify',function(){
    var data = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: data,
        success: function (response) {
            location.href = '/admin/posts.html';
        },
    });
});
//获取地址栏id参数
var id = getUrlParams('id');
if(id != -1){
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function (response) {
            $.ajax({
                type: "get",
                url: "/categories",
                success: function (categories) {
                    response.categories = categories;
                    var html = template('modifyTpl',response);
                    $('#fatherBox').html(html);
                }
            });
        }
    });
}
//封装从浏览器地址栏中获取参数的函数
//其实可以返回整个地址栏参数对象
function getUrlParams(name) {
    var paramsArr = location.search.substr(1).split('&');
    var obj = {};
    paramsArr.forEach(value => {
        let arr = value.split('=');
        obj[arr[0]] = arr[1];
    });
    if (obj[name]) return obj[name];
    else return -1;
};