const path = require('path');

const listingsRoutes = require('./listingDetails')
const newListingRoutes = require('./newListing')
const homeRoutes = require('./homeRoutes')
const checkoutRoutes = require('./checkout')

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
        res.render('login/login', {style: 'css/styles.css'})
    })

    app.post('/login', async (req, res) => {
        try{
            user = await users.getUserByEmail(req.body.contactInfo)
            hashedPasswordInput = await users.hashPassword(req.body.password)
            if(bcrypt.compareSync(req.body.password, user.password)){
                // Create session user 
                req.session.user= {username: user.username, hasBought: user.hasBought, userId: user._id }
                
                res.cookie('AuthCookie',  user).redirect("/home")
            }
            else{
                res.redirect("/login")
            }
        }
        catch{
            res.redirect("/createAccount")
        }
    })
    app.get('/createAccount', (req, res) => {
        if(req.cookies.AuthCookie){
            res.redirect('/home')
        }
        else{
            res.render('login/newUser', {style: 'css/styles.css'})
        }
    })

    app.post('/createUser', async (req, res) => {
        try{
            user = await users.addNewUser(req.body.name, req.body.password, [], [], req.body.contactInfo)
            res.cookie('AuthCookie',  user).redirect("/home")
        }
        catch{
            res.redirect("/createAccount")
        }
        
    })

    app.get('/logout', (req, res) => {
        res.clearCookie('AuthCookie',{path:'/'})
        res.redirect('/')
    })

    app.use("/home", homeRoutes)
    app.use('/listingDetails', listingsRoutes)
    app.use('/new', newListingRoutes)
    app.use("/checkout", checkoutRoutes)

};  
module.exports = constructorMethod;