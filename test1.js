const  express =  require("express")
const jwt  = require("jsonwebtoken")
const { User } = require("./mod/usermod")
const app  =  express()


const create  =(req  , res) =>{
    const user = new User(req.body)
    const token = jwt.sign({email:  req.body.email } , "shhhh")

  //{email :  req.body.email} -->  it is known as the payload
  
    user.token = token 
    user.save()
}

// the token  which have been created then  it should be decoded so where it should be created 
// it should be decoded at  every level

app.use(cors()) 

// koi bhi string se kuch hatana ho toh we use split 

const auth = (req , res , next) =>{
const  token  = req.get("Authorization").split("Bearer ")
console.log(token)

// iske this bad humme output me bearer and humara token mil jata ha

const jwt =  jwt.verify(token , process.env.secretKey)
if(decoded){
    next()
} else{
    res.sendStatus(401)
}

}

app.get("/" , auth,  (req, res) =>{
    console.log("hellow world")
})