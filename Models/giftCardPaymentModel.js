const mongoose = require("mongoose")
const cardSchema = new mongoose.Schema({
  GiftCardCode:{
    type:Number,
    // required:[true,"gift card code required for payment"]
  },
  cardName:{
    type:String,
    requied:[true,"gift card name is required"]
  },
  GiftCardImage:{
    type:String
  }
})

const Card = mongoose.model("cards",cardSchema)
module.exports=Card