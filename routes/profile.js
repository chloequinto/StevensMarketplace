const express = require('express');
const router = express.Router();
data = require('../data');
userData = data.users;
productData = data.products;

router.get('/', async(req, res) => {
    let userID = req.session.user.userId

    let userInfo = await userData.getUserById(userID)

    // Previously Bought -> Return Detailed Product 
    let historyInfo = await productData.getCartInfo(userInfo.previouslyBought)
    
    var favorites = []
    for(let i = 0; i<userInfo.favorites.length;i++){
        try{
            favorites[i] = await productData.getProductById(userInfo.favorites[i])
        }
        catch(e){
            console.log(e)
        }
    }

    res.render("profileView/profile", {
        style: 'css/profile.css',
        user: req.session.user,
        email: userInfo.contactInfo,
        history: historyInfo[0],
        favorites: favorites

    });
})

module.exports = router;