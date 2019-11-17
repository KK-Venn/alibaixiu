$('#logo').on('change', function () {
    var file = this.files[0];
    var formdata = new FormData();
    formdata.append('logo', file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
            $('#hiddenLogo').val(response[0].logo);
            $('#preview').prop('src',response[0].logo);
        }
    });
});
//网站设置数据
$('#settingForm').on('submit',function(){
    var data = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/settings",
        data: data,
        success: function (response) {
            location.reload();
        }
    });
    return false;
});
//索要网站设置数据
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        if(response){
           $('#hiddenLogo').val(response.logo); 
           $('#preview').attr('src',response.logo);
           $('input[name="title"]').val(response.title);
           $('input[name="comment"]').prop('checked',response.comment);
           $('input[name="review"]').prop('checked',response.review);
        }
    }
});