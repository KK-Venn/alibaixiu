//索要随机推荐数据
$.ajax({
    type: "get",
    url: "/posts/random",
    success: function (response) {
        var randomTpl = `
        {{each data}}
        <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
        {{/each}}
        `;
        var html = template.render(randomTpl,{data:response});
        $('#randomBox').html(html);
    }
});
//索要最新评论
$.ajax({
    type: "get",
    url: "/comments/lasted",
    success: function (response) {
       var commentTpl = `
       {{each data}}
       <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
              </div>
              <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0,10)}}说:
                </p>
                <p>{{$value.content}}</p>
              </div>
            </a>
          </li>
       {{/each}}
       `; 
       var html = template.render(commentTpl,{data:response});
       $('#commentBox').html(html);
    }
});
//索要分类信息
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var categoryTpl = `
        {{each data}}
        <li>
        <a href="list.html?categoryId={{$value._id}}">
        <i class="fa {{$value.className}}">
        </i>{{$value.title}}</a>
        </li>
        {{/each}}
        `;
        var html = template.render(categoryTpl,{data:response});
        $('#navBox').html(html);
        $('#topNavBox').html(html);
    }
});
function getUrl(){
    var arr = location.search.substr(1).split('=');
    var obj = {};
    obj[arr[0]] = arr[1];
    return obj;
}