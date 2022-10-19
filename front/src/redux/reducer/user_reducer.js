const init = {
  //
  isLogin: false,
};
function reducer(state = init, action) {
  //
  const { type, payload } = action;
  switch (type) {
    //
    case "LOGIN":
      return { ...state, isLogin: true };
    //
    case "LOGOUT":
      return { ...state, isLogin: false };

    default:
      return state;
  }
}
export default reducer;
