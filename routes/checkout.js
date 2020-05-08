const express = require('express');
const router = express.Router();

const data = require('../data')

const users = require('../data/users')
const products = data.products;


router.get('/', async(req, res) => { 
    try{

        // Get the user's products 
        const usersCart = await users.getUsersCart(req.session.user.userId); 

        // Get product's info 
        const productInfo = await products.getCartInfo(usersCart)


        res.render('checkoutView/checkoutDetails', { productData: productInfo[0], total: productInfo[1], user: req.session.user, style: "css/checkout.css"})
    }catch(e){ 
        res.status(500).json({error: e})
    }
}); 


module.exports = router;