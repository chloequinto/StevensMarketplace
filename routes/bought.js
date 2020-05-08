const express = require('express');
const router = express.Router();

const data = require('../data')

const users = require('../data/users')
const productData = data.products;


router.get('/', async(req, res) => { 
    try{
        // delete user cart 
        const deletedCart = await users.clearCart(req.session.user.userId)

        res.render('boughtView/boughtDetails', {user: req.session.user, style: "css/bought.css"})
    }catch(e){ 
        res.status(500).json({error: e})
    }
}); 


module.exports = router;