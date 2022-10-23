const { User, Product } = require("../model");
const jwt = require("jsonwebtoken");
//
//////////////////////////////////////
function issueAccessTokenFn(user_id) {
  //
  // ㅜ payload,scretKey,options
  return jwt.sign(
    {
      user_id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1m",
      issuer: "mydreamis-18",
    }
  );
}
//
///////////////////////////////////////
function issueRefreshTokenFn(user_id) {
  //
  return jwt.sign(
    {
      user_id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "5m",
      issuer: "mydreamis-18",
    }
  );
}
//
///////////////////////////////////////////////////////
async function verifyTokensMiddleware(req, res, next) {
  //
  console.log("verifyTokensMiddleware");
  //
  const { access_token, refresh_token } = req.body;
  //
  const verifyAccessToken = await verifyTokenFn(access_token, process.env.ACCESS_TOKEN_SECRET);
  if (verifyAccessToken.isValid) {
    //
    const user_id = verifyAccessToken.decode.user_id;
    //
    let userNum = await User.findOne({ where: { user_id }, attributes: ["id"] });
    userNum = userNum.dataValues.id;
    req.userNum = userNum;
    next();
    return;
  }
  const verifyRefreshToken = await verifyTokenFn(refresh_token, process.env.REFRESH_TOKEN_SECRET);
  if (!verifyRefreshToken.isValid) {
    //
    res.send({ isSuccess: false, alertMsg: "다시 로그인해주세요." });
    return;
  }
  const user_id = verifyRefreshToken.decode.user_id;
  const { isSame, userNum } = await isSameRefreshTokenFn(user_id, refresh_token);
  if (isSame) {
    //
    const newAccessToken = issueAccessTokenFn(user_id);
    req.newAccessToken = newAccessToken;
    req.userNum = userNum;
    //
    // req = { ...req, newAccessToken }; // 안 됨
    //
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
////////////////////////////////////////////////
async function verifyTokenFn(token, secretKey) {
  // ㅗ promise 객체가 끝날때까지 기다려주는 역할
  //
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
/////////////////////////////////////////////////////////////
async function isSameRefreshTokenFn(user_id, refresh_token) {
  //
  const tokenInDB = await User.findOne({ where: { user_id }, attributes: ["id", "refresh_token"] });
  //
  const isSame = refresh_token === tokenInDB.dataValues.refresh_token;
  const { id } = tokenInDB.dataValues;
  //
  return { isSame, userNum: id };
}
//
///////////////////////////////////////
async function findTransactionsFn(userNum, model) {
  //
  let result = await model.findAll({ where: { user_id_fk: userNum }, attributes: ["is_refund", "created_at", "updated_at"], include: [{ model: Product, attributes: ["id", "name", "price"] }] });
  if (result.length !== 0) {
    //
    result = result.map((el) => el.dataValues).map((el) => ({ ...el, Product: el.Product.dataValues }));
  }
  return result;
}
//
////////////////////////////////////////
async function changeToRefundFn(model) {
  //
  return await model.update({ is_refund: true }, { where: { user_id_fk: userNum, product_id_fk: productNum } }).then((obj) => console.log("1", obj))
}
//
module.exports = {
  //
  verifyTokensMiddleware,
  isSameRefreshTokenFn,
  issueRefreshTokenFn,
  issueAccessTokenFn,
  findTransactionsFn,
  changeToRefundFn,
  verifyTokenFn,
};
