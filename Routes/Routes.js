const  productController  =  require("../controller/product")
const express =  require("express")

const router  =  express.Router()

router
.get("/:id" , productController.getProductByID )    
.get("/" ,   productController.getAllProducts  )
.post("/" ,   productController.createProduct)
.put("/:id" , productController.replacedProduct )    
.patch("/:id" ,   productController.updateProducts)
.delete("/:id" , productController.deleteProducts)    


exports.routes = router