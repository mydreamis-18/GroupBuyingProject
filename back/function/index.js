const { User } = require("../model");
const jwt = require("jsonwebtoken");
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
      expiresIn: "1m",
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
      expiresIn: "5m",
      issuer: "mydreamis-18",
    }
  );
}
async function verifyTokensMiddleware(req, res, next) {
  //
  const { userNum, access_token, refresh_token } = req.body;
  //
  const verifyAccessToken = await verifyTokenFn(access_token, process.env.ACCESS_TOKEN_SECRET);
  if (verifyAccessToken.isValid) {
    //
    next();
    return;
  }
  const isSame = await isSameRefreshTokenFn(userNum, refresh_token);
  if (!isSame) {
    //
    res.send({ isSuccess: false, alertMsg: "다시 로그인해주세요." });
    return;
  }
  const verifyRefreshToken = await verifyTokenFn(refresh_token, process.env.REFRESH_TOKEN_SECRET);
  if (verifyRefreshToken.isValid) {
    //
    const user_id = await User.findOne({ where: { id: userNum }, attributes: ["user_id"] });
    const access_token = issueAccessTokenFn(user_id);
    //
    // req = { ...req, access_token }; // 안 됨
    //
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
async function isSameRefreshTokenFn(userNum, refresh_token) {
  //
  const tokenInDB = await User.findOne({ where: { id: userNum }, attributes: ["refresh_token"] });
  //
  return refresh_token === tokenInDB.dataValues.refresh_token;
}
//
module.exports = { issueAccessTokenFn, issueRefreshTokenFn, verifyTokensMiddleware, verifyTokenFn, isSameRefreshTokenFn };
