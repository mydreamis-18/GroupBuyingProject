import axios from "axios";
//
//////////////////////////////////////////////////
export const login_action = (loginData, toMainPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const _login_action = await axios({
      //
      url: "http://localhost:8000/login",
      data: loginData,
      method: "post",
    });
    const { isSuccess, alertMsg, userNum, access_token, refresh_token } = _login_action.data;
    if (isSuccess) {
      //
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("access_token", access_token);
      //
      _dispatch({ type: "LOGIN", payload: userNum });
      //
      toMainPageFn();
    }
    // ㅜ 세션의 키 값 가져오기
    // console.log(sessionStorage.key(0))
    // console.log(sessionStorage.key(1))
    // console.log(sessionStorage.length)
    //
    alert(alertMsg);
  };
};
//
///////////////////////////////////////////////////////
export const verifyTokens_action = (toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const { access_token, refresh_token } = sessionStorage;
    if (access_token === undefined && refresh_token === undefined) {
      //
      return;
    }
    const { isVerifying } = getState().user_reducer;
    if (isVerifying) return;
    //
    const _verifyTokens_action = await axios({
      //
      url: "http://localhost:8000/verifyTokens",
      data: { access_token, refresh_token },
      method: "post",
    });
    const { isSuccess, userNum, newAccessToken } = _verifyTokens_action.data;
    if (isSuccess) {
      //
      _dispatch({ type: "LOGIN", payload: userNum });
      _dispatch({ type: "IS_NEW_ACCESS_TOKEN", payload: newAccessToken });
    }
    //
    else _dispatch({ type: "LOGOUT", payload: toLoginPageFn });
  };
};