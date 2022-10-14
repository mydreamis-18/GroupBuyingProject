///////////////////////////////////
// ㅜ 백엔드에서 사용한 npm 전체 모듈
// styled-components
// react-router-dom
// redux-thunk
// react-redux
// sequelize
// express
// mysql2
// dotenv
// multer
// redux
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
const { sequelize, Product } = require("./model");
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
////////////////////////////////////////////////
// 1. DB에 같은 이름의 데이터가 있는 지 확인한 다음
// 2. 업로드한 이미지 파일을 백엔드 폴더에 저장하고
// 3. 나머지 formData() 객체의 데이터를 DB에 저장
app.post("/addProduct/formData", (req, res) => {
  //
  // console.log(req.file); // formData() 객체를 사용하지 않으면 undefined
  // console.log(req.body.img); // undefined // formData() 객체를 사용하지 않으면 {}
  // console.log(req.body.start_date); // axiois before (object) 값과는 다른 값이군... '2022-10-12T05:35:18.107Z' (string)
  //
  const fileFilter = (req, file, cb) => {
    //
    const { name } = req.body;
    //
    Product.findOne({ where: { name } }).then((obj) => {
      //
      if (obj === null) cb(null, true);
      else {
        cb("같은 이름의 상품이 이미 등록되어 있습니다.", false);
      }
    });
  };
  const addProductMulter = multer({ storage, fileFilter }).single("img");
  addProductMulter(req, res, (err) => {
    //
    if (err) {
      //
      res.send(err);
      return;
    }
    Product.create(req.body).then(() => res.send("상품이 등록되었습니다."));
  });
});
//
app.post("/getAllProducts", (req, res) => {
  //
  // 등록된 상품이 없을 경우엔...?
  Product.findAll().then((obj) => res.send(obj));
});
//
app.post("/deleteProduct/:product_id", (req, res) => {
  //
  const { product_id } = req.params;
  //
  // 삭제하는 함수가 있었는데...
  Product.findOne({ where: { product_id } });
});
