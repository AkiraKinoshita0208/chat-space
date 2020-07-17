$(function(){ 
  console.log('OK');
  // test code >>>>>
  // console.log(last_message_id);
  // test code <<<<<
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="chat-body__container" data-message-id=${message.id}>
     <div class="post-info">
       <div class="user-name">
         ${message.user-name}
       </div>
       <div class="created-at">
         ${message.created_at}
       </div>
     </div>
     <div class="posted-message">
       <p class="posted-message__content">
         ${message.content}
       </p>
       <img src=${message.image} >
     </div>
   </div>`
  return html;
   } else {
     var html =
      `<div class="chat-body__container" data-message-id=${message.id}>
        <div class="post-info">
          <div class="user-name">
            ${message.user-name}
          </div>
          <div class="created-at">
            ${message.created_at}
          </div>
        </div>
        <div class="posted-message">
          <p class="posted-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
     return html;
   };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-body').append(html);
      $('.chat-body').animate({ scrollTop: $('.chat-body')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    }); 
  })
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    console.log('OK2');
    var last_message_id = $('.chat-body__container:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.messages').append(insertHTML);
      $('.chat-body').animate({ scrollTop: $('.messages')[0].scrollHeight});
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});