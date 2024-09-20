const userRouter = require("../controller/User")
const express =  require("express")
const  router =  express.Router()

router 
 .get("/:id"  ,  userRouter.getUserByID)    
.get("/"  ,  userRouter.getAllUser  )
.put("/:id"  ,    userRouter.replacedUser )    
.patch("/:id" ,   userRouter.updateUser)
.delete("/:id" , userRouter.deleteUser)

exports.routes =  router