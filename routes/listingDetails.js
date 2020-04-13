const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.listings

router.post('/', async(req, res) => {
    console.log(req.body)
    try{
        const product = await productData.getListing(req.params.id)
        res.render('listingDetails', {productData: product, style: "details.css"})
    }
    catch (e) {
        res.status(500).json({error: e})
    }

});

module.exports = router;