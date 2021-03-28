function putLike() {
  const postId = $("#post-id").val();
  $.ajax({
    url: `/api/article/posts/${postId}/likes/`,
    method: "POST",

    success: function(data) {
      $("#likes-count").html(data['likes']);
    }
  })
}

function getLike(){
    const postId = $("#post-id").val();
    $.ajax({
        url: `/api/article/posts/${postId}/`,
        method: 'GET',
        success: function (data){
            $("#likes-count").html(data['likes']);
        }
    });
}

function showFormComment(){
    $("#form-comment").toggleClass("d-none");
}


function sendComment(comment) {
  const postId = $("#post-id").val();
  $.ajax({
    url: `/api/article/posts/${postId}/comments/`,
    method: "POST",
    data: JSON.stringify(comment ),
    contentType: "application/json; charset=utf-8",
    success: function() {
      $("#form-comment")[0].reset();
      $("#form-comment").addClass("d-none")
      alert("Comment has been added")
      loadComments()
    }
  })
}

function loadComments() {
  const postId = $("#post-id").val();
  $(".comments-list").html("Loading...")
  $.ajax({
    url: `/api/article/posts/${postId}/comments/`,
    method: "GET",
    success: function(data) {
        showComments(data);
    }
  })
}

function showComments(comments) {
  $(".comments-list").html("")
  comments.forEach((comment) => {
    const el = $("<div class='pt-2'></div>").html(`
    <p>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
        <b>${ comment.author }:</b> ${ comment.body }</p>
      <hr>
    `);
    $(".comments-list").append(el)
  })
}

$(document).ready(function() {
  loadComments();

  $('#do_like').click(function(e){
      putLike();
  })
    getLike();
  $("#form-comment").on("submit", function() {
    const array = $('#form-comment').serializeArray();
    const data = {};
    array.forEach(function(item) {
      data[item["name"]] = item["value"];
    })

    sendComment(data);

      return false;
  })
})