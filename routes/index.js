/////////////////////
// routes/index.js //
/////////////////////
const productsController = require("../controllers/products.js");
const usersController = require("../controllers/userAuth.js");
const basicAuth = require("../helpers/basicAuth.js");
module.exports = (app) => {
  app.get("/products", basicAuth.userAuth, productsController.getProducts);
  app.post(
    "/createProduct",
    basicAuth.userAuth,
    productsController.createProduct
  );
  app.post("/users/authenticate", usersController.authenticate);
  app.get("/users", usersController.getAll);
};
