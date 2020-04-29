const products = require('../data/products')

const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => { 
    let allProducts = await products.getAllProducts(); 
    res.render('homeView/home', {style: 'css/style.css', content: allProducts});

}); 


module.exports = router;