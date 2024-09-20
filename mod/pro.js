const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({
    title: {type : String, require: false },  
    description: {type : String ,require: false },  
    price: {type : Number, require: false  },  
    discountPercentage:{type : Number , require: false  },  
    rating: {type : Number , require: false },  
    brand:{type : String , require: false },  
    category: {type : String , require: false },  
    thumbnail: {type : String , require: false   },  
    images: {type : [String] ,require: false  },  
  });
  
 //  Product collection ka productschema hai  so schema kp collection ke 
 //  sath jodta hai  

  exports.Product = mongoose.model('Product', productSchema);