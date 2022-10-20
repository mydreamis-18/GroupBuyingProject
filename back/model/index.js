const db = new Object();
const User = require("./user");
const config = require("../config");
const Product = require("./product");
const Sequelize = require("sequelize");
const Transaction = require("./transaction")
//
// ㅜ MySQL 연결 객체 생성
const { database, username, password } = config.dev;
const sequelize = new Sequelize(database, username, password, config.dev);
//
db.User = User;
db.Product = Product;
db.sequelize = sequelize;
db.Transaction = Transaction;
//
User.init(sequelize);
Product.init(sequelize);
Transaction.init(sequelize);
//
User.associate(db);
Product.associate(db);
Transaction.associate(db);
//
module.exports = { sequelize, User, Product, Transaction };
