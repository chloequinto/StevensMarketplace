const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const session = require("express-session");
const cookieParser = require('cookie-parser');

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
		'[' + (new Date()).toUTCString() + ']: ' + req.method +' '+ req.originalUrl + ' ' + JSON.stringify(req.body)
	);
	if(req.cookies.AuthCookie || req.originalUrl == '/createUser' || req.originalUrl=='/createAccount' || req.originalUrl=='/login'){
		next()
	}
	else{
		res.redirect('/login')
	}
	// next()
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});