const mongoose =require("mongoose")
const debitcard = new mongoose.Schema({
    cardNumber:{
        type:Number,
        required:[true,"card number is required"]
    },
    cvv:{
        type:Number,
        required:[true,"cvv is required"]

    },
    cardExpiryDate:{
        type:Number,
        required:[true,"card expiry date is required"]
    },
    CardFront:{
        type:String
    },
    CardBack:{
        type:String
    }
})

const debitCard =mongoose.model("debitCard",debitcard)
module.exports =debitCard