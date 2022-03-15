////////////
// app.js //
////////////
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3030 || 3000;

const app = express();
const routes = require("./routes");

app.use(bodyParser.json());

routes(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

module.exports = {
  app,
};
