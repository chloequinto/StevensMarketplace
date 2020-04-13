const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render("newListing", {style: 'new.css'});
})

module.exports = router;