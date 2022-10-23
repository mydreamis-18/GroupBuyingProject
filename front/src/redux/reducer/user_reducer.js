const init = {
  //
  userNum: null,
  isLogin: false,
  isVerifying: false,
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  switch (type) {
    //
    case "LOGIN":
      return { ...state, isLogin: true, userNum: payload };
    //
    case "LOGOUT":
      const moveToPageFn = payload;
      //
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      console.log(sessionStorage);
      alert("로그아웃되었습니다.");
      moveToPageFn();
      //
      return { ...state, isLogin: false, isVerifying: false, transaction: new Array(0) };
    //
    case "VERIFYING_ON":
      return { ...state, isVerifying: true };
    //
    case "VERIFYING_OFF":
      return { ...state, isVerifying: false };
    //
    case "IS_NEW_ACCESS_TOKEN":
      if (payload !== undefined) {
        //
        sessionStorage.setItem("access_token", payload);
      }
      return state;
    //
    default:
      return state;
  }
}
export default reducer;
