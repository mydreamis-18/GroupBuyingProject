const { User } = require("../model");
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
  const { access_token, refresh_token } = req.body;
  //
  const verifyAccessToken = await verifyTokenFn(access_token, process.env.ACCESS_TOKEN_SECRET);
  if (verifyAccessToken.isValid) {
    //
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
  const isSame = await isSameRefreshTokenFn(user_id, refresh_token);
  if (isSame) {
    //
    const newAccessToken = issueAccessTokenFn(user_id);
    req.newAccessToken = newAccessToken;
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
  const tokenInDB = await User.findOne({ where: { user_id }, attributes: ["refresh_token"] });
  //
  return refresh_token === tokenInDB.dataValues.refresh_token;
}
//
module.exports = {
  //
  verifyTokensMiddleware,
  isSameRefreshTokenFn,
  issueRefreshTokenFn,
  issueAccessTokenFn,
  verifyTokenFn,
};
