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

    async addNewProduct(productName, category, description, postedDate, vendor, price, image, vendorId){ 
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
        if (typeof price !== "number" || !price || price <= 0){
            throw "[ERROR] No price provided or not number or not positive"
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
            image: image,
            vendorId: vendorId,
            comments: []
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
        // !! SET FUNC  Add logic to find duplicates in the set
        const productsFound = await productsCollection.find({"_id": {$in: obj_ids}}).toArray(); 

        var fullCart = []
        let total = -5 

        if (obj_ids.length > 1){ 

            for (let j = 0; j < obj_ids.length; j++){ 
                for (let i = 0; i < productsFound.length; i++){ 
                    if (productsFound[i]._id.toString() === obj_ids[j].toString()){ 
                        // add to total 
                        total += productsFound[i].price
                        // add to full cart 
                        fullCart.push(productsFound[i])
                    }
                }

            }
            return [fullCart, total]
        }else{ 
            for (let i = 0; i < productsFound.length; i++){
                total += productsFound[i].price

            }
            return [productsFound, total]
        }


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

    async updateProduct(id, productName, category, description, price, image) {
        if (!id) throw 'You must provide an id to update product for';
		if (typeof productName !== "string" || !productName){
            throw "[ERROR] No product name provided or not string"
        }
        if (typeof category !== "string" || !category){
            throw "[ERROR] No category provided or not string"
        }
        if (typeof description !== "string" || !description){
            throw "[ERROR] No description provided or not string"
        }
        if (typeof price !== "number" || !price || price <= 0){
            throw "[ERROR] No price provided or not number or not positve"
        }
        if (typeof image !== "string" || !image){
            throw "[ERROR] No image provided or not string"
        }

		const productsCollection = await products(); 
		let updateProduct = { 
            productName: productName, 
            category: category, 
            description: description, 
            price: price, 
            image: image
        }

		const updatedInfo = await productsCollection.updateOne({ _id: new ObjectID(id) }, { $set: updateProduct });
		if (updatedInfo.modifiedCount === 0) {
			throw 'could not update product successfully';
		}

		return await this.getProductById(id);
    },

    async addComment(comment, productId){
        if (!productId) throw 'You must provide an id to update product for';
		if (typeof comment !== "string" || !comment){
            throw "[ERROR] No comment provided or not string"
        }

        const productsCollection = await products(); 
        const updateProduct = await productsCollection.updateOne( 
            {"_id": new ObjectID(productId)}, 
            {$push: {"comments": comment.toString()}}
        );

        return await this.getProductById(productId)
    },
    
    async getComments(productId){
        if (!productId) throw 'You must provide an id to update product for';
        const p = await this.getProductById(productId)
        if(p.comments == null){
            return []
        }
        else{
            return p.comments
        }

    }


}