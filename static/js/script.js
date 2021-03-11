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
            // showLike(data['likes']);
        }
    });
}

function showFormComment(){
    $("#form-comment").removeClass("d-none");
//    console.log("#form-comment")
//    setTimeout(() => {
//        $("#form-comment").addClass("d-none");
//    }, 5000);
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
    }
  })
}

//function showComments(comments) {
//  $(".comments-list").html("")
//  comments.forEach((comment) => {
//    const el = $("<div class='pt-2'></div>").html(`
//    <hr /><b>${comment.author}</b>: ${comment.body}
//    `);
//    $(".comments-list").append(el)
//  })
//
//}

//function loadComments() {
//  const postId = $("#post-id").val();
//  $(".comments-list").html("Loading...")
//  $.ajax({
//    url: `/api/article/posts/${postId}/comments/`,
//    method: "GET",
//    success: function(data) {
//        console.log(data.results)
//      showComments(data.results);
//    }
//  })
//
//}

$(document).ready(function() {
  //loadComments();

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