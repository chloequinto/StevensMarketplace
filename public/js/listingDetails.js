




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