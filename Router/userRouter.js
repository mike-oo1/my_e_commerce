const express =require("express")
const Router =express()
const{signUp,login,userVerify,UpgradeAdminToSuperAdmin,changePassword,signOut,getAllUsers,getOneUser}=require("../Controllers/userController")
Router.route("/signup").post(signUp)
Router.route("/userverify/:id/:token").put(userVerify)
Router.route("/login").post(login)
Router.route("/upgrade/:id").put(UpgradeAdminToSuperAdmin)
Router.route("/changePassword/:id").put(changePassword)
Router.route("/signout/:id").post(signOut)
Router.route("/allusers").get(getAllUsers)
Router.route("/getone/:id").get(getOneUser)

module.exports=Router