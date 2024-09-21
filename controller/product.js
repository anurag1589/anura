//const fs = require("fs");
const model = require("../mod/pro");

const Product = model.Product;


// const data = JSON.parse(fs.readFileSync("jk.json", "utf-8"));
// const products = data.product;

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);

  // if (req.body) {
  //   product.push(req.body);
  //   res.json(req.body);
  // } else {
  //   res.json({ error: "no data found" });
  // }
};

exports.getProductByID = async (req, res) => {
  // const id = +req.params.id;
  // const oneProduct = product.find((p) => p.id === id);

  const id = req.params.id;
  const products = await Product.findById(id);

  res.json(products);

  //  res.json(oneProduct);
};

exports.getAllProducts = async (req, res) => {
  //part -->1
  // console.log(product);
  //  res.json(product);

  //part->2
  // const products = await Product.find()
  // res.json(products)

  //part-->3  //  only for the specific task like sorting or limiting
  // let query = Product.find()
  //  if( req.query && req.query.sort )   {
  //   const value = +req.query.sort
  //    const products =  await query.sort({price : value}).exec()
  //    res.json(products)
  //   }    else{
  //     const products =  await query.exec()
  //     res.json(products)
  //   }

  // part --> 4 it can  be used for multiple task  but it is not used in case senario
  //     let query = Product.find()
  //       if( req.query.sort && req.query.order)   {
  //        console.log(req.query)
  //        const value = +req.query.limit
  //       const products =  await query.sort({[req.query.sort] : req.query.order }).limit(value).exec()
  //            res.json(products)
  //      }else {
  //         const products =  await query.limit(3).exec()
  //         res.json(products)
  //      }

  // ----------------------------------x---------------------------------------------

  // pagenation section   part-->5

  
  let query = Product.find();
  let pageSize = 4;
  let page = req.query.page;
  if (req.query.sort && req.query.order) {
    console.log(req.query);

    const products = await query
      .sort({ [req.query.sort]: req.query.order })
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();
    res.json(products);
  } else if (req.query.page) {
    const products = await query
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .exec();
    res.json(products);
  } else {
    const products = await query.exec();
    res.json(products);
  }
};

exports.replacedProduct = async (req, res) => {
  // const id = +req.params.id;
  // const productIndex = product.findIndex((p) => p.id === id);

  // const pro = product[productIndex];
  // console.log(pro);
  // product.splice(productIndex, 1, { ...pro, ...req.body });
  // res.status(201).json(" its done ");
  // console.log("here is done always ");
  // res.json({ type: "patch" });

  const id = req.params.id;
  try {
    const products = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.updateProducts = async (req, res) => {
  // const id = +req.params.id;

  // const index = product.findIndex((p) => p.id === id);
  // product.splice(index, 1, { ...req.body });
  // res.json({ type: "PUT" });

  const id = req.params.id;
  const products = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.json(products);
};

exports.deleteProducts = async (req, res) => {
  // const id = +req.params.id;
  // const index = product.findIndex((p) => p.id === id);
  // product.splice(index, 1);
  // res.json({ type: "DELETE" });

  const id = req.params.id;
  const products = await Product.findOneAndDelete({ _id: id }, { new: true });
  res.json(products);
};
