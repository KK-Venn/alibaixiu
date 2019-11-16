$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        var html = template('postTpl',response);
        $('#postBox').html(html);
    }
});
function formateDate(date){
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
}