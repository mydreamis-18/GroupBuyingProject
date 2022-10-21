const { BuyNowTransaction, BuyTogetherTransaction } = require("../model");
const { verifyTokensMiddleware } = require("../service");
const express = require("express");
const router = express.Router();
//
router.post("/", verifyTokensMiddleware, async (req, res) => {
  //
  let alertMsg = null;
  const { access_token } = req;
  const { userNum, product_id_fk } = req.body;
  //
  switch (req.baseUrl) {
    case "/buyNow":
      alertMsg = "바로 구매가 완료되었습니다.";
      await BuyNowTransaction.create({ user_id_fk: userNum, product_id_fk });
      break;
    case "/buyTogether":
      alertMsg = "공동 구매가 완료되었습니다.";
      await BuyTogetherTransaction.create({ user_id_fk: userNum, product_id_fk });
      break;
    default:
      break;
  }
  res.send({ isSuccess: true, access_token, alertMsg });
});
module.exports = router;
