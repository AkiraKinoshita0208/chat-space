$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="chat-body__container">
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
      `<div class="chat-body__container">
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
});
