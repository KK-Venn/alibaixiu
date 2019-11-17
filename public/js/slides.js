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
})