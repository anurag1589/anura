const authController = require("../controller/Auth")
const express  =  require("express")

const router =  express.Router()

router.post("/singUp" , authController.createUser)
router.post("/login" , authController.login)
exports.routes =  router;


