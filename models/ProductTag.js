const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
         // Reference to the product table //
        model: 'product',
        key: 'id',
         // References the id column in the product table //
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
         // References the tag table //
        model: 'tag',
        key: 'id',
        // References the id column in the tag table //
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
