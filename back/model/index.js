const db = new Object();
const config = require("../config");
const Sequelize = require("sequelize");
//
// ㅜ MySQL 연결 객체 생성
const { database, username, password } = config.dev;
const sequelize = new Sequelize(database, username, password, config.dev);
//
db.sequelize = sequelize;
//
module.exports = db;
