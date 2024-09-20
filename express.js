require("dotenv").config()
const fs = require("fs");
const express = require("express");

const authRouter  = require("./Routes/auth")
const path  = require("path")
const productRouter =  require("./Routes/Routes")
const mongoose  =  require("mongoose")
const cors = require("cors")
const UserRouter = require("./Routes/UserRouter")

main().catch(err => console.log(err))

async function main () {
  await mongoose.connect(process.env.MONGO_URL)
    console.log("dataBase Connected")
}




const publickey  =  fs.readFileSync("/Users/pc/Desktop/back/practiceEnd/public.key" , "utf-8")
console.log(publickey)

const server = express();
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));


const product = data.product;
//const final = JSON.stringify(product[0].title);
const morgan = require("morgan");
const jwt  =  require("jsonwebtoken")



const authenti = (req , res , next) =>{
  //part - 1
  try{    
  const token =  req.get("Authorization").split("Bearer ")[1]
  console.log(token)
  var decode =  jwt.verify(token , publickey )
  console.log(decode)
  if(decode.email){
    next()
  } else{
    res.send("unauthorized")
  } 
}catch(err){
  console.log(err)
}
}


server.use(cors())
server.use(express.json());
server.use("/product", authenti ,   productRouter.routes)
server.use("/user",  authenti,  UserRouter.routes)
server.use(morgan("default"))
server.use(express.static(process.env.PUBLIC_DIR));
server.use("/auth" , authRouter.routes)







server.use("*" ,(req, res) =>{
       res.sendFile(path.resolve(__dirname , "build" ,"index.html"))
} )


//server.use(express.urlencoded())

// server.use((req,res, next) =>{
//     console.log(req.id , req.method , req.hostname , new Date())
//      next()
// })



//const auth = (req, res, next) => {
  //  if(req.query.pass === "123"){
  //   next()
  //  }else{
  //   res.send("error is found")
  //  }

  // if(req.body.pass === "123"){
  //     next()
  //    }else{
  //     res.send("error is found")
  //    }
  //next();
//};

// server.use(auth);



server.get("/", (req, res) => {
  // res.send("<h1>Hello world This is anurag </h1>")
  //res.send(index)
  // res.send(final)
  res.sendFile("/Users/pc/Desktop/back/backprac/index.html");
});
           
const port = 8000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
