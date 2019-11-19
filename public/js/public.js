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