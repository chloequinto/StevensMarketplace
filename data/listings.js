// const mongoCollections = require('../config/mongoCollections');
// const products = mongoCollections.Products
const ObjectId = require("mongodb").ObjectId

async function getListing(id){

    /*
    following code will be used once database is populated
    */

    // if (!id) throw "Invalid ID"
    // let objId = ObjectId(id)
    // const productCollection = await products()
    // const product = await productCollection.findOne({_id: objId})
    // if(product === null) throw 'Invalid ID'
    // return product

    return {
        _id : "45ae6d6rft78y8uahw334hb2312-0ijfoandksf",
        productName: "Calc 3 Textbook",
        category: "books",
        description: "Calc 3 Textbook in brand new condition",
        postedDate: new Date(),
        vendor: "7b7997a2-c0d2-4fBc-b-b27a-6ald4b5b623333",
        comments: ["wow", "great deal", "can you lower the price."],
        price: 10.99,
        contactInfo: "callMeAnytime@stevens.edu",
        image: "https://www.calcchat.com/images/book_covers/Calc-ETF-7e.png",
    }
}

async function addListing(listingData){

    /*

    {
        _id : string,
        productName: string,
        category: string,
        description: string,
        postedDate: date,
        vendor: string,
        comments: [string],
        price: number,
        contactInfo: string,
        image: string,
    }

    */

    // if(listingData.vendor === null) throw "Product must have a creator"
    // if(listingData.productName === null) throw "Listing must have a title"
    // if(listingData.price === null) throw "Listing must have a price"
    // if(listingData.description === null) throw "Listing must have a description"
    // if(listingData.contactInfo === null) throw "Listing must have a description"


    


}

module.exports = {
    getListing
}