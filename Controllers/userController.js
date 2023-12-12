const userModel = require("../Models/onBoardModel")
const {generateDynamicEmail}=require("../Utils/mailTemplate")
require("dotenv").config()
const bcryptjs = require("bcryptjs")
const jwt =require("jsonwebtoken")
const mailsender =require("../Controllers/mail")
// getting user details for sign up
exports.signUp =async(req,res)=>{
    try {
        const {FirstName,LastName,Email,Password,PhoneNumber}= req.body
        const salt =await bcryptjs.genSaltSync(10)
        const hash = await bcryptjs.hashSync(Password,salt)
        const data ={
            FirstName,
            LastName,
            Email,
            Password:hash,
            PhoneNumber
        }
// validating the fields
     if(!FirstName||!LastName ||!Email|| !Password|| !PhoneNumber||PhoneNumber.length!==14){
         return res.status(400).json({
            message:"field cant be left empty",
            message:"invalid phone number",
         })            
        }
            const createdUser =await new userModel(data)    
            // generating a token for user
     const newToken = jwt.sign({
         Email,
         Password
     },process.env.JWT_TOKEN,{expiresIn: "1d"})
     createdUser.Token = newToken
     const subject ="ACCOUNT CREATED"
     const link =`${req.protocol}: //${req.get("host")}/welcome on board${createdUser._id}/${newToken}`
     const message =`click on this link${link} to verify, kindly note that this link will expire after 5 minutes`
     const html= await generateDynamicEmail(link)
     mailsender(
        {
            from:"gmail",
            email:createdUser.Email,
            subject:`WELCOME TO BDSM ARENA`,
            
        }
    )
 
     await createdUser.save()
     res.status(200).json({
         message:"created",
         data:createdUser
     })

        
    

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }

}
// user login
exports.login = async(req,res)=>{
        try {
            const {Email,Password}=req.body
            const check = await userModel.findOne({Email:Email})
            if(!check){
               return res.status(400).json({
                    message:"wrong email format"
                })
            }
            const isPassword = await bcryptjs.compare(Password,check.Password)
            if(!isPassword){
                return res.status(400).json({
                    message: "wrong password"
                })
            }else{
                const createToken =jwt.sign({
                    Email,
                    Password
                },process.env.JWT_TOKEN,{expiresIn :"1d"})
                check.Token =createToken
                await check.save()
                
                return res.status(201).json({
                    status:"successful",
                    message:`${check.FirstName}  your log in is successful`,
                    // data:check
                })

            }
    
  
    
        } catch (error) {
           return res.status(500).json({
            message:error.message
           })
            
        }
    }

exports.userVerify = async(req,res)=>{
    try {
        const registeredUser = await userModel.findById(req.params.id)
        const registeredToken= registeredUser.Token
        await jwt.verify(registeredToken,process.env.JWT_TOKEN,(err,data)=>{
            if(err){
                return res.status(300).json({
                    message:"this link has expired"
                })
            }else{
                return data
            }
        })
        const verified =await userModel.findByIdAndUpdate(req.params.id,{isVerified:true},)
        if(!verified){
            return res.status(400).json({
                message:"unable to verify user"
            })
        }else{
            return res.status(200).json({
                message:`${registeredUser.FirstName}  your account have been verified successfully`
            })
        }
        
    } catch (error) {
       return res.status(500).json({
        message:error.message
       })
       
        
    }
}
exports.UpgradeAdminToSuperAdmin = async(req,res)=>{
    try {
        const userId =req.params.userId
        const UpgradeAdminToSuperAdmin = await userModel.findByIdAndUpdate(userId,{isAdmin:true,isSuperAdmin:true},{new:true})
        if(!UpgradeAdminToSuperAdmin){
            return res.status(400).json({
                message:`unable to upgrade, check if the id ${userId}is correct`
            })
        }else{
            return res.status({
                message:"admin upgraded successfully",
                data:UpgradeAdminToSuperAdmin
            })

        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
exports.changePassword =async(req,res)=>{
    try {
        const {Password}=req.body
        const id =req.params.id
        const resetDetails ={
            Password:hash
        }
        const resetResult = await userModel.findByIdAndUpdate(id,resetDetails,{Password:hash},
            {new:true})
        if(!resetResult){
            return res.status(400).json({
                message:"unable to change your password"
            })
        }else{
            res.status(200).json({
                status:"success",
                message:"password changed successfully",
                data:result
            })
        }   
        const createToken =jwt.sign({
            Password
        },process.env.JWT_TOKEN,{expiresIn :"1d"})
        check.Token =createToken
        const SAVE = await check.save()
        res.status(201).json({
            status:"successful",
            message:"password changed  successfully",
            data:SAVE
        })
    } catch (error) {
        
    }
}
exports.signOut= async(req,res)=>{
    try {
        const user =await userModel.findById(req.user._id)
        const bin =[]
        const hasAuth = req.headers.authorization
        const token = hasAuth.split(" ")[1]
        bin.push(token)
        user.isLoggedin =false
        await user.save()
        return res.status(201).json({
            message:"this user has been logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
}


exports.getAllUsers=async(req,res)=>{
    try {
        const allUsers = await userModel.find()
        if(!allUsers){
            return res.status(404).json({
                message:"users not found"
            })
        }else{
            return res.status(200).json({
                message:"here are all users",
                data:allUsers
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}



exports.getOneUser=async(req,res)=>{
    try {
        const id =   req.params.id
        const getone = await userModel.findById(id)
        if(!getone){
            return res.status(404).json({
                message:`user with id ${id} not found`
            })
        }else{
            return res.status(200).json({
                message:`here is the user with id ${id}`,
                data:getone
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


exports.deleteAUser= async(req,res)=>{
    try {
        const id = req.params.id
        const deleteUser =await userModel.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(400).json({
                message:"unable to delete thiss user"
            })
        }else{
            return res.status(200).json({
                message:"user deleted"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}