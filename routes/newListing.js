const express = require('express');
const router = express.Router();
const data = require('../data');
const product = data.products;

console.log(product)
router.get('/', async(req, res) => {
    res.render("newListingView/newListing", {style: 'css/new.css'});
})
router.post('/', async(req, res) =>{
    const listingData = req.body;
    try{
        const date = new Date();
        const {product, category, description, username, price, picture} = listingData

        console.log(picture)
        console.log(typeof(picture))
        
        await product.addNewProduct(product, category, description, date, username, price, picture);
        res.render("newListingView/newListing", {
            message: 'Post was successful!'
        })
    } catch(e){
        console.log(e);
        res.status(400);
        res.render("newListingView/newListing", {
            message: 'Post failed.'
        })
       }

})


module.exports = router;