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
    console.log(_login_action.data);
    alert(_login_action.data.alert);
    //
    _dispatch({ type: "LOGIN" });
  };
};
