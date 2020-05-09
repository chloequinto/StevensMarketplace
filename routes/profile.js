const express = require('express');
const router = express.Router();
data = require('../data');
userData = data.users;

router.get('/', async(req, res) => {
    let userID = req.session.user.userId

    console.log(userID)

    let userInfo = await userData.getUserById(userID)


    res.render("profileView/profile", {
        style: 'css/profile.css',
        user: req.session.user,
        email: userInfo.contactInfo,
        history: userInfo.hasBought,
        fav: userInfo.favProducts

    });
})

module.exports = router;