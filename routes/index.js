const path = require('path');
const listingsRoutes = require('./listingDetails')
const newListingRoutes = require('./newListing')

const constructorMethod = (app) => { 
    app.get('/', (req, res) => {
        res.render('homeView/home', {style: 'style.css'});
    });

    app.use('/listingDetails', listingsRoutes)
    app.use('/new', newListingRoutes)

};  
module.exports = constructorMethod;