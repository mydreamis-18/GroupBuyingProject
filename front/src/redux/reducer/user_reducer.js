const init = {
  //
  points: null,
  userNum: null,
  isLogin: false,
  nickname: null,
  isAdmin: false,
  isUserDataReady: false,
  notifications: new Array(0),
};
function reducer(state = init, action) {
  //
  const { isUserDataReady, isLogin, isAdmin, userNum, nickname, points, notifications } = state;
  const { type, payload } = action;
  switch (type) {
    //
    ////////////////////////////
    case "USER_DATA_IS_LOADING":
      state.isUserDataReady = false;
      return state;
    //
    //////////////////////////
    case "USER_DATA_IS_READY":
      return { ...state, isUserDataReady: true };
    //
    ///////////////////
    case "ADMIN_LOGIN":
      state.isAdmin = true;
      return state;
    //
    ///////////////////
    case "ADMIN_LOGOUT":
      state.isAdmin = false;
      return state;
    //
    /////////////
    case "LOGIN":
      state.nickname = payload.nickname;
      state.userNum = payload.userNum;
      state.isLogin = true;
      return state;
    //
    //////////////
    case "LOGOUT":
      const moveToPageFn = payload;
      console.log(payload);
      //
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      console.log(sessionStorage);
      alert("로그아웃되었습니다.");
      moveToPageFn();
      //
      return { ...state, isLogin: false, userNum: null, nickname: null };
    //
    ///////////////////////////
    case "IS_NEW_ACCESS_TOKEN":
      if (payload !== undefined) {
        //
        sessionStorage.setItem("access_token", payload);
      }
      return state;
    //
    ///////////////////////
    case "CHANGE_NICKNAME":
      state.nickname = payload;
      return state;
    //
    /////////////////////
    case "UPDATE_POINTS":
      state.points = payload;
      return state;
    //
    //////////////////////////
    case "SAVE_NOTIFICATIONS":
      state.notifications = payload;
      return state;
    //
    ////////////////////////
    case "ADD_NOTIFICATION":
      state.notifications = [payload, ...state.notifications];
      return state;
    //
    default:
      return state;
  }
}
export default reducer;
