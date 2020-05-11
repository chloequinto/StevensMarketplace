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

    res.render("profileView/profile", {
        style: 'css/profile.css',
        user: req.session.user,
        email: userInfo.contactInfo,
        history: historyInfo[0],

        fav: userInfo.favProducts

    });
})

module.exports = router;