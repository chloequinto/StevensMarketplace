const express = require('express');
const router = express.Router();

const data = require('../data')

const user = data.users
const productData = data.products;


router.post('/', async(req, res) => {

    let query = req.body; 

    if(!query || query["term"] == ""){ 
        res.status(403).render("searchView/searchFailure", {search: query.term.toString(), style: "css/style.css"})
        return; 
    }
    try{ 
        const searchResults = await productData.getSearchResults(query); 
        if (searchResults.length === 0){ 
            res.render("searchView/searchFailure", {search: query.term.toString(), style: "css/style.css"})
        }else{ 
            res.render("searchView/searchDetails",{user: req.session.user, search: query.term.toString(),  results: searchResults, style: 'css/style.css'})
        }
        
    }catch(e){ 
        res.status(500).json({error: e})
    }
});
module.exports = router;