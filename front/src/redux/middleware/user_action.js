import { forVerifyTokensFn, ReLoginFn, saveNewAccessTokenFn } from "../../function";
import axios from "axios";
//
export const login_action = (loginData, nav) => {
  //
  return async (_dispatch, getState) => {
    //
    const _login_action = await axios({
      //
      url: "http://localhost:8000/login",
      method: "post",
      data: loginData,
    });
    const { isSuccess, alertMsg, userNum, access_token, refresh_token } = _login_action.data;
    if (isSuccess) {
      //
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("access_token", access_token);
      //
      _dispatch({ type: "LOGIN", payload: userNum });
      //
      nav("/");
    }
    // ㅜ 세션의 키 값 가져오기
    // console.log(sessionStorage.key(0))
    // console.log(sessionStorage.key(1))
    // console.log(sessionStorage.length)
    //
    alert(alertMsg);
  };
};
export const myPage_action = (toLoginPageFn) => {
  //
  return async (_dispatch, getState) => {
    //
    const _myPage_action = await axios({
      //
      data: { ...forVerifyTokensFn(getState) },
      url: "http://localhost:8000/myPage",
      method: "get",
    });
    const { isSuccess, alertMsg } = _myPage_action.data;
    //
    const logoutActionFn = () => _dispatch({ type: "LOGOUT" });
    saveNewAccessTokenFn(_myPage_action.data.access_token);
    ReLoginFn(isSuccess, logoutActionFn, toLoginPageFn);
    alert(alertMsg);
  };
};
