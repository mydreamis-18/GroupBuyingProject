const init = {
  //
  points: null,
  userNum: null,
  isLogin: false,
  notification: new Array(0),
};
function reducer(state = init, action) {
  //
  const { points, userNum, isLogin, notification } = state;
  const { type, payload } = action;
  switch (type) {
    //
    /////////////
    case "LOGIN":
      return { ...state, isLogin: true, userNum: payload };
    //
    /////////////
    case "LOGOUT":
      const moveToPageFn = payload;
      //
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      console.log(sessionStorage);
      alert("로그아웃되었습니다.");
      moveToPageFn();
      //
      return { ...state, isLogin: false, transaction: new Array(0) };
    //
    ///////////////////////////
    case "IS_NEW_ACCESS_TOKEN":
      if (payload !== undefined) {
        //
        sessionStorage.setItem("access_token", payload);
      }
      return state;
    //
    /////////////////
    case "UPDATE_POINTS":
      state.points = payload;
      return state;
    //
    default:
      return state;
  }
}
export default reducer;
