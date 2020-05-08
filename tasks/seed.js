
var ObjectID = require('mongodb').ObjectID;
const users  = require('../data/users')
const product = require("../data/products")
const dbConnection = require("../config/mongoConnections");

const main = async () => { 
    console.log("=============== Start Seed Script ===============\n");

    const db = await dbConnection(); 
    await db.dropDatabase(); 

    console.log(":::Adding Users:::\n");
    var cart =  []
    var itemsToSell = []

    var name = "Chloe"
    var password = "apple"
    var contactInfo = "chloe@stevens.edu"
    var userAdded = await users.addNewUser(name, password, cart, itemsToSell, contactInfo)
    console.log(userAdded); 

    var name = "Jessica"
    var password = "banana"
    var contactInfo = "jess@stevens.edu"
    var userAdded = await users.addNewUser(name, password, cart, itemsToSell,contactInfo)
    console.log(userAdded); 


    var name = "Govinda"
    var password = "cherry"
    var contactInfo = "govinda@stevens.edu"
    var userAdded = await users.addNewUser(name, password, cart, itemsToSell,contactInfo)
    console.log(userAdded); 


    console.log(":::Adding Products:::\n");

    var productName = "Web Dev Handbook 101"
    var category = "Books"
    var description = "Book is the secret to sucess"
    var postedDate = new Date()
    var vendor = "Chloe"
    var price = 10
    var image = "https://cdn.clipart.email/2833f6201fdde175f809026cfb251cde_books-svg-clipart_1000-1000.svg";


    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 

    var productName = "800 Madison"
    var category = "Apartment"
    var description = "Pay a hefty rent for a triple room"
    var postedDate = new Date()
    var vendor = "Chloe"
    var price = 2000
    var image = "https://www.stevens.edu/sites/stevens_edu/files/styles/topic_single_content_350x234/public/800-Madison-St-1.jpg?itok=s-lHLrhF";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 

    var productName = "538 Washington"
    var category = "Apartment"
    var description = "Kung Fu Tea and Gong Cha near you"
    var postedDate = new Date()
    var vendor = "Chloe"
    var price = 7800
    var image = "https://www.stevens.edu/sites/stevens_edu/files/styles/topic_single_content_350x234/public/538-washington-st-1.jpg?itok=mrv8FW3T";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 


    var productName = "110 Washington"
    var category = "Apartment"
    var description = "When you're late for work, run to the path in 2 min"
    var postedDate = new Date()
    var vendor = "Govinda"
    var price = 7800
    var image = "https://www.stevens.edu/sites/stevens_edu/files/styles/topic_single_content_350x234/public/110-washington-1.jpg?itok=bCxEGaWe";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 
    
    var productName = "The Great Gatsby"
    var category = "Books"
    var description = "The novel chronicles an era that Fitzgerald himself dubbed the \'Jazz age\'"
    var postedDate = new Date()
    var vendor = "Govinda"
    var price = 20
    var image = "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 


    var productName = "Cracking the Coding Interview"
    var category = "Books"
    var description = "Get that moola"
    var postedDate = new Date()
    var vendor = "Govinda"
    var price = 20
    var image = "https://prodimage.images-bn.com/pimages/9780984782857_p0_v1_s1200x630.jpg";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 


    var productName = "Don Quixote"
    var category = "Books"
    var description = "Alonso Quixano, a retired country gentleman in his fifties, lives in an unnamed section of La Mancha with his niece and a housekeeper"
    var postedDate = new Date()
    var vendor = "Jessica"
    var price = 20
    var image = "https://kbimages1-a.akamaihd.net/b2ece927-6fe1-40fd-8ee2-681e9c3fe4c3/1200/1200/False/don-quixote-101.jpg";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 


    var productName = "War and Peace"
    var category = "Books"
    var description = ""
    var postedDate = new Date()
    var vendor = "Jessica"
    var price = 20
    var image = "https://images-na.ssl-images-amazon.com/images/I/51J1nb00FLL._SL160_.jpg";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 


    var productName = "2020 Year Book"
    var category = "Books"
    var description = "DESCRIPTION"
    var postedDate = new Date()
    var vendor = "Jessica"
    var price = 20
    var image = "https://cdn.clipart.email/2833f6201fdde175f809026cfb251cde_books-svg-clipart_1000-1000.svg";

    var productAdded = await product.addNewProduct(productName, category, description, postedDate, vendor, price, image)
    console.log(productAdded) 


    console.log("=============== End Seed Script ===============\n");
}; 


main().catch((err) => { 
    console.log(err); 
})