# Stevens Marketplace

## Description 
CS546 Final Project

A one stop shop for everything Stevens related. The idea of this web application is to allow users to post and sell used textbooks, furniture, subleasing apartments, etc. The value of the application is to give Stevens students a space to sell and buy items with each other. Currently, there are no applications tailored to Stevens students out there. 

## Installation 
To start, `git clone` and then `cd` into the project directory. 

Start up MongoDB
```bash 
mongod 
```

Seed Database 
```bash 
cd tasks
npm run seed
```

Then you need to install and begin with: 
```bash 
npm install 
npm start 
```

Navigate to localhost:3000

In order to login, use any of the following: 
| Email    | Password| 
| ------------- |:-------------:| 
| chloe@stevens.edu   | apple| 
| jess@stevens.edu    | banana |  
| govinda@stevens.edu | cherry |  

## Database Schema 

#### Users
| Field Name     | Field Type   | 
| ------------- |:-------------:| 
| _id    | ObjectId PK| 
| username    | String      |  
| password | String |  
| cart | List(ObjectId) |
| previouslyBought | List(ObjectId)  |
| itemsToSell | List (ObjectId) |
| contactInfo | String|
| favorites | List(ObjectId) |

#### Products 
| Field Name     | Field Type   | 
| ------------- |:-------------:| 
| _id    | ObjectId PK| 
| productName    | String  |  
| category | String |  
| description | String|
| postedData | Date |
| vendor | String |
| price | Number|
| contactInfo | String|
| image | String |
| vendorID | List(ObjectId) |





