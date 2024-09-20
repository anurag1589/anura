const express = require("express");
const path = require("path");


const mongoose = require('mongoose');
// const data = JSON.parse(fs.readFileSync("jk.json", "utf-8"));
// const products = data.product;

const model  = require("../mod/usermod")
const User  =  model.User

  exports.getUserByID  = async(req, res) => {
    // const id = +req.params.id;
    // const oneProduct = product.find((p) => p.id === id);
 
    const id  = req.params.id    
    const products = await User.findById((id));  
    res.json(products)

  //  res.json(oneProduct);
  };
  
 


 exports.getAllUser = async(req, res) => {
   // console.log(product);
   //  res.json(product); 

    const products = await User.find()
    res.json(products)

  };
  
  exports.replacedUser = async(req, res) => {
    // const id = +req.params.id;
    // const productIndex = product.findIndex((p) => p.id === id);
  
    // const pro = product[productIndex];
    // console.log(pro);
    // product.splice(productIndex, 1, { ...pro, ...req.body });
    // res.status(201).json(" its done ");
    // console.log("here is done always ");
    // res.json({ type: "patch" });
  
    const id  = req.params.id
    try{

     const  products = await User.findOneAndReplace({_id: id}, req.body  , {new:true} )
     res.json(products)
    }catch(err) {
      console.log(err)
    }
  };
  
  exports.updateUser = async(req, res) => {
 
    
    // const id = +req.params.id;
    // const index = product.findIndex((p) => p.id === id);
    // product.splice(index, 1, { ...req.body });
    // res.json({ type: "PUT" });
  
    const id = req.params.id;
    const products = await  User.findOneAndUpdate({_id:id} , req.body , {new: true})
    res.json(products)

  };    
  

   exports.deleteUser = async(req, res) => {
    // const id = +req.params.id;
    // const index = product.findIndex((p) => p.id === id);
    // product.splice(index, 1);
    // res.json({ type: "DELETE" });
 
     const id  =  req.params.id;
     const products = await User.findOneAndDelete({_id:id} , {new: true} )
       res.json(products)
  }
  