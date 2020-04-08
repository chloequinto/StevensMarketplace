const path = require('path');


const constructorMethod = (app) => { 
    // app.get('*', (req, res) => {
	// 	  res.sendFile(path.resolve('static/home.html'));
    // });
    app.get('/', (req, res) => {
        res.render('home');
    });
};  
module.exports = constructorMethod;