$('#modifyForm').on('submit',function(){
    var data = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/users/password",
        data: data,
        success: function (response) {
            location.href = '/admin/login.html';
        }
    });
    return false;
})