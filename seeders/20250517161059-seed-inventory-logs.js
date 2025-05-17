"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("InventoryLogs", [
      {
        productId: 1,
        change: -2,
        reason: "sale",
        createdAt: new Date(),
      },
      {
        productId: 2,
        change: -5,
        reason: "sale",
        createdAt: new Date(),
      },
      {
        productId: 3,
        change: 50,
        reason: "restock",
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("InventoryLogs", null, {});
  },
};
