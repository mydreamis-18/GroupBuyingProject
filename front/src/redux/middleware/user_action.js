import axios from "axios";
//
export const login_action = (loginData) => {
  //
  return async (_dispatch, getState) => {
    //
    const _login_action = await axios({
      //
      url: "http://localhost:8000/login",
      method: "post",
      data: loginData,
    });
    const { access_token, refresh_token, alertMsg } = _login_action.data;
    if (access_token !== undefined) {
      //
      sessionStorage.setItem("refresh_token", refresh_token);
      sessionStorage.setItem("access_token", access_token);
    }
    // ㅜ 세션의 키 값 가져오기
    // console.log(sessionStorage.key(0))
    // console.log(sessionStorage.key(1))
    // console.log(sessionStorage.length)
    //
    _dispatch({ type: "LOGIN" });
    alert(alertMsg);
  };
};
