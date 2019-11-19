var id = getUrl().id;
$.ajax({
    type: "get",
    url: "/posts/" + id,
    success: function (response) {
        var html = template('postTpl',response);
        $('#postBox').html(html);
    }
});