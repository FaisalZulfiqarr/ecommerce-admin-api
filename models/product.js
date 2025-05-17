module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.TEXT,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });

    Product.hasMany(models.Sale, {
      foreignKey: "productId",
      as: "sales",
    });

    Product.hasOne(models.Inventory, {
      foreignKey: "productId",
      as: "inventory",
    });

    Product.hasMany(models.InventoryLog, {
      foreignKey: "productId",
      as: "inventoryLogs",
    });
  };

  return Product;
};
