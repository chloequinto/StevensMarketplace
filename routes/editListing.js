const multer = require('multer')
const express = require('express');
const router = express.Router();
const data = require('../data');
const product = data.products;
const xss = require('xss')

//save new image to upload folder
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
    //wrap each req.body value in xss
    const listingData = {
        name: xss(req.body.name),
        category: xss(req.body.category),
        description: xss(req.body.description),
        price: Number(xss(req.body.price))
    };
    try{
        const p = await productData.getProductById(req.query.id)

        //if there isnt a new image dislpay old picture(product.image)
        if(req.file == undefined){
            const picture = p.image
            const id = req.query.id
            let {name, category, description, price} = listingData
            
            
            price = Number(price)
            await product.updateProduct(id, name, category, description, price, picture);
            res.render("editingView/editingView", {
                style: 'css/new.css',
                message: "Update successful!",
                class: 'success',
                allowed: true,
                listingName: name,
                listingCategory: category,
                listingDescription: description,
                listingPrice: price,
                listingImage: picture,
                //display data
            })

            
        } else{
            const picture = req.file.originalname
    
            const id = req.query.id
            let {name, category, description, price} = listingData
            
            
            price = Number(price)
            await product.updateProduct(id, name, category, description, price, picture);
            res.render("editingView/editingView", {
                style: 'css/new.css',
                message: "Update successful!",
                class: 'success',
                allowed: true,
                listingName: name,
                listingCategory: category,
                listingDescription: description,
                listingPrice: price,
                listingImage: picture,
                //display data
            })
        }
        
    } catch(e){
        console.log(e);
        res.status(400);
        const p = await product.getProductById(req.query.id)
        res.render("editingView/editingView", {
            style: 'css/new.css',
            message: "Update failed",
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