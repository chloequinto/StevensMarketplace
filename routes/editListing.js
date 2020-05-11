const multer = require('multer')
const express = require('express');
const router = express.Router();
const data = require('../data');
const product = data.products;

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

    try{
        const product = await productData.getProductById(req.query.id)
        const username = req.session.user.username
        if(product.vendor == username){
            res.render("editingView/editingView", {
                style: 'css/new.css', 
                allowed: true, 
                listingName: product.productName,
                listingCategory: product.category,
                listingDescription: product.description,
                listingPrice: product.price,
                listingImage: product.image,
            });
        }
        else{
            res.render("editingView/editingView", {style: 'css/new.css', allowed: false});
        }
    }
    catch{
        res.render("editingView/editingView", {style: 'css/new.css',  allowed: false});
    }
    
})
router.post('/', upload.single('picture'), async(req, res) =>{
    const listingData = req.body;
    
    try{
        let {name, category, description, price} = listingData


        price = Number(price)

        
        await product.updateProduct(req.query.id, name, category, description, price, "picture");
        res.render("editingView/editingView", {
            style: 'css/new.css',
            message: "Update successful!",
            class: 'success',
            allowed: true,
            listingName: name,
            listingCategory: category,
            listingDescription: description,
            listingPrice: price,
            listingImage: "../../public/images/none.png",
            //display data
        })
        
    } catch(e){
        console.log(e);
        res.status(400);
        const p = await product.getProductById(req.query.id)
        res.render("editingView/editingView", {
            style: 'css/new.css',
            message: "Updated Failed",
            class: "fail",
            allowed:true,
            listingName: p.productName,
            listingCategory: p.category,
            listingDescription: p.description,
            listingPrice: p.price,
            listingImage: p.image,
            //get original data

        })
       }

})



module.exports = router;