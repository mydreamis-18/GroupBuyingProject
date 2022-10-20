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
    const { isSuccess, alertMsg, access_token, refresh_token } = _login_action.data;
    if (isSuccess) {
      //
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("access_token", access_token);
      //
      _dispatch({ type: "LOGIN", payload: loginData.user_id });
    }
    // ㅜ 세션의 키 값 가져오기
    // console.log(sessionStorage.key(0))
    // console.log(sessionStorage.key(1))
    // console.log(sessionStorage.length)
    //
    alert(alertMsg);
    nav("/");
  };
};
export const buyNow_action = (nav) => {
  //
  return async (_dispatch, getState) => {
    //
    const { user_id, productsIdx } = getState().user_reducer;
    const { access_token, refresh_token } = sessionStorage;
    const _buyNow_action = await axios({
      //
      data: { productsIdx, user_id, access_token, refresh_token },
      url: "http://localhost:8000/buyNow",
      method: "post",
    });
    const { isSuccess, alertMsg } = _buyNow_action.data;
    if (!isSuccess) {
      //
      _dispatch({ type: "LOGOUT" });
      nav("/login");
    }
    alert(alertMsg);
  };
};
