// ㅜ 사용한 npm 명령어
// npm i express sequelize mysql2 redux react-redux redux-thunk react-router-dom axios cors styled-components dotenv multer
//
// ㅜ server 연결
const express = require("express");
const app = express();
const PORT = 8000;
app.listen(PORT, () => console.log("PORT", PORT));
//
// ㅜ 브라우저가 서로 다른 도메인/포트의 서버로 요청했을 때 발생하는 cors 에러를 위해 해당 도메인에 대하여 접근 허용 설정
const options = { origin: "http://localhost:3000" };
const cors = require("cors");
app.use(cors(options));
//
// ㅜ 전달 받은 객체를 해석해서 사용할 수 있게 설정
app.use(express.json());
//
// ㅜ 서버 실행 시 MySQL 연동
const { sequelize, Product } = require("./model");
sequelize.sync({ force: false }).then(() => console.log("MySQL"));
//
const path = require("path");
const multer = require("multer");
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
const upload = multer({ storage: storage });
//
/////////////////////////////////////////////////////////////////
app.post("/addProduct/new", upload.single("img"), (req, res) => {
  //
  // console.log(req.file); // formData() 객체를 사용하지 않으면 undefined
  // console.log(req.body.img); // undefined // formData() 객체를 사용하지 않으면 {}
  // console.log(req.body.start_date); // axiois before (object) 값과는 다른 값이군... '2022-10-12T05:35:18.107Z' (string)
  //
  const { name } = req.body;
  //
  Product.findOne({ where: { name } }).then((obj) => {
    if (obj === null) {
      //
      Product.create(req.body).then(() => res.send("상품이 등록되었습니다."));
    }
    //
    else res.send("같은 이름의 상품이 이미 등록되어 있습니다.");
  });
});
//
app.get("/getProduct/:product_id", (req, res) => {
  //
  const { product_id } = req.params;
  Product.findOne({ where: { id: product_id } }).then((obj) => res.send(obj));
});
