const Sequelize = require("sequelize");
//
class Product extends Sequelize.Model {
  //
  static init(sequelize) {
    //
    return super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        img_path: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        stock_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        discount_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        discount_rate: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        start_date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        end_date: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: "utf8",
        timestamps: true,
        underscored: true,
        modelName: "Product",
        tableName: "products",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //
  }
}
module.exports = Product;
