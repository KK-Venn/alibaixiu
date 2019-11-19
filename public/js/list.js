var categoryId = getUrl().categoryId;
$.ajax({
    type: "get",
    url: "/posts/category/" + categoryId,
    success: function (response) {
        var html = template('postTpl',{data:response});
        $('#postBox').html(html);
    }
});
$.ajax({
    type: "get",
    url: "/categories/" + categoryId,
    success: function (response) {
        $('#categoryTitle').html(response.title);
    }
});