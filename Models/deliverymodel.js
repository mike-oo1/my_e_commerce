const mongoose =require("mongoose")
const deliveryDetails = new mongoose.Schema({
    FirstName:{
        type:String,
        required:[true,"first name is required"]
    },
    LastName:{
        type:String,
        required:[true,"last name is required"]
    },
    ItemName:{
        type:String,
        // required:[true,"item name is required"]
    },
    HouseAddress:{
        type:String,
        // required:[true,"house address is required"]
    },
    ZipCode:{
        type:Number,
        required:[true,"zip code is required"]
    },
    Quantity:{
        type:Number,
        required:[true,"quantity is required"],
        // default:0
    },
    IdentityCard:{
        type:String,
    }
},{timestamps:true})

const delivery = mongoose.model("delivery",deliveryDetails)

module.exports = delivery