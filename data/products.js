const mongoCollections = require('../config/mongoCollections');
var ObjectID = require('mongodb').ObjectID;

var products = mongoCollections.products; 
var users = mongoCollections.users; 


module.exports = { 

    async getProductById(id){ 
        if (!id){ 
            throw "[ERROR] Must provide ID to search for"
        }

        const productsCollection = await products(); 
        const productFound = await productsCollection.findOne({"_id": new ObjectID(id)}); 

        if(productFound === null){ 
            throw "[ERROR] No product with that ID"
        }

        return productFound;
    }, 
    async getProductByUsername(username){
        if(typeof(username) !== "string" || !username){
            throw "[ERROR] must provide username of type string to search for products"
        }
        const productsCollection = await products();       
        try{ 
            var foundItems = await productsCollection.find(
                {"vendor" : {'$regex' : username, 
                                 '$options': "i"}}) 
                .toArray()
    
        }catch(e){ 
            console.log(e)
        }
        return foundItems
        
  
    },

    async addNewProduct(productName, category, description, postedDate, vendor, price, image){ 
        if (typeof productName !== "string" || !productName){
            throw "[ERROR] No product name provided or not string"
        }
        if (typeof category !== "string" || !category){
            throw "[ERROR] No category provided or not string"
        }
        if (typeof description !== "string" || !description){
            throw "[ERROR] No description provided or not string"
        }
        if (typeof postedDate !== "object" || !postedDate){
            throw "[ERROR] No date provided or not string"
        }
        if (typeof vendor !== "string" || !vendor){
            throw "[ERROR] No vendor provided or not string"
        }
        if (typeof price !== "number" || !price){
            throw "[ERROR] No price provided or not number"
        }
        if (typeof image !== "string" || !image){
            throw "[ERROR] No image provided or not string"
        }

        const productsCollection = await products(); 

        const usersCollection = await users(); 

        let vendorContact = await usersCollection.findOne({username: vendor})
        
        let newProduct = { 
            productName: productName, 
            category: category, 
            description: description, 
            postedData: postedDate, 
            vendor: vendorContact.username, 
    
            price: price, 
            contactInfo: vendorContact.contactInfo, 
            image: image
        }

        const insertProduct = await productsCollection.insertOne(newProduct); 

        if (insertProduct.insertedCount === 0){
            throw `[ERROR] ${productName} could not be added into the DB`
        }

        const newProductId = insertProduct.insertedId; 

        const productAdded = await this.getProductById(newProductId); 

        return productAdded; 

    }, 

    async getAllProducts(){ 
        const productsCollection = await products(); 
        const productsAll = await productsCollection.aggregate([{ $sample: { size: 6 } }]).toArray(); 
        return productsAll;
    }, 

    async getCartInfo(cartInfo){ 
        if (!cartInfo){ 
            throw "[ERROR] must provide cart information"
        }
  
        const productsCollection = await products(); 

        // Convert String IDs to Object IDs
        try { 
            var obj_ids = cartInfo.map(function (item){
                return new ObjectID(item)
           });
        }catch(e){ 
            console.log(e)
        }

        // Find all products where IDs are in the obj_ids
        const productsFound = await productsCollection.find({"_id": {$in: obj_ids}}).toArray(); 

        // Retrieve total price of cart 
        let total = -5 // fix for coupon 
        for (let i = 0; i < productsFound.length; i++){
            total += productsFound[i].price

        }
        return [productsFound, total]
    }, 

    async getSearchResults(query){ 
        if (!query){ 
            throw "[ERROR] Must Provide a Query"
        }

        const productsCollection = await products(); 
        
        try{ 
            var foundItems = await productsCollection.find(
                {"productName" : {'$regex' : query.term, 
                                 '$options': "i"}}) // case insensitive 
                .toArray()
    
        }catch(e){ 
            console.log(e)
        }
        return foundItems
        
  
    },

}