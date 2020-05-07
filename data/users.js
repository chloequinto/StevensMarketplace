const mongoCollections = require('../config/mongoCollections');
var ObjectID = require('mongodb').ObjectID;

const users = mongoCollections.users;
const bcrypt = require("bcryptjs"); 

module.exports = { 
    async getUserById(id){ 
        // Retrieves user info from DB 
        if(!id){ 
            throw "[ERROR] Must provide ID to search for"
        }
        const usersCollection = await users(); 
        const userFound = await usersCollection.findOne({"_id": new ObjectID(id)}); 

        if (userFound === null){ 
            throw "[ERROR] No user with that ID"
        }

        return userFound;
    }, 

    async addNewUser(name, password, cart, itemsToSell, contactInfo){ 
        // Adds new user into DB
        if (typeof name !== "string" || name == null ){
            throw "[ERROR] No name provided or not string"
        }
        if(typeof password !== "string" || password === null){ 
            throw "[ERROR] No password provided or not string"
        }
        if(typeof cart !== "object" || cart === null){ 
            throw "[ERROR] No hasBought provided or not object"
        }

        if(typeof itemsToSell !== "object" || itemsToSell === null){
            throw "[ERROR] No favProducts provided or not object"
        }

        if (typeof contactInfo !== "string" || contactInfo === null){
            throw "[ERROR] No contactInfo provided or not string"
        }

        const usersCollection = await users(); 

        var salt = bcrypt.genSaltSync(10); 


        let newUser = { 
            username: name, 
            password: await bcrypt.hashSync(password, salt), 
            cart: cart, 
            itemsToSell: itemsToSell, 
            contactInfo: contactInfo
        }; 

        const insertUser = await usersCollection.insertOne(newUser); 

        if (insertUser.insertedCount === 0){ 
            throw `[ERROR] ${name} could not be added to the DB`
        }

        
        const newUserId = insertUser.insertedId; 

        const userAdded = await this.getUserById(newUserId); 

        return userAdded; 
    },

    async getUserByEmail(email){
        if(!email){ 
            throw "[ERROR] Must provide Email to search for"
        }
        const usersCollection = await users(); 
        const userFound = await usersCollection.findOne({"contactInfo": email}); 

        if (userFound === null){ 
            throw "[ERROR] No user with that ID"
        }

        return userFound;
    },
    
    async hashPassword(password){
        var salt = bcrypt.genSaltSync(10); 
        var hash = await bcrypt.hashSync(password, salt)
        return hash
    }, 

    async addProductToCard(productId, userId){ 

        if(!productId){ 
            throw "[ERROR] Must provide product ID"
        }
        if(!userId){ 
            throw "[ERROR] Must provide User Info"
        }

        const usersCollection = await users(); 
  
        let userInfo = await this.getUserById(userId)
  
        const updateCart = await usersCollection.updateOne( 
            {"_id": new ObjectID(userId)}, 
            {$addToSet: {"cart": productId.toString()}}
        );
        
        if(updateCart.modifiedCount === 0){
            throw "[ERROR] Could not update cart"
        }
        userInfo = await this.getUserById(userId)
        return userInfo
    }


}