module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return Sale;
};
