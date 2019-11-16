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