const express = require('express');
const router = express.Router();

const data = require('../data')

const users = require('../data/users')
const products = data.products;


router.get('/', async(req, res) => { 
    try{

        // Get the user's products 
        const usersCart = await users.getUsersCart(req.session.user.userId); 
        console.log(usersCart)
        console.log(typeof(usersCart))
        // Get product's info 
        const productInfo = await products.getCartInfo(usersCart)

        // If total less than 0 (due to promo)
        if (productInfo[1] < 0){ 
            productInfo[1] = 0; 
        }
        // check if users cart is empty
        if(Object.keys(usersCart).length === 0){
            res.render('cartView/cartDetails',{message: 'There is nothing in your cart!', style: "css/style.css"})
        } else{
            res.render('checkoutView/checkoutDetails', { productData: productInfo[0], total: productInfo[1], user: req.session.user, style: "css/checkout.css"})

        }
    }catch(e){ 
        res.status(500).json({error: e})
    }
}); 


module.exports = router;