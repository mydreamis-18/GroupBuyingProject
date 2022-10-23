const { BuyNowTransaction, BuyTogetherTransaction } = require("../model");
const { findTransactionsFn, changeToRefundFn } = require("../service");
const express = require("express");
const router = express.Router();

//
/////////////////////////////////////////////////////////////
router.post("/myPage", verifyTokensMiddleware, async (req, res) => {
    //
    const { userNum, newAccessToken } = req;
    //
    const buyNowTransactions = await findTransactionsFn(userNum, BuyNowTransaction);
    const buyTogetherTransactions = await findTransactionsFn(userNum, BuyTogetherTransaction);
    //
    res.send({ isSuccess: true, alertMsg: "거래 내역 조회가 완료되었습니다.", newAccessToken, buyNowTransactions, buyTogetherTransactions });
});
//
////////////////////////////////////////////////////////////////////
router.post("/refund", verifyTokensMiddleware, async (req, res) => {
    //
    const { type, productNum } = req.body;
    const { userNum, newAccessToken } = req;
    //
    if (type === "바로 구매") {
        //
        await changeToRefundFn(BuyNowTransaction);
    }
    //
    else if (type === "공동 구매") {
        //
        await changeToRefundFn(BuyTogetherTransaction);
    }
    res.send({ isSuccess: true, alertMsg: "환불이 완료되었습니다.", newAccessToken });
})
//
module.exports = router;