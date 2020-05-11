const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const session = require("express-session");
const cookieParser = require('cookie-parser');

const multer = require('multer')
const bodyParser = require('body-parser')

// const methodOVerride = require('method-override')

app.use(bodyParser());
// app.use(methodOVerride());
app.use(express.static('uploads'))
app.use(cookieParser())
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');




app.use(
	session({
		name: 'StevensMarkeplace',
		secret: "This is a secret.. shhh don't tell anyone",
		saveUninitialized: true,
		resave: false
	})
);

app.use(async (req, res, next) => {
	console.log(
		'[' + (new Date()).toUTCString() + ']: ' + req.method +' '+ req.originalUrl + ' '
	);
	if(req.cookies.AuthCookie || req.originalUrl == '/createUser' || req.originalUrl=='/createAccount' || req.originalUrl=='/login'){
		next()
	}
	else{
		res.redirect('/login')
	}
	// next()
});

// Middlewares 
app.use("/home", (req, res,next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
        console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});

app.use("/cart", (req, res, next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
        console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
        console.log('[' + new Date().toUTCString()  + ']: ' +req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
}); 

app.use("/checkout", (req, res, next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' +req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' +req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});

app.use("/bought", (req, res, next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});


app.use("/newListing", (req, res, next)=> { 
		if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString() + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});


app.use("/search", (req, res, next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString() + ']: ' +req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});

app.use("/listingDetails", (req, res, next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});

app.use("/yourListings", (req, res, next)=> { 
	if (!req.session.user){
        let authenticated = "Non-Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        return res.redirect('/login') 
    }else { 
        let authenticated = "Authenticated User (Middleware)"
		console.log('[' + new Date().toUTCString()  + ']: ' + req.method + " " + req.originalUrl+ " " + authenticated)
        next(); 
    }
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});