module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Products",
      [
        {
          id: 1,
          name: "Guitar",
          price: 120,
          stock: 20,
          minStock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Piano",
          price: 230,
          stock: 1,
          minStock: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Flute",
          price: 80,
          stock: 4,
          minStock: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Products", null, {}),
};
