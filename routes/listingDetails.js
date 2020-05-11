const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products
const userData = data.users

router.get('/', async(req, res) => {
    
    try{
        const product = await productData.getProductById(req.query.id)
        const favorites = await userData.getUserFavorites(req.session.user.userId)
        var favorite = false;
        if(favorites.indexOf(req.query.id) >= 0){
            favorite = true
        }
        res.render('listingView/listingDetails', {productData: product, style: "css/details.css", favorite: favorite})
    }
    catch (e) {
        res.status(500).json({error: e})
    }

});

module.exports = router;