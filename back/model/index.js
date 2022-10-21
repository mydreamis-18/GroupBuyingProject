const db = new Object();
const User = require("./user");
const config = require("../config");
const Product = require("./product");
const Sequelize = require("sequelize");
const BuyNowTransaction = require("./buyNowTransaction");
const BuyTogetherTransaction = require("./buyTogetherTransaction");
//
// ㅜ MySQL 연결 객체 생성
const { database, username, password } = config.dev;
const sequelize = new Sequelize(database, username, password, config.dev);
//
db.User = User;
db.Product = Product;
db.sequelize = sequelize;
db.BuyNowTransaction = BuyNowTransaction;
db.BuyTogetherTransaction = BuyTogetherTransaction;
//
User.init(sequelize);
Product.init(sequelize);
BuyNowTransaction.init(sequelize);
BuyTogetherTransaction.init(sequelize);
//
User.associate(db);
Product.associate(db);
BuyNowTransaction.associate(db);
BuyTogetherTransaction.associate(db);
//
module.exports = { sequelize, User, Product, BuyNowTransaction, BuyTogetherTransaction };
