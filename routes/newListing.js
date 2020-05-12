const multer = require('multer')
const express = require('express');
const router = express.Router();
const data = require('../data');
const product = data.products;
//Using multer to save image to server
//Not posting actual image to MongoDb just location
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})



router.get('/', async(req, res) => {
    res.render("newListingView/newListing", {style: 'css/new.css'});
})
router.post('/', upload.single('picture'), async(req, res) =>{
    const listingData = req.body;
    try{
        const date = new Date();
        const username = req.session.user.username

        if(req.file == undefined){
            throw "[ERROR] No picture provided"
        } else{
            const picture = req.file.originalname
            let {name, category, description, price} = listingData
            price = Number(price)
            await product.addNewProduct(name, category, description, date, username, price, picture);
            res.render("newListingView/newListing", {
                style: 'css/new.css',
                message: "Post successful!",
                class: 'success',
            })
        }     
    } catch(e){
        console.log(e);
        res.status(400);

        res.render("newListingView/newListing", {
            style: 'css/new.css',
            message: "Post Failed",
            class: "fail"


        })
       }

})


module.exports = router;