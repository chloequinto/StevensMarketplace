const express = require('express');
const router = express.Router();

const data = require('../data')

const user = require('../data/users')
const productData = data.products;


router.get('/', async(req, res) => { 
    try{
        

        res.render('boughtView/boughtDetails', {user: req.session.user, style: "css/checkout.css"})
    }catch(e){ 
        res.status(500).json({error: e})
    }
}); 


module.exports = router;