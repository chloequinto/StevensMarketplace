
var ObjectID = require('mongodb').ObjectID;
const users  = require('../data/users')
const product = require("../data/products")
const dbConnection = require("../config/mongoConnections");

const main = async () => { 
    console.log("=============== Start Seed Script ===============\n");

    const db = await dbConnection(); 
    await db.dropDatabase(); 

    console.log(":::Adding Users:::\n");
    var hasBought =  []
    var favProducts = []

    var name = "Chloe"
    var password = "apple"
    var contactInfo = "chloe@stevens.edu"
    var userAdded = await users.addNewUser(name, password, hasBought, favProducts, contactInfo)
    console.log(userAdded); 

    var name = "Jessica"
    var password = "banana"
    var contactInfo = "jess@stevens.edu"
    var userAdded = await users.addNewUser(name, password, hasBought, favProducts,contactInfo)
    console.log(userAdded); 


    var name = "Govinda"
    var password = "cherry"
    var contactInfo = "govinda@stevens.edu"
    var userAdded = await users.addNewUser(name, password, hasBought, favProducts,contactInfo)
    console.log(userAdded); 

    console.log(":::Adding Products:::\n");

    var productName = "Web Dev Handbook 101"
    var category = "Books"
    var description = "Book is the secret to sucess"
    var postedDate = new Date()
    var vendor = "Chloe"
    var comments = ["Wow I like"]
    var price = 10
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 

    var productName = "800 Madison"
    var category = "Apartment"
    var description = "pay a hefty rent"
    var postedDate = new Date()
    var vendor = "Chloe"
    var comments = ["Wow"]
    var price = 2000
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 
    
    var productName = "Calculator"
    var category = "Others"
    var description = "TI-83"
    var postedDate = new Date()
    var vendor = "Govinda"
    var comments = ["Can it give me an A in MA 123?"]
    var price = 2
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 
    
    var productName = "Book 3"
    var category = "Books"
    var description = "DESCRIPTION"
    var postedDate = new Date()
    var vendor = "Govinda"
    var comments = ["TODO", "TODO"]
    var price = 20
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 


    var productName = "Book 4"
    var category = "Books"
    var description = "DESCRIPTION"
    var postedDate = new Date()
    var vendor = "Govinda"
    var comments = ["TODO", "TODO"]
    var price = 20
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 


    var productName = "Book 5"
    var category = "Books"
    var description = "DESCRIPTION"
    var postedDate = new Date()
    var vendor = "Jessica"
    var comments = ["TODO", "TODO"]
    var price = 20
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 


    var productName = "Book 5"
    var category = "Books"
    var description = "DESCRIPTION"
    var postedDate = new Date()
    var vendor = "Jessica"
    var comments = ["TODO", "TODO"]
    var price = 20
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 


    var productName = "Book 6"
    var category = "Books"
    var description = "DESCRIPTION"
    var postedDate = new Date()
    var vendor = "Jessica"
    var comments = ["TODO", "TODO"]
    var price = 20
    var image = "TODO"

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, comments, price, image)
    console.log(productAdded) 


    console.log("=============== End Seed Script ===============\n");
}; 


main().catch((err) => { 
    console.log(err); 
})