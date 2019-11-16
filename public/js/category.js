//获取分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('categoryListTpl',{data:response});
        $('#categoryBox').html(html);
    },
});

//添加分类
$('#addCategory').on('submit',function(){
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