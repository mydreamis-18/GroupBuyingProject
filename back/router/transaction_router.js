const { verifyTokensMiddleware, findTransactionFn, changeToRefundFn } = require("../service");
const { User, BuyNowTransaction, BuyTogetherTransaction } = require("../model");
const express = require("express");
const router = express.Router();
//
//////////////////////////////////////////////////////////////
router.post("/buy", verifyTokensMiddleware, async (req, res) => {
  //
  const { userNum, newAccessToken } = req;
  const { type, id, points } = req.body;
  let model = null;
  //
  switch (type) {
    //
    case "바로 구매":
      model = BuyNowTransaction;
      break;
    //
    case "공동 구매":
      model = BuyTogetherTransaction;
      break;
    //
    default:
      break;
  }
  let newTransitionId = await model.create({ user_id_fk: userNum, product_id_fk: id });
  newTransitionId = newTransitionId.dataValues.id;
  //
  const newTransition = await findTransactionFn(model, newTransitionId, type);
  await User.update({ points }, { where: { id: userNum } });
  const alertMsg = `${type}가 완료되었습니다.`;
  //
  res.send({ isSuccess: true, alertMsg, newAccessToken, newTransition });
});
//
////////////////////////////////////////////////////////////////////
router.post("/refund", verifyTokensMiddleware, async (req, res) => {
  //
  const { type, productNum, created_at, points } = req.body;
  const { userNum, newAccessToken } = req;
  let model = null;
  //
  if (type === "바로 구매") {
    //
    model = BuyNowTransaction;
  }
  //
  else if (type === "공동 구매") {
    //
    model = BuyTogetherTransaction;
  }
  await User.update({ points }, { where: { id: userNum } });
  await changeToRefundFn(model, userNum, productNum, created_at);
  //
  let updated_at = await model.findOne({ where: { user_id_fk: userNum, product_id_fk: productNum, created_at }, attributes: ["updated_at"] });
  updated_at = updated_at.dataValues.updated_at;
  //
  res.send({ isSuccess: true, alertMsg: "환불이 완료되었습니다.", newAccessToken, updated_at });
});
//
module.exports = router;
