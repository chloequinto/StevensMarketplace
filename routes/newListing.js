const express = require('express');
const router = express.Router();
const data = require('../data');
const listing = data.listings;

router.get('/', async(req, res) => {
    res.render("newListingView/newListing", {style: 'css/new.css'});
})
// router.post('/home', async(req, res) =>{
//     const listingData = req.body;
//     try{
//         const {} = listingData
//         const newListing = await listing.
// })


module.exports = router;