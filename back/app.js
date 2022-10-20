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
const { sequelize, User, Product, Transaction } = require("./model");
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
////////////////////////////////////////////////////////////
// ㅜ 로그인 및 회원가입 시에 사용되는 암호화 및 토큰에 대한 모듈
const dot = require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT = 10;
//
app.post("/signUp", (req, res) => {
  //
  let { user_id, password } = req.body;
  //
  User.findOne({ where: { user_id } }).then(async (obj) => {
    //
    if (obj === null) {
      //
      // ㅜ 다양한 동기적 처리 방법
      // bcrypt.hash(password, SALT, (err, data) => {
      //   //
      //   password = data;
      //   User.create({ user_id, password }).then(() => res.send("회원 가입이 완료되었습니다."));
      // });
      //
      // password = bcrypt.hashSync(password, SALT);
      //
      password = await bcrypt.hash(password, SALT);
      //
      User.create({ user_id, password }).then(() => res.send({ isSuccess: true, alertMsg: "회원 가입이 완료되었습니다." }));
    }
    //
    else res.send({ isSuccess: false, alertMsg: "해당 ID로 가입한 회원이 있습니다." });
  });
});
//
app.post("/login", (req, res) => {
  //
  let { user_id, password } = req.body;
  //
  User.findOne({ where: { user_id } }).then(async (obj) => {
    //
    if (obj !== null) {
      //
      const _password = obj.dataValues.password;
      //
      const isMatch = await bcrypt.compare(password, _password);
      if (isMatch) {
        //
        const access_token = issueAccessTokenFn(user_id);
        const refresh_token = issueRefreshTokenFn(user_id);
        //
        await User.update({ refresh_token }, { where: { user_id } });
        //
        res.send({ isSuccess: true, alertMsg: "로그인되었습니다.", access_token, refresh_token });
      }
      //
      else res.send({ isSuccess: false, alertMsg: "비밀번호를 다시 한 번 확인해주세요." });
    }
    //
    else res.send({ isSuccess: false, alertMsg: "존재하지 않는 아이디입니다." });
  });
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
app.post("/buyNow", verifyTokensMiddleware, (req, res) => {
  //
  const { access_token } = req;
  const { user_id, productsIdx } = req.body;
  //
  res.send({ isSuccess: true, access_token, alertMsg: "바로 구매가 완료되었습니다." });
});
//
function issueAccessTokenFn(user_id) {
  //
  // ㅜ payload,scretKey,options
  return jwt.sign(
    {
      user_id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1s",
      issuer: "mydreamis-18",
    }
  );
}
//
function issueRefreshTokenFn(user_id) {
  //
  return jwt.sign(
    {
      user_id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "5s",
      issuer: "mydreamis-18",
    }
  );
}
//
async function verifyTokensMiddleware(req, res, next) {
  //
  const { user_id, access_token, refresh_token } = req.body;
  //
  const verifyAccessToken = await verifyTokenFn(access_token, process.env.ACCESS_TOKEN_SECRET);
  if (verifyAccessToken.isValid) {
    //
    next();
    return;
  }
  let refreshTokenInDB = await User.findOne({ where: { user_id }, attributes: ["refresh_token"] });
  refreshTokenInDB = refreshTokenInDB.dataValues.refresh_token;
  //
  const isSame = refresh_token === refreshTokenInDB;
  if (!isSame) {
    //
    res.send({ isSuccess: false, alertMsg: "다시 로그인해주세요." });
    return;
  }
  const verifyRefreshToken = await verifyTokenFn(refresh_token, process.env.REFRESH_TOKEN_SECRET);
  if (verifyRefreshToken.isValid) {
    //
    const access_token = issueAccessTokenFn(user_id);
    // req = { ...req, access_token };
    req.access_token = access_token;
    next();
    return;
  }
  res.send({ isSuccess: false, alertMsg: "다시 로그인해주세요." });
  return;
  //
  // ㅜ then() 함수 사용
  // verifyTokenFn(access_token, process.env.ACCESS_TOKEN_SECRET).then((accessToken) => {
  //   if (accessToken.isValid) {
  //     //
  //     next();
  //     return;
  //   }
  //   User.findOne({ where: { user_id }, attributes: ["refresh_token"] })
  //     .then((obj) => obj.dataValues.refresh_token)
  //     .then((token) => token === refresh_token)
  //     .then((isSame) => {
  //       if (!isSame) {
  //         //
  //         res.send({ isSuccess: false, alertMsg: "다시 로그인해주세요" });
  //         return;
  //       }
  //       verifyTokenFn(refresh_token, process.env.REFRESH_TOKEN_SECRET).then((refreshToken) => {
  //         if (refreshToken.isValid) {
  //           //
  //           const access_token = issueAccessTokenFn(user_id);
  //           req = { ...req, access_token };
  //           next();
  //           return;
  //         }
  //         res.send({ isSuccess: false, alertMsg: "다시 로그인해주세요" });
  //         return;
  //       });
  //     });
  // });
}
//
async function verifyTokenFn(token, secretKey) {
  //
  // ㅜ 프로미스 객체
  return jwt.verify(token, secretKey, (err, decode) => {
    //
    if (err) {
      //
      return { isValid: false };
    }
    //
    else return { isValid: true, decode };
  });
}
//
////////////////////////////////////////////////
//    10.14.20
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
      res.send({ isSuccess: false, alertMsg: err });
      return;
    }
    Product.create(req.body).then((obj) => {
      //
      res.send({ isSuccess: true, alertMsg: "상품이 등록되었습니다.", newProduct: obj.dataValues });
    });
  });
});
//
app.post("/getAllProducts", (req, res) => {
  //
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
