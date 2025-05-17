module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define("Inventory", {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return Inventory;
};
