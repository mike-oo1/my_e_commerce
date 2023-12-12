const express = require("express")
const Router = express()
const upload=require("../Utils/multer")
const cloudinary=require("../Utils/cloudinary")
const {createProduct,getAllProducts,getOneProduct,updateProduct,deleteProduct}= require("../Controllers/createProducts")
const  { userAuth, isAdminAuthorized}=require("../Middleware/authorizaion")

Router.route("/createProduct").post(userAuth,upload.single("ProductImage"),createProduct)
Router.route("/getall").get(getAllProducts)
Router.route("/getOneProduct/:id").get(getOneProduct)
Router.route("/updateproduct/:id").put(isAdminAuthorized,updateProduct)
Router.route("/deleteproduct/:id").put(isAdminAuthorized,deleteProduct)



module.exports = Router