const path = require('path');
const listingsRoutes = require('./listingDetails')
const newListingRoutes = require('./newListing')
const homeRoutes = require('./homeRoutes')
const products = require("../data/products")

const constructorMethod = (app) => { 
    app.get('/', async (req, res) => {
        res.send("Go to /home until login page is built")
    });

    app.use("/home", homeRoutes)
    app.use('/listingDetails', listingsRoutes)
    app.use('/new', newListingRoutes)

};  
module.exports = constructorMethod;