///////////////////////////////////
// ㅜ 백엔드에서 사용한 npm 전체 모듈
// styled-components
// react-router-dom
// express-session
// jsonwebtoken
// redux-thunk
// react-redux
// sequelize
// express
// mysql2
// dotenv
// multer
// redux
// bcypt
// axios
// cors
//
////////////////
// ㅜ server 연결
const express = require("express");
const app = express();
const PORT = 8000;
app.listen(PORT, () => console.log("PORT", PORT));
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ㅜ 브라우저가 서로 다른 도메인/포트의 서버로 요청했을 때 발생하는 cors 에러를 위해 해당 도메인에 대하여 접근 허용 설정
const options = { origin: "http://localhost:3000" };
const cors = require("cors");
app.use(cors(options));
//
///////////////////////////////////////////////
// ㅜ 전달 받은 객체를 해석해서 사용할 수 있게 설정
app.use(express.json());
//
///////////////////////////
// ㅜ 서버 실행 시 MySQL 연동
const { sequelize, User, Product, BuyNowTransaction, BuyTogetherTransaction } = require("../model");
sequelize.sync({ force: false }).then(() => console.log("MySQL"));
//
////////////////////////////////////////////////////////////
// ㅜ 업로드 이미지 파일을 DB에 저장하기 위해 필요한 multer 모듈
const path = require("path");
const multer = require("multer");
//
const storage = multer.diskStorage({
  //
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/tmp/uploads"));
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + "-" + Date.now()); // 공식 문서
    //
    // ㅜ 한글 포함해서 원래 파일명 그대로 저장하기
    const filename = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, filename);
  },
});
//
/////////////////////////////////////////
// ㅜ 토큰 검증 시 사용되는 세션에 대한 모듈
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
  })
);
//
//////////////////////////////////
// ㅜ 라우터의 요청 주소에 대한 설정
const { transactionRouter, productRouter, userRouter } = require("../router");
app.use("/buyTogether", transactionRouter);
app.use("/buyNow", transactionRouter);
app.use("/", productRouter);
app.use("/", userRouter);
