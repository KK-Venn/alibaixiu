$('#logout').on('click',function(){
    var isConform = confirm('您确定要退出吗？');
    if(isConform){
      $.ajax({
        type: "post",
        url: "http://localhost/admin/logout",
        success: function (response) {
          location.href = 'login.html';
        },
        error:function(){
          alert('退出登录失败');
        }
      });
    };
  });

//日期格式化
function formateDate(date) {
  date = new Date(date);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate());
};