const path = require('path');

const listingsRoutes = require('./listingDetails')
const newListingRoutes = require('./newListing')
const homeRoutes = require('./homeRoutes')
const checkoutRoutes = require('./checkout')
const boughtRoutes = require('./bought')
const cartRoutes = require('./cart')
const searchRoutes = require('./search')
const profileRoutes = require('./profile')
const yourListingsRoutes = require('./yourListings')
const favoriteRoutes = require('./favorites')
const editRoutes = require('./editListing')

const products = require("../data/products")
const users = require("../data/users");

const bcrypt = require("bcryptjs"); 


const constructorMethod = (app) => { 
    app.get('/', async (req, res) => {
        if(req.cookies.AuthCookie){
            res.redirect('/home')
        }
        else{
            res.redirect('/login')
        }
    });

    app.get('/login', (req, res) => {
        res.render('login/login', {style: 'css/login.css', errorMsg: req.cookies.loginErrorMsg})
    })

    app.post('/login', async (req, res) => {
        try{
            user = await users.getUserByEmail(req.body.contactInfo)
            hashedPasswordInput = await users.hashPassword(req.body.password)
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user= {username: user.username, hasBought: user.hasBought, userId: user._id }
                res.clearCookie('createErrorMsg')
                res.clearCookie('loginErrorMsg')
                res.cookie('AuthCookie',  user).redirect("/home")
            }
            else{
                res.cookie('loginErrorMsg',  'Invalid Credentials').redirect("/login")
            }
        }
        catch{
            res.cookie('loginErrorMsg',  'Invalid Credentials').redirect("/login")
        }
    })
    app.get('/createAccount', (req, res) => {
        if(req.cookies.AuthCookie){
            res.redirect('/home')
        }
        else{
            
            res.render('login/newUser', {style: 'css/login.css', errorMsg: req.cookies.createErrorMsg})
        }
    })

    app.post('/createUser', async (req, res) => {
        try{
            if( req.body.name != null && req.body.name != "" &&
                req.body.password != null && req.body.password != "" &&
                req.body.contactInfo != null && req.body.contactInfo != "" ){

                userSearch = await users.userExistsFromUsername(req.body.name)
                if(userSearch){
                    res.cookie('createErrorMsg',  'An account with the same username exists').redirect("/createAccount")
                }
                else{
                    user = await users.addNewUser(req.body.name, req.body.password, [], [],[], req.body.contactInfo)       
                    req.session.user= {username: user.username, hasBought: user.hasBought, userId: user._id }     
                    res.clearCookie('createErrorMsg')
                    res.clearCookie('loginErrorMsg')
                    res.cookie('AuthCookie',  user).redirect("/home")

                }

            }
            else{
                res.cookie('createErrorMsg',  'Must provide valid name, email, and password').redirect("/createAccount")
            }
        }
        catch(e){

            res.cookie('createErrorMsg',  'Must provide valid name, email, and password').redirect("/createAccount")
        }
        
    })

    app.get('/logout', (req, res) => {
        res.clearCookie('AuthCookie',{path:'/'})
        res.redirect('/')
    })

    app.use("/home", homeRoutes)
    app.use('/listingDetails', listingsRoutes)
    app.use('/profile', profileRoutes)
    app.use('/yourListings', yourListingsRoutes)
    app.use('/newListing', newListingRoutes)
    app.use("/checkout", checkoutRoutes)
    app.use("/bought", boughtRoutes)
    app.use("/cart", cartRoutes)
    app.use("/search", searchRoutes)
    app.use("/favorites", favoriteRoutes)
    app.use("/editListing", editRoutes)

};  

module.exports = constructorMethod;