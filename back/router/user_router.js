const { issueAccessTokenFn, issueRefreshTokenFn } = require("../service");
const { User, BuyNowTransaction, Product } = require("../model");
const { verifyTokensMiddleware } = require("../service");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const SALT = 10;
//
////////////////////////////////////////////
router.post("/signUp", async (req, res) => {
  //
  // ㅜ 다양한 동기적 처리 방법
  // bcrypt.hash(password, SALT, (err, data) => {
  //   //
  //   password = data;
  //   User.create({ user_id, password }).then(() => res.send("회원 가입이 완료되었습니다."));
  // });
  //
  let { user_id, password } = req.body;
  password = await bcrypt.hash(password, SALT);
  //
  User.findOrCreate({ where: { user_id }, defaults: { password } }).then(([user, created]) => {
    if (created) {
      //
      res.send({ isSuccess: true, alertMsg: "회원 가입이 완료되었습니다." });
    }
    //
    else res.send({ isSuccess: false, alertMsg: "해당 ID로 가입한 회원이 있습니다." });
  });
});
//
/////////////////////////////////////
router.post("/login", (req, res) => {
  //
  let { user_id, password } = req.body;
  //
  User.findOne({ where: { user_id }, attributes: ["id", "password"] }).then(async (obj) => {
    //
    if (obj !== null) {
      //
      const userNum = obj.dataValues.id;
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
        res.send({ isSuccess: true, alertMsg: "로그인되었습니다.", userNum, access_token, refresh_token });
      }
      //
      else res.send({ isSuccess: false, alertMsg: "비밀번호를 다시 한 번 확인해주세요." });
    }
    //
    else res.send({ isSuccess: false, alertMsg: "존재하지 않는 아이디입니다." });
  });
});
//
/////////////////////////////////////////////////////////////
router.get("/myPage", verifyTokensMiddleware, (req, res) => {
  //
  const { userNum } = req.body;
  const { newAccessToken } = req;
  //
  console.log("Dd");
  BuyNowTransaction.findAll({ where: { user_id_pk: userNum }, include: [{ model: Product, attributes: ["name", "price"] }] }).then((obj) => console.log(obj.dataValues));
});
//
////////////////////////////////////////////////////////////////////
router.post("/verifyTokens", verifyTokensMiddleware, (req, res) => {
  //
  const { newAccessToken } = req;
  //
  res.send({ isSuccess: true, newAccessToken });
});
//
module.exports = router;
