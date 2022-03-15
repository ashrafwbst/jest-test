/////////////////////////////
// controllers/products.js //
/////////////////////////////
const { Product } = require("../models");

async function getProducts(req, res) {
  const filters = req.body;
  try {
    const data = await Product.findAll(filters);
    const products = data.map(({ dataValues: product }) => {
      product.shouldRestock = "no";
      if (product.stock < product.minStock) {
        product.shouldRestock = "yes";
      }
      if (product.stock === product.minStock) {
        product.shouldRestock = "shortly";
      }
      delete product.createdAt;
      delete product.updatedAt;
      return product;
    });
    // const _product = products.toJSON();
    // delete _product.createdAt;
    // delete _product.updatedAt;
    //console.log(products);
    return res
      .json({
        status: "success",
        data: products,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return res
      .json({
        status: "error",
        error: error.message,
      })
      .status(400);
  }
}

async function createProduct(req, res) {
  // const filters = req.body;
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      minStock: req.body.stock,
    });
    return res
      .json({
        status: "success",
        data: product,
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return res
      .json({
        status: "error",
        error: error.message,
      })
      .status(400);
  }
}
module.exports = {
  getProducts,
  createProduct,
};
