const express = require('express');
const router = express.Router();

const data = require('../data')

const user = require('../data/users')
const productData = data.products;


router.get('/', async(req, res) => { 
    try{
        
        const product = await productData.getProductById(req.query.id); 
        
        // add product to the user's cart
        const addProductToUser = await user.addProductToCard(req.query.id, req.session.user.userId)
    

        // Given a list of products, return a list of product info 
        const cartInfo = await productData.getCartInfo(addProductToUser.cart)


        res.render('checkoutView/checkoutDetails', {productData: cartInfo[0], total: cartInfo[1], user: req.session.user, style: "css/checkout.css"})
    }catch(e){ 
        res.status(500).json({error: e})
    }
}); 


module.exports = router;