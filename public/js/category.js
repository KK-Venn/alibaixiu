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
//删除单个分类数据
$('#categoryBox').on('click', '.delete', function () {
    if (confirm('确定删除此分类?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: "delete",
            url: `/categories/${id}`,
            success: function (response) {
                location.reload();
            }
        });
    }else{
        return false;
    }
});
//同步批量删除框
$('#selectAll').on('change',function(){
    var status = $(this).prop('checked');
    if(status){
        $('#deleteMany').show();
    }else{
        $('#deleteMany').hide();
    }
    $('.categoryStatus').prop('checked',status);
});
$('#categoryBox').on('change','.categoryStatus',function(){
    if($('.categoryStatus').length == $('.categoryStatus').filter(':checked').length){
        $('#selectAll').prop('checked',true);
    }else{
        $('#selectAll').prop('checked',false);
    };
    if($('.categoryStatus').filter(':checked').length){
        $('#deleteMany').show();
    }else{
        $('#deleteMany').hide();
    }
})
//删除多个分类数据
$('#deleteMany').on('click',function(){
    var ids = [];
    var checkedList = $('.categoryStatus').filter(':checked');
    $(checkedList).each(function(index,element){
        ids.push($(element).attr('data-id'));
    });
    $.ajax({
        type: "delete",
        url: "/categories/"+ ids.join('-'),
        success: function (response) {
            location.reload();
        }
    });
});