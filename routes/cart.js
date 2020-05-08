const express = require("express"); 
const router = express.Router(); 


const data = require('../data')
const users = require("../data/users")
const products = require("../data/products")

router.get("/", async(req, res) => { 
    try{ 

        // If the user is adds to cart 
        if (req.query.id){ 
            await users.addProductToCard(req.query.id, req.session.user.userId)
     
        }
        // Get the user's products 
        const usersCart = await users.getUsersCart(req.session.user.userId); 
  
        // // Get product's info 
        const productInfo = await products.getCartInfo(usersCart)

        res.render("cartView/cartDetails",{ user: req.session.user, productData: productInfo[0], total: productInfo[1],  style: 'css/style.css'})
    }catch(e){ 

        res.status(500).json({error: e});
    }
}); 


module.exports = router; 