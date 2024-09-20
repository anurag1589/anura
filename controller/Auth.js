const jwt  = require("jsonwebtoken")
const model  = require("../mod/usermod")
const User  =  model.User
const bcrypt =  require("bcrypt")

const fs = require("fs")
const path = require("path")

 const privatekey =  fs.readFileSync("/Users/pc/Desktop/back/practiceEnd/private.key"  ,"utf-8")
 


exports.createUser = async(req, res) => {

    //Part -->2 

   const user = new  User(req.body)

  // without private key
 //  let  token = jwt.sign({email: req.body.email} , "shhhhh" ,{algorithm: "RS256"} )




 //with private key 
   let  token = jwt.sign({email: req.body.email} , privatekey ,{algorithm: "RS256"} )
   


  // bcrypted section  -- >  isse phele ka code chalega 
   const passWord  = req.body.password;
    const pass  = passWord.toString() 

      const hash = bcrypt.hashSync(pass , parseInt(10));
   
      user.token = token;
      user.password =  hash;
// bycrypted dection is ended 


      await user.save();
     res.status(201).send(user);






     // part --> 1

//   if (req.body) {
//     product.push(req.body);
//     res.json(req.body);
//   } else {
//     res.json({ error: "no data found" });
//   }

}




exports.login = async(req, res) => {

    const doc = await User.findOne({ email: req.body.email });
   
    const passWord  = req.body.password;
     const pass  = passWord.toString() 
      const isAuth = bcrypt.compareSync(pass , doc.password);
      if (isAuth) {
        var token = jwt.sign({ email: req.body.email }, privatekey, {
          algorithm: 'RS256',
        });
  
        doc.token = token;
        doc.save(res.json({token}))
      }else{
          res.sendStatus(401);  
      } 
    }
