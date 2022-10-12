// ㅜ 사용한 npm 명령어
// npm i express sequelize mysql2 redux react-redux redux-thunk react-router-dom axios cors styled-components dotenv
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
app.post("/addProduct", (req, res) => {
  //
  const { name } = req.body.productValues;
  //
  // console.log(req.body.productValues.start_date); // axiois before (object) 값과는 다른 값이군... '2022-10-12T05:35:18.107Z' (string)
  //
  Product.findOne({ where: { name } }).then((obj) => {
    if (obj === null) {
      //
      Product.create(req.body.productValues).then(() => res.send("상품이 등록되었습니다."));
    }
    //
    else res.send("같은 이름의 상품이 이미 등록되어 있습니다.");
  });
});
