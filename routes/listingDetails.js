const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products
const userData = data.users
const xss = require("xss")

router.get('/', async(req, res) => {
    
    try{
        const product = await productData.getProductById(req.query.id)
        const favorites = await userData.getUserFavorites(req.session.user.userId)
        var favorite = false;
        if(favorites.indexOf(req.query.id) >= 0){
            favorite = true
        }
        res.cookie('currentProduct', req.query.id).render('listingView/listingDetails', {productData: product, style: "css/details.css", favorite: favorite})
    }
    catch (e) {
        res.status(500).json({error: e})
    }

});


router.post('/comments', async (req, res) => {
    
    const productId = req.cookies.currentProduct;
    // console.log(productId)
    // console.log(req.body.comment)
    
    
    const product = await productData.addComment(xss(req.body.comment), productId)
    var comments = product.comments
    // console.log(comments)
    res.json({comments: comments})
    
})
module.exports = router;