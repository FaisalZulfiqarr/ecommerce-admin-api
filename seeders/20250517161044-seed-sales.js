"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Sales", [
      {
        productId: 1,
        quantity: 2,
        totalPrice: 1999.98,
        saleDate: new Date("2024-05-15"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 5,
        totalPrice: 99.95,
        saleDate: new Date("2024-05-14"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sales", null, {});
  },
};
