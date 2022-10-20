const Sequelize = require("sequelize");
//
class Transaction extends Sequelize.Model {
    //
    static init(sequelize) {
        //
        return super.init({}, {
            sequelize,
            charset: "utf8",
            timestamps: true,
            underscored: true,
            modelName: "Transaction",
            tableName: "transactions",
            collate: "utf8_general_ci",
        })
    }
    static associate(db) {
        //
        db.Transaction.belongsTo(db.User, { foreignKey: "user_id", targetKey: "id" });
        db.Transaction.belongsTo(db.Product, { foreignKey: "product_id", targetKey: "id" })
    }
}
module.exports = Transaction;