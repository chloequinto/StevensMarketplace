const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;




router.get('/', async(req, res) => {
    let name = req.session.user.username

    let yourListings = await productData.getProductByUsername(name)

     res.render("profileView/yourListings", {
        style: 'css/yourListings.css',
        yourListings: yourListings
    });
})

module.exports = router;