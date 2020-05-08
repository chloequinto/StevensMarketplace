const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products

router.get('/', async(req, res) => {
    
    try{
        const product = await productData.getProductById(req.query.id)
        res.render('listingView/listingDetails', {productData: product, style: "css/details.css", editing: false})
    }
    catch (e) {
        res.status(500).json({error: e})
    }

});

module.exports = router;