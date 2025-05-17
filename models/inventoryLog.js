module.exports = (sequelize, DataTypes) => {
  const InventoryLog = sequelize.define(
    "InventoryLog",
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      change: {
        type: DataTypes.INTEGER, // + for addition, - for reduction
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING, // e.g., "restock", "sale", "manual update"
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      updatedAt: false,
    }
  );

  InventoryLog.associate = (models) => {
    InventoryLog.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return InventoryLog;
};
