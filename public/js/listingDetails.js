
function likeClicked(t, listingId =""){

    var s = t.getAttribute('src')
    if (s == "../../public/images/heart-outline.png"){
        t.setAttribute('src', "../../public/images/heart.png")
        var formData = new FormData()
        formData.append('listingId', listingId)
        formData.append('action', 'add')
        fetch("/favorites", {
            method: "POST",
            
            body: JSON.stringify({listingId: listingId, action: 'add'}),
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            console.log(res)
        })
        
    }
    if(s == "../../public/images/heart.png"){
        t.setAttribute('src', "../../public/images/heart-outline.png")
        var formData = new FormData()
        formData.append('listingId', listingId)
        formData.append('action', 'remove')
        fetch("/favorites", {
            method: 'POST',
            body: JSON.stringify({listingId: listingId, action: 'remove'}),
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            console.log(res)
        }) 
    }
}


function removeFavorite(listingId){
    fetch("/favorites", {
        method: 'POST',
        body: JSON.stringify({listingId: listingId, action: 'remove'}),
        headers: {
            "Content-Type": "application/json"
        },
    }).then((res) => {
        fetch("/profile", {
            method: 'GET'
        })
    }) 
}

(function($) {

    var newCommentForm = $("#new-comment-form"),
        newCommentText = $("#new-comment-text"),
        commentsArea = $("#comments-area")
    
    function binEventsToCommentsIte(comments){
         
    }

    newCommentForm.submit(function(event) {

        event.preventDefault()
        var newComment = newCommentText.val();
        if(newComment && newComment != null && newComment != ""){
            var requestConfig = {
                method: 'POST',
                url: '/listingDetails/comments',
                contentType: 'application/json',
                data: JSON.stringify({
                    comment: newComment
                }),
            }

            $(document).ajaxSuccess(function(event,xhr,options){
                comments = xhr.responseJSON.comments
                var p = ''
                for(let i = 0; i<comments.length; i++){
                    p = p + "<p>" + comments[i] + "</p>"
                }
                commentsArea.html(p)
                
            });

            $.ajax(requestConfig).then(function(responseMessage) {
                console.log(responseMessage);
                // newContent.html(responseMessage.message);
                //                alert("Data Saved: " + msg);
            });
        }
    })

    



})(window.jQuery);