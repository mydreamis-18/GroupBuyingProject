const Sequelize = require("sequelize");
//
class User extends Sequelize.Model {
  //
  static init(sequelize) {
    //
    return super.init(
      {
        user_id: {
          type: Sequelize.STRING(),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(),
          allowNull: false,
        },
        refresh_token: {
          type: Sequelize.STRING(),
        },
      },
      {
        sequelize,
        charset: "utf8",
        timestamps: true,
        underscored: true,
        modelName: "User",
        tableName: "users",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //
    db.User.hasMany(db.BuyNowTransaction, { foreignKey: "user_id_fk", sourceKey: "id" });
    db.User.hasMany(db.BuyTogetherTransaction, { foreignKey: "user_id_fk", sourceKey: "id" });
  }
}
module.exports = User;
