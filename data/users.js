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

    async userExistsFromUsername(username){ 
        // Retrieves user info from DB 
        if(!username){ 
            return false
        }
        const usersCollection = await users(); 
        const userFound = await usersCollection.findOne({"username": username}); 

        if (userFound === null){ 
            return false
        }

        return true;
    }, 

    async addNewUser(name, password, cart, previouslyBought, itemsToSell, contactInfo){ 
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

        if(typeof previouslyBought !== "object" || previouslyBought === null){ 
            throw "[ERROR] No previouslyBought provided or not object"
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
            previouslyBought: previouslyBought, 
            itemsToSell: itemsToSell, 
            contactInfo: contactInfo,
            favorites: []
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

    async addProductToCart(productId, userId){ 

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
            {$push: {"cart": productId.toString()}}
        );
        
        if(updateCart.modifiedCount === 0){
            throw "[ERROR] Could not update cart"
        }
        userInfo = await this.getUserById(userId)
        return userInfo
    }, 


    async getUsersCart(userId){ 
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }

        let userInfo = await this.getUserById(userId);
        return userInfo.cart
    }, 

    async clearCart(userId){ 
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }

        const usersCollection = await users(); 

        const updateUser = await usersCollection.updateOne(
            {"_id": new ObjectID(userId)}, 
            {$set: {'cart': []}}); 
            
        if (updateUser.modifiedCount === 0){ 
            throw "[ERROR] Could not update cart"
        }

        const foundId = await this.getUserById(userId)

        return foundId
    },

    async getPreviouslyBought(userId){ 
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }

        let userInfo = await this.getUserById(userId); 
        return userInfo.previouslyBought 
    },

    async previouslyBought(userId){ 
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }
        
        const usersCollection = await users(); 

        const cartInfo = await this.getUsersCart(userId); 
      
        const currPreviousBought = await this.getPreviouslyBought(userId); 

        // If a user's previouslyBought contains items, append instead of replace 
        if(currPreviousBought.length > 0){ 
            let totalCart = []

            for (let i = 0; i < currPreviousBought.length; i++){ 
                totalCart.push(currPreviousBought[i])
            }

            for (let j = 0; j < cartInfo.length; j++){ 
                totalCart.push(cartInfo[j])
            }

            const updateUser = await usersCollection.updateOne(
                {"_id": new ObjectID(userId)}, 
                {$set: {'previouslyBought':  totalCart}}
            )
            if (updateUser.modifiedCount === 0){ 
                throw "[ERROR] Could not update cart"
            }
    
            const foundId = await this.getUserById(userId)
            return foundId
        }else{ 
            const updateUser = await usersCollection.updateOne(
                {"_id": new ObjectID(userId)}, 
                {$set: {'previouslyBought':  cartInfo}}
            )
    
            if (updateUser.modifiedCount === 0){ 
                throw "[ERROR] Could not update cart"
            }
    
            const foundId = await this.getUserById(userId)
    
            return foundId
        }

       
    },

    async addFavorite(userId, listingId){
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }
        if(!listingId){
            throw "[ERROR] No listingId provided"
        }
        const usersCollection = await users(); 

        updatedUser = await usersCollection.updateOne(
            {"_id": new ObjectID(userId)}, 
            {$push: {'favorites':  listingId.toString()}}
        )
        
        return updatedUser


    },
    
    async removeFavorite(userId, listingId){
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }
        if(!listingId){
            throw "[ERROR] No listingId provided"
        }
        const usersCollection = await users(); 

        updatedUser = await usersCollection.updateOne(
            {"_id": new ObjectID(userId)}, 
            {$pull: {'favorites':  listingId.toString()}}
        )
        
        return updatedUser


    },

    async getUserFavorites(userId){
        if (!userId){ 
            throw "[ERROR] No userID provided"
        }

        const user = await this.getUserById(userId)
        if(user){
            if(user.favorites != null){
                return user.favorites
            }
            else{
                return []
            }
        }
        else{
            throw "No user exists with the provided id"
        }
    }


}