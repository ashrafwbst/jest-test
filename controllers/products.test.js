const chai = require("chai");
const request = require("supertest");
const { app } = require("../app");

const { expect } = chai;

const shouldNotRestockProduct = {
  id: 1,
  name: "Guitar",
  price: 120,
  stock: 20,
  minStock: 10,
  shouldRestock: "no",
};
const shouldRestockProduct = {
  id: 2,
  name: "Piano",
  price: 230,
  stock: 1,
  minStock: 2,
  shouldRestock: "yes",
};
const shouldShortlyStockProduct = {
  id: 3,
  name: "Flute",
  price: 80,
  stock: 4,
  minStock: 4,
  shouldRestock: "shortly",
};

describe("Fetch products test", async () => {
  it("Shows all stock states", async () => {
    const token = await request(app).post("/users/authenticate").send({
      username: "test",
      password: "test",
    });
    expect(token.status).to.equal(200);
    console.log("token =>", token.data);
    const { body, status } = await request(app)
      .get("/products")
      .set("Authorization", "Bearer " + token._body.token);
    const { data } = body;
    expect(status).to.equal(200);
    //console.log("data", data);

    expect(data).to.deep.include(shouldNotRestockProduct);
    expect(data).to.deep.include(shouldRestockProduct);
    expect(data).to.deep.include(shouldShortlyStockProduct);
  });
  it("Create Product ", async () => {
    const token = await request(app).post("/users/authenticate").send({
      username: "test",
      password: "test",
    });
    expect(token.status).to.equal(200);
    console.log("token =>", token.data);
    const response = await request(app)
      .post("/createProduct")
      .send({
        name: "testing",
        price: 100,
        stock: 10,
        minStock: 5,
      })
      .set("Authorization", "Bearer " + token._body.token);
    // const { data } = body;
    expect(response.status).to.equal(200);
  });
});
