const init = {
  //
  userNum: null,
  isLogin: false,
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
      return { ...state, isLogin: false };
    //
    default:
      return state;
  }
}
export default reducer;
