const { issueAccessTokenFn, issueRefreshTokenFn, verifyTokensMiddleware, findTransactionsFn } = require("../service");
const { User, BuyNowTransaction, BuyTogetherTransaction } = require("../model");
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
      res.send({ isSuccess: true, alertMsg: "회원 가입이 완료되었습니다.\n얼른 로그인 해서 증정된 포인트를 확인해보세요!" });
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
  User.findOne({ where: { user_id }, attributes: ["id", "password", "points"] }).then(async (obj) => {
    //
    if (obj !== null) {
      //
      const userNum = obj.dataValues.id;
      const points = obj.dataValues.points;
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
        const buyNowTransactions = await findTransactionsFn(BuyNowTransaction, userNum, "바로 구매");
        const buyTogetherTransactions = await findTransactionsFn(BuyTogetherTransaction, userNum, "공동 구매");
        //
        res.send({ isSuccess: true, alertMsg: "로그인되었습니다.", userNum, access_token, refresh_token, points, buyNowTransactions, buyTogetherTransactions });
      }
      //
      else res.send({ isSuccess: false, alertMsg: "비밀번호를 다시 한 번 확인해주세요." });
    }
    //
    else res.send({ isSuccess: false, alertMsg: "존재하지 않는 아이디입니다." });
  });
});
//
////////////////////////////////////////////////////////////////////
router.post("/verifyTokens", verifyTokensMiddleware, (req, res) => {
  //
  const { userNum, newAccessToken } = req;
  //
  res.send({ isSuccess: true, userNum, newAccessToken });
});
//
module.exports = router;
