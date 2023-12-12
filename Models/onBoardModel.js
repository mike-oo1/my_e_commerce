const mongoose = require("mongoose")
const userModel = new mongoose.Schema({
    FirstName:{
        type:String,
        required:[true,"name is required"]
    },
    LastName:{
        type:String,
        required:[true,"name is required"]
    },
    Email:{
        type:String,
        required:[true,"email is required"]
    },
    Password:{
        type:String,
        required:[true,"password is required"]
    },
  
    PhoneNumber:{
        type:String,
        required:[true,"phone number is required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerifed:{
        type:Boolean,
        default:false
    },
    isSuperAdmin:{
        type:Boolean,
        default:false

    },

    Token:{
        type:String
    }

})

const usermodel = mongoose.model("users",userModel)
module.exports =usermodel

