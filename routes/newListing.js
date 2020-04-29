const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render("newListingView/newListing", {style: 'css/new.css'});
})

module.exports = router;