const express = require('express');
const router = express.Router();
const data = require('../data');
const product = data.products;


router.get('/', async(req, res) => {
    res.render("newListingView/newListing", {style: 'css/new.css'});
})

router.post('/', async(req, res) =>{
    const listingData = req.body;
    try{
        const date = new Date();
        const username = req.session.user.username
        
        let {name, category, description, price, picture} = listingData

        
        console.log(price)
        console.log(typeof(price))
        price = Number(price)

        await product.addNewProduct(name, category, description, date, username, price, picture);
        res.render("newListingView/newListing", {
            style: 'css/new.css',
            message: "Post successful!",
            class: 'success',
        })
    } catch(e){
        console.log(e);
        res.status(400);

        res.render("newListingView/newListing", {
            style: 'css/new.css',
            message: "Post Failed",
            class: "fail"


        })
       }

})



module.exports = router;