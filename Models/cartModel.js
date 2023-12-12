// const mongoose =require ("mongoose")
// const cartModel = new mongoose.Schema({
//         ProductName:{
//             type:String,
//             // required:[true,"product name is required"]
//         },
//         ProductDescription:{
//             type:String,
//             // required:[true,"product image is required"]
//         },
//         Price:{
//             type:Number,
//             // required:[true,"product description is required"]
//         },
//         ProductSize:{
//             type:String,
//             // required:[true,"product size is required"]
//         },
//         ProductImage:{
//             type:String
//          },
//          count:{
//             type:Number,
//             // default:0
//          }
//     },{timestamps:true})

// const Cart = mongoose.model("AddToCart",cartModel)

// module.exports = Cart

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
        count: Number,
        price: Number,
      },
    ],
    cartTotal: Number,
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const cartModel = mongoose.model("AddToCart", cartSchema);

module.exports = cartModel;



