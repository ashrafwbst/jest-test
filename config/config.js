require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "test",
    host: "localhost",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "root",
    database: "test",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "root",
    database: "test",
    host: "localhost",
    dialect: "mysql",
  },
};
