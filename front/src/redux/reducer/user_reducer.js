const init = {
  //
  user_id: null,
  isLogin: false,
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  switch (type) {
    //
    case "LOGIN":
      return { ...state, isLogin: true, user_id: payload };
    //
    case "LOGOUT":
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("refresh_token");
      console.log(sessionStorage);
      alert("로그아웃되었습니다.");
      //
      return { ...state, isLogin: false };
    //
    default:
      return state;
  }
}
export default reducer;
