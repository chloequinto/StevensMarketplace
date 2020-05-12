const express = require("express"); 
const router = express.Router(); 


const users = require("../data/users")

const xss = require('xss');


router.post("/", async(req, res) => { 

    if(xss(req.body.action) == 'add'){
        try{
            await users.addFavorite(req.session.user.userId, xss(req.body.listingId))
            res.send(200)
        }
        catch(e){
            console.log(e)
            res.send(400)
        }

    }
    if(xss(req.body.action) == 'remove'){
        try{
            await users.removeFavorite(req.session.user.userId, xss(req.body.listingId))
            res.send(200)
        }
        catch(e){
            console.log(e)
            res.send(400)
        }
    }
}); 

module.exports = router;