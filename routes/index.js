const path = require('path');
const listingsRoutes = require('./listingDetails')

const constructorMethod = (app) => { 
    // app.get('*', (req, res) => {
	// 	  res.sendFile(path.resolve('static/home.html'));
    // });
    app.get('/', (req, res) => {
        res.render('home', {style: 'style.css'});
    });

    app.use('/listingDetails', listingsRoutes)


};  
module.exports = constructorMethod;